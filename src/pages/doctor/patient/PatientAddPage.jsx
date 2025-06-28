import { Button, InputWithLabel, VoiceRecorder } from "@src/components";
import SpinnerComponent from "@src/components/SpinnerComponent";
import { RoleId } from "@src/constant/enumRole";
import { countryCodes } from "@src/constant/countryCode";
import { registerPatientAction } from "@src/redux/actions/auth/authAction";
import ROUTES from "@src/routes";
import { AddPatient } from "@src/schema/UserSchema";
import { getUsers, getUserById, updateUser } from "@src/services/userService";
import { handleFormChange } from "@src/utils/handleForm";
import { validateForm } from "@src/utils/validateForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getRoutePath } from "@src/utils/routeUtils";

const PatientAddPage = () => {
  const { patientId } = useParams();
  const [form, setForm] = useState({
    gender: "male",
    country: "IN",
  });
  const { isSubmitted } = useSelector((state) => state.submission);
  const [doctorList, setDoctorList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countryCodes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isEditMode = !!patientId;

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

  const { data: patientData, isLoading: isLoadingPatient } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getUserById(patientId),
    enabled: !!patientId,
    onError: (error) => {
      console.log("Error: ", error);
    },
  });

  const getCountryNameFromCode = useCallback((countryCode) => {
    if (!countryCode) return "";

    const foundCountry = countryCodes.find(
      (country) => country.value === countryCode
    );

    return foundCountry ? foundCountry.text : countryCode;
  }, []);

  const getCountryCodeFromName = useCallback((countryName) => {
    if (!countryName) return "";

    const foundCountry = countryCodes.find(
      (country) => country.text.toLowerCase() === countryName.toLowerCase()
    );

    return foundCountry ? foundCountry.value : countryName;
  }, []);

  useEffect(() => {
    if (patientData?.success) {
      const patient = patientData.data;
      setForm({
        patientName: `${patient.first_name || ""} ${
          patient.last_name || ""
        }`.trim(),
        email: patient.email || "",
        mobileNumber: patient.phone_number || "",
        dob: patient.dob || "",
        gender: patient.gender || "male",
        doctor: patient.doctor || "",
        bloodGroup: patient.blood_group || "",
        heightFeet: patient.height_feet || "",
        heightInches: patient.height_inches || "",
        weightFeet: patient.weight_kilo || "",
        weightInches: patient.weight_grams || "",
        patientAddress: patient.address || "",
        disease: patient.disease || "",
        country: getCountryCodeFromName(patient.country) || "IN",
      });
    }
  }, [patientData, getCountryCodeFromName]);

  const { data, isSuccess } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getUsers({ role: RoleId.DOCTOR }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { mutate: searchDoctor } = useMutation({
    mutationFn: getUsers,
    onSuccess: (data) => {
      if (data.status && data.data.results) {
        setDoctorList(data.data.results);
      }
    },
  });

  const updatePatientMutation = useMutation({
    mutationFn: ({ patientId, userData }) => updateUser(patientId, userData),
    onSuccess: () => {
      toast.success("Patient updated successfully");
      queryClient.invalidateQueries({ queryKey: ["patientList"] });
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["patient", patientId] });
      navigate(getRoutePath("doctor.patients.list"));
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update patient");
    },
    onSettled: () => {
      dispatch({ type: "SUBMISSION/RESET" });
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

  const memoizedCountryList = useMemo(() => {
    return countryCodes.map((country) => ({
      ...country,
      id: country.value,
      displayName: country.text,
    }));
  }, []);

  const handleGetDoctorList = (search) => {
    searchDoctor({ search, role: RoleId.DOCTOR });
  };

  const handleGetCountryList = (search) => {
    if (!search) {
      setFilteredCountries(countryCodes);
      return;
    }

    const filtered = countryCodes.filter(
      (country) =>
        country.text.toLowerCase().includes(search.toLowerCase()) ||
        country.value.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleCountrySelect = (selectedCountry) => {
    console.log("Country selected:", selectedCountry);

    if (selectedCountry) {
      setForm((prev) => ({
        ...prev,
        country: selectedCountry.value,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        country: "",
      }));
    }
  };

  const selectedCountry = useMemo(() => {
    return countryCodes.find((country) => country.value === form.country);
  }, [form.country]);

  const handleOnSubmit = () => {
    if (isEditMode) {
      const countryName = getCountryNameFromCode(form.country);

      const updateData = {
        first_name: form.patientName?.split(" ")[0] || form.patientName,
        last_name: form.patientName?.split(" ").slice(1).join(" ") || "",
        email: form.email,
        phone_number: form.mobileNumber,
        dob: form.dob,
        gender: form.gender,
        blood_group: form.bloodGroup,
        height_feet: form.heightFeet ? Number(form.heightFeet) : 0,
        height_inches: form.heightInches ? Number(form.heightInches) : 0,
        weight_kilo: form.weightFeet ? Number(form.weightFeet) : 0,
        weight_grams: form.weightInches ? Number(form.weightInches) : 0,
        address: form.patientAddress,
        disease: form.disease,
        country: countryName,
      };

      console.log("Update data with country name:", updateData);
      dispatch({ type: "SUBMISSION/SUBMIT" });
      updatePatientMutation.mutate({ patientId, userData: updateData });
    } else {
      const countryName = getCountryNameFromCode(form.country);

      const data = validateForm(AddPatient, {
        patientName: form.patientName,
        email: form.email,
        mobileNumber: form.mobileNumber,
        dob: form.dob ? new Date(form.dob) : new Date("1993-10-14"),
        gender: form.gender || "male",
        doctor: doctorLoggedIn?.id || form.doctor || "",
        bloodGroup: form.bloodGroup || "A+",
        heightFeet: form.heightFeet ? Number(form.heightFeet) : 1,
        heightInches: form.heightInches ? Number(form.heightInches) : 0,
        weightFeet: form.weightFeet ? Number(form.weightFeet) : 1,
        weightInches: form.weightInches ? Number(form.weightInches) : 0,
        patientAddress: form.patientAddress || "-",
        disease: form.disease || "-",
        country: countryName || "India",
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      if (data) {
        console.log("Validated Form with country name:", data);
        console.log(
          "Country Code:",
          form.country,
          "Country Name:",
          countryName
        );

        dispatch({ type: "SUBMISSION/SUBMIT" });
        dispatch(
          registerPatientAction({
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            first_name: data.patientName?.split(" ")[0] || data.patientName,
            last_name: data.patientName?.split(" ").slice(1).join(" ") || "",
            role: 3,
            country: countryName || "India",
            gender: data.gender,
            dob: data.dob.toISOString().split("T")[0],
            blood_group: data.bloodGroup,
            phone_number: data.mobileNumber || "",
            address: data.patientAddress || "",
            height_feet: data.heightFeet,
            height_inches: data.heightInches,
            weight_kilo: data.weightFeet,
            weight_grams: data.weightInches,
            disease: data.disease,
            hospital:
              doctorLoggedIn?.hospital?.id ||
              import.meta.env.VITE_HOSPITAL_UUID,
            work_email: form.workEmail || data.email,
          })
        )
          .unwrap()
          .then(() => {
            toast("Add Patient successful", { type: "success" });
            queryClient.invalidateQueries({ queryKey: ["patientList"] });
            queryClient.invalidateQueries({ queryKey: ["patients"] });
            navigate(getRoutePath("doctor.patients.list"));
          })
          .catch((error) => {
            console.log(error);
            toast(error, { type: "error" });
          })
          .finally(() => {
            dispatch({ type: "SUBMISSION/RESET" });
          });
      }
    }
  };

  const handleCancel = () => {
    dispatch({ type: "SUBMISSION/RESET" });
    navigate(getRoutePath("doctor.patients.list"));
  };

  if (isEditMode && isLoadingPatient) {
    return (
      <div className="flex justify-center items-center h-64">
        <SpinnerComponent />
      </div>
    );
  }

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
          disabled={isSubmitted || updatePatientMutation.isPending}
        >
          {isSubmitted || updatePatientMutation.isPending ? (
            <SpinnerComponent color="white" className="mr-2" />
          ) : isEditMode ? (
            "Update"
          ) : (
            "Save"
          )}
        </Button>
      </div>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
          <h2 className="text-lg font-medium">
            {isEditMode ? "Edit Patient" : "Add New Patient"}
          </h2>
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

          {/* Country Searchable Select */}
          <InputWithLabel
            label={"Country:"}
            id={"country"}
            type={"searchable-select"}
            onSearch={handleGetCountryList}
            options={memoizedCountryList}
            defaultValue={form.country || ""}
            onChange={handleCountrySelect}
            keyValue={"value"}
            keyLabel={(option) => option.text}
            wrapperClassName="p-4 z-30"
            placeholder="Search and select country"
          />

          <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
            <label className="block text-nowrap my-auto">Gender:</label>
            <div className="flex items-center w-full col-span-2">
              <label
                className={`mr-2 px-3 py-1 border border-transparent text-lg w-full text-center rounded-full text-muted cursor-pointer hover:bg-primary hover:text-white transition-all duration-150 ${
                  form.gender == "male" ? "bg-primary text-white" : "bg-grey2"
                }`}
                onClick={() => handleFormChange("gender", "male", setForm)}
              >
                <input
                  id="genderMale"
                  type="radio"
                  name="gender"
                  defaultValue="male"
                  className="hidden"
                />
                Male
              </label>
              <label
                className={`mr-2 px-3 py-1 border border-transparent text-lg w-full text-center rounded-full text-muted cursor-pointer hover:bg-primary hover:text-white transition-all duration-150 ${
                  form.gender == "female" ? "bg-primary text-white" : "bg-grey2"
                }`}
                onClick={() => handleFormChange("gender", "female", setForm)}
              >
                <input
                  id="genderFemale"
                  type="radio"
                  name="gender"
                  defaultValue="female"
                  className="hidden"
                />
                Female
              </label>
              <label
                className={`mr-2 px-3 py-1 border border-transparent text-lg w-full text-center rounded-full text-muted cursor-pointer hover:bg-primary hover:text-white transition-all duration-150 ${
                  form.gender == "other" ? "bg-primary text-white" : "bg-grey2"
                }`}
                onClick={() => handleFormChange("gender", "other", setForm)}
              >
                <input
                  id="genderOther"
                  type="radio"
                  name="gender"
                  defaultValue="other"
                  className="hidden"
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
            wrapperClassName="p-4"
          >
            <option value="">Select Blood Group</option>
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
            <label htmlFor="heightFeet" className="block text-nowrap my-auto">
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
                <span className="flex items-center pr-3 text-muted">
                  Inches
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
            <label htmlFor="weightFeet" className="block text-nowrap my-auto">
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

          <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
            <label className="block text-nowrap my-auto">Doctor Name:</label>
            <div className="flex items-center w-full col-span-2">
              <input
                type="text"
                value={doctorName}
                readOnly
                className="focus:outline-none w-full px-5 py-3 border rounded-full bg-gray-100 text-gray-600"
              />
            </div>
          </div>

          <InputWithLabel
            label={"Address:"}
            id={"patientAddress"}
            type={"textarea"}
            value={form.patientAddress || ""}
            onChange={(e) => handleFormChange("patientAddress", e, setForm)}
            wrapperClassName="p-4"
          />
          {!isEditMode && (
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
                onChange={(e) =>
                  handleFormChange("confirmPassword", e, setForm)
                }
                wrapperClassName="p-4"
              />
            </div>
          )}
        </div>
      </div>

      {/* Selected Country Info Display - Updated */}
      {selectedCountry && (
        <div className="mx-4 mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">
            Selected Country:
          </h4>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Country:</span>
            <span className="ml-2">{selectedCountry.text}</span>
            <span className="text-gray-500">({selectedCountry.value})</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            <span className="font-medium">Form stores:</span> {form.country}{" "}
            (code)
            <br />
            <span className="font-medium">API will receive:</span>{" "}
            {getCountryNameFromCode(form.country)} (name)
          </div>
        </div>
      )}
    </>
  );
};

export default PatientAddPage;
