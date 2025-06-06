import React, { useState, useEffect, useMemo } from "react";
import { getConsultations } from "@src/services/consultation.service";

const AIVisitNotesPage = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);

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

    fetchConsultations(params);
  };

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
        <div className="text-lg">Loading consultations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
        <button
          onClick={fetchConsultations}
          className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
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
          <label htmlFor="search">Search</label>
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search by Name or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full pe-4 ps-10 py-3 border-grey focus:outline-grey2"
            />
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              search
            </span>
            <button
              onClick={handleSearch}
              className="absolute right-2 top-[6px] px-5 2xl:py-2 py-1 text-sm rounded-full text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="consultation-date">Select Consultation Date</label>
          <div className="relative mt-2 text-muted">
            <input
              id="consultation-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2"
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="doctor-select">Select by Doctor Name</label>
          <div className="relative mt-2 text-muted">
            <select
              id="doctor-select"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none"
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
          <h2 className="text-lg font-medium">All Consultations</h2>
          <div className="text-end inline-block">
            <span className="text-muted">
              Total {filteredConsultations.length} Results Found
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr>
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
            <tbody className="text-body">
              {filteredConsultations.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="py-8 px-4 text-center text-gray-500"
                  >
                    No consultations found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredConsultations.map((consultation) => {
                  const patient = consultation.appointment?.patient;
                  const doctor = consultation.appointment?.doctor;

                  return (
                    <tr key={consultation.id}>
                      <td className="py-2 px-4 border-b">
                        <div className="flex items-center cursor-pointer">
                          <img
                            src={
                              patient?.profile_picture ||
                              "assets/images/profile.png"
                            }
                            alt="profile"
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div className="text-start">
                            <p>
                              {`${patient?.first_name || ""} ${
                                patient?.last_name || ""
                              }`.trim() || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b">
                        #{patient?.id?.slice(-8) || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {`${doctor?.first_name || ""} ${
                          doctor?.last_name || ""
                        }`.trim() ||
                          doctor?.email ||
                          "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {patient?.email || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <span
                          className={getStatusColor(
                            getStatusText(consultation)
                          )}
                        >
                          {getStatusText(consultation)}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b">
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
                              className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
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
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    console.log("Delete:", consultation.id);
                                    setDropdownOpen(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
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
      </div>
    </>
  );
};

export default AIVisitNotesPage;
