import { Button, InputWithLabel, VoiceRecorder } from "@src/components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddAppointmentSchema } from "@src/schema/AddAppointmentSchema";
import { RoleId } from "@src/constant/enumRole";
import SpinnerComponent from "@src/components/SpinnerComponent";
import { createAppointment } from "@src/services/appointmentService";
import { getRoutePath } from "@src/utils/routeUtils";
import { getUsers } from "@src/services/userService";
import { handleFormChange } from "@src/utils/handleForm";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

const AppointmentAddPage = () => {

  const [patients, setPatients] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [isLoadingPatientDetail, setIsLoadingPatientDetail] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useTheme();

  const [form, setForm] = useState({
    patient: "",
    mobileNumber: "",
    email: "",
    dob: "",
    date: location.state?.date || "",
    time: "",
    diagnosis: "",
    reasonOfVisit: "",
  });

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async (search = "") => {
    try {
      setPatients([]);
      setPatientsLoading(true);
      const params = { role: 3 };
      if (search) {
        params.search = search;
      }
      const response = await getUsers(params);
      if (response?.data.results) {
        const patientsData = response.data.results;
        const patientsOnly = patientsData.filter(
          (user) => user.role === "3" || user.role === 3
        );
        setPatients(patientsOnly);

        // Get search param from location state if available
        if (location?.state?.search) {
          const filteredPatients = patientsData.filter(patient =>
            patient.first_name?.toLowerCase().includes(location.state.search.toLowerCase()) ||
            patient.last_name?.toLowerCase().includes(location.state.search.toLowerCase())
          );
          if (filteredPatients.length > 0) {
            handlePatientSelect(filteredPatients[0]);
          }
        }
        // setPatients(filteredPatients);
      }
    } catch (error) {
      console.log(error, "ERROR")
      toast.error("Failed to load patients");
    } finally {
      setPatientsLoading(false);
    }
  };

  // Handle patient search for searchable select
  const handleGetPatientList = async (search) => {
    await fetchPatients(search);
  };

  // Memoized patient list for the searchable select
  const memoizedPatientList = useMemo(() => {
    return patients.map((patient) => ({
      ...patient,
      // Ensure we have proper display names
      displayName:
        `${patient.first_name || ""} ${patient.last_name || ""}`.trim() ||
        patient.email,
    }));
  }, [patients]);
  // Handle patient selection from searchable select
  const handlePatientSelect = (selectedPatient) => {
    if (selectedPatient) {
      setIsLoadingPatientDetail(true);
      setForm((prev) => ({
        ...prev,
        patient: selectedPatient.id,
        mobileNumber: selectedPatient.phone_number || "",
        email: selectedPatient.email || "",
        dob: selectedPatient.dob || "",
      }));
      setIsLoadingPatientDetail(false);
    } else {
      setForm((prev) => ({
        ...prev,
        patient: "",
        mobileNumber: "",
        email: "",
        dob: "",
      }));
    }
  };

  // Get selected patient details
  const selectedPatient = useMemo(() => {
    const patient = patients.find((patient) => patient.id === form.patient);
    return patient;
  }, [patients, form.patient]);

  const handleOnSubmit = async () => {
    setIsSubmitting(true);
    if (!form.patient || !form.date || !form.time) {
      toast.error("Please fill in all required fields (Patient, Date, Time)");
      setIsSubmitting(false);
      return;
    }
    try {
      const appointmentData = {
        patient: form.patient,
        doctor: user.id,
        appointment_datetime: `${form.date}T${form.time}:00Z`,
        diagnosis: form.diagnosis || null,
        reason_of_visit: form.reasonOfVisit || "",
        status: "scheduled",
      };
      const response = await createAppointment(appointmentData);
      if (response) {
        setForm({
          patient: "",
          mobileNumber: "",
          email: "",
          dob: "",
          date: "",
          time: "",
          diagnosis: "",
          reasonOfVisit: "",
        });
        toast.success("Appointment scheduled successfully!");
        navigate(getRoutePath("doctor.appointments.list"), { replace: true });
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Failed to schedule appointment. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm({
      patient: "",
      mobileNumber: "",
      email: "",
      dob: "",
      date: "",
      time: "",
      diagnosis: "",
      reasonOfVisit: "",
    });
    navigate(getRoutePath("doctor.appointments.list"));
  };

  return (
    <>
      <div className="flex justify-end mb-4 gap-2">
        <VoiceRecorder />
        <Button
          color="danger"
          isOutline={true}
          className="px-8"
          onClick={() => isSubmitting && dispatch({ type: "SUBMISSION/RESET" })}
          style={getFontStyle(theme, "body2")}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          className="px-8"
          onClick={handleOnSubmit}
          style={getFontStyle(theme, "body2")}
        >
          {isSubmitting ? (
            <SpinnerComponent color="white" className="mr-2" />
          ) : (
            "Schedule"
          )}
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
          <h2
            className="text-lg font-medium"
            style={getFontStyle(theme, "subHeading")}
          >
            Schedule New Appointment
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <InputWithLabel
            label={"Patient's Name:"}
            id={"patientName"}
            type={"searchable-select"}
            onSearch={(search) => handleGetPatientList(search)}
            options={memoizedPatientList}
            defaultValue={form.patient || ""}
            onChange={handlePatientSelect}
            keyValue={"id"}
            keyLabel={(option) =>
              `${option.first_name || ""} ${option.last_name || ""}`.trim() ||
              option.email
            }
            wrapperClassName="p-4 z-20"
            disabled={isLoadingPatientDetail}
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
          />

          <InputWithLabel
            label={"Mobile Number:"}
            id={"mobileNumber"}
            type={"text"}
            value={form.mobileNumber || ""}
            onChange={(e) => handleFormChange("mobileNumber", e, setForm)}
            wrapperClassName="p-4"
            disabled={false}
            className=""
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
          />

          <InputWithLabel
            label={"Email ID:"}
            id={"email"}
            type={"email"}
            value={form.email || ""}
            onChange={(e) => handleFormChange("email", e, setForm)}
            placeholder="Enter email"
            wrapperClassName="p-4"
            disabled={false}
            className=""
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
          />

          <InputWithLabel
            label={"Date of Birth:"}
            id={"dob"}
            type={"date"}
            value={form.dob || ""}
            onChange={(e) => handleFormChange("dob", e, setForm)}
            wrapperClassName="p-4"
            placeholder="Enter date of birth"
            disabled={false}
            className=""
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
          />

          <InputWithLabel
            label={"Date:"}
            id={"date"}
            type={"date"}
            value={form.date || ""}
            onChange={(e) => handleFormChange("date", e, setForm)}
            wrapperClassName="p-4"
            required
            min={new Date().toISOString().split("T")[0]}
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
          />

          <InputWithLabel
            label={"Time:"}
            id={"time"}
            type={"time"}
            value={form.time || ""}
            onChange={(e) => handleFormChange("time", e, setForm)}
            wrapperClassName="p-4"
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
          />

          <InputWithLabel
            label={"Diagnosis:"}
            id={"diagnosis"}
            type={"select"}
            value={form.diagnosis || ""}
            onChange={(e) => handleFormChange("diagnosis", e, setForm)}
            wrapperClassName="p-4"
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
          >
            <option value="Acquired">Acquired</option>
            <option value="Acute">Acute</option>
            <option value="Chronic condition">Chronic condition</option>
            <option value="Congenital disorder">Congenital disorder</option>
            <option value="Genetic">Genetic</option>
            <option value="Hereditary or inherited">
              Hereditary or inherited
            </option>
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
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
          />
        </div>
      </div>

      {/* Loading indicator for patients */}
      {patientsLoading && (
        <div
          className="mt-4 p-4 bg-gray-100 rounded-lg text-center"
          style={getFontStyle(theme, "body2")}
        >
          <SpinnerComponent className="mr-2" />
          Loading patients...
        </div>
      )}
    </>
  );
};

export default AppointmentAddPage;
