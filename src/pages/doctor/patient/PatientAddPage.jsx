import { Button, InputWithLabel, VoiceRecorder } from "@src/components";
import SpinnerComponent from "@src/components/SpinnerComponent";
import { RoleId } from "@src/constant/enumRole";
import { registerAction } from "@src/redux/actions/auth/authAction";
import ROUTES from "@src/routes";
import { AddPatient } from "@src/schema/UserSchema";
import { getUsers } from "@src/services/userService";
import { handleFormChange } from "@src/utils/handleForm";
import { validateForm } from "@src/utils/validateForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PatientAddPage = () => {
    const [form, setForm] = useState({
        patient: import.meta.env.VITE_PATIENT_UUID,
        gender: "male",
    }); // State to manage form data
    const { isSubmitted } = useSelector((state) => state.submission);
    const [doctorList, setDoctorList] = useState([]); // Single state for doctor list
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

    const memoizedDoctorList = useMemo(() => doctorList, [doctorList]);

    const handleGetDoctorList = (search) => {
        searchDoctor({ search, role: RoleId.DOCTOR });
    };

    const handleOnSubmit = () => {
        dispatch({ type: "SUBMISSION/SUBMIT" });
        const data = validateForm(AddPatient, {
            patient: form.patient,
            patientName: form.patientName,
            first_name: form.patientName,
            email: form.email,
            mobileNumber: form.mobileNumber,
            dob: form.dob ? new Date(form.dob) : undefined,
            gender: form.gender,
            doctor: form.doctor,
            bloodGroup: form.bloodGroup,
            heightFeet: form.heightFeet ? Number(form.heightFeet) : undefined,
            heightInches: form.heightInches ? Number(form.heightInches) : undefined,
            weightFeet: form.weightFeet ? Number(form.weightFeet) : undefined,
            weightInches: form.weightInches ? Number(form.weightInches) : undefined,
            patientAddress: form.patientAddress,
            disease: form.disease,
            hospital: "93b2ebf5-72dd-4e10-8997-b6d48007b42f",
            password: form.password,
            confirmPassword: form.confirmPassword,
            role: 3,
            country: "IN",
        });

        // if (!data) {
        //     dispatch({ type: "SUBMISSION/CANCEL" });
        //     return;
        // }

        dispatch(registerAction({
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            fullName: data.patientName,
            role: 3,
            country: "IN",
            // dob: form.dob ? new Date(form.dob) : undefined,
        }))
            .unwrap()
            .then(() => {
                toast("Add Patient successful", { type: "success" });
                navigate(ROUTES.private.doctor.childRoutes.patients.childRoutes.list.path);
            })
            .catch((error) => {
                toast(error, { type: "error" });
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
                        "Save"
                    )}
                </Button>
            </div>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                    <h2 className="text-lg font-medium">Add New Patient</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <InputWithLabel
                        label={"Patient Name:"}
                        id={"patientName"}
                        type={"text"}
                        value={form.patientName || ""}
                        onChange={(e) => handleFormChange("patientName", e, setForm)}
                        wrapperClassName="p-4"
                    />
                    <InputWithLabel
                        label={"Mobile Number:"}
                        id={"mobileNumber"}
                        type={"text"}
                        value={form.mobileNumber || ""}
                        onChange={(e) => handleFormChange("mobileNumber", e, setForm)}
                        wrapperClassName="p-4"
                    />
                    <InputWithLabel
                        label={"Email ID:"}
                        id={"email"}
                        type={"email"}
                        value={form.email || ""}
                        onChange={(e) => handleFormChange("email", e, setForm)}
                        wrapperClassName="p-4"
                    />
                    <InputWithLabel
                        label={"Date of Birth:"}
                        id={"dob"}
                        type={"date"}
                        value={form.dob || ""}
                        onChange={(e) => handleFormChange("dob", e, setForm)}
                        wrapperClassName="p-4"
                    />
                    <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                        <label className="block text-nowrap my-auto">Gender:</label>
                        <div className="flex items-center w-full col-span-2">
                            <label
                                className={`mr-2 px-3 py-1 border border-transparent text-lg w-full text-center rounded-full text-muted cursor-pointer hover:bg-primary hover:text-white transition-all duration-150 ${form.gender == "male" ? "bg-primary text-white" : "bg-grey2"
                                    }`}
                                onClick={() => handleFormChange("gender", "male", setForm)}>
                                <input
                                    id="genderMale"
                                    type="radio"
                                    name="gender"
                                    defaultValue="male"
                                    className="hidden"
                                    onclick="document.querySelectorAll('input[name=gender]').forEach(el => el.parentElement.classList.remove('bg-primary', 'text-white')); this.parentElement.classList.toggle('bg-primary', this.checked); this.parentElement.classList.toggle('text-white', this.checked);"
                                />
                                Male
                            </label>
                            <label
                                className={`mr-2 px-3 py-1 border border-transparent text-lg w-full text-center rounded-full text-muted cursor-pointer hover:bg-primary hover:text-white transition-all duration-150 ${form.gender == "female" ? "bg-primary text-white" : "bg-grey2"
                                    }`}
                                onClick={() => handleFormChange("gender", "female", setForm)}>
                                <input
                                    id="genderFemale"
                                    type="radio"
                                    name="gender"
                                    defaultValue="female"
                                    className="hidden"
                                    onclick="document.querySelectorAll('input[name=gender]').forEach(el => el.parentElement.classList.remove('bg-primary', 'text-white')); this.parentElement.classList.toggle('bg-primary', this.checked); this.parentElement.classList.toggle('text-white', this.checked);"
                                />
                                Female
                            </label>
                            <label
                                className={`mr-2 px-3 py-1 border border-transparent text-lg w-full text-center rounded-full text-muted cursor-pointer hover:bg-primary hover:text-white transition-all duration-150 ${form.gender == "other" ? "bg-primary text-white" : "bg-grey2"
                                    }`}
                                onClick={() => handleFormChange("gender", "other", setForm)}>
                                <input
                                    id="genderOther"
                                    type="radio"
                                    name="gender"
                                    defaultValue="other"
                                    className="hidden"
                                    onclick="document.querySelectorAll('input[name=gender]').forEach(el => el.parentElement.classList.remove('bg-primary', 'text-white')); this.parentElement.classList.toggle('bg-primary', this.checked); this.parentElement.classList.toggle('text-white', this.checked);"
                                />
                                Other
                            </label>
                        </div>
                    </div>
                    <InputWithLabel
                        label={"Blood Group:"}
                        id={"bloodGroup"}
                        type={"select"}
                        value={form.bloodGroup || ""}
                        onChange={(e) => handleFormChange("bloodGroup", e, setForm)}
                        wrapperClassName="p-4">
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </InputWithLabel>
                    <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                        <label
                            htmlFor="heightFeet"
                            className="block text-nowrap my-auto">
                            Height:
                        </label>
                        <div className="flex items-center w-full col-span-2">
                            <div className="flex gap-2 mt-1">
                                <input
                                    id="heightFeet"
                                    type="number"
                                    min={0}
                                    max={8}
                                    value={form.heightFeet || ""}
                                    onChange={(e) => handleFormChange("heightFeet", e, setForm)}
                                    className="focus:outline-none w-full px-5 py-3 border rounded-full"
                                />
                                <span className="flex items-center pr-3 text-muted">Feet</span>
                            </div>
                            <div className="flex gap-2 mt-1 ml-2">
                                <input
                                    id="heightInches"
                                    type="number"
                                    min={0}
                                    max={11}
                                    value={form.heightInches || ""}
                                    onChange={(e) => handleFormChange("heightInches", e, setForm)}
                                    className="focus:outline-none w-full px-5 py-3 border rounded-full"
                                />
                                <span className="flex items-center pr-3 text-muted">Inches</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                        <label
                            htmlFor="weightFeet"
                            className="block text-nowrap my-auto">
                            Weight:
                        </label>
                        <div className="flex items-center w-full col-span-2">
                            <div className="flex gap-2 mt-1">
                                <input
                                    id="weightFeet"
                                    type="number"
                                    min={0}
                                    max={8}
                                    value={form.weightFeet || ""}
                                    onChange={(e) => handleFormChange("weightFeet", e, setForm)}
                                    className="focus:outline-none w-full px-5 py-3 border rounded-full"
                                />
                                <span className="flex items-center pr-3 text-muted">Kilo</span>
                            </div>
                            <div className="flex gap-2 mt-1 ml-2">
                                <input
                                    id="weightInches"
                                    type="number"
                                    min={0}
                                    max={11}
                                    value={form.weightInches || ""}
                                    onChange={(e) => handleFormChange("weightInches", e, setForm)}
                                    className="focus:outline-none w-full px-5 py-3 border rounded-full"
                                />
                                <span className="flex items-center pr-3 text-muted">Grams</span>
                            </div>
                        </div>
                    </div>
                    <InputWithLabel
                        label={"Disease:"}
                        id={"disease"}
                        type={"disease"}
                        value={form.disease || ""}
                        onChange={(e) => handleFormChange("disease", e, setForm)}
                        wrapperClassName="p-4"
                    />
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
                        wrapperClassName="p-4"
                    />
                    <InputWithLabel
                        label={"Address:"}
                        id={"patientAddress"}
                        type={"textarea"}
                        value={form.patientAddress || ""}
                        onChange={(e) => handleFormChange("patientAddress", e, setForm)}
                        wrapperClassName="p-4"
                    />
                    <div>
                        <InputWithLabel
                            label={"Password:"}
                            id={"password"}
                            type={"password"}
                            value={form.password || ""}
                            onChange={(e) => handleFormChange("password", e, setForm)}
                            wrapperClassName="p-4"
                        />
                        <InputWithLabel
                            label={"Confirm Password:"}
                            id={"confirmPassword"}
                            type={"password"}
                            value={form.confirmPassword || ""}
                            onChange={(e) => handleFormChange("confirmPassword", e, setForm)}
                            wrapperClassName="p-4"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientAddPage;
