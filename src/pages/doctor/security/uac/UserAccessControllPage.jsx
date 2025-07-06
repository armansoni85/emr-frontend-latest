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

const UserAccessControlPage = () => {
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

  const getIconStyle = (color = customTheme.primaryColor) => ({
    color: color,
    fontSize: fontTheme.fontSize || "20px",
    fontFamily: fontTheme.fontFamily || "inherit",
    fontWeight: fontTheme.fontWeight || 400,
  });

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
          <a
            href=""
            style={getButtonStyle(false)}
            className="px-5 py-2 rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white"
          >
            Admin
          </a>
          <a
            href=""
            style={getButtonStyle(true)}
            className="px-5 py-2 rounded-full font-light"
          >
            Doctor
          </a>
          <a
            href=""
            style={getButtonStyle(false)}
            className="px-5 py-2 rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white"
          >
            Patient
          </a>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 px-3 py-3 gap-3">
        <div className="bg-white rounded-[20px] shadow-lg mb-4 flex flex-col">
          <div className=" h-full">
            <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
              <h2
                className="text-lg font-medium"
                style={getFontStyle(fontTheme, "subHeading")}
              >
                Doctor's Access
              </h2>
              <button
                style={getButtonStyle(false)}
                className="px-4 py-1 rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white"
              >
                Edit
              </button>
            </div>
            <div className="relative p-4">
              <table className="w-full">
                <tbody>
                  <tr>
                    <th
                      className="text-start"
                      style={getFontStyle(fontTheme, "body1")}
                    >
                      Access
                    </th>
                    <th
                      className="text-end"
                      style={getFontStyle(fontTheme, "body1")}
                    >
                      Status
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex gap-2">
                        <div className="form-group">
                          <input
                            type="checkbox"
                            id="edit_patient_profile"
                            name="edit_patient_profile"
                            className="hidden"
                            defaultChecked=""
                          />
                          <label
                            htmlFor="edit_patient_profile"
                            className="cursor-pointer border-2 rounded-lg pt-1"
                          >
                            <i className="material-icons" id="check_icon">
                              check
                            </i>
                          </label>
                        </div>
                        <span
                          className="my-auto inline"
                          style={getFontStyle(fontTheme, "body2")}
                        >
                          To Edit Patient Profile
                        </span>
                      </div>
                    </td>
                    <td className="text-end">
                      <span
                        className="text-green-500"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        Enabled
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccessControlPage;
