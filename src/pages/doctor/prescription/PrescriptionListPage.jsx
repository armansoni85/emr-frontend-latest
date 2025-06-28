import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@src/utils/useDebounce";
import { getPrescriptions } from "@src/services/prescriptionService";
import { getUsers } from "@src/services/userService";
import { Button } from "@src/components";

const PrescriptionListPage = () => {
  const { paginationMeta } = useSelector((state) => state.fetch);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    search: "",
    disease: "",
    date: "",
  });

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
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
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
        <div className="text-lg">Loading prescriptions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
            <div className="flex items-center space-x-3">
              {/* Show subtle loading indicator during search/filter */}
              {isFetching && prescriptionsData && (
                <div className="flex items-center text-blue-600 text-sm">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Updating...
                </div>
              )}
              <Button
                color="secondary"
                size="small"
                onClick={handleClearFilter}
                isOutline
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search by Name or DOB"
                  className="w-full rounded-full pe-4 ps-10 py-3 border-grey focus:outline-grey2"
                  value={filter.search}
                  onChange={handleChangeFilter}
                />
                <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  search
                </span>
              </div>
            </div>

            {/* <div>
              <label
                htmlFor="disease"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Disease or Allergy
              </label>
              <div className="relative text-muted">
                <input
                  type="text"
                  name="disease"
                  placeholder="Search by Disease"
                  className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2"
                  value={filter.disease}
                  onChange={handleChangeFilter}
                />
              </div>
            </div> */}

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date
              </label>
              <div className="relative text-muted">
                <input
                  type="date"
                  name="date"
                  className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2"
                  value={filter.date}
                  onChange={handleChangeFilter}
                />
                <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  calendar_today
                </i>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              <div className="mt-1">
                <span className="font-medium">
                  {filteredPrescriptions.length}
                </span>{" "}
                {filteredPrescriptions.length === 1
                  ? "prescription"
                  : "prescriptions"}{" "}
                found
                {filter.date || filter.search || filter.disease ? (
                  <span className="text-gray-400">
                    {" "}
                    (filtered from {prescriptionsData?.results?.length ||
                      0}{" "}
                    total)
                  </span>
                ) : null}
              </div>
            </div>

            {(filter.search || filter.disease || filter.date) && (
              <div className="text-xs text-gray-500">
                Active filters:{" "}
                {[
                  filter.search && "Search",
                  filter.disease && "Disease",
                  filter.date && "Date",
                ]
                  .filter(Boolean)
                  .join(", ")}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prescriptions Table */}
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
          <h2 className="text-lg font-medium">All Prescriptions</h2>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-600">
              {filteredPrescriptions.length} prescription
              {filteredPrescriptions.length !== 1 ? "s" : ""}
            </div>
            {/* Optional: Show loading spinner in table header during data fetch */}
            {isFetching && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr>
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
            <tbody className="text-body">
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
                      <span className="font-medium">
                        {getUserName(prescription)}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {getUserDateOfBirth(prescription)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span className="px-2 py-1 border rounded-full border-warning text-warning bg-warning bg-opacity-10">
                      {prescription.disease || "Not specified"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDateTime(prescription.created_at)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span className="font-medium">
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

        {/* Pagination - Updated to not show loading in pagination during filtering */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t border-gray-100">
          {/* Data Summary */}
          <div className="text-sm text-gray-600 order-2 sm:order-1">
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

          {/* Pagination Controls */}
          <div className="flex items-center gap-2 order-1 sm:order-2">
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              disabled={!hasPrevPage}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                hasPrevPage
                  ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                  : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <i className="material-icons text-sm">chevron_left</i>
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Numbers Container */}
            <div className="flex items-center gap-1 mx-2">
              {/* Page Numbers - Always show, no loading spinner here during filtering */}
              {totalPages > 0 && (
                <>
                  {/* First Page */}
                  {paginationMeta.currentPage > 3 && (
                    <>
                      <button
                        onClick={() => handlePageChange(1)}
                        className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      >
                        1
                      </button>
                      {paginationMeta.currentPage > 4 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                    </>
                  )}

                  {/* Current Page Range */}
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
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              pageNumber === paginationMeta.currentPage
                                ? "bg-primary text-white shadow-sm"
                                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      }
                      return null;
                    }
                  )}

                  {/* Last Page */}
                  {paginationMeta.currentPage < totalPages - 2 &&
                    totalPages > 5 && (
                      <>
                        {paginationMeta.currentPage < totalPages - 3 && (
                          <span className="px-2 text-gray-400">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                </>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={!hasNextPage}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                hasNextPage
                  ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                  : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <i className="material-icons text-sm">chevron_right</i>
            </button>
          </div>

          {/* Page Size Selector */}
          <div className="flex items-center gap-2 text-sm text-gray-600 order-3">
            <span>Show:</span>
            <select
              value={paginationMeta.limitPerPage}
              onChange={handlePageSizeChange}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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

      {/* Empty State - Updated condition */}
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No prescriptions found
          </h3>
          <p className="text-gray-500 mb-6">
            {filter.date || filter.search || filter.disease
              ? "Try adjusting your filters to see more results."
              : "You don't have any prescriptions yet."}
          </p>
          {(filter.date || filter.search || filter.disease) && (
            <Button color="primary" onClick={handleClearFilter} isOutline>
              Clear All Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PrescriptionListPage;
