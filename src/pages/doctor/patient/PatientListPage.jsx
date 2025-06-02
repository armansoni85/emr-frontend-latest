import { useEffect, useMemo, useState } from "react";
import { Badge, Button, CircleAvatar, InputWithLabel, MoreVertical, MoreVerticalItem, NavLinkButton, Pagination, Table, Td, Th } from "../../../components";
import { getRoutePath } from "../../../utils/routeUtils";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@src/utils/useDebounce";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers } from "@src/services/userService";
import { RoleId } from "@src/constant/enumRole";
import Moment from "react-moment";
import StatusText from "../components/StatusText";

const PatientListPage = () => {
    const { paginationMeta } = useSelector((state) => state.fetch);
    const { user } = useSelector((state) => state.auth);
    const [doctorList, setDoctorList] = useState([]); // Single state for doctor list
    const [filter, setFilter] = useState({
        search: "",
        doctor: "",
    });
    const dispatch = useDispatch();
    const memoizedDoctorList = useMemo(() => doctorList, [doctorList]);
    const debounceSearchTerm = useDebounce(filter.search, 500);

    const { data: patients, isSuccess, isError, error, isPending, isFetching, refetch } = useQuery({
        queryKey: ["patientList", filter.doctor, debounceSearchTerm, paginationMeta.currentPage],
        queryFn: async () => {
            const data = await getUsers({
                doctor: filter.doctor ? filter.doctor : "56e3ec55-bcc8-4223-97c7-27e323ea3f9c",
                search: debounceSearchTerm,
                // role: RoleId.PATIENT,
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

    const { data: dataDoctor, isSuccess: isSuccessDoctor } = useQuery({
        queryKey: ["doctors"],
        queryFn: () => getUsers({ role: RoleId.DOCTOR }),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    // Define a mutation to search doctors
    const { mutate: searchDoctor } = useMutation({
        mutationFn: getUsers,
        onSuccess: (data) => {
            if (data.status && data.data.results) {
                setDoctorList(data.data.results); // Update doctor list with search results
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

    useEffect(() => {
        refetch();
    }, [refetch]);
    return (
        <>
            <div className="mb-3 grid grid-cols-1 md:grid-cols-2 md:gap-4">
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
                            color={"primary"}
                            size="small"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 !px-5 mt-[2px] ">
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
                    onChange={(option) => setFilter((prev) => ({ ...prev, doctor: option?.id || "" }))}
                    keyValue={"id"}
                    keyLabel={(option) => option.first_name + " " + option.last_name}
                    wrapperClassName="p-4"
                />
            </div>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                    <h2 className="text-lg font-medium">All Patients</h2>
                </div>
                <Table
                    countCoulumn={7}
                    dataList={patients?.data?.results}
                    isLoading={isPending}
                    theadChildren={
                        <>
                            <tr>
                                <Th>Patient Name</Th>
                                <Th>Date of Birh</Th>
                                <Th>Gender</Th>
                                <Th>Disease</Th>
                                <Th>Mobile Number</Th>
                                <Th colSpan="2">Email</Th>
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
                                                src={item?.profile_picture}
                                                alt="profile"
                                                className="mr-3"
                                            />
                                            <div className="text-start">
                                                <p>
                                                    {item?.first_name} {item?.last_name}{" "}
                                                </p>
                                                {/* <span className="text-muted">#12345678</span> */}
                                            </div>
                                        </div>
                                    </Td>
                                    <Td>
                                        {item.dob ? (
                                            <Moment
                                                date={item?.dob}
                                                format="MMMM D, YYYY - h:mmA"
                                            />
                                        ) : (
                                            "-"
                                        )}
                                    </Td>
                                    <Td>{item?.gender ?? '-'}</Td>
                                    <Td>
                                        <Badge color="info">{item?.disease ?? 'Empty'}</Badge>
                                    </Td>
                                    <Td>089782</Td>
                                    <Td>
                                        <div className="flex justify-between">
                                            <NavLinkButton
                                                to={getRoutePath("doctor.patients.detail", { patientId: item?.id })}
                                                color="primary"
                                                size="small"
                                                className="px-3">
                                                View Profile
                                            </NavLinkButton>
                                            <MoreVertical>
                                                <MoreVerticalItem>Edit</MoreVerticalItem>
                                                {/* <MoreVerticalItem onClick={() => handleDeleteData(item.id)}>Delete</MoreVerticalItem> */}
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

export default PatientListPage;
