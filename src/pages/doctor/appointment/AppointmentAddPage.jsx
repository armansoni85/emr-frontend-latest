import { Button, InputWithLabel, VoiceRecorder } from "@src/components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { AddAppointmentSchema } from "@src/schema/AddAppointmentSchema";
import { RoleId } from "@src/constant/enumRole";
import SpinnerComponent from "@src/components/SpinnerComponent";
import { createAppointment } from "@src/services/appointmentService";
import { getRoutePath } from "@src/utils/routeUtils";
import { getUsers } from "@src/services/userService";
import { handleFormChange } from "@src/utils/handleForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validateForm } from "@src/utils/validateForm";

const AppointmentAddPage = () => {
    const [form, setForm] = useState({});
    const { isSubmitted } = useSelector((state) => state.submission);
    const [patientList, setPatientList] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, isSuccess } = useQuery({
        queryKey: ["patients"],
        queryFn: () => getUsers({ role: RoleId.PATIENT }),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const { mutate: searchPatient } = useMutation({
        mutationFn: getUsers,
        onSuccess: (data) => {
            if (data.status && data.data.results) {
                setPatientList(data.data.results);
            }
        },
    });

    useEffect(() => {
        if (isSuccess && data.success) {
            setPatientList(data.data.results);
        } else {
            setPatientList([]);
        }
    }, [data, isSuccess]);

    const memoizedPatientList = useMemo(() => patientList, [patientList]);

    const handleGetPatientList = (search) => {
        searchPatient({ search, role: RoleId.PATIENT });
    };

    const handlePatientSelect = (patientId) => {
        const selectedPatient = patientList.find(p => p.id === patientId);
        if (selectedPatient) {
            setForm(prev => ({
                ...prev,
                patient: patientId,
                mobileNumber: selectedPatient.mobile_number || '',
                email: selectedPatient.email || '',
                dob: selectedPatient.date_of_birth || ''
            }));
        }
    };

    const handleOnSubmit = () => {
        dispatch({ type: "SUBMISSION/SUBMIT" });
        const data = {
            patient: form.patient,
            date: new Date(form.date),
            time: form.time,
            disease: form.disease,
            reasonOfVisit: form.reasonOfVisit,
        }

        if (!data) {
            dispatch({ type: "SUBMISSION/CANCEL" });
            return;
        }

        const combinedDateTime = `${data.date.toISOString().split("T")[0]} ${data.time}`;
        createAppointment({
            appointment_datetime: combinedDateTime,
            reason_of_visit: data.reasonOfVisit,
            patient: data.patient,
        })
            .then((response) => {
                if (response.success) {
                    dispatch({ type: "SUBMISSION/RESET" });
                    toast.success("Appointment created successfully!");
                    navigate(getRoutePath("doctor.appointments.list"), { replace: true });
                } else {
                    toast.error(response.message || "Failed to create appointment");
                }
            })
            .catch((error) => {
                const data = error.response?.data || {};

                let messages = [];
                if (data.code == "unprocessable_entity") {
                    for (const key in data.detail) {
                        if (data.detail[key].length > 0) {
                            messages.push(`${key}: ${data.detail[key][0]}`);
                        }
                    }

                    toast.error(
                        <>
                            <div>
                                <p>{data.message || "Please check the following errors:"}</p>

                                <ul>
                                    {messages.map((message, index) => (
                                        <li key={index}>{message}</li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    );
                    return;
                }
                toast.error(messages.join(", ") || data.message || "An error occurred while creating the appointment");

                dispatch({ type: "SUBMISSION/RESET" });
            });
    };

    return (
        <>
            <div className="flex justify-end mb-4 gap-2">
                <VoiceRecorder />
                <Button
                    color="danger"
                    isOutline={true}
                    className="px-8"
                    onClick={() => isSubmitted && dispatch({ type: "SUBMISSION/RESET" })}>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    className="px-8"
                    onClick={handleOnSubmit}>
                    {isSubmitted ? (
                        <SpinnerComponent
                            color="white"
                            className="mr-2"
                        />
                    ) : (
                        "Schedule"
                    )}
                </Button>
            </div>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                    <h2 className="text-lg font-medium">Schedule New Appointment</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <InputWithLabel
                        label={"Patient:"}
                        id={"patient"}
                        type={"searchable-select"}
                        onSearch={(search) => handleGetPatientList(search)}
                        options={memoizedPatientList}
                        defaultValue={form.patient || ""}
                        onChange={(option) => handlePatientSelect(option.id)}
                        keyValue={"id"}
                        keyLabel={(option) => option.first_name && option.last_name ?
                            `${option.first_name} ${option.last_name}` :
                            option.email}
                        wrapperClassName="p-4"
                    />
                    <InputWithLabel
                        label={"Mobile Number:"}
                        id={"mobileNumber"}
                        type={"text"}
                        value={form.mobileNumber || ""}
                        readOnly
                        wrapperClassName="p-4"
                    />
                    <InputWithLabel
                        label={"Email ID:"}
                        id={"email"}
                        type={"email"}
                        value={form.email || ""}
                        readOnly
                        wrapperClassName="p-4"
                    />
                    <InputWithLabel
                        label={"Date of Birth:"}
                        id={"dob"}
                        type={"date"}
                        value={form.dob || ""}
                        readOnly
                        wrapperClassName="p-4"
                    />
                    <InputWithLabel
                        label={"Date:"}
                        id={"date"}
                        type={"date"}
                        value={form.date || ""}
                        onChange={(e) => handleFormChange("date", e, setForm)}
                        wrapperClassName="p-4"
                    />
                    <InputWithLabel
                        label={"Time:"}
                        id={"time"}
                        type={"time"}
                        value={form.time || ""}
                        onChange={(e) => handleFormChange("time", e, setForm)}
                        wrapperClassName="p-4"
                    />

                    <InputWithLabel
                        label={"Disease:"}
                        id={"disease"}
                        type={"select"}
                        value={form.disease || ""}
                        onChange={(e) => handleFormChange("disease", e, setForm)}
                        wrapperClassName="p-4">
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
                        label={"Reason of Visit:"}
                        id={"reasonOfVisit"}
                        type={"textarea"}
                        value={form.reasonOfVisit || ""}
                        onChange={(e) => handleFormChange("reasonOfVisit", e, setForm)}
                        wrapperClassName="p-4"
                    />
                </div>
            </div>
        </>
    );
};

export default AppointmentAddPage;
