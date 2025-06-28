import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  CircleAvatar,
  InputWithLabel,
  MoreVertical,
  MoreVerticalItem,
  NavLinkButton,
  Pagination,
  Table,
  Td,
  Th,
} from "../../../components";
import { getRoutePath } from "../../../utils/routeUtils";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@src/utils/useDebounce";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers, getUserById } from "@src/services/userService";
import { RoleId } from "@src/constant/enumRole";
import Moment from "react-moment";
import StatusText from "../components/StatusText";
import { useNavigate } from "react-router-dom";

const PatientListPage = () => {
  const navigate = useNavigate();
  const { paginationMeta } = useSelector((state) => state.fetch);
  const { user } = useSelector((state) => state.auth);
  const [doctorList, setDoctorList] = useState([]);
  const [patientDetails, setPatientDetails] = useState({});
  const [filter, setFilter] = useState({
    search: "",
    doctor: "",
  });
  const dispatch = useDispatch();
  const memoizedDoctorList = useMemo(() => doctorList, [doctorList]);
  const debounceSearchTerm = useDebounce(filter.search, 500);

  const {
    data: patients,
    isSuccess,
    isError,
    error,
    isPending,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [
      "patientList",
      filter.doctor,
      debounceSearchTerm,
      paginationMeta.currentPage,
      paginationMeta.limitPerPage,
    ],
    queryFn: async () => {
      const data = await getUsers({
        role: RoleId.PATIENT || 3,
        doctor: filter.doctor
          ? filter.doctor
          : "56e3ec55-bcc8-4223-97c7-27e323ea3f9c",
        search: debounceSearchTerm,
        limit: paginationMeta.limitPerPage,
        offset: (paginationMeta.currentPage - 1) * paginationMeta.limitPerPage,
      });

      if (data.success) {
        dispatch({
          type: "FETCH_SET_PAGINATION",
          payload: {
            totalData: data.data.count,
          },
        });
      }

      return data;
    },
    enabled: !!user.id,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (patients?.data?.results?.length > 0) {
        const detailPromises = patients.data.results.map(async (patient) => {
          if (patientDetails[patient.id]) {
            return { id: patient.id, data: patientDetails[patient.id] };
          }

          try {
            const detail = await getUserById(patient.id);
            return {
              id: patient.id,
              data: detail.success ? detail.data : null,
            };
          } catch (error) {
            console.error(
              `Error fetching details for patient ${patient.id}:`,
              error
            );
            return { id: patient.id, data: null };
          }
        });

        const details = await Promise.all(detailPromises);

        const newDetails = {};
        details.forEach(({ id, data }) => {
          if (data) {
            newDetails[id] = data;
          }
        });

        setPatientDetails((prev) => ({ ...prev, ...newDetails }));
      }
    };

    fetchPatientDetails();
  }, [patients?.data?.results]);

  const { data: dataDoctor, isSuccess: isSuccessDoctor } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getUsers({ role: RoleId.DOCTOR }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { mutate: searchDoctor } = useMutation({
    mutationFn: getUsers,
    onSuccess: (data) => {
      if (data.status && data.data.results) {
        setDoctorList(data.data.results);
      }
    },
  });

  useEffect(() => {
    if (isSuccessDoctor && dataDoctor.success) {
      setDoctorList(dataDoctor.data.results);
    } else {
      setDoctorList([]);
    }
  }, [dataDoctor, isSuccessDoctor]);

  const handleGetDoctorList = (search) => {
    searchDoctor({ search, role: RoleId.DOCTOR });
  };

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlePageChange = (page) => {
    dispatch({ type: "FETCH_SET_PAGINATION", payload: { currentPage: page } });
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(
      paginationMeta.totalData / paginationMeta.limitPerPage
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
    paginationMeta.totalData / paginationMeta.limitPerPage
  );
  const hasPrevPage = paginationMeta.currentPage > 1;
  const hasNextPage = paginationMeta.currentPage < totalPages;

  useEffect(() => {
    const handleFocus = () => {
      refetch();
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch]);

  useEffect(() => {
    refetch();
  }, []);

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
    setPatientDetails({});
  }, [
    paginationMeta.currentPage,
    paginationMeta.limitPerPage,
    filter.doctor,
    debounceSearchTerm,
  ]);

  return (
    <>
      <div className="mb-3 grid grid-cols-1 md:grid-cols-2 md:gap-4">
        <InputWithLabel
          label={"Search"}
          name={"search"}
          type={"text"}
          placeholder={"Search patient name, email, or phone..."}
          labelOnTop={true}
          wrapperClassName="mb-3"
          inputClassName="!pe-4 !ps-10 !py-2"
          prependInput={
            <span className="material-icons absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500">
              search
            </span>
          }
          appendInput={
            <Button
              color={"primary"}
              size="small"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 !px-5 mt-[2px] "
            >
              Search
            </Button>
          }
          value={filter.search}
          onChange={handleChangeFilter}
        />
        <InputWithLabel
          labelOnTop={true}
          label={"Doctor Name:"}
          id={"doctor"}
          type={"searchable-select"}
          onSearch={(search) => handleGetDoctorList(search)}
          options={doctorList}
          defaultValue={filter.doctor || ""}
          onChange={(option) =>
            setFilter((prev) => ({ ...prev, doctor: option?.id || "" }))
          }
          keyValue={"id"}
          keyLabel={(option) =>
            `${option.first_name || ""} ${option.last_name || ""}`.trim() ||
            option.email
          }
          wrapperClassName="p-4"
        />
      </div>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
          <h2 className="text-lg font-medium">All Patients</h2>
          <div className="text-sm text-gray-600">
            Total: {paginationMeta.totalData || 0} patients
          </div>
        </div>
        <Table
          countCoulumn={7}
          dataList={patients?.data?.results}
          isLoading={isPending}
          theadChildren={
            <>
              <tr>
                <Th>Patient Name</Th>
                <Th>Date of Birth</Th>
                <Th>Gender</Th>
                <Th>Disease</Th>
                <Th>Mobile Number</Th>
                <Th>Email</Th>
                <Th>Actions</Th>
              </tr>
            </>
          }
          rowCallback={(item, index) => {
            const patientDetail = patientDetails[item.id];
            const disease = patientDetail?.disease;
            const phoneNumber =
              patientDetail?.phone_number ||
              item?.phone_number ||
              item?.mobile_number;

            return (
              <>
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <Td>
                    <div className="flex items-center cursor-pointer">
                      <CircleAvatar
                        src={
                          item?.profile_picture ||
                          patientDetail?.flag ||
                          item?.flag ||
                          "./assets/images/default-avatar.png"
                        }
                        alt={`${item?.first_name} ${item?.last_name}`}
                        className="mr-3"
                      />
                      <div className="text-start">
                        <p className="font-medium text-gray-900">
                          {`${item?.first_name || ""} ${
                            item?.last_name || ""
                          }`.trim() || "No Name"}
                        </p>
                        {/* <span className="text-muted text-xs">
                          ID: {item?.id?.slice(0, 8)}...
                        </span> */}
                      </div>
                    </div>
                  </Td>
                  <Td>
                    {item.dob || patientDetail?.dob ? (
                      <div>
                        <Moment
                          date={item?.dob || patientDetail?.dob}
                          format="MMM D, YYYY"
                        />
                        <div className="text-xs text-gray-500">
                          Age:{" "}
                          {new Date().getFullYear() -
                            new Date(
                              item.dob || patientDetail?.dob
                            ).getFullYear()}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not provided</span>
                    )}
                  </Td>
                  <Td>
                    <span className="capitalize">
                      {item?.gender || patientDetail?.gender || (
                        <span className="text-gray-400">Not specified</span>
                      )}
                    </span>
                  </Td>
                  <Td>
                    {patientDetail ? (
                      <Badge color="info">
                        {disease || "No Disease Recorded"}
                      </Badge>
                    ) : (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                        <span className="text-gray-500 text-xs">
                          Loading...
                        </span>
                      </div>
                    )}
                  </Td>
                  <Td>
                    <div>
                      {phoneNumber ? (
                        <span className="font-mono text-sm">{phoneNumber}</span>
                      ) : patientDetail ? (
                        <span className="text-gray-400">Not provided</span>
                      ) : (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-400 mr-2"></div>
                          <span className="text-gray-500 text-xs">
                            Loading...
                          </span>
                        </div>
                      )}
                    </div>
                  </Td>
                  <Td>
                    <div className="max-w-[200px] truncate" title={item?.email}>
                      {item?.email || (
                        <span className="text-gray-400">No email</span>
                      )}
                    </div>
                  </Td>
                  <Td>
                    <div className="flex justify-between items-center gap-2">
                      <NavLinkButton
                        to={getRoutePath("doctor.patients.detail", {
                          patientId: item?.id,
                        })}
                        color="primary"
                        size="small"
                        className="px-3"
                      >
                        View Profile
                      </NavLinkButton>
                      <MoreVertical>
                        <MoreVerticalItem
                          onClick={(e) =>
                            e.preventDefault() ||
                            e.stopPropagation() ||
                            navigate(
                              getRoutePath("doctor.patients.edit", {
                                patientId: item?.id,
                              })
                            )
                          }
                        >
                          <i className="material-icons text-sm mr-2">edit</i>
                          Edit
                        </MoreVerticalItem>
                        <MoreVerticalItem
                          onClick={(e) =>
                            e.preventDefault() ||
                            e.stopPropagation() ||
                            navigate(
                              getRoutePath("doctor.patients.detail", {
                                patientId: item?.id,
                              })
                            )
                          }
                        >
                          <i className="material-icons text-sm mr-2">
                            visibility
                          </i>
                          View Details
                        </MoreVerticalItem>
                      </MoreVertical>
                    </div>
                  </Td>
                </tr>
              </>
            );
          }}
        />

        {/* Show message when no patients found */}
        {!isPending && patients?.data?.results?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">
              <i className="material-icons text-4xl">person_search</i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No patients found
            </h3>
            <p className="text-gray-500 text-sm">
              {filter.search || filter.doctor
                ? "Try adjusting your search criteria"
                : "No patients have been added yet"}
            </p>
          </div>
        )}

        {/* Pagination remains the same */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t border-gray-100">
          {/* Data Summary */}
          <div className="text-sm text-gray-600 order-2 sm:order-1">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {(paginationMeta.currentPage - 1) * paginationMeta.limitPerPage +
                1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(
                paginationMeta.currentPage * paginationMeta.limitPerPage,
                paginationMeta.totalData
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {paginationMeta.totalData}
            </span>{" "}
            patients
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={handlePrevPage}
              disabled={!hasPrevPage || isFetching}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                hasPrevPage && !isFetching
                  ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                  : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <i className="material-icons text-sm">chevron_left</i>
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-1 mx-2">
              {isFetching && (
                <div className="flex items-center px-3 py-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                </div>
              )}

              {!isFetching && (
                <>
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

            <button
              onClick={handleNextPage}
              disabled={!hasNextPage || isFetching}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                hasNextPage && !isFetching
                  ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm"
                  : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
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
    </>
  );
};

export default PatientListPage;
