import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getConsultations } from "@src/services/consultation.service";
import { useDispatch, useSelector } from "react-redux";

const THEME_STORAGE_KEY = "customColorTheme";
const getFontTheme = () => {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    return theme ? JSON.parse(theme) : {};
  } catch {
    return {};
  }
};
const getFontStyle = (fontTheme, type = "main") => {
  if (!fontTheme) return {};
  if (type === "subHeading") {
    return {
      fontFamily: fontTheme.subHeadingFontFamily || fontTheme.fontFamily,
      fontWeight: fontTheme.subHeadingFontWeight || fontTheme.fontWeight,
      fontSize: fontTheme.subHeadingFontSize || fontTheme.fontSize,
      color: fontTheme.headingColor || "#333333",
    };
  }
  if (type === "body1") {
    return {
      fontFamily: fontTheme.bodyText1FontFamily || fontTheme.fontFamily,
      fontWeight: fontTheme.bodyText1FontWeight || fontTheme.fontWeight,
      fontSize: fontTheme.bodyText1FontSize || fontTheme.fontSize,
      color:
        fontTheme.bodyTextColor === "#FFFFFF"
          ? "#333333"
          : fontTheme.bodyTextColor || "#333333",
    };
  }
  if (type === "body2") {
    return {
      fontFamily: fontTheme.bodyText2FontFamily || fontTheme.fontFamily,
      fontWeight: fontTheme.bodyText2FontWeight || fontTheme.fontWeight,
      fontSize: fontTheme.bodyText2FontSize || fontTheme.fontSize,
      color:
        fontTheme.bodyTextColor === "#FFFFFF"
          ? "#666666"
          : fontTheme.bodyTextColor || "#666666",
    };
  }
  return {
    fontFamily: fontTheme.fontFamily,
    fontWeight: fontTheme.fontWeight,
    fontSize: fontTheme.fontSize,
    color: fontTheme.headingColor || "#333333",
  };
};

