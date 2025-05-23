import { Badge, CircleAvatar, MoreVertical, MoreVerticalItem, NavLinkButton, Pagination, TabBarLayout, Table, Td, Th } from "@src/components";
import { useDispatch, useSelector } from "react-redux";

import Moment from "react-moment";
import { getAppointments } from "@src/services/appointmentService";
import { getRoutePath } from "@src/utils/routeUtils";
import { useQuery } from "@tanstack/react-query";

const PastPage = () => {
    const { paginationMeta } = useSelector((state) => state.fetch);
    const { user } = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();

    const { data, isSuccess, isError, isPending, isFetching, refetch } = useQuery({
        queryKey: ["appointments", paginationMeta.currentPage],
        queryFn: async () => {
            const response = await getAppointments({
                appointment_status: "DONE",
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
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const handlePageChange = (page) => {
        dispatch({ type: "FETCH_SET_PAGINATION", payload: { currentPage: page } });
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
                    <h2 className="text-lg font-medium">Past Appointments</h2>
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
                                <Th>Disease</Th>
                                <Th>Reason Of Visit</Th>
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
                                        <Badge color="info">{item?.disease}</Badge>
                                    </Td>
                                    <Td>{item?.reason_of_visit || "N/A"}</Td>
                                    <Td>
                                        <span className="text-success">Completed</span>
                                    </Td>
                                    <Td>
                                        <div className="flex justify-between">
                                            <button
                                                className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                                                onclick="openModal('modalTemplate')">
                                                View Notes
                                            </button>
                                            <MoreVertical>
                                                <MoreVerticalItem>Edit</MoreVerticalItem>
                                                <MoreVerticalItem>Delete</MoreVerticalItem>
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

export default PastPage;
