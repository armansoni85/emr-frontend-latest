import { useEffect, useState } from "react";
import { NavLinkButton } from "@src/components";
import { getRoutePath } from "@src/utils/routeUtils";
import Document from "@src/assets/documents/MEDAIPRO HIPAA Compliance Policy.pdf";

const THEME_STORAGE_KEY = "customColorTheme";
const getFontTheme = () => {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    return theme ? JSON.parse(theme) : {};
  } catch {
    return {};
  }
};
const getFontStyle = (fontTheme, type = "main") => {
  if (!fontTheme) return {};
  if (type === "subHeading") {
    return {
      fontFamily: fontTheme.subHeadingFontFamily || fontTheme.fontFamily,
      fontWeight: fontTheme.subHeadingFontWeight || fontTheme.fontWeight,
      fontSize: fontTheme.subHeadingFontSize || fontTheme.fontSize,
      color: fontTheme.headingColor || "#333333",
    };
  }
  if (type === "body1") {
    return {
      fontFamily: fontTheme.bodyText1FontFamily || fontTheme.fontFamily,
      fontWeight: fontTheme.bodyText1FontWeight || fontTheme.fontWeight,
      fontSize: fontTheme.bodyText1FontSize || fontTheme.fontSize,
      color:
        fontTheme.bodyTextColor === "#FFFFFF"
          ? "#333333"
          : fontTheme.bodyTextColor || "#333333",
    };
  }
  if (type === "body2") {
    return {
      fontFamily: fontTheme.bodyText2FontFamily || fontTheme.fontFamily,
      fontWeight: fontTheme.bodyText2FontWeight || fontTheme.fontWeight,
      fontSize: fontTheme.bodyText2FontSize || fontTheme.fontSize,
      color:
        fontTheme.bodyTextColor === "#FFFFFF"
          ? "#666666"
          : fontTheme.bodyTextColor || "#666666",
    };
  }
  return {
    fontFamily: fontTheme.fontFamily,
    fontWeight: fontTheme.fontWeight,
    fontSize: fontTheme.fontSize,
    color: fontTheme.headingColor || "#333333",
  };
};