const AIVisitNotesPage = () => {
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [customTheme, setCustomTheme] = useState(() => {
    try {
      const theme = localStorage.getItem("customColorTheme");
      return theme ? JSON.parse(theme) : {};
    } catch {
      return {};
    }
  });

  const [fontTheme, setFontTheme] = useState(getFontTheme());

  const dispatch = useDispatch();
  const { paginationMeta } = useSelector((state) => state.fetch);

  useEffect(() => {
    const reloadTheme = () => {
      try {
        const theme = localStorage.getItem("customColorTheme");
        setCustomTheme(theme ? JSON.parse(theme) : {});
      } catch {
        setCustomTheme({});
      }
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

  useEffect(() => {
    const reloadTheme = () => setFontTheme(getFontTheme());
    window.addEventListener("customColorThemeChanged", reloadTheme);
    window.addEventListener("storage", (e) => {
      if (e.key === THEME_STORAGE_KEY) reloadTheme();
    });
    return () => {
      window.removeEventListener("customColorThemeChanged", reloadTheme);
      window.removeEventListener("storage", reloadTheme);
    };
  }, []);

  useEffect(() => {
    if (!fontTheme) return;
    document.body.style.fontFamily = fontTheme.fontFamily || "inherit";
    document.body.style.fontWeight = fontTheme.fontWeight || 400;
    document.body.style.fontSize = fontTheme.fontSize || "16px";
    return () => {
      document.body.style.fontFamily = "";
      document.body.style.fontWeight = "";
      document.body.style.fontSize = "";
    };
  }, [fontTheme]);

  const getButtonStyle = (filled = true, color = "primary") => {
    const colorMap = {
      primary: customTheme.primaryColor || "#002952",
      danger: customTheme.secondaryColor || "#CF0000",
      success: "#22C55E",
      white: "#fff",
    };
    const mainColor = colorMap[color] || colorMap.primary;
    return {
      backgroundColor: filled ? mainColor : "#fff",
      color: filled ? "#fff" : mainColor,
      border: `1.5px solid ${mainColor}`,
      fontFamily: fontTheme.fontFamily || "inherit",
      fontWeight: fontTheme.fontWeight || 400,
      fontSize: fontTheme.fontSize || "16px",
      transition: "all 0.15s",
    };
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getConsultations(params);

      console.log("Fetched consultations:", response);

      if (response && response.results) {
        setConsultations(response.results);
      } else {
        setError("Failed to fetch consultations");
      }
    } catch (err) {
      setError("Error fetching consultations: " + err.message);
      console.error("Error fetching consultations:", err);
    } finally {
      setLoading(false);
    }
  };

  const doctors = useMemo(() => {
    const uniqueDoctors = consultations.reduce((acc, consultation) => {
      const doctor = consultation.appointment?.doctor;
      if (doctor && !acc.find((d) => d.id === doctor.id)) {
        acc.push({
          id: doctor.id,
          name:
            `${doctor.first_name} ${doctor.last_name}`.trim() || doctor.email,
        });
      }
      return acc;
    }, []);
    return uniqueDoctors;
  }, [consultations]);

  const filteredConsultations = useMemo(() => {
    return consultations.filter((consultation) => {
      const patient = consultation.appointment?.patient;
      const doctor = consultation.appointment?.doctor;
      const appointmentDate = consultation.appointment?.appointment_datetime;

      const searchMatch =
        !searchTerm ||
        `${patient?.first_name} ${patient?.last_name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        patient?.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const dateMatch =
        !selectedDate ||
        (appointmentDate && appointmentDate.startsWith(selectedDate));

      const doctorMatch = !selectedDoctor || doctor?.id === selectedDoctor;

      return searchMatch && dateMatch && doctorMatch;
    });
  }, [consultations, searchTerm, selectedDate, selectedDoctor]);

  const paginatedConsultations = useMemo(() => {
    const startIndex =
      (paginationMeta.currentPage - 1) * paginationMeta.limitPerPage;
    const endIndex = startIndex + paginationMeta.limitPerPage;
    return filteredConsultations.slice(startIndex, endIndex);
  }, [
    filteredConsultations,
    paginationMeta.currentPage,
    paginationMeta.limitPerPage,
  ]);

  useEffect(() => {
    dispatch({
      type: "FETCH_SET_PAGINATION",
      payload: {
        totalData: filteredConsultations.length,
      },
    });
  }, [filteredConsultations.length, dispatch]);

  const handleSearch = () => {
    const params = {};

    if (searchTerm) {
      params.search = searchTerm;
    }

    if (selectedDate) {
      params.date = selectedDate;
    }

    if (selectedDoctor) {
      params.doctor = selectedDoctor;
    }

    dispatch({ type: "FETCH_SET_PAGINATION", payload: { currentPage: 1 } });
    fetchConsultations(params);
  };

  const handlePageChange = (page) => {
    dispatch({ type: "FETCH_SET_PAGINATION", payload: { currentPage: page } });
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(
      filteredConsultations.length / paginationMeta.limitPerPage
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
    filteredConsultations.length / paginationMeta.limitPerPage
  );
  const hasPrevPage = paginationMeta.currentPage > 1;
  const hasNextPage = paginationMeta.currentPage < totalPages;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "completed":
        return "text-green-600";
      case "rejected":
      case "cancelled":
        return "text-red-600";
      case "in_progress":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusText = (consultation) => {
    if (consultation.is_finished) return "Completed";
    if (consultation.is_started) return "In Progress";
    return consultation.appointment?.appointment_status || "Pending";
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg" style={getFontStyle(fontTheme, "body1")}>
          Loading consultations...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <span style={getFontStyle(fontTheme, "body1")}>{error}</span>
        <button
          onClick={fetchConsultations}
          className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          style={getFontStyle(fontTheme, "body2")}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 grid grid-cols-1 md:grid-cols-3 md:gap-4">
        <div className="mb-3">
          <label htmlFor="search" style={getFontStyle(fontTheme, "body1")}>
            Search
          </label>
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search by Name or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full pe-4 ps-10 py-3 border-grey focus:outline-grey2"
              style={getFontStyle(fontTheme, "body2")}
            />
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              search
            </span>
            <button
              onClick={handleSearch}
              style={getButtonStyle(true, "primary")}
              className="absolute right-2 top-[6px] px-5 2xl:py-2 py-1 text-sm rounded-full text-white hover:bg-opacity-[0.9] transition-all duration-150"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label
            htmlFor="consultation-date"
            style={getFontStyle(fontTheme, "body1")}
          >
            Select Consultation Date
          </label>
          <div className="relative mt-2 text-muted">
            <input
              id="consultation-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2"
              style={getFontStyle(fontTheme, "body2")}
            />
          </div>
        </div>

        <div className="mb-3">
          <label
            htmlFor="doctor-select"
            style={getFontStyle(fontTheme, "body1")}
          >
            Select by Doctor Name
          </label>
          <div className="relative mt-2 text-muted">
            <select
              id="doctor-select"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none"
              style={getFontStyle(fontTheme, "body2")}
            >
              <option value="">All Doctors</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
            <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              arrow_drop_down
            </i>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
          <h2
            className="text-lg font-medium"
            style={getFontStyle(fontTheme, "subHeading")}
          >
            All Consultations
          </h2>
          <div className="text-end inline-block">
            <span
              className="text-muted"
              style={getFontStyle(fontTheme, "body2")}
            >
              Total {filteredConsultations.length} Results Found
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr style={getFontStyle(fontTheme, "body2")}>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Patient Name
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Patient ID
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Doctor
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Email
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Status
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Date & Time
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  AI Voice Notes
                </th>
              </tr>
            </thead>
            <tbody
              className="text-body"
              style={getFontStyle(fontTheme, "body1")}
            >
              {paginatedConsultations.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="py-8 px-4 text-center text-gray-500"
                    style={getFontStyle(fontTheme, "body1")}
                  >
                    No consultations found matching your criteria
                  </td>
                </tr>
              ) : (
                paginatedConsultations.map((consultation) => {
                  const patient = consultation.appointment?.patient;
                  const doctor = consultation.appointment?.doctor;

                  return (
                    <tr key={consultation.id}>
                      <td className="py-2 px-4 border-b">
                        <div className="flex items-center cursor-pointer">
                          <img
                            src={
                              patient?.profile_picture ||
                              "../../src/assets/images/profile.png"
                            }
                            alt="profile"
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div className="text-start">
                            <p style={getFontStyle(fontTheme, "body1")}>
                              {`${patient?.first_name || ""} ${
                                patient?.last_name || ""
                              }`.trim() || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        className="py-2 px-4 border-b"
                        style={getFontStyle(fontTheme, "body1")}
                      >
                        #{patient?.id?.slice(-8) || "N/A"}
                      </td>
                      <td
                        className="py-2 px-4 border-b"
                        style={getFontStyle(fontTheme, "body1")}
                      >
                        {`${doctor?.first_name || ""} ${
                          doctor?.last_name || ""
                        }`.trim() ||
                          doctor?.email ||
                          "N/A"}
                      </td>
                      <td
                        className="py-2 px-4 border-b"
                        style={getFontStyle(fontTheme, "body1")}
                      >
                        {patient?.email || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <span
                          className={getStatusColor(
                            getStatusText(consultation)
                          )}
                          style={getFontStyle(fontTheme, "body1")}
                        >
                          {getStatusText(consultation)}
                        </span>
                      </td>
                      <td
                        className="py-2 px-4 border-b"
                        style={getFontStyle(fontTheme, "body1")}
                      >
                        {formatDate(
                          consultation.appointment?.appointment_datetime
                        )}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <div className="flex justify-between">
                          <div className="my-auto">
                            <button
                              onClick={() =>
                                console.log("View & Edit:", consultation.id)
                              }
                              style={getButtonStyle(false, "primary")}
                              className="px-3 py-1 border rounded-full hover:bg-primary hover:text-white transition-all duration-150"
                            >
                              View & Edit
                            </button>
                          </div>
                          <div className="float-right relative">
                            <button
                              onClick={() => toggleDropdown(consultation.id)}
                              className="px-3 py-1"
                            >
                              <i className="material-icons">more_vert</i>
                            </button>
                            {dropdownOpen === consultation.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                                <button
                                  onClick={() => {
                                    console.log("Edit:", consultation.id);
                                    setDropdownOpen(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                  style={getFontStyle(fontTheme, "body2")}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    console.log("Delete:", consultation.id);
                                    setDropdownOpen(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                  style={getFontStyle(fontTheme, "body2")}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t border-gray-100">
          <div
            className="text-sm text-gray-600 order-2 sm:order-1"
            style={getFontStyle(fontTheme, "body2")}
          >
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredConsultations.length > 0
                ? (paginationMeta.currentPage - 1) *
                    paginationMeta.limitPerPage +
                  1
                : 0}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(
                paginationMeta.currentPage * paginationMeta.limitPerPage,
                filteredConsultations.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {filteredConsultations.length}
            </span>{" "}
            consultations
          </div>

          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={handlePrevPage}
              disabled={!hasPrevPage || loading}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                hasPrevPage && !loading
                  ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                  : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              style={getFontStyle(fontTheme, "body2")}
            >
              <i className="material-icons text-sm">chevron_left</i>
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-1 mx-2">
              {loading && (
                <div className="flex items-center px-3 py-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                </div>
              )}

              {!loading && totalPages > 0 && (
                <>
                  {paginationMeta.currentPage > 3 && (
                    <>
                      <button
                        onClick={() => handlePageChange(1)}
                        className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        1
                      </button>
                      {paginationMeta.currentPage > 4 && (
                        <span
                          className="px-2 text-gray-400"
                          style={getFontStyle(fontTheme, "body2")}
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

                  {paginationMeta.currentPage < totalPages - 2 &&
                    totalPages > 5 && (
                      <>
                        {paginationMeta.currentPage < totalPages - 3 && (
                          <span
                            className="px-2 text-gray-400"
                            style={getFontStyle(fontTheme, "body2")}
                          >
                            ...
                          </span>
                        )}
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                          style={getFontStyle(fontTheme, "body2")}
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
              disabled={!hasNextPage || loading}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                hasNextPage && !loading
                  ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                  : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              style={getFontStyle(fontTheme, "body2")}
            >
              <span className="hidden sm:inline">Next</span>
              <i className="material-icons text-sm">chevron_right</i>
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 order-3">
            <span>Show:</span>
            <select
              value={paginationMeta.limitPerPage}
              onChange={handlePageSizeChange}
              disabled={loading}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
    </>
  );
};

export default AIVisitNotesPage;
