import { Button, ChevronLeft, InputWithLabel } from "@src/components";
import { closeModal, showModal } from "@src/redux/reducers/modalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { RoleId } from "@src/constant/enumRole";
import { createAppointment } from "@src/services/appointmentService";
import { getRoutePath } from "@src/utils/routeUtils";
import { getUsers } from "@src/services/userService";
import { handleFormChange } from "@src/utils/handleForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppointmentSchedulePage = ({ onSubmit, currentStep, showModalFirst }) => {
    const [form, setForm] = useState({
        // doctor: "d2a5de32-386e-4f14-af35-3f1f7517f475"
    }); // State to manage form data
    const [doctorList, setDoctorList] = useState([]); // Single state for doctor list
    const { user } = useSelector((state) => state.auth);
    console.log(user, "USER");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, isSuccess } = useQuery({
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
        if (isSuccess && data.success) {
            setDoctorList(data.data.results);
        } else {
            setDoctorList([]);
        }
    }, [data, isSuccess]);

    // Prefill doctor from user.created_by when available
    useEffect(() => {
        if (user?.created_by) {
            setForm((prev) => ({ ...prev, doctor: user.created_by.id }));
        }
    }, [user]);

    const memoizedDoctorList = useMemo(() => doctorList, [doctorList]);

    const handleGetDoctorList = (search) => {
        searchDoctor({ search, role: RoleId.DOCTOR });
    };

    const validateForm = () => {
        const date = form.visitDate;
        const time = form.visitTime;
        const doctorId = (user?.created_by && user.created_by.id) || form.doctor || null;
        const diagnosis = form.diagnosis || form.disease || ""; // backward compatibility

        if (!date) {
            toast.error("Appointment date is required");
            return false;
        }
        if (!time) {
            toast.error("Appointment time is required");
            return false;
        }
        if (!doctorId) {
            toast.error("Doctor is required");
            return false;
        }

        return {
            date,
            time,
            doctor: doctorId,
            diagnosis,
            reasonOfVisit: form.reasonOfVisit,
        };
    };

    const submitForm = (data) => {
        const combinedDateTime = `${data.date}T${data.time}:00Z`;
        createAppointment({
            doctor: data.doctor,
            appointment_datetime: combinedDateTime,
            diagnosis: data.diagnosis,
            reason_of_visit: data.reasonOfVisit,
        })
            .then((response) => {
                console.log(response.data);

                if (response.success) {
                    toast.success("Appointment created successfully!");
                    // onSubmit(data, true);
                    navigate(getRoutePath("patient.appointments.past"), { replace: true });
                } else {
                    toast.error(response.message || "Failed to create appointment");
                }
            })
            .catch((error) => {
                toast.error(error.message || "An error occurred while creating the appointment");
            });
    };

    const handleCloseModal = () => {
        dispatch(closeModal("modalRequestPersonalInfo"));
        const validatedForm = validateForm();
        if (!validatedForm) return;
        submitForm(validatedForm);
    };

    const handleOpenModal = () => {
        dispatch(
            showModal({
                id: "modalRequestPersonalInfo",
                title: "Hey!",
                size: "small",
                content: (
                    <div className="px-4 pb-4 sm:pb-4">
                        <h1 className="text-success font-semibold 2xl:text-3xl text-xl">{`${user?.first_name} ${user?.last_name}`}</h1>
                        <p className="text-muted leading-1 py-2 text-sm">
                            As You are Requesting to Schedule your First appointment, So We request to fill some of your Personal, Health and Medicals
                            Records.{" "}
                        </p>
                        <div className="flex justify-end pt-4">
                            <button
                                className="bg-white text-danger px-8 py-2 rounded-full text-sm font-light transition-all duration-150"
                                onClick={() => handleCloseModal()}>
                                Skip
                            </button>
                            <Button
                                color="primary"
                                className="px-8 py-2"
                                size="small"
                                onClick={() => handleCloseModal()}>
                                Next
                            </Button>
                        </div>
                    </div>
                ),
            })
        );
    };

    const handleSubmit = () => {
        if (showModalFirst) {
            return handleOpenModal();
        }
        const validatedForm = validateForm();
        if (!validatedForm) return;
        submitForm(validatedForm);
    };

    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                    <ChevronLeft />
                </div>
                <div className="flex justify-end mb-4 gap-2">
                    <Button
                        color="danger"
                        isOutline={true}
                        className="px-8 py-2"
                        size="small">
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        className="px-8 py-2"
                        size="small"
                        onClick={handleSubmit}>
                        {/* {isLoading && isSubmitted ? <SpinnerComponent /> : isDetailForm ? "Save & Next" : "Request to Schedule"} */}
                        Request to Schedule
                    </Button>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                    <h2 className="text-lg font-medium">Schedule New Appointment</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-4 space-y-4">
                        <InputWithLabel
                            label={"Appointment Date:"}
                            id={"visitDate"}
                            type={"date"}
                            value={form.visitDate || ""}
                            onChange={(e) => handleFormChange("visitDate", e, setForm)}
                        />
                        <InputWithLabel
                            label={"Diagnosis:"}
                            id={"diagnosis"}
                            type={"select"}
                            value={form.diagnosis || ""}
                            onChange={(e) => handleFormChange("diagnosis", e, setForm)}>
                            <option value="Acquired">Acquired</option>
                            <option value="Acute">Acute</option>
                            <option value="Chronic condition">Chronic condition</option>
                            <option value="Congenital disorder">Congenital disorder</option>
                            <option value="Genetic">Genetic</option>
                            <option value="Hereditary or inherited">Hereditary or inherited</option>
                            <option value="Iatrogenic">Iatrogenic</option>
                            <option value="Idiopathic">Idiopathic</option>
                        </InputWithLabel>
                        {user?.created_by && (
                            <InputWithLabel
                                label={"Doctor:"}
                                id={"doctorDisplay"}
                                type={"text"}
                                value={`${user.created_by.first_name || ""} ${user.created_by.last_name || ""} (${user.created_by.email || ""})`}
                                onChange={() => {}}
                                disabled
                            />
                        )}
                        {!user?.created_by && (
                            <InputWithLabel
                                label={"Doctor Name:"}
                                id={"doctor"}
                                type={"searchable-select"}
                                onSearch={(search) => handleGetDoctorList(search)}
                                options={memoizedDoctorList}
                                defaultValue={form.doctor || ""}
                                onChange={(option) => handleFormChange("doctor", option.id, setForm)}
                                keyValue={"id"}
                                keyLabel={(option) => option.first_name + " " + option.last_name}
                            />
                        )}
                    </div>
                    <div className="p-4 space-y-4">
                        <InputWithLabel
                            label={"Time:"}
                            id={"visitTime"}
                            type={"time"}
                            value={form.visitTime || ""}
                            onChange={(e) => handleFormChange("visitTime", e, setForm)}
                        />
                        <InputWithLabel
                            label={"Reason of Visit:"}
                            id={"reasonOfVisit"}
                            type={"textarea"}
                            value={form.reasonOfVisit || ""}
                            onChange={(e) => handleFormChange("reasonOfVisit", e, setForm)}
                        />
                    </div>
                </div>
            </div>
            {/* Modal Template */}
            <div
                id="modalTemplate"
                className="modal overflow-y-auto fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out opacity-100 hidden"
                onclick="closeModal(event)">
                <div
                    className="lg:my-20 md:my-20 my-10 lg:min-w-[400px] min-w-[8%] bg-white rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-300 ease-out sm:max-w-lg sm:w-full translate-y-[-100%]"
                    onclick="event.stopPropagation()">
                    <div className="bg-white">
                        <div className="bg-white flex justify-between items-center px-4 py-3 pb-0">
                            <h3
                                className="text-lg leading-6 font-medium text-gray-900"
                                id="modalTitle">
                                Hey!
                            </h3>
                            <button
                                onclick="closeModal(event)"
                                className="text-gray-500 hover:text-gray-700">
                                <i className="material-icons">close</i>
                            </button>
                        </div>
                        <div className="px-4 pb-4 sm:pb-4">
                            <h1 className="text-success font-semibold 2xl:text-3xl text-xl">Henry Johnson</h1>
                            <p className="text-muted leading-1 py-2 text-sm">
                                As You are Requesting to Schedule your First appointment, So We request to fill some of your Personal, Health and
                                Medicals Records.{" "}
                            </p>
                            <div className="flex justify-end pt-4">
                                <button className="bg-white text-danger px-8 py-2 rounded-full text-sm font-light transition-all duration-150">
                                    Skip
                                </button>
                                <button
                                    onclick="window.location.href = 'appointments_details.html'"
                                    className="bg-primary border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppointmentSchedulePage;
