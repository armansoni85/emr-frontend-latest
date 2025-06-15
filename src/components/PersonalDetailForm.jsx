import { useCallback, useEffect, useState } from "react";
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

  // Use provided userData or fallback to logged-in user
  const activeUser = userData || user;

  const [forms, setForms] = useState({
    firstName: activeUser?.first_name || "",
    lastName: activeUser?.last_name || "",
    gender: activeUser?.gender || "male",
    dob: activeUser?.dob || "2024-11-20",
    email: activeUser?.email || "",
    country: activeUser?.country || "",
    residentalAddress: activeUser?.residential_address || "",
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
        country: activeUser.country || "",
        residentalAddress:
          activeUser.residential_address || activeUser.address || "",
        mobileNumber: activeUser.mobile_number || activeUser.phone_number || "",
      });
    }
  }, [activeUser]);

  const onSubmit = useCallback(() => {
    const validatedForm = validateForm(UpdateUserSchema, forms);

    if (!validatedForm) {
      dispatch({ type: "SUBMISSION/CANCEL" });
      return;
    }

    console.log("Validated Form: ", validatedForm);
    updateUser(activeUser.id, {
      first_name: validatedForm.firstName,
      last_name: validatedForm.lastName,
      gender: validatedForm.gender,
      dob: validatedForm.dob,
      email: validatedForm.email,
      country: validatedForm.country,
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
  }, [dispatch, forms, activeUser, userData]);

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
        country: activeUser?.country || "",
        residentalAddress:
          activeUser?.residential_address || activeUser?.address || "",
        mobileNumber:
          activeUser?.mobile_number || activeUser?.phone_number || "",
      });
    }
  }, [isReset, activeUser, isSubmitted]);

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
          id={"state"}
          type={"select"}
          value={forms.country}
          onChange={(e) =>
            handleFormChange("country", e.target.value, setForms)
          }
          readOnly={isReadOnly}
        >
          <EachLoop
            of={countryCodes}
            render={(item) => {
              return <option value={item.value}>{item.text}</option>;
            }}
          />
        </InputWithLabel>
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
          label={"Residental Address:"}
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
