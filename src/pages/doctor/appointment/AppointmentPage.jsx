import {
  Badge,
  Button,
  CircleAvatar,
  InputWithLabel,
  MoreVertical,
  MoreVerticalItem,
  Pagination,
  Table,
  Td,
  Th,
} from "@src/components";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import StatusText from "../components/StatusText";
import {
  getAppointments,
  deleteAppointment,
} from "@src/services/appointmentService";
import { useDebounce } from "@src/utils/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useShowDialog } from "@src/utils/dialog";
import { useShowModalAppointment } from "../components/ModalAppointment";
import { useEffect, useState, useMemo } from "react";
import { createConsultation } from "@src/services/consultation.service";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getRoutePath } from "@src/utils/routeUtils";

const AppointmentPage = () => {
  const { paginationMeta } = useSelector((state) => state.fetch);
  const { user } = useSelector((state) => state.auth);
  const showModalAppointment = useShowModalAppointment();
  const showDialog = useShowDialog();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [filter, setFilter] = useState({
    search: "",
    disease: "",
    date: location.state?.selectedDate || "",
  });

  const debounceSearchTerm = useDebounce(filter.search, 500);

  const { data, isSuccess, isError, error, isPending, isFetching, refetch } =
    useQuery({
      queryKey: [
        "appointments",
        user.id,
        debounceSearchTerm,
        // filter.disease,
        paginationMeta.currentPage,
      ],
      queryFn: async () => {
        const params = {
          search: debounceSearchTerm,
          // disease: filter.disease,
          limit: 1000,
          offset: 0,
        };

        console.log("Fetching ALL appointments with params:", params);

        const data = await getAppointments(params);

        if (data.success) {
          console.log("Total appointments fetched:", data.data.results.length);
        }

        return data;
      },
      enabled: !!user.id,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });

  const filteredAppointments = useMemo(() => {
    if (!data?.data?.results) return [];

    let appointments = data.data.results;

    if (filter.date) {
      appointments = appointments.filter((appointment) => {
        if (!appointment.appointment_datetime) return false;

        const appointmentDate = new Date(appointment.appointment_datetime);
        const selectedDate = new Date(filter.date);

        return (
          appointmentDate.getFullYear() === selectedDate.getFullYear() &&
          appointmentDate.getMonth() === selectedDate.getMonth() &&
          appointmentDate.getDate() === selectedDate.getDate()
        );
      });

      console.log(
        `Filtered appointments for date ${filter.date}:`,
        appointments.length
      );
    }

    return appointments;
  }, [data?.data?.results, filter.date]);

  const paginatedAppointments = useMemo(() => {
    const startIndex =
      (paginationMeta.currentPage - 1) * paginationMeta.limitPerPage;
    const endIndex = startIndex + paginationMeta.limitPerPage;
    return filteredAppointments.slice(startIndex, endIndex);
  }, [
    filteredAppointments,
    paginationMeta.currentPage,
    paginationMeta.limitPerPage,
  ]);

  useEffect(() => {
    dispatch({
      type: "FETCH_SET_PAGINATION",
      payload: {
        totalData: filteredAppointments.length,
      },
    });
  }, [filteredAppointments.length, dispatch]);

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));

    dispatch({ type: "FETCH_SET_PAGINATION", payload: { currentPage: 1 } });
  };

  const handlePageChange = (page) => {
    dispatch({ type: "FETCH_SET_PAGINATION", payload: { currentPage: page } });
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(
      filteredAppointments.length / paginationMeta.limitPerPage
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

  const totalPages = Math.ceil(
    filteredAppointments.length / paginationMeta.limitPerPage
  );
  const hasPrevPage = paginationMeta.currentPage > 1;
  const hasNextPage = paginationMeta.currentPage < totalPages;

  const handleClearFilter = () => {
    setFilter({
      search: "",
      disease: "",
      date: "",
    });
    dispatch({ type: "FETCH_SET_PAGINATION", payload: { currentPage: 1 } });
  };

  const handleDeleteAppointment = (appointmentId) => {
    showDialog({
      title: "Delete Appointment",
      message: "Are you sure you want to delete this appointment?",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      cancelButtonColor: "primary",
      confirmButtonColor: "danger",
      isConfirmOutline: true,
      confirmButtonClass: "!border-none",
      isReverseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAppointment(appointmentId)
          .then((res) => {
            if (res.success || res.status === 204) {
              toast("Appointment deleted successfully", { type: "success" });
              refetch();
            } else {
              toast("Failed to delete appointment", { type: "error" });
            }
          })
          .catch((err) => {
            console.error("Error deleting appointment:", err);
            toast("Error deleting appointment", { type: "error" });
          });
      }
    });
  };

  const handleOpenModalAppointment = (item) => {
    showModalAppointment({
      title: "Appointment Details",
      user,
      appointment: item,
    });
  };

  const startConsultation = (item) => {
    const activeConsultationId = localStorage.getItem("consultationId");
    const consultationFinished = localStorage.getItem("consultationFinished");

    if (activeConsultationId && !consultationFinished) {
      toast(
        "You already have an active consultation, please complete it first",
        { type: "warning" }
      );
      return;
    }

    createConsultation({
      appointment: item.id,
    })
      .then((res) => {
        if (res.success) {
          localStorage.setItem("consultationId", res.data.id);
          navigate(getRoutePath("doctor.recordings"));
          toast("Consultation created successfully", { type: "success" });
        }
      })
      .catch((err) => {
        toast("Error creating consultation", { type: "error" });
      });
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

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="mb-3 grid grid-cols-1 md:grid-cols-2 md:gap-4">
        <InputWithLabel
          label={"Search"}
          name={"search"}
          type={"text"}
          placeholder={"Search patient name, or DOB"}
          labelOnTop={true}
          wrapperClassName="mb-3"
          inputClassName="!pe-4 !ps-10 !py-2"
          prependInput={
            <span className="material-icons absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500">
              search
            </span>
          }
          value={filter.search}
          onChange={handleChangeFilter}
        />
        {/* <InputWithLabel
          labelOnTop={true}
          label={"Disease"}
          name={"disease"}
          type={"text"}
          placeholder={"Filter by disease..."}
          value={filter.disease}
          onChange={handleChangeFilter}
        /> */}
        <InputWithLabel
          labelOnTop={true}
          label={"Date"}
          name={"date"}
          type={"date"}
          wrapperClassName="mb-3"
          inputClassName="!pe-4 !ps-10 !py-2"
          value={filter.date}
          onChange={handleChangeFilter}
        />
      </div>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
          <h2 className="text-lg font-medium">All Appointments</h2>
          <div className="text-end inline-block">
            <button className="text-primary rounded-full text-lg flex">
              Summary <i className="material-icons pt-1">expand_more</i>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            countCoulumn={7}
            dataList={paginatedAppointments}
            isLoading={isPending}
            theadChildren={
              <>
                <tr>
                  <Th>Patient Name</Th>
                  <Th>Date of Birth</Th>
                  <Th>Mobile Number</Th>
                  <Th>Disease</Th>
                  <Th>Date & Time</Th>
                  <Th>Status</Th>
                  <Th>Full Details</Th>
                </tr>
              </>
            }
            rowCallback={(item, index) => {
              return (
                <>
                  <tr>
                    <Td>
                      <div className="flex items-center cursor-pointer">
                        <CircleAvatar
                          src={
                            item?.patient?.flag ||
                            "./assets/images/default-avatar.png"
                          }
                          alt="profile"
                          className="mr-3"
                        />
                        <div className="text-start">
                          <p>
                            {!item?.patient?.first_name &&
                              !item?.patient?.last_name ? (
                              <span className="text-gray-400">
                                Not provided
                              </span>
                            ) : (
                              `${item?.patient?.first_name || ""} ${item?.patient?.last_name || ""
                                }`.trim()
                            )}
                          </p>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      {item?.patient?.dob ? (
                        <Moment
                          date={item?.patient?.dob}
                          format="MMMM D, YYYY"
                        />
                      ) : (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </Td>
                    <Td>
                      {item?.patient?.phone_number ? (
                        <span className="font-mono text-sm">
                          {item?.patient?.phone_number}
                        </span>
                      ) : (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </Td>
                    <Td>
                      <Badge color="info">
                        {item?.disease || "Not provided"}
                      </Badge>
                    </Td>
                    <Td>
                      {item.appointment_datetime ? (
                        <Moment
                          date={item?.appointment_datetime}
                          format="MMMM D, YYYY - h:mmA"
                        />
                      ) : (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </Td>
                    <Td>
                      {item.appointment_status ? (
                        <StatusText status={item.appointment_status} />
                      ) : (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </Td>
                    <Td>
                      <div className="flex justify-between">
                        <Button
                          color="warning"
                          size="small"
                          className="px-3"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            startConsultation(item);
                          }}
                          disabled={
                            !item?.appointment_datetime || !item?.patient
                          }
                        >
                          Start
                        </Button>
                        <div className="relative">
                          <MoreVertical>
                            <MoreVerticalItem
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                navigate(
                                  getRoutePath("doctor.appointments.edit", {
                                    id: item.id,
                                  })
                                );
                              }}
                            >
                              <i className="material-icons text-sm mr-2">
                                edit
                              </i>
                              Edit
                            </MoreVerticalItem>
                            <MoreVerticalItem
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDeleteAppointment(item.id);
                              }}
                            >
                              <i className="material-icons text-sm mr-2">
                                delete
                              </i>
                              Delete
                            </MoreVerticalItem>
                            <MoreVerticalItem
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleOpenModalAppointment(item);
                              }}
                            >
                              <i className="material-icons text-sm mr-2">
                                visibility
                              </i>
                              View Details
                            </MoreVerticalItem>
                          </MoreVertical>
                        </div>
                      </div>
                    </Td>
                  </tr>
                </>
              );
            }}
          />
        </div>

        {/* Pagination - Same Style as PatientListPage */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t border-gray-100">
          {/* Data Summary */}
          <div className="text-sm text-gray-600 order-2 sm:order-1">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredAppointments.length > 0
                ? (paginationMeta.currentPage - 1) *
                paginationMeta.limitPerPage +
                1
                : 0}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(
                paginationMeta.currentPage * paginationMeta.limitPerPage,
                filteredAppointments.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {filteredAppointments.length}
            </span>{" "}
            appointments
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2 order-1 sm:order-2">
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              disabled={!hasPrevPage || isFetching}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${hasPrevPage && !isFetching
                ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              <i className="material-icons text-sm">chevron_left</i>
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Numbers Container */}
            <div className="flex items-center gap-1 mx-2">
              {/* Loading Indicator */}
              {isFetching && (
                <div className="flex items-center px-3 py-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                </div>
              )}

              {/* Page Numbers - Hide when loading */}
              {!isFetching && totalPages > 0 && (
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
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pageNumber === paginationMeta.currentPage
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
              disabled={!hasNextPage || isFetching}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${hasNextPage && !isFetching
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
              disabled={isFetching}
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
      {/* Empty State */}
      {!isPending && filteredAppointments.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M8 7H3a1 1 0 00-1 1v10a1 1 0 001 1h18a1 1 0 001-1V8a1 1 0 00-1-1h-5M8 7h8m-8 0V5m8 2V5"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-500 mb-6">
            {filter.date || filter.search
              ? "Try adjusting your filters to see more results."
              : "You don't have any appointments yet."}
          </p>
          {(filter.date || filter.search) && (
            <Button color="primary" onClick={handleClearFilter} isOutline>
              Clear All Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
