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
import { useNavigate } from "react-router-dom";
import { createAppointment } from "@src/services/appointmentService";
import { getUsers } from "@src/services/userService";

const AppointmentAddPage = () => {
  const [form, setForm] = useState({
    patient: "",
    mobileNumber: "",
    email: "",
    dob: "",
    date: "",
    time: "",
    disease: "",
    reasonOfVisit: "",
  });

  const [patients, setPatients] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [isLoadingPatientDetail, setIsLoadingPatientDetail] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async (search = "") => {
    try {
      setPatientsLoading(true);

      // Add search parameter if provided
      const params = { role: 3 };
      if (search) {
        params.search = search;
      }

      const response = await getUsers(params);

      if (response && response.data && response.data.results) {
        const patientsData = response.data.results;

        const patientsOnly = patientsData.filter(
          (user) => user.role === "3" || user.role === 3
        );

        setPatients(patientsOnly);
      } else if (response && response.results) {
        const patientsOnly = response.results.filter(
          (user) => user.role === "3" || user.role === 3
        );
        setPatients(patientsOnly);
      } else if (response && Array.isArray(response)) {
        const patientsOnly = response.filter(
          (user) => user.role === "3" || user.role === 3
        );
        setPatients(patientsOnly);
      } else {
        console.warn("Unexpected response structure:", response);
        setPatients([]);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast.error("Failed to load patients");
      setPatients([]);
    } finally {
      setPatientsLoading(false);
    }
  };

  // Handle patient search for searchable select
  const handleGetPatientList = async (search) => {
    console.log("Searching patients with:", search);
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
    console.log("Patient selected from searchable select:", selectedPatient);

    if (selectedPatient) {
      setIsLoadingPatientDetail(true);

      // Update form with selected patient
      setForm((prev) => ({
        ...prev,
        patient: selectedPatient.id,
        // Auto-fill editable fields
        mobileNumber: selectedPatient.phone_number || "",
        email: selectedPatient.email || "",
        dob: selectedPatient.dob || "",
      }));

      setIsLoadingPatientDetail(false);
    } else {
      // Clear form if no patient selected
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
        disease: form.disease || null,
        reason_of_visit: form.reasonOfVisit || "",
        status: "scheduled",
      };

      console.log(
        "Submitting appointment data (without mobile/email/dob):",
        appointmentData
      );
      console.log("Form data (local only - mobile/email/dob):", {
        mobileNumber: form.mobileNumber,
        email: form.email,
        dob: form.dob,
      });

      const response = await createAppointment(appointmentData);

      if (response) {
        setForm({
          patient: "",
          mobileNumber: "",
          email: "",
          dob: "",
          date: "",
          time: "",
          disease: "",
          reasonOfVisit: "",
        });

        toast.success("Appointment scheduled successfully!");
        console.log("Appointment created:", response);

        navigate(getRoutePath("doctor.appointments.list"), { replace: true });
      }
    } catch (error) {
      console.error("Error creating appointment:", error);

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
      disease: "",
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
        >
          Cancel
        </Button>
        <Button color="primary" className="px-8" onClick={handleOnSubmit}>
          {isSubmitting ? (
            <SpinnerComponent color="white" className="mr-2" />
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
          {/* Searchable Patient Selection */}
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
          />

          <InputWithLabel
            label={"Date of Birth:"}
            id={"dob"}
            type={"date"}
            value={form.dob || ""}
            wrapperClassName="p-4"
            placeholder="Enter date of birth"
            disabled={false}
            className=""
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
            wrapperClassName="p-4"
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
          />
        </div>

        {/* Selected Patient Info Display */}
        {selectedPatient && (
          <div className="mx-4 mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">
              Selected Patient Information:
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span>
                <span className="ml-2">
                  {`${selectedPatient.first_name || ""} ${
                    selectedPatient.last_name || ""
                  }`.trim() || "N/A"}
                </span>
              </div>
              <div>
                <span className="font-medium">Patient ID:</span>
                <span className="ml-2 text-xs text-gray-500">
                  {selectedPatient.id}
                </span>
              </div>
              <div>
                <span className="font-medium">Registration Date:</span>
                <span className="ml-2">
                  {selectedPatient.date_joined
                    ? new Date(selectedPatient.date_joined).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div>
                <span className="font-medium">Status:</span>
                <span className="ml-2 text-green-600 font-medium">
                  {selectedPatient.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Loading Patient Detail */}
        {isLoadingPatientDetail && (
          <div className="mx-4 mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <SpinnerComponent className="mr-2" />
              <span className="text-yellow-700">
                Loading patient details...
              </span>
            </div>
          </div>
        )}

        {/* No Patients Found Message */}
        {!patientsLoading && patients.length === 0 && (
          <div className="mx-4 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">
              No Patients Found
            </h3>
            <p className="text-red-600 text-sm">
              No patients were found. Please check if patients exist in the
              system or try adjusting your search.
            </p>
          </div>
        )}
      </div>

      {/* Loading indicator for patients */}
      {patientsLoading && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
          <SpinnerComponent className="mr-2" />
          Loading patients...
        </div>
      )}
    </>
  );
};

export default AppointmentAddPage;
