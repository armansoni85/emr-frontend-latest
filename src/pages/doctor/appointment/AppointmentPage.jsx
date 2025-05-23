import { Badge, Button, CircleAvatar, InputWithLabel, MoreVertical, MoreVerticalItem, Pagination, Table, Td, Th } from "@src/components";
import { useDispatch, useSelector } from "react-redux";

import Moment from "react-moment";
import StatusText from "../components/StatusText";
import { getAppointments } from "@src/services/appointmentService";
import { useDebounce } from "@src/utils/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useShowDialog } from "@src/utils/dialog";
import { useShowModalAppointment } from "../components/ModalAppointment";
import { useEffect, useState } from "react";
import { createConsultation } from "@src/services/consultation.service";
import { useNavigate } from "react-router-dom";

const AppointmentPage = () => {
    const { paginationMeta } = useSelector((state) => state.fetch);
    const { user } = useSelector((state) => state.auth);
    const showModalAppointment = useShowModalAppointment();
    const showDialog = useShowDialog();
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        search: "",
        disease: "",
        date: "",
    });
    const debounceSearchTerm = useDebounce(filter.search, 500);

    const { data, isSuccess, isError, error, isPending, isFetching, refetch } = useQuery({
        queryKey: ["appointments", user.id, debounceSearchTerm, filter.disease, filter.date, paginationMeta.currentPage],
        queryFn: async () => {
            const data = await getAppointments({
                doctor: user.id,
                search: debounceSearchTerm,
                disease: filter.disease,
                appointment_date: filter.date,
                limit: paginationMeta.limitPerPage,
                offset: paginationMeta.currentPage,
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
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

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

    const handleDeleteAppointment = (appointmentId) => {
        console.log("Deleting appointment with ID:", appointmentId);

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
            console.log(result);
        });
        return;
    };

    const handleOpenModalAppointment = (item) => {
        showModalAppointment({ title: "Appointment Details", user, appointment: item });
    };

    const navigate = useNavigate();
    const startConsultation = (item) => {
        createConsultation({
            appointment: item.id,
        }).then((res) => {
            navigate("/doctor/recordings");
            // if (res.data.success) {
            //     navigate("/recordings");
            // }
        }).catch((err) => {
            navigate("/doctor/recordings");
        });
    };

    useEffect(() => {
        refetch();
    }, []);

    return (
        <>
            <div className="mb-3 grid grid-cols-1 md:grid-cols-3 md:gap-4">
                <InputWithLabel
                    label={"Search"}
                    name={"search"}
                    type={"text"}
                    placeholder={"Search . . ."}
                    labelOnTop={true}
                    wrapperClassName="mb-3"
                    inputClassName="!pe-4 !ps-10 !py-2"
                    prependInput={<span className="material-icons absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500">search</span>}
                    appendInput={
                        <Button
                            color="primary"
                            size="small"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 !px-5 mt-[2px] ">
                            Search
                        </Button>
                    }
                    value={filter.search}
                    onChange={handleChangeFilter}
                />
                <InputWithLabel
                    label={"Search by Disease"}
                    type={"select"}
                    name={"disease"}
                    labelOnTop={true}
                    wrapperClassName="mb-3"
                    inputClassName="bg-white"
                    value={filter.disease}
                    onChange={handleChangeFilter}>
                    <option value="Acquired">Acquired</option>
                    <option value="Acute">Acute</option>
                    <option value="Chronic condition">Chronic condition</option>
                    <option value="Congenital disorder">Congenital disorder</option>
                    <option value="Genetic">Genetic</option>
                    <option value="Hereditary or inherited">Hereditary or inherited</option>
                    <option value="Iatrogenic">Iatrogenic</option>
                    <option value="Idiopathic">Idiopathic</option>
                </InputWithLabel>
                <InputWithLabel
                    label={"Select Date"}
                    type={"date"}
                    name={"date"}
                    labelOnTop={true}
                    wrapperClassName="mb-3"
                    value={filter.date}
                    onChange={handleChangeFilter}
                />
            </div>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                    <h2 className="text-lg font-medium">All Appointments</h2>
                    <div className="text-end inline-block">
                        <button className="text-primary  rounded-full text-lg flex">
                            Summary <i className="material-icons pt-1">expand_more</i>
                        </button>
                    </div>
                </div>
                <Table
                    countCoulumn={7}
                    dataList={data?.data?.results || []}
                    isLoading={isPending}
                    theadChildren={
                        <>
                            <tr>
                                <Th>Patient Name</Th>
                                <Th>Date of Birh</Th>
                                <Th>Mobile Number</Th>
                                <Th>Disease</Th>
                                <Th>Date &amp; Time</Th>
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
                                                src={item?.patient?.profile_picture}
                                                alt="profile"
                                                className="mr-3"
                                            />
                                            <div className="text-start">
                                                <p>
                                                    {item?.patient?.first_name} {item?.patient?.last_name}{" "}
                                                </p>
                                                <span className="text-muted">#12345678</span>
                                            </div>
                                        </div>
                                    </Td>
                                    <Td>
                                        {item.appointment_datetime ? (
                                            <Moment
                                                date={item?.appointment_datetime}
                                                format="MMMM D, YYYY - h:mmA"
                                            />
                                        ) : (
                                            "-"
                                        )}
                                    </Td>
                                    <Td>089782</Td>
                                    <Td>
                                        <Badge color="info">{item?.disease ?? 'Empty'}</Badge>
                                    </Td>
                                    <Td>
                                        {item.appointment_datetime ? (
                                            <Moment
                                                date={item?.appointment_datetime}
                                                format="MMMM D, YYYY - h:mmA"
                                            />
                                        ) : (
                                            "-"
                                        )}
                                    </Td>
                                    <Td>
                                        <StatusText status={item.appointment_status} />
                                    </Td>
                                    <Td>
                                        <div className="flex justify-between">
                                            {/* <Button
                                                color="primary"
                                                size="small"
                                                isOutline={true}
                                                className="px-3"
                                                onClick={() => handleOpenModalAppointment(item)}>
                                                View
                                            </Button> */}
                                            <Button
                                                color="warning"
                                                size="small"
                                                className="px-3"
                                                onClick={() => startConsultation(item)}>
                                                Start
                                            </Button>
                                            <MoreVertical>
                                                <MoreVerticalItem>Edit</MoreVerticalItem>
                                                <MoreVerticalItem onClick={() => handleDeleteAppointment(item.id)}>Delete</MoreVerticalItem>
                                            </MoreVertical>
                                        </div>
                                    </Td>
                                </tr>
                            </>
                        );
                    }}
                />
                <Pagination
                    limitPerPage={paginationMeta.limitPerPage}
                    countData={paginationMeta.totalData}
                    onChangePage={handlePageChange}
                />
            </div>
        </>
    );
};

export default AppointmentPage;