const HippaPolicyPage = () => {
  const [customTheme, setCustomTheme] = useState(() => {
    try {
      const theme = localStorage.getItem("customColorTheme");
      return theme ? JSON.parse(theme) : {};
    } catch {
      return {};
    }
  });

  const [fontTheme, setFontTheme] = useState(getFontTheme());

  useEffect(() => {
    const reloadTheme = () => {
      try {
        const theme = localStorage.getItem("customColorTheme");
        setCustomTheme(theme ? JSON.parse(theme) : {});
      } catch {
        setCustomTheme({});
      }
    };
    window.addEventListener("customColorThemeChanged", reloadTheme);
    window.addEventListener("storage", (e) => {
      if (e.key === "customColorTheme") reloadTheme();
    });
    return () => {
      window.removeEventListener("customColorThemeChanged", reloadTheme);
      window.removeEventListener("storage", reloadTheme);
    };
  }, []);

  useEffect(() => {
    const reloadTheme = () => setFontTheme(getFontTheme());
    window.addEventListener("customColorThemeChanged", reloadTheme);
    window.addEventListener("storage", (e) => {
      if (e.key === THEME_STORAGE_KEY) reloadTheme();
    });
    return () => {
      window.removeEventListener("customColorThemeChanged", reloadTheme);
      window.removeEventListener("storage", reloadTheme);
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

  const getButtonStyle = (filled = true) => ({
    backgroundColor: filled ? customTheme.primaryColor : "#fff",
    color: filled ? "#fff" : customTheme.primaryColor,
    border: `1.5px solid ${customTheme.primaryColor}`,
    fontFamily: fontTheme.fontFamily || "inherit",
    fontWeight: fontTheme.fontWeight || 400,
    fontSize: fontTheme.fontSize || "16px",
    transition: "all 0.15s",
  });

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
          <NavLinkButton
            to={getRoutePath("doctor.hippa_compliance")}
            color="primary"
            className={"px-5"}
            style={{
              ...getFontStyle(fontTheme, "main"),
              border: `1.5px solid ${customTheme.primaryColor}`,
            }}
          >
            Audit Logs &amp; Monitoring
          </NavLinkButton>
          <NavLinkButton
            to={getRoutePath("doctor.regulatory_compliance")}
            color="primary"
            className={"px-5"}
            style={{
              ...getFontStyle(fontTheme, "main"),
              border: `1.5px solid ${customTheme.primaryColor}`,
            }}
          >
            Regulatory Compliance
          </NavLinkButton>
          <NavLinkButton
            to={getRoutePath("doctor.hippa_policy")}
            color="primary"
            className={"px-5"}
            style={{
              ...getFontStyle(fontTheme, "main"),
              backgroundColor: customTheme.primaryColor,
              color: "#fff",
              border: `1.5px solid ${customTheme.primaryColor}`,
            }}
          >
            HIPPA Policy
          </NavLinkButton>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
          <h2
            className="text-lg font-medium"
            style={getFontStyle(fontTheme, "subHeading")}
          >
            HIPPA Policy
          </h2>
          <button
            className="px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-80 transition-opacity"
            style={{
                ...getFontStyle(fontTheme, "body1"),
                backgroundColor: customTheme.primaryColor,
                color: "#fff",
            }}
            onClick={() => {
              // Create a download link for the PDF
              const link = document.createElement('a');
              link.href = Document; // Update path as needed
              link.download = 'MEDAIPRO HIPAA Compliance Policy.pdf';
              link.click();
            }}
          >
            <i className="material-icons text-sm">download</i>
            Download PDF
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h3
              className="text-xl font-semibold mb-4"
              style={getFontStyle(fontTheme, "subHeading")}
            >
              Health Insurance Portability and Accountability Act (HIPAA) Compliance
            </h3>
            <p
              className="text-gray-600 mb-4 leading-relaxed"
              style={getFontStyle(fontTheme, "body1")}
            >
              Our healthcare platform is committed to maintaining the highest standards of patient data protection 
              and privacy in accordance with the Health Insurance Portability and Accountability Act (HIPAA) of 1996. 
              This policy outlines our commitment to safeguarding protected health information (PHI) and ensuring 
              compliance with all applicable HIPAA regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4
                className="font-semibold mb-3 flex items-center gap-2"
                style={getFontStyle(fontTheme, "body1")}
              >
                <i className="material-icons text-blue-600">security</i>
                Data Protection
              </h4>
              <ul className="space-y-2">
                <li
                  className="flex items-start gap-2"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  <i className="material-icons text-green-500 text-sm mt-1">check</i>
                  End-to-end encryption for all patient data
                </li>
                <li
                  className="flex items-start gap-2"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  <i className="material-icons text-green-500 text-sm mt-1">check</i>
                  Secure data transmission protocols
                </li>
                <li
                  className="flex items-start gap-2"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  <i className="material-icons text-green-500 text-sm mt-1">check</i>
                  Regular security audits and assessments
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4
                className="font-semibold mb-3 flex items-center gap-2"
                style={getFontStyle(fontTheme, "body1")}
              >
                <i className="material-icons text-green-600">verified_user</i>
                Access Control
              </h4>
              <ul className="space-y-2">
                <li
                  className="flex items-start gap-2"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  <i className="material-icons text-green-500 text-sm mt-1">check</i>
                  Role-based access permissions
                </li>
                <li
                  className="flex items-start gap-2"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  <i className="material-icons text-green-500 text-sm mt-1">check</i>
                  Multi-factor authentication
                </li>
                <li
                  className="flex items-start gap-2"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  <i className="material-icons text-green-500 text-sm mt-1">check</i>
                  Comprehensive audit logging
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4
              className="font-semibold mb-3"
              style={getFontStyle(fontTheme, "body1")}
            >
              Key Policy Points
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5
                  className="font-medium mb-2"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Minimum Necessary Standard
                </h5>
                <p
                  className="text-sm text-gray-600"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  Access to PHI is limited to the minimum necessary to accomplish the intended purpose.
                </p>
              </div>
              <div>
                <h5
                  className="font-medium mb-2"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Patient Rights
                </h5>
                <p
                  className="text-sm text-gray-600"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  Patients have the right to access, amend, and request restrictions on their PHI.
                </p>
              </div>
              <div>
                <h5
                  className="font-medium mb-2"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Breach Notification
                </h5>
                <p
                  className="text-sm text-gray-600"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  Immediate notification procedures in place for any potential data breaches.
                </p>
              </div>
              <div>
                <h5
                  className="font-medium mb-2"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Staff Training
                </h5>
                <p
                  className="text-sm text-gray-600"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  Regular HIPAA compliance training for all staff members handling PHI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HippaPolicyPage;
