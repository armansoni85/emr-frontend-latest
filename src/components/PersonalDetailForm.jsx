import { useCallback, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { EachLoop } from "@src/utils/EachLoop";
import { InputWithLabel } from "@src/components";
import { UpdateUserSchema } from "@src/schema/UserSchema";
import { countryCodes } from "@src/constant/countryCode";
import { getUserDetail } from "@src/redux/actions/auth/authAction";
import { handleFormChange } from "@src/utils/handleForm";
import { toast } from "react-toastify";
import { updateUser } from "@src/services/userService";
import { validateForm } from "./../utils/validateForm";

const PersonalDetailForm = ({ wrapperClassName = "", userData = null }) => {
  const { isSubmitted, isReset, isReadOnly } = useSelector(
    (state) => state.submission
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const activeUser = userData || user;

  // Helper function to map country name to country code
  const getCountryCodeFromName = useCallback((countryName) => {
    if (!countryName) return "";

    // Find country by name (case insensitive)
    const foundCountry = countryCodes.find(
      (country) => country.text.toLowerCase() === countryName.toLowerCase()
    );

    return foundCountry ? foundCountry.value : countryName;
  }, []);

  // Helper function to map country code to country name
  const getCountryNameFromCode = useCallback((countryCode) => {
    if (!countryCode) return "";

    // Find country by code
    const foundCountry = countryCodes.find(
      (country) => country.value === countryCode
    );

    return foundCountry ? foundCountry.text : countryCode;
  }, []);

  const [forms, setForms] = useState({
    firstName: activeUser?.first_name || "",
    lastName: activeUser?.last_name || "",
    gender: activeUser?.gender || "male",
    dob: activeUser?.dob || "2024-11-20",
    email: activeUser?.email || "",
    country: getCountryCodeFromName(activeUser?.country) || "",
    residentalAddress:
      activeUser?.residential_address || activeUser?.address || "",
    mobileNumber: activeUser?.mobile_number || activeUser?.phone_number || "",
  });

  // Update forms when userData changes
  useEffect(() => {
    if (activeUser) {
      setForms({
        firstName: activeUser.first_name || "",
        lastName: activeUser.last_name || "",
        gender: activeUser.gender || "male",
        dob: activeUser.dob || "2024-11-20",
        email: activeUser.email || "",
        country: getCountryCodeFromName(activeUser.country) || "",
        residentalAddress:
          activeUser.residential_address || activeUser.address || "",
        mobileNumber: activeUser.mobile_number || activeUser.phone_number || "",
      });
    }
  }, [activeUser, getCountryCodeFromName]);

  const onSubmit = useCallback(() => {
    const validatedForm = validateForm(UpdateUserSchema, forms);

    if (!validatedForm) {
      dispatch({ type: "SUBMISSION/CANCEL" });
      return;
    }

    console.log("Validated Form: ", validatedForm);

    // Convert country code back to country name for API
    const countryName = getCountryNameFromCode(validatedForm.country);

    updateUser(activeUser.id, {
      first_name: validatedForm.firstName,
      last_name: validatedForm.lastName,
      gender: validatedForm.gender,
      dob: validatedForm.dob,
      email: validatedForm.email,
      country: countryName, // Send country name to API
      residential_address: validatedForm.residentalAddress,
      mobile_number: validatedForm.mobileNumber,
    })
      .then((response) => {
        if (response.success) {
          toast.success("User updated successfully!");
          // Only update logged-in user data if we're editing the logged-in user
          if (!userData) {
            dispatch(getUserDetail());
          }
        }
      })
      .catch((error) => {
        toast.error(
          error.message || "An error occurred while updating the user."
        );
      })
      .finally(() => {
        dispatch({ type: "SUBMISSION/CANCEL" });
      });
  }, [dispatch, forms, activeUser, userData, getCountryNameFromCode]);

  useEffect(() => {
    if (isSubmitted) {
      onSubmit();
    }
  }, [isSubmitted, onSubmit]);

  useEffect(() => {
    if (isReset && !isSubmitted) {
      setForms({
        firstName: activeUser?.first_name || "",
        lastName: activeUser?.last_name || "",
        gender: activeUser?.gender || "male",
        dob: activeUser?.dob || "2024-11-20",
        email: activeUser?.email || "",
        country: getCountryCodeFromName(activeUser?.country) || "",
        residentalAddress:
          activeUser?.residential_address || activeUser?.address || "",
        mobileNumber:
          activeUser?.mobile_number || activeUser?.phone_number || "",
      });
    }
  }, [isReset, activeUser, isSubmitted, getCountryCodeFromName]);

  // Get selected country info for display
  const selectedCountryInfo = useMemo(() => {
    const foundCountry = countryCodes.find(
      (country) => country.value === forms.country
    );
    return foundCountry || null;
  }, [forms.country]);

  return (
    <div
      className={`grid lg:grid-cols-2 grid-cols-1 gap-4 ${wrapperClassName}`}
    >
      <div className="p-4">
        <InputWithLabel
          wrapperClassName={"mb-3"}
          label={"First Name:"}
          id={"firstName"}
          type={"text"}
          value={forms.firstName}
          onChange={(e) =>
            handleFormChange("firstName", e.target.value, setForms)
          }
          readOnly={isReadOnly}
        />
        <InputWithLabel
          wrapperClassName={"mb-3"}
          label={"Gender:"}
          id={"gender"}
          type={"select"}
          value={forms.gender}
          onChange={(e) => handleFormChange("gender", e.target.value, setForms)}
          readOnly={isReadOnly}
        >
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
          <option value={"other"}>Other</option>
        </InputWithLabel>

        <InputWithLabel
          wrapperClassName={"mb-3"}
          label={"Date of Birth:"}
          id={"dob"}
          type={"date"}
          value={forms.dob}
          onChange={(e) => handleFormChange("dob", e.target.value, setForms)}
          readOnly={isReadOnly}
        />

        <InputWithLabel
          wrapperClassName={"mb-3"}
          label={"Nationality:"}
          id={"country"}
          type={"select"}
          value={forms.country}
          onChange={(e) =>
            handleFormChange("country", e.target.value, setForms)
          }
          readOnly={isReadOnly}
        >
          <option value="">Select Country</option>
          <EachLoop
            of={countryCodes}
            render={(item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              );
            }}
          />
        </InputWithLabel>

        {/* Debug info - show selected country mapping */}
        {selectedCountryInfo && !isReadOnly && (
          <div className="text-xs text-gray-500 mt-1 mb-2">
            Selected: {selectedCountryInfo.text} ({selectedCountryInfo.value})
            {activeUser?.country && (
              <span className="ml-2">| DB Value: "{activeUser.country}"</span>
            )}
          </div>
        )}
      </div>
      <div className="p-4">
        <InputWithLabel
          wrapperClassName={"mb-3"}
          label={"Last Name:"}
          id={"lastName"}
          type={"text"}
          value={forms.lastName}
          onChange={(e) =>
            handleFormChange("lastName", e.target.value, setForms)
          }
          readOnly={isReadOnly}
        />
        <InputWithLabel
          wrapperClassName={"mb-3"}
          label={"Email:"}
          id={"email"}
          type={"email"}
          value={forms.email}
          onChange={(e) => handleFormChange("email", e.target.value, setForms)}
          readOnly={isReadOnly}
        />
        <InputWithLabel
          wrapperClassName={"mb-3"}
          label={"Mobile Number:"}
          id={"mobileNumber"}
          type={"text"}
          value={forms.mobileNumber}
          onChange={(e) =>
            handleFormChange("mobileNumber", e.target.value, setForms)
          }
          readOnly={isReadOnly}
        />
        <InputWithLabel
          wrapperClassName={"mb-3"}
          label={"Residential Address:"}
          id={"residentialAddress"}
          type={"textarea"}
          placeholder={"Enter Address"}
          value={forms.residentalAddress}
          onChange={(e) =>
            handleFormChange("residentalAddress", e.target.value, setForms)
          }
          readOnly={isReadOnly}
        />
      </div>
    </div>
  );
};

export default PersonalDetailForm;
