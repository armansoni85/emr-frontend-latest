import { Badge, CircleAvatar, MoreVertical, MoreVerticalItem, NavLinkButton, Pagination, TabBarLayout, Table, Td, Th } from "@src/components";
import { useDispatch, useSelector } from "react-redux";

import Moment from "react-moment";
import { deleteAppointment, getAppointments } from "@src/services/appointmentService";
import { getRoutePath } from "@src/utils/routeUtils";
import { useQuery } from "@tanstack/react-query";
import { useShowDialog } from "@src/utils/dialog";
import { toast } from "react-toastify";

const UpComingPage = () => {
    const { paginationMeta } = useSelector((state) => state.fetch);
    const { user } = useSelector((state) => state.auth);
    const showDialog = useShowDialog();

    const dispatch = useDispatch();

    const { data, isSuccess, isError, isPending, isFetching, refetch } = useQuery({
        queryKey: [
            "appointments",
            "upcoming",
            user?.id || null,
            paginationMeta.currentPage,
            paginationMeta.limitPerPage,
            // { appointment_status: "PENDING" },
        ],
        queryFn: async () => {
            const response = await getAppointments({
                // appointment_status: "PENDING",
                limit: paginationMeta.limitPerPage,
                offset: paginationMeta.currentPage,
            });

            if (response.success) {
                dispatch({
                    type: "FETCH_SET_PAGINATION",
                    payload: {
                        totalData: response.data.count,
                    },
                });
            }

            return response;
        },
        enabled: !!user,
        refetchOnMount: "always",
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const handlePageChange = (page) => {
        dispatch({ type: "FETCH_SET_PAGINATION", payload: { currentPage: page } });
    };

    const handleDeleteAppointment = (appointmentId) => {
        showDialog({
            title: "Delete Appointment",
            message: "Are you sure you want to delete this appointment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            cancelButtonColor: "primary",
            confirmButtonColor: "danger",
            isConfirmOutline: true,
            confirmButtonClass: "!border-none",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAppointment(appointmentId)
                    .then((res) => {
                        if (res.success || res.status === 204) {
                            toast.success("Appointment deleted successfully");
                            refetch();
                        } else {
                            toast.error("Failed to delete appointment");
                        }
                    })
                    .catch(() => {
                        toast.error("Error deleting appointment");
                    });
            }
        });
        return;
    };

    return (
        <>
            <div className="flex justify-between  md:flex-row flex-col mb-2">
                <TabBarLayout>
                    <NavLinkButton
                        to={getRoutePath("patient.appointments.past")}
                        color="primary"
                        size="small"
                        className="md:px-8 md:py-3 px-6 py-2">
                        Past Appointments
                    </NavLinkButton>
                    <NavLinkButton
                        to={getRoutePath("patient.appointments.upcoming")}
                        color="primary"
                        size="small"
                        className="md:px-8 md:py-3 px-6 py-2">
                        Upcoming Appointments
                    </NavLinkButton>
                </TabBarLayout>
                <div>
                    <NavLinkButton
                        to={getRoutePath("patient.appointments.schedule")}
                        color="primary"
                        size="small"
                        className="md:px-8 md:py-3 px-6 py-2">
                        Schedule Appointment
                    </NavLinkButton>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                    <h2 className="text-lg font-medium">Upcoming Appointments</h2>
                </div>
                <Table
                    countCoulumn={6}
                    dataList={data?.data?.results || []}
                    isLoading={isPending}
                    theadChildren={
                        <>
                            <tr>
                                <Th>Doctor Name</Th>
                                <Th>Date &amp; Time</Th>
                                <Th>Diagnosis</Th>
                                <Th>Reason Of Visit</Th>
                                <Th>Requests</Th>
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
                                                src={item?.doctor?.profile_picture}
                                                alt="profile"
                                                className="mr-3"
                                            />
                                            <div className="text-start">
                                                <p>
                                                    {item?.doctor?.first_name} {item?.doctor?.last_name}{" "}
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
                                    <Td>
                                        <Badge color="info">{item?.diagnosis || item?.disease || "N/A"}</Badge>
                                    </Td>
                                    <Td>{item?.reason_of_visit || "N/A"}</Td>
                                    <Td>
                                        <div className="flex justify-between">
                                            <button
                                                className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                                                onclick="openModal('modalTemplate')">
                                                View Notes
                                            </button>
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

export default UpComingPage;
