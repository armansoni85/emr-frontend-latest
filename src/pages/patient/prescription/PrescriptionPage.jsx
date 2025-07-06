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

const PrescriptionPage = () => {
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
      <div className="mb-3 grid grid-cols-1 md:grid-cols-3 md:gap-4">
        <div className="mb-3">
          <label htmlFor="search" style={getFontStyle(fontTheme, "body1")}>
            Search
          </label>
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search by Name or DOB"
              className="w-full rounded-full pe-4 ps-10 py-3 border-grey focus:outline-grey2"
              style={getFontStyle(fontTheme, "body2")}
            />
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              search
            </span>
            <button
              className="absolute right-2 top-[6px] px-5 2xl:py-2 py-1 text-sm rounded-full text-white bg-primary"
              style={getFontStyle(fontTheme, "body2")}
            >
              Search
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="search" style={getFontStyle(fontTheme, "body1")}>
            Date
          </label>
          <div className="relative mt-2 text-muted">
            <input
              type="date"
              className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2"
              style={getFontStyle(fontTheme, "body2")}
            />
            <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              calendar_today
            </i>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
          <h2
            className="text-lg font-medium"
            style={getFontStyle(fontTheme, "subHeading")}
          >
            All Prescriptions
          </h2>
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
                  Date of Birth
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Disease
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Date &amp; Time
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Refill in
                </th>
                <th className="py-2 px-4 border-b text-start font-medium" />
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
                      src="../assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span style={getFontStyle(fontTheme, "body1")}>
                      Michael Brown
                    </span>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  01/01/1980
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="px-2 py-1 border rounded-full border-warning text-warning"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Typhoid
                  </span>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  November 12, 2024, 11:00 AM
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  5 days
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-between">
                    <button
                      className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                      style={getFontStyle(fontTheme, "body2")}
                    >
                      Send Request
                    </button>
                    <div className="float-right relative">
                      <button className="px-3 py-1">
                        <i className="material-icons">file_download</i>
                      </button>
                      <button className="px-3 py-1">
                        <i className="material-icons">print</i>
                      </button>
                      <button className="px-3 py-1">
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
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span style={getFontStyle(fontTheme, "body1")}>
                      Michael Brown
                    </span>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  02/02/1990
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="px-2 py-1 border rounded-full border-info text-info"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Cholera
                  </span>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  November 12, 2024, 12:00 PM
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  10 days
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-between">
                    <button
                      className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                      style={getFontStyle(fontTheme, "body2")}
                    >
                      Send Request
                    </button>
                    <div className="float-right relative">
                      <button className="px-3 py-1">
                        <i className="material-icons">file_download</i>
                      </button>
                      <button className="px-3 py-1">
                        <i className="material-icons">print</i>
                      </button>
                      <button className="px-3 py-1">
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
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span style={getFontStyle(fontTheme, "body1")}>
                      Michael Brown
                    </span>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  03/03/1985
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
                  November 12, 2024, 01:00 PM
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  15 days
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-between">
                    <button
                      className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                      style={getFontStyle(fontTheme, "body2")}
                    >
                      Send Request
                    </button>
                    <div className="float-right relative">
                      <button className="px-3 py-1">
                        <i className="material-icons">file_download</i>
                      </button>
                      <button className="px-3 py-1">
                        <i className="material-icons">print</i>
                      </button>
                      <button className="px-3 py-1">
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
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span style={getFontStyle(fontTheme, "body1")}>
                      Michael Brown
                    </span>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  04/04/1975
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="px-2 py-1 border rounded-full border-purple text-purple"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Malaria
                  </span>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  November 12, 2024, 02:00 PM
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  20 days
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-between">
                    <button
                      className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                      style={getFontStyle(fontTheme, "body2")}
                    >
                      Send Request
                    </button>
                    <div className="float-right relative">
                      <button className="px-3 py-1">
                        <i className="material-icons">file_download</i>
                      </button>
                      <button className="px-3 py-1">
                        <i className="material-icons">print</i>
                      </button>
                      <button className="px-3 py-1">
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
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end items-center mt-4 mx-4">
            <div className="space-x-1" style={getFontStyle(fontTheme, "body2")}>
              <span>Page</span>
              <button className="px-4 border border-muted rounded-full text-muted hover:bg-muted hover:text-white transition-all duration-150">
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

export default PrescriptionPage;
