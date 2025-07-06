import { useEffect, useState } from "react";

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

const PatientAppointmentPage = () => {
  const [fontTheme, setFontTheme] = useState(getFontTheme());
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

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div
          className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b"
          style={getFontStyle(fontTheme, "subHeading")}
        >
          <h2
            className="text-lg font-medium"
            style={getFontStyle(fontTheme, "subHeading")}
          >
            All Appointments
          </h2>
          <div className="text-end inline-block">
            <button
              className="bg-primary text-white rounded-full h-8 w-8 text-2xl"
              style={getFontStyle(fontTheme, "body2")}
            >
              +
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr style={getFontStyle(fontTheme, "body2")}>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Doctor Name{" "}
                  <i className="material-icons align-middle">arrow_drop_down</i>
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Date &amp; Time
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Disease
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Reason of Visit
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Status
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Full Details
                </th>
              </tr>
            </thead>
            <tbody
              className="text-body"
              style={getFontStyle(fontTheme, "body1")}
            >
              <tr>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(fontTheme, "body1")}>
                        Sarah Connor
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        #45678901
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  July 10, 2024 - 10:00AM
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="px-2 py-1 border rounded-full border-info text-info"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Cold
                  </span>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Routine Checkup
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="text-success"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Done
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    disabled=""
                    className="disabled:opacity-30 disabled:pointer-events-none px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    View Notes
                  </button>
                  <div className="float-right relative">
                    <button
                      className="px-3 py-1"
                      style={getFontStyle(fontTheme, "body2")}
                    >
                      <i className="material-icons">more_vert</i>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(fontTheme, "body1")}>John Doe</p>
                      <span
                        className="text-muted"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        #23456789
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  June 15, 2024 - 11:30AM
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="px-2 py-1 border rounded-full border-danger text-danger"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Fever
                  </span>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Follow-up
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="text-danger"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Rejected
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() =>
                      window.openModal && window.openModal("modalTemplate")
                    }
                    className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    View Notes
                  </button>
                  <div className="float-right relative">
                    <button
                      className="px-3 py-1"
                      style={getFontStyle(fontTheme, "body2")}
                    >
                      <i className="material-icons">more_vert</i>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(fontTheme, "body1")}>Jane Smith</p>
                      <span
                        className="text-muted"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        #34567890
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  May 5, 2024 - 9:00AM
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="px-2 py-1 border rounded-full border-purple text-purple"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Allergy
                  </span>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Consultation
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="text-info"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    In Progress
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() =>
                      window.openModal && window.openModal("modalTemplate")
                    }
                    className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    View Notes
                  </button>
                  <div className="float-right relative">
                    <button
                      className="px-3 py-1"
                      style={getFontStyle(fontTheme, "body2")}
                    >
                      <i className="material-icons">more_vert</i>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(fontTheme, "body1")}>
                        Robert Wilson
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        #56789012
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  April 20, 2024 - 2:00PM
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="px-2 py-1 border rounded-full border-warning text-warning"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Headache
                  </span>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Emergency
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="text-success"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Done
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() =>
                      window.openModal && window.openModal("modalTemplate")
                    }
                    className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    View Notes
                  </button>
                  <div className="float-right relative">
                    <button
                      className="px-3 py-1"
                      style={getFontStyle(fontTheme, "body2")}
                    >
                      <i className="material-icons">more_vert</i>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(fontTheme, "body1")}>
                        Emily Davis
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        #67890123
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  March 30, 2024 - 4:30PM
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="px-2 py-1 border rounded-full border-danger text-danger"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Infection
                  </span>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Follow-up
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="text-danger"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Rejected
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() =>
                      window.openModal && window.openModal("modalTemplate")
                    }
                    className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    View Notes
                  </button>
                  <div className="float-right relative">
                    <button
                      className="px-3 py-1"
                      style={getFontStyle(fontTheme, "body2")}
                    >
                      <i className="material-icons">more_vert</i>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end items-center mt-4 mx-4">
            <div className="space-x-1" style={getFontStyle(fontTheme, "body2")}>
              <span>Page</span>
              <button
                className="px-4 border border-muted rounded-full text-muted hover:bg-muted hover:text-white transition-all duration-150"
                style={getFontStyle(fontTheme, "body2")}
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

export default PatientAppointmentPage;
