import { Button, InputWithLabel, VoiceRecorder } from "@src/components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import SpinnerComponent from "@src/components/SpinnerComponent";
import { getRoutePath } from "@src/utils/routeUtils";
import { handleFormChange } from "@src/utils/handleForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppointmentAddPage = () => {
  const [form, setForm] = useState({
    patientName: "",
    mobileNumber: "",
    email: "",
    dob: "",
    date: "",
    time: "",
    disease: "",
    reasonOfVisit: "",
  });

  const [appointments, setAppointments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = () => {
    setIsSubmitting(true);

    if (!form.patientName || !form.date || !form.time) {
      toast.error(
        "Please fill in all required fields (Patient Name, Date, Time)"
      );
      setIsSubmitting(false);
      return;
    }

    const newAppointment = {
      id: Date.now(),
      patientName: form.patientName,
      mobileNumber: form.mobileNumber,
      email: form.email,
      dateOfBirth: form.dob,
      appointmentDate: form.date,
      appointmentTime: form.time,
      disease: form.disease,
      reasonOfVisit: form.reasonOfVisit,
      status: "scheduled",
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setAppointments((prev) => [...prev, newAppointment]);

      const existingAppointments = JSON.parse(
        localStorage.getItem("appointments") || "[]"
      );
      existingAppointments.push(newAppointment);
      localStorage.setItem(
        "appointments",
        JSON.stringify(existingAppointments)
      );

      setForm({
        patientName: "",
        mobileNumber: "",
        email: "",
        dob: "",
        date: "",
        time: "",
        disease: "",
        reasonOfVisit: "",
      });

      setIsSubmitting(false);
      toast.success("Appointment scheduled successfully!");

      console.log("New appointment created:", newAppointment);
      console.log("All appointments:", [...appointments, newAppointment]);

      navigate(getRoutePath("doctor.appointments.list"), { replace: true });
    }, 1000);
  };

  const handleCancel = () => {
    setForm({
      patientName: "",
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
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          className="px-8"
          onClick={handleOnSubmit}
          disabled={isSubmitting}
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
          <h2 className="text-lg font-medium">Schedule New Appointment</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <InputWithLabel
            label={"Patient Name:"}
            id={"patientName"}
            type={"text"}
            value={form.patientName || ""}
            onChange={(e) => handleFormChange("patientName", e, setForm)}
            placeholder="Enter patient name"
            wrapperClassName="p-4"
            required
          />
          <InputWithLabel
            label={"Mobile Number:"}
            id={"mobileNumber"}
            type={"text"}
            value={form.mobileNumber || ""}
            onChange={(e) => handleFormChange("mobileNumber", e, setForm)}
            placeholder="Enter mobile number"
            wrapperClassName="p-4"
          />
          <InputWithLabel
            label={"Email ID:"}
            id={"email"}
            type={"email"}
            value={form.email || ""}
            onChange={(e) => handleFormChange("email", e, setForm)}
            placeholder="Enter email address"
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
          <InputWithLabel
            label={"Appointment Date:"}
            id={"date"}
            type={"date"}
            value={form.date || ""}
            onChange={(e) => handleFormChange("date", e, setForm)}
            wrapperClassName="p-4"
            required
          />
          <InputWithLabel
            label={"Appointment Time:"}
            id={"time"}
            type={"time"}
            value={form.time || ""}
            onChange={(e) => handleFormChange("time", e, setForm)}
            wrapperClassName="p-4"
            required
          />
          <InputWithLabel
            label={"Disease:"}
            id={"disease"}
            type={"select"}
            value={form.disease || ""}
            onChange={(e) => handleFormChange("disease", e, setForm)}
            wrapperClassName="p-4"
          >
            <option value="">Select Disease</option>
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
            placeholder="Enter reason for visit"
            wrapperClassName="p-4"
          />
        </div>
      </div>

      {/* Debug section - shows current appointments in state */}
      {appointments.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Appointments in State:</h3>
          <pre className="text-sm text-gray-600">
            {JSON.stringify(appointments, null, 2)}
          </pre>
        </div>
      )}
    </>
  );
};

export default AppointmentAddPage;
