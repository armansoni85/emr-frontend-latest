import { useEffect, useState } from "react";
import { NavLinkButton } from "@src/components";
import { getRoutePath } from "@src/utils/routeUtils";
import Document from "@src/assets/documents/MEDAIPRO HIPAA Compliance Policy.pdf";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

const HippaPolicyPage = () => {
  const { theme } = useTheme();

  const getButtonStyle = (filled = true) => ({
    backgroundColor: filled ? theme.primaryColor : "#fff",
    color: filled ? "#fff" : theme.primaryColor,
    border: `1.5px solid ${theme.primaryColor}`,
    fontFamily: theme.fontFamily || "inherit",
    fontWeight: theme.fontWeight || 400,
    fontSize: theme.fontSize || "16px",
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
              ...getFontStyle(theme, "main"),
              border: `1.5px solid ${theme.primaryColor}`,
            }}
          >
            Audit Logs &amp; Monitoring
          </NavLinkButton>
          <NavLinkButton
            to={getRoutePath("doctor.regulatory_compliance")}
            color="primary"
            className={"px-5"}
            style={{
              ...getFontStyle(theme, "main"),
              border: `1.5px solid ${theme.primaryColor}`,
            }}
          >
            Regulatory Compliance
          </NavLinkButton>
          <NavLinkButton
            to={getRoutePath("doctor.hippa_policy")}
            color="primary"
            className={"px-5"}
            style={{
              ...getFontStyle(theme, "main"),
              backgroundColor: theme.primaryColor,
              color: "#fff",
              border: `1.5px solid ${theme.primaryColor}`,
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
            style={getFontStyle(theme, "subHeading")}
          >
            HIPPA Policy
          </h2>
          <button
            className="px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-80 transition-opacity"
            style={{
              ...getFontStyle(theme, "body1"),
              backgroundColor: theme.primaryColor,
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
              style={getFontStyle(theme, "subHeading")}
            >
              Health Insurance Portability and Accountability Act (HIPAA) Compliance
            </h3>
            <p
              className="text-gray-600 mb-4 leading-relaxed"
              style={getFontStyle(theme, "body1")}
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
                style={getFontStyle(theme, "body1")}
              >
                <i className="material-icons text-blue-600">security</i>
                Data Protection
              </h4>
              <ul className="space-y-2">
                <li
                  className="flex items-start gap-2"
                  style={getFontStyle(theme, "body2")}
                >
                  <i className="material-icons text-green-500 text-sm mt-1">check</i>
                  End-to-end encryption for all patient data
                </li>
                <li
                  className="flex items-start gap-2"
                  style={getFontStyle(theme, "body2")}
                >
                  <i className="material-icons text-green-500 text-sm mt-1">check</i>
                  Secure data transmission protocols
                </li>
                <li
                  className="flex items-start gap-2"
                  style={getFontStyle(theme, "body2")}
                >
                  <i className="material-icons text-green-500 text-sm mt-1">check</i>
                  Regular security audits and assessments
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4
                className="font-semibold mb-3 flex items-center gap-2"
                style={getFontStyle(theme, "body1")}
              >
                <i className="material-icons text-green-600">verified_user</i>
                Access Control
              </h4>
              <ul className="space-y-2">
                <li
                  className="flex items-start gap-2"
                  style={getFontStyle(theme, "body2")}
                >
                  <i className="material-icons text-green-500 text-sm mt-1">check</i>
                  Role-based access permissions
                </li>
                <li
                  className="flex items-start gap-2"
                  style={getFontStyle(theme, "body2")}
                >
                  <i className="material-icons text-green-500 text-sm mt-1">check</i>
                  Multi-factor authentication
                </li>
                <li
                  className="flex items-start gap-2"
                  style={getFontStyle(theme, "body2")}
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
              style={getFontStyle(theme, "body1")}
            >
              Key Policy Points
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5
                  className="font-medium mb-2"
                  style={getFontStyle(theme, "body1")}
                >
                  Minimum Necessary Standard
                </h5>
                <p
                  className="text-sm text-gray-600"
                  style={getFontStyle(theme, "body2")}
                >
                  Access to PHI is limited to the minimum necessary to accomplish the intended purpose.
                </p>
              </div>
              <div>
                <h5
                  className="font-medium mb-2"
                  style={getFontStyle(theme, "body1")}
                >
                  Patient Rights
                </h5>
                <p
                  className="text-sm text-gray-600"
                  style={getFontStyle(theme, "body2")}
                >
                  Patients have the right to access, amend, and request restrictions on their PHI.
                </p>
              </div>
              <div>
                <h5
                  className="font-medium mb-2"
                  style={getFontStyle(theme, "body1")}
                >
                  Breach Notification
                </h5>
                <p
                  className="text-sm text-gray-600"
                  style={getFontStyle(theme, "body2")}
                >
                  Immediate notification procedures in place for any potential data breaches.
                </p>
              </div>
              <div>
                <h5
                  className="font-medium mb-2"
                  style={getFontStyle(theme, "body1")}
                >
                  Staff Training
                </h5>
                <p
                  className="text-sm text-gray-600"
                  style={getFontStyle(theme, "body2")}
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
