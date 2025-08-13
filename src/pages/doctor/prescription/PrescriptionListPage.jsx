import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@src/utils/useDebounce";
import { getPrescriptions } from "@src/services/prescriptionService";
import { getUsers } from "@src/services/userService";
import { Button } from "@src/components";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

const PrescriptionListPage = () => {
  const { paginationMeta } = useSelector((state) => state.fetch);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const [filter, setFilter] = useState({
    search: "",
    disease: "",
    date: "",
  });

  useEffect(() => {
    const reloadTheme = () => {
      // No-op, as document.body.style is removed
    };
    window.addEventListener("customColorThemeChanged", reloadTheme);
    window.addEventListener("storage", (e) => {
      if (e.key === "customColorTheme") reloadTheme();
    });
    return () => {
      window.removeEventListener("customColorThemeChanged", reloadTheme);
      window.removeEventListener("storage", reloadTheme);
    };
  }, []);

  const debounceSearchTerm = useDebounce(filter.search, 500);

  const {
    data: prescriptionsData,
    isPending,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [
      "prescriptions",
      user.id,
      debounceSearchTerm,
      filter.disease,
      paginationMeta.currentPage,
    ],
    queryFn: async () => {
      const params = {
        search: debounceSearchTerm,
        disease: filter.disease,
        limit: 1000,
        offset: 0,
      };
      return await getPrescriptions(params);
    },
    enabled: !!user.id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getUsers(),
    staleTime: 1000 * 60 * 10,
  });

  const users = useMemo(() => {
    const userMap = {};
    const userData = usersData?.data?.results || [];
    userData.forEach((user) => {
      userMap[user.id] = user;
    });
    return userMap;
  }, [usersData]);

  const getUserName = (prescription, userMap = users) => {
    const patientId = prescription.patient;
    const userObj = userMap[patientId];

    if (!userObj) return "Unknown Patient";

    const firstName = userObj.first_name?.trim() || "";
    const lastName = userObj.last_name?.trim() || "";
    const fullName = `${firstName} ${lastName}`.trim();

    return fullName || userObj.email || "Unknown Patient";
  };

  const getUserDateOfBirth = (prescription, userMap = users) => {
    const patientId = prescription.patient;
    const userObj = userMap[patientId];
    return userObj?.date_of_birth || "N/A";
  };

  const getUserProfilePicture = (prescription) => {
    const patientId = prescription.patient;
    const userObj = users[patientId];
    return (
      userObj?.profile_picture || "https://avatar.iran.liara.run/public/16"
    );
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("en-US", options);
    } catch (error) {
      return "Invalid Date";
    }
  };

  const getRefillDays = (items) => {
    if (!items || items.length === 0) return "N/A";
    const thresholds = items
      .map((item) => item.refill_threshold_days)
      .filter((threshold) => threshold != null && !isNaN(threshold));

    return thresholds.length > 0 ? Math.min(...thresholds) : "N/A";
  };

  const filteredPrescriptions = useMemo(() => {
    if (!prescriptionsData?.results) return [];

    let prescriptions = prescriptionsData.results;

    if (filter.search) {
      prescriptions = prescriptions.filter((prescription) => {
        const userName = getUserName(prescription, users);
        const userDob = getUserDateOfBirth(prescription, users);

        return (
          userName.toLowerCase().includes(filter.search.toLowerCase()) ||
          userDob.toLowerCase().includes(filter.search.toLowerCase())
        );
      });
    }

    if (filter.disease) {
      prescriptions = prescriptions.filter((prescription) =>
        prescription.disease
          ?.toLowerCase()
          .includes(filter.disease.toLowerCase())
      );
    }

    if (filter.date) {
      prescriptions = prescriptions.filter((prescription) => {
        if (!prescription.created_at) return false;
        const prescriptionDate = new Date(prescription.created_at);
        const selectedDate = new Date(filter.date);

        return (
          prescriptionDate.getFullYear() === selectedDate.getFullYear() &&
          prescriptionDate.getMonth() === selectedDate.getMonth() &&
          prescriptionDate.getDate() === selectedDate.getDate()
        );
      });
    }

    return prescriptions;
  }, [prescriptionsData?.results, filter, users]);

  const paginatedPrescriptions = useMemo(() => {
    const startIndex =
      (paginationMeta.currentPage - 1) * paginationMeta.limitPerPage;
    const endIndex = startIndex + paginationMeta.limitPerPage;
    return filteredPrescriptions.slice(startIndex, endIndex);
  }, [
    filteredPrescriptions,
    paginationMeta.currentPage,
    paginationMeta.limitPerPage,
  ]);

  useEffect(() => {
    dispatch({
      type: "FETCH_SET_PAGINATION",
      payload: {
        totalData: filteredPrescriptions.length,
      },
    });
  }, [filteredPrescriptions.length, dispatch]);

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
    dispatch({ type: "FETCH_SET_PAGINATION", payload: { currentPage: 1 } });
  };

  const handleClearFilter = () => {
    setFilter({
      search: "",
      disease: "",
      date: "",
    });
    dispatch({ type: "FETCH_SET_PAGINATION", payload: { currentPage: 1 } });
  };

  const handlePageChange = (page) => {
    dispatch({ type: "FETCH_SET_PAGINATION", payload: { currentPage: page } });
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(
      filteredPrescriptions.length / paginationMeta.limitPerPage
    );
    if (paginationMeta.currentPage < totalPages) {
      handlePageChange(paginationMeta.currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (paginationMeta.currentPage > 1) {
      handlePageChange(paginationMeta.currentPage - 1);
    }
  };

  const handlePageSizeChange = (e) => {
    const newPageSize = parseInt(e.target.value);
    dispatch({
      type: "FETCH_SET_PAGINATION",
      payload: {
        limitPerPage: newPageSize,
        currentPage: 1,
      },
    });
  };

  const totalPages = Math.ceil(
    filteredPrescriptions.length / paginationMeta.limitPerPage
  );
  const hasPrevPage = paginationMeta.currentPage > 1;
  const hasNextPage = paginationMeta.currentPage < totalPages;

  if (isPending && !prescriptionsData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
        <div className="text-lg" style={getFontStyle(theme, "body1")}>
          Loading prescriptions...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-3 grid grid-cols-1 md:grid-cols-2 md:gap-4">
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="search"
            style={getFontStyle(theme, "body1")}
          >
            Search
          </label>
          <div className="relative">
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              search
            </span>
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Search patient name or date of birth..."
              className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-primary"
              value={filter.search}
              onChange={handleChangeFilter}
              style={getFontStyle(theme, "body2")}
            />
            {filter.search && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setFilter((prev) => ({ ...prev, search: "" }))}
                tabIndex={-1}
              >
                <span className="material-icons text-base">close</span>
              </button>
            )}
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="date"
            style={getFontStyle(theme, "body1")}
          >
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="pl-4 pr-4 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-primary"
            value={filter.date}
            onChange={handleChangeFilter}
            max={new Date().toISOString().split("T")[0]}
            style={getFontStyle(theme, "body2")}
          />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
          <h2
            className="text-lg font-medium"
            style={getFontStyle(theme, "subHeading")}
          >
            All Prescriptions
          </h2>
          <div className="flex items-center space-x-3">
            <div
              className="text-sm text-gray-600"
              style={getFontStyle(theme, "body2")}
            >
              {filteredPrescriptions.length} prescription
              {filteredPrescriptions.length !== 1 ? "s" : ""}
            </div>
            {isFetching && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr style={getFontStyle(theme, "body2")}>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Patient Name{" "}
                  <i className="material-icons align-middle">arrow_drop_down</i>
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Date of Birth
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Disease
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Date &amp; Time
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Refill in
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className="text-body"
              style={getFontStyle(theme, "body1")}
            >
              {paginatedPrescriptions.map((prescription) => (
                <tr key={prescription.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center cursor-pointer">
                      <img
                        src={getUserProfilePicture(prescription)}
                        alt="profile"
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://avatar.iran.liara.run/public/16";
                        }}
                      />
                      <span
                        className="font-medium"
                        style={getFontStyle(theme, "body1")}
                      >
                        {getUserName(prescription)}
                      </span>
                    </div>
                  </td>
                  <td
                    className="py-2 px-4 border-b"
                    style={getFontStyle(theme, "body1")}
                  >
                    {getUserDateOfBirth(prescription)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className="px-2 py-1 border rounded-full border-warning text-warning bg-warning bg-opacity-10"
                      style={getFontStyle(theme, "body2")}
                    >
                      {prescription.disease || "Not specified"}
                    </span>
                  </td>
                  <td
                    className="py-2 px-4 border-b"
                    style={getFontStyle(theme, "body1")}
                  >
                    {formatDateTime(prescription.created_at)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className="font-medium"
                      style={getFontStyle(theme, "body1")}
                    >
                      {getRefillDays(prescription.items)} days
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-end space-x-1">
                      <button
                        className="px-3 py-1 hover:bg-gray-100 rounded transition-colors"
                        title="Download"
                      >
                        <i className="material-icons text-gray-600">
                          file_download
                        </i>
                      </button>
                      <button
                        className="px-3 py-1 hover:bg-gray-100 rounded transition-colors"
                        title="Print"
                      >
                        <i className="material-icons text-gray-600">print</i>
                      </button>
                      <button
                        className="px-3 py-1 hover:bg-gray-100 rounded transition-colors"
                        title="More options"
                      >
                        <i className="material-icons text-gray-600">
                          more_vert
                        </i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t border-gray-100">
          <div
            className="text-sm text-gray-600 order-2 sm:order-1"
            style={getFontStyle(theme, "body2")}
          >
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredPrescriptions.length > 0
                ? (paginationMeta.currentPage - 1) *
                paginationMeta.limitPerPage +
                1
                : 0}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(
                paginationMeta.currentPage * paginationMeta.limitPerPage,
                filteredPrescriptions.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {filteredPrescriptions.length}
            </span>{" "}
            prescriptions
          </div>

          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={handlePrevPage}
              disabled={!hasPrevPage}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${hasPrevPage
                  ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                  : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              style={getFontStyle(theme, "body2")}
            >
              <i className="material-icons text-sm">chevron_left</i>
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-1 mx-2">
              {totalPages > 0 && (
                <>
                  {paginationMeta.currentPage > 3 && (
                    <>
                      <button
                        onClick={() => handlePageChange(1)}
                        className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                        style={getFontStyle(theme, "body2")}
                      >
                        1
                      </button>
                      {paginationMeta.currentPage > 4 && (
                        <span
                          className="px-2 text-gray-400"
                          style={getFontStyle(theme, "body2")}
                        >
                          ...
                        </span>
                      )}
                    </>
                  )}

                  {Array.from(
                    { length: Math.min(5, totalPages) },
                    (_, index) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = index + 1;
                      } else if (paginationMeta.currentPage <= 3) {
                        pageNumber = index + 1;
                      } else if (paginationMeta.currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + index;
                      } else {
                        pageNumber = paginationMeta.currentPage - 2 + index;
                      }

                      if (pageNumber > 0 && pageNumber <= totalPages) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pageNumber === paginationMeta.currentPage
                                ? "bg-primary text-white shadow-sm"
                                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                              }`}
                            style={getFontStyle(theme, "body2")}
                          >
                            {pageNumber}
                          </button>
                        );
                      }
                      return null;
                    }
                  )}

                  {paginationMeta.currentPage < totalPages - 2 &&
                    totalPages > 5 && (
                      <>
                        {paginationMeta.currentPage < totalPages - 3 && (
                          <span
                            className="px-2 text-gray-400"
                            style={getFontStyle(theme, "body2")}
                          >
                            ...
                          </span>
                        )}
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                          style={getFontStyle(theme, "body2")}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                </>
              )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={!hasNextPage}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${hasNextPage
                  ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                  : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              style={getFontStyle(theme, "body2")}
            >
              <span className="hidden sm:inline">Next</span>
              <i className="material-icons text-sm">chevron_right</i>
            </button>
          </div>

          <div
            className="flex items-center gap-2 text-sm text-gray-600 order-3"
            style={getFontStyle(theme, "body2")}
          >
            <span>Show:</span>
            <select
              value={paginationMeta.limitPerPage}
              onChange={handlePageSizeChange}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              style={getFontStyle(theme, "body2")}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>per page</span>
          </div>
        </div>
      </div>
      {prescriptionsData && filteredPrescriptions.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3
            className="text-lg font-medium text-gray-900 mb-2"
            style={getFontStyle(theme, "subHeading")}
          >
            No prescriptions found
          </h3>
          <p
            className="text-gray-500 mb-6"
            style={getFontStyle(theme, "body1")}
          >
            {filter.date || filter.search || filter.disease
              ? "Try adjusting your filters to see more results."
              : "You don't have any prescriptions yet."}
          </p>
          {(filter.date || filter.search || filter.disease) && (
            <Button
              color="primary"
              onClick={handleClearFilter}
              isOutline
              style={getFontStyle(theme, "body2")}
            >
              Clear All Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PrescriptionListPage;
