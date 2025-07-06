import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InputWithLabel } from ".";
import { handleFormChange } from "@src/utils/handleForm";
import { toast } from "react-toastify";
import { updatePasswordAction } from "@src/redux/actions/auth/authAction";

const LOCAL_STORAGE_KEY = "customColorTheme";

const ChangePassword = () => {
  const isSubmitted = useSelector((state) => state.submission.isSubmitted);
  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  const [fontTheme, setFontTheme] = useState(() => {
    try {
      const theme = localStorage.getItem(LOCAL_STORAGE_KEY);
      return theme ? JSON.parse(theme) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const theme = localStorage.getItem(LOCAL_STORAGE_KEY);
        setFontTheme(theme ? JSON.parse(theme) : {});
      } catch {
        setFontTheme({});
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("customColorThemeChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "customColorThemeChanged",
        handleStorageChange
      );
    };
  }, []);

  useEffect(() => {
    if (!fontTheme) return;
    document.body.style.fontFamily = fontTheme.fontFamily || "inherit";
    document.body.style.fontWeight = fontTheme.fontWeight || 400;
    document.body.style.fontSize = fontTheme.fontSize || "16px";
    return () => {
      document.body.style.fontFamily = "";
      document.body.style.fontWeight = "";
      document.body.style.fontSize = "";
    };
  }, [fontTheme]);

  const getFontStyle = (type = "main") => {
    if (type === "subHeading") {
      return {
        fontFamily: fontTheme.subHeadingFontFamily || fontTheme.fontFamily,
        fontWeight: fontTheme.subHeadingFontWeight || fontTheme.fontWeight,
        fontSize: fontTheme.subHeadingFontSize || fontTheme.fontSize,
      };
    }
    if (type === "body1") {
      return {
        fontFamily: fontTheme.bodyText1FontFamily || fontTheme.fontFamily,
        fontWeight: fontTheme.bodyText1FontWeight || fontTheme.fontWeight,
        fontSize: fontTheme.bodyText1FontSize || fontTheme.fontSize,
      };
    }
    if (type === "body2") {
      return {
        fontFamily: fontTheme.bodyText2FontFamily || fontTheme.fontFamily,
        fontWeight: fontTheme.bodyText2FontWeight || fontTheme.fontWeight,
        fontSize: fontTheme.bodyText2FontSize || fontTheme.fontSize,
      };
    }
    return {
      fontFamily: fontTheme.fontFamily,
      fontWeight: fontTheme.fontWeight,
      fontSize: fontTheme.fontSize,
    };
  };

  const onSubmit = useCallback(() => {
    if (
      !form.oldPassword ||
      !form.oldPasswordConfirm ||
      !form.newPassword ||
      !form.newPasswordConfirm
    ) {
      toast.error("All fields are required.");
      dispatch({ type: "SUBMISSION/CANCEL" });
      return;
    }

    if (form.oldPassword !== form.oldPasswordConfirm) {
      toast.error("Old passwords do not match.");
      dispatch({ type: "SUBMISSION/CANCEL" });
      return;
    }

    if (form.newPassword.length < 6 || form.newPassword.length > 20) {
      toast.error("New password must be between 6 and 20 characters.");
      dispatch({ type: "SUBMISSION/CANCEL" });
      return;
    }

    if (form.newPassword !== form.newPasswordConfirm) {
      toast.error("New passwords do not match.");
      dispatch({ type: "SUBMISSION/CANCEL" });
      return;
    }

    dispatch(
      updatePasswordAction({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Password changed successfully!");
      })
      .catch((error) => {
        toast.error(
          error.message || "An error occurred while changing the password."
        );
      })
      .finally(() => {
        dispatch({ type: "SUBMISSION/CANCEL" });
        setForm({});
      });
  }, [form, dispatch]);

  useEffect(() => {
    if (isSubmitted) {
      onSubmit();
    }
  }, [isSubmitted, onSubmit]);

  return (
    <div
      className="bg-white rounded-2xl px-3 py-3"
      style={getFontStyle("main")}
    >
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div className="p-4">
          <InputWithLabel
            label={"Old Password:"}
            id={"oldPassword"}
            type={"password"}
            value={form.oldPassword || ""}
            onChange={(e) => handleFormChange("oldPassword", e, setForm)}
            style={getFontStyle("body1")}
            labelStyle={getFontStyle("body1")}
          />

          <InputWithLabel
            label={"Confirm Old Password:"}
            id={"oldPasswordConfirm"}
            type={"password"}
            value={form.oldPasswordConfirm || ""}
            onChange={(e) => handleFormChange("oldPasswordConfirm", e, setForm)}
            style={getFontStyle("body1")}
            labelStyle={getFontStyle("body1")}
          />
        </div>
        <div className="p-4">
          <InputWithLabel
            label={"New Password:"}
            id={"newPassword"}
            type={"password"}
            value={form.newPassword || ""}
            onChange={(e) => handleFormChange("newPassword", e, setForm)}
            style={getFontStyle("body1")}
            labelStyle={getFontStyle("body1")}
          />

          <InputWithLabel
            label={"Confirm New Password:"}
            id={"newPasswordConfirm"}
            type={"password"}
            value={form.newPasswordConfirm || ""}
            onChange={(e) => handleFormChange("newPasswordConfirm", e, setForm)}
            style={getFontStyle("body1")}
            labelStyle={getFontStyle("body1")}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
