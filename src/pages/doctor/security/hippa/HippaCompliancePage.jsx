import { useEffect, useState } from "react";
import { NavLinkButton } from "@src/components";
import { getRoutePath } from "@src/utils/routeUtils";

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

const HippaCompliancePage = () => {
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
              backgroundColor: customTheme.primaryColor,
              color: "#fff",
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
        </div>
      </div>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
          <h2
            className="text-lg font-medium"
            style={getFontStyle(fontTheme, "subHeading")}
          >
            Audit Logs &amp; Monitoring
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr style={getFontStyle(fontTheme, "body2")}>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Date &amp; Time
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Event
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Name
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Profile
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Email
                </th>
              </tr>
            </thead>
            <tbody
              className="text-body"
              style={getFontStyle(fontTheme, "body1")}
            >
              <tr>
                <td className="py-2 px-4 border-b">2023-10-01 14:30</td>
                <td className="py-2 px-4 border-b">Login</td>
                <td className="py-2 px-4 border-b">Dr. Jane Smith</td>
                <td className="py-2 px-4 border-b">Doctor</td>
                <td className="py-2 px-4 border-b">jane.smith@example.com</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">2023-10-01 15:00</td>
                <td className="py-2 px-4 border-b">Logout</td>
                <td className="py-2 px-4 border-b">Dr. John Doe</td>
                <td className="py-2 px-4 border-b">Doctor</td>
                <td className="py-2 px-4 border-b">john.doe@example.com</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">2023-10-01 15:30</td>
                <td className="py-2 px-4 border-b">File Access</td>
                <td className="py-2 px-4 border-b">Nurse Mary Johnson</td>
                <td className="py-2 px-4 border-b">Nurse</td>
                <td className="py-2 px-4 border-b">mary.johnson@example.com</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">2023-10-01 16:00</td>
                <td className="py-2 px-4 border-b">File Update</td>
                <td className="py-2 px-4 border-b">Admin Alice Brown</td>
                <td className="py-2 px-4 border-b">Admin</td>
                <td className="py-2 px-4 border-b">alice.brown@example.com</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">2023-10-01 16:30</td>
                <td className="py-2 px-4 border-b">Login</td>
                <td className="py-2 px-4 border-b">Dr. Emily Davis</td>
                <td className="py-2 px-4 border-b">Doctor</td>
                <td className="py-2 px-4 border-b">emily.davis@example.com</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">2023-10-01 17:00</td>
                <td className="py-2 px-4 border-b">Logout</td>
                <td className="py-2 px-4 border-b">Nurse Michael Wilson</td>
                <td className="py-2 px-4 border-b">Nurse</td>
                <td className="py-2 px-4 border-b">
                  michael.wilson@example.com
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">2023-10-01 17:30</td>
                <td className="py-2 px-4 border-b">File Access</td>
                <td className="py-2 px-4 border-b">Admin Sarah Lee</td>
                <td className="py-2 px-4 border-b">Admin</td>
                <td className="py-2 px-4 border-b">sarah.lee@example.com</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">2023-10-01 18:00</td>
                <td className="py-2 px-4 border-b">File Update</td>
                <td className="py-2 px-4 border-b">Dr. Robert Martinez</td>
                <td className="py-2 px-4 border-b">Doctor</td>
                <td className="py-2 px-4 border-b">
                  robert.martinez@example.com
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">2023-10-01 18:30</td>
                <td className="py-2 px-4 border-b">Login</td>
                <td className="py-2 px-4 border-b">Nurse Linda Clark</td>
                <td className="py-2 px-4 border-b">Nurse</td>
                <td className="py-2 px-4 border-b">linda.clark@example.com</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end items-center mt-4 mx-4">
            <div className="space-x-1" style={getFontStyle(fontTheme, "body2")}>
              <span>Page</span>
              <button
                style={getButtonStyle(false)}
                className="px-4 border rounded-full transition-all duration-150"
              >
                1
              </button>
              <span>of 100</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HippaCompliancePage;
