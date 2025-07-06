import React, { useEffect, useState } from "react";

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

const PatientNotesPage = () => {
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
            All Notes
          </h2>
          <div className="text-end inline-block">
            <button
              className="bg-primary text-white rounded-full text-nowrap px-3 py-2"
              type="button"
              style={getFontStyle(fontTheme, "body2")}
              onClick={() =>
                window.openModal && window.openModal("modalTemplate")
              }
            >
              + Add Notes
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr style={getFontStyle(fontTheme, "body2")}>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Subjective{" "}
                  <i className="material-icons align-middle">arrow_drop_down</i>
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  CC
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Allergies
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Vitals
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Plan
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Date &amp; Time
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className="text-body"
              style={getFontStyle(fontTheme, "body1")}
            >
              <tr>
                <td className="py-2 px-4 border-b ">Subjective 1</td>
                <td className="py-2 px-4 border-b">Routine Checkup</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="px-2 py-1 border rounded-full border-info text-info"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    None
                  </span>
                </td>
                <td className="py-2 px-4 border-b">Normal</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className="text-success"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Done
                  </span>
                </td>
                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:underline"
                    type="button"
                    style={getFontStyle(fontTheme, "body2")}
                    onClick={() => window.editNote && window.editNote(1)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    type="button"
                    style={getFontStyle(fontTheme, "body2")}
                    onClick={() => window.deleteNote && window.deleteNote(1)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">Subjective 2</td>
                <td className="py-2 px-4 border-b">Follow-up</td>
                <td className="py-2 px-4 border-b">
                  <span className="px-2 py-1 border rounded-full border-danger text-danger">
                    None
                  </span>
                </td>
                <td className="py-2 px-4 border-b">Normal</td>
                <td className="py-2 px-4 border-b">
                  <span className="text-danger">Rejected</span>
                </td>
                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:underline"
                    type="button"
                    style={getFontStyle(fontTheme, "body2")}
                    onClick={() => window.editNote && window.editNote(2)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    type="button"
                    style={getFontStyle(fontTheme, "body2")}
                    onClick={() => window.deleteNote && window.deleteNote(2)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">Subjective 3</td>
                <td className="py-2 px-4 border-b">Consultation</td>
                <td className="py-2 px-4 border-b">
                  <span className="px-2 py-1 border rounded-full border-purple text-purple">
                    None
                  </span>
                </td>
                <td className="py-2 px-4 border-b">Normal</td>
                <td className="py-2 px-4 border-b">
                  <span className="text-info">In Progress</span>
                </td>
                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:underline"
                    type="button"
                    style={getFontStyle(fontTheme, "body2")}
                    onClick={() => window.editNote && window.editNote(3)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    type="button"
                    style={getFontStyle(fontTheme, "body2")}
                    onClick={() => window.deleteNote && window.deleteNote(3)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">Subjective 4</td>
                <td className="py-2 px-4 border-b">Emergency</td>
                <td className="py-2 px-4 border-b">
                  <span className="px-2 py-1 border rounded-full border-warning text-warning">
                    None
                  </span>
                </td>
                <td className="py-2 px-4 border-b">Normal</td>
                <td className="py-2 px-4 border-b">
                  <span className="text-success">Done</span>
                </td>
                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:underline"
                    type="button"
                    style={getFontStyle(fontTheme, "body2")}
                    onClick={() => window.editNote && window.editNote(4)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    type="button"
                    style={getFontStyle(fontTheme, "body2")}
                    onClick={() => window.deleteNote && window.deleteNote(4)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">Subjective 5</td>
                <td className="py-2 px-4 border-b">Follow-up</td>
                <td className="py-2 px-4 border-b">
                  <span className="px-2 py-1 border rounded-full border-danger text-danger">
                    None
                  </span>
                </td>
                <td className="py-2 px-4 border-b">Normal</td>
                <td className="py-2 px-4 border-b">
                  <span className="text-danger">Rejected</span>
                </td>
                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:underline"
                    type="button"
                    style={getFontStyle(fontTheme, "body2")}
                    onClick={() => window.editNote && window.editNote(5)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    type="button"
                    style={getFontStyle(fontTheme, "body2")}
                    onClick={() => window.deleteNote && window.deleteNote(5)}
                  >
                    Delete
                  </button>
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

export default PatientNotesPage;
