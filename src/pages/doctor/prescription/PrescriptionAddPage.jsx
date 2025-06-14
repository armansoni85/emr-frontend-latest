import { Button, InputWithLabel, VoiceRecorder } from "@src/components";
import SpinnerComponent from "@src/components/SpinnerComponent";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RoleId } from "@src/constant/enumRole";
import { getUsers } from "@src/services/userService";
import { createPrescription } from "@src/services/prescriptionService";
import { handleFormChange } from "@src/utils/handleForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getRoutePath } from "@src/utils/routeUtils";
import { getUserById } from "@src/services/userService";

const PrescriptionAddPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [patientList, setPatientList] = useState([]);
  const [medicationList, setMedicationList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoadingPatientDetail, setIsLoadingPatientDetail] = useState(false); // Loading state

  // Get logged-in doctor data from localStorage
  const getLoggedInDoctor = () => {
    try {
      const authData = localStorage.getItem("persist:root");
      if (authData) {
        const parsedData = JSON.parse(authData);
        const authString = parsedData.auth;
        if (authString) {
          const parsedAuth = JSON.parse(authString);
          return parsedAuth.user;
        }
      }
      return null;
    } catch (error) {
      console.error("Error parsing auth data from localStorage:", error);
      return null;
    }
  };

  const doctorLoggedIn = getLoggedInDoctor();

  const doctorName = doctorLoggedIn
    ? `${doctorLoggedIn.first_name} ${doctorLoggedIn.last_name}`
    : "Unknown Doctor";

  const { data: patientData, isSuccess: isPatientSuccess } = useQuery({
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

  // Tambahkan mutation untuk get user by ID dengan loading state
  const { mutate: getPatientDetail } = useMutation({
    mutationFn: getUserById,
    onMutate: () => {
      // Set loading to true when mutation starts
      setIsLoadingPatientDetail(true);
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        const patient = data.data;
        setSelectedPatient(patient);

        // Autofill form dengan data patient
        setForm((prevForm) => ({
          ...prevForm,
          dob: patient.dob || "",
          disease: patient.disease || "",
        }));

        toast.success(
          `Patient details loaded: ${patient.first_name} ${patient.last_name}`
        );
      }
    },
    onError: (error) => {
      console.error("Error fetching patient details:", error);
      toast.error("Failed to load patient details");
    },
    onSettled: () => {
      // Set loading to false when mutation completes (success or error)
      setIsLoadingPatientDetail(false);
    },
  });

  // Updated mutation for saving complete prescription
  const { mutate: savePrescription, isLoading: isSavingPrescription } =
    useMutation({
      mutationFn: createPrescription,
      onSuccess: (data) => {
        if (data.id) {
          toast.success("Prescription saved successfully");

          // Reset form and medication list after successful save
          setForm({});
          setMedicationList([]);
          navigate(getRoutePath("doctor.prescriptions.list"));
        } else {
          toast.error(
            data.message || "Failed to save prescription. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error("Error saving prescription:", error);
        toast.error("Failed to save prescription. Please try again.");
      },
    });

  useEffect(() => {
    if (isPatientSuccess && patientData.success) {
      setPatientList(patientData.data.results);
    } else {
      setPatientList([]);
    }
  }, [patientData, isPatientSuccess]);

  const memoizedPatientList = useMemo(() => patientList, [patientList]);

  const handleGetPatientList = (search) => {
    searchPatient({ search, role: RoleId.PATIENT });
  };

  // Add medication to local list (not to database yet)
  const handleAddCurrentMedication = () => {
    if (
      !form.medicineName ||
      !form.type ||
      !form.quantity ||
      !form.dosage ||
      !form.frequency
    ) {
      toast.error("Please fill in all medication fields");
      return;
    }

    const newMedication = {
      id: crypto.randomUUID(),
      medicine_name: form.medicineName,
      type: form.type,
      quantity: form.quantity,
      dosage: form.dosage,
      frequency: form.frequency,
    };

    setMedicationList((prev) => [...prev, newMedication]);

    // Clear medication form fields
    setForm((prevForm) => ({
      ...prevForm,
      medicineName: "",
      type: "",
      quantity: "",
      dosage: "",
      frequency: "",
    }));

    console.log("Medication added to list");
  };

  // Save complete prescription to database
  const handleSavePrescription = () => {
    // Validate required fields
    if (!form.patient || !form.disease) {
      toast.error("Please fill in Patient, Doctor, and Disease fields");
      return;
    }

    if (medicationList.length === 0) {
      toast.error("Please add at least one medication");
      return;
    }

    // Prepare prescription data according to your API structure
    const prescriptionData = {
      patient: form.patient,
      doctor: form.doctor ?? "db0a9534-d52a-4a49-b49d-a899db467cc3",
      disease: form.disease,
      pharmacy_notes: form.pharmacyNotes || "",
      items: medicationList.map((med) => ({
        medicine_name: med.medicine_name,
        type: med.type,
        quantity: med.quantity,
        dosage: med.dosage,
        frequency: med.frequency,
      })),
    };

    savePrescription(prescriptionData);
  };

  const handleRemoveMedication = (medicationId) => {
    setMedicationList((prev) => prev.filter((med) => med.id !== medicationId));
  };

  // Handler untuk ketika patient dipilih
  const handlePatientSelect = (option) => {
    handleFormChange("patient", option.id, setForm);
    // Fetch detail patient untuk autofill
    getPatientDetail(option.id);
  };

  return (
    <>
      <div className="flex justify-end mb-4 gap-2">
        <button className="bg-primary border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
          Download
        </button>
        <button className="bg-primary border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
          Print
        </button>
        <button className="px-8 py-1 text-sm bg-white border border-danger rounded-full text-danger hover:bg-danger hover:text-white transition-all duration-150">
          Cancel
        </button>
      </div>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex gap-2 items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
          <h2 className="text-lg font-medium">Create New Prescription</h2>
          <VoiceRecorder />
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
            keyLabel={(option) => option.first_name + " " + option.last_name}
            wrapperClassName="p-5 z-20"
            disabled={isLoadingPatientDetail} // Disable saat loading
          />
          <InputWithLabel
            label={"Doctor's Name:"}
            id={"doctorName"}
            type={"text"}
            value={doctorName}
            readOnly={true}
            wrapperClassName="p-4"
          />
          <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
            <label className="block text-nowrap my-auto">Date of Birth:</label>
            <div className="flex items-center w-full col-span-2">
              {isLoadingPatientDetail ? (
                <div className="flex items-center justify-center w-full mt-1 px-5 py-3 bg-grey border rounded-full">
                  <SpinnerComponent size="sm" className="mr-2" />
                  <span className="text-muted">Loading patient data...</span>
                </div>
              ) : (
                <input
                  id="dob"
                  type="date"
                  value={form.dob || ""}
                  onChange={(e) => handleFormChange("dob", e, setForm)}
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey border rounded-full"
                  readOnly={true}
                />
              )}
            </div>
          </div>
          <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
            <label className="block text-nowrap my-auto">Disease:</label>
            <div className="flex items-center w-full col-span-2">
              {isLoadingPatientDetail ? (
                <div className="flex items-center justify-center w-full mt-1 px-5 py-3 bg-grey border rounded-full">
                  <SpinnerComponent size="sm" className="mr-2" />
                  <span className="text-muted">Loading disease info...</span>
                </div>
              ) : (
                <select
                  id="disease"
                  value={form.disease || ""}
                  onChange={(e) => handleFormChange("disease", e, setForm)}
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey border rounded-full"
                >
                  <option value="" disabled>
                    Select Disease
                  </option>
                  <option value="Acquired">Acquired</option>
                  <option value="Acute">Acute</option>
                  <option value="Chronic condition">Chronic condition</option>
                  <option value="Congenital disorder">
                    Congenital disorder
                  </option>
                  <option value="Genetic">Genetic</option>
                  <option value="Hereditary or inherited">
                    Hereditary or inherited
                  </option>
                  <option value="Iatrogenic">Iatrogenic</option>
                  <option value="Idiopathic">Idiopathic</option>
                  {/* Dynamic option for custom disease */}
                  {selectedPatient &&
                    selectedPatient.disease &&
                    ![
                      "Acquired",
                      "Acute",
                      "Chronic condition",
                      "Congenital disorder",
                      "Genetic",
                      "Hereditary or inherited",
                      "Iatrogenic",
                      "Idiopathic",
                    ].includes(selectedPatient.disease) && (
                      <option value={selectedPatient.disease}>
                        {selectedPatient.disease}
                      </option>
                    )}
                </select>
              )}
            </div>
          </div>

          <div className="bg-grey rounded-2xl mx-3">
            <div className="rounded-t-2xl py-3 px-5 border-b flex gap-2">
              <h6 className="text-xl">Add Medication</h6>
              <VoiceRecorder />
            </div>
            <div className="p-6">
              <div className="pb-3">
                <InputWithLabel
                  label={"Medicine Name:"}
                  id={"medicineName"}
                  type={"text"}
                  value={form.medicineName || ""}
                  onChange={(e) => handleFormChange("medicineName", e, setForm)}
                  placeholder="Enter Medicine Name"
                  wrapperClassName="mb-4"
                />
                <InputWithLabel
                  label={"Type:"}
                  id={"type"}
                  type={"text"}
                  value={form.type || ""}
                  onChange={(e) => handleFormChange("type", e, setForm)}
                  placeholder="Enter Type"
                  wrapperClassName="mb-4"
                />
                <InputWithLabel
                  label={"Quantity:"}
                  id={"quantity"}
                  type={"number"}
                  value={form.quantity || ""}
                  onChange={(e) => handleFormChange("quantity", e, setForm)}
                  placeholder="Enter Quantity"
                  wrapperClassName="mb-4"
                />
                <InputWithLabel
                  label={"Dosage:"}
                  id={"dosage"}
                  type={"text"}
                  value={form.dosage || ""}
                  onChange={(e) => handleFormChange("dosage", e, setForm)}
                  placeholder="Enter Dosage"
                  wrapperClassName="mb-4"
                />
                <InputWithLabel
                  label={"Frequency:"}
                  id={"frequency"}
                  type={"text"}
                  value={form.frequency || ""}
                  onChange={(e) => handleFormChange("frequency", e, setForm)}
                  placeholder="Enter Frequency"
                  wrapperClassName="mb-4"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleAddCurrentMedication}
                  className="px-4 py-3 text-sm bg-primary border border-primary rounded-full text-white hover:bg-opacity-[0.9] transition-all duration-150"
                >
                  Add to List
                </button>
              </div>
            </div>
          </div>
          <div className="bg-grey rounded-2xl mx-3">
            <div className="rounded-t-2xl py-3 px-5 border-b">
              <h6 className="text-xl">Current Medication List</h6>
            </div>
            <div className="p-6">
              {medicationList.length > 0 ? (
                <ol className="list-decimal ps-3">
                  {medicationList.map((medication, index) => (
                    <li key={medication.id} className="ps-3 mb-4">
                      <div className="relative bg-white text-body rounded-full px-5 py-3">
                        <span>{medication.medicine_name}</span>
                        <div className="absolute right-1 top-[4px] flex gap-2">
                          <span className="bg-grey rounded-full px-5 py-2 cursor-pointer">
                            {medication.frequency}
                          </span>
                          <button
                            onClick={() =>
                              handleRemoveMedication(medication.id)
                            }
                            className="bg-danger text-white rounded-full px-3 py-2 text-xs hover:bg-opacity-80 transition-all duration-150"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No medications added yet
                </p>
              )}
              <InputWithLabel
                label={"Pharmacy Notes:"}
                id={"pharmacyNotes"}
                type={"textarea"}
                value={form.pharmacyNotes || ""}
                onChange={(e) => handleFormChange("pharmacyNotes", e, setForm)}
                placeholder="Enter Pharmacy Notes"
                wrapperClassName="mb-4"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSavePrescription}
                  disabled={isSavingPrescription || medicationList.length === 0}
                  className="px-6 py-3 text-sm bg-success border border-success rounded-full text-white hover:bg-opacity-[0.9] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSavingPrescription && (
                    <SpinnerComponent
                      size="sm"
                      color="white"
                      className="mr-2"
                    />
                  )}
                  {isSavingPrescription
                    ? "Saving Prescription..."
                    : "Save Prescription"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionAddPage;
