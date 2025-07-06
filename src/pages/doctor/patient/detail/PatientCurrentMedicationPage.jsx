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

const PatientCurrentMedicationPage = () => {
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
      <div className="bg-white rounded-2xl grid lg:grid-cols-2 grid-cols-1 p-6 gap-4">
        <div className="bg-grey rounded-2xl">
          <div
            className="rounded-t-2xl py-3 px-5 border-b"
            style={getFontStyle(fontTheme, "subHeading")}
          >
            <h6
              className="text-xl"
              style={getFontStyle(fontTheme, "subHeading")}
            >
              Current Medication
            </h6>
          </div>
          <div className="p-6">
            <div className="pb-3">
              <div className="mb-4 grid lg:grid-cols-3">
                <label
                  htmlFor="medicineName"
                  className="block text-nowrap my-auto"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Medicine Name:
                </label>
                <div className="flex items-center w-full col-span-2">
                  <input
                    id="medicineName"
                    type="text"
                    defaultValue="Paracetamol"
                    className="text-body focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-full"
                    placeholder="Enter Medicine Name"
                    style={getFontStyle(fontTheme, "body2")}
                  />
                </div>
              </div>
              <div className="mb-4 grid lg:grid-cols-3">
                <label
                  htmlFor="dosage"
                  className="block text-nowrap my-auto"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Dosage:
                </label>
                <div className="flex items-center w-full col-span-2">
                  <input
                    id="dosage"
                    type="text"
                    defaultValue="500mg"
                    className="text-body focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-full"
                    placeholder="Enter Dosage"
                    style={getFontStyle(fontTheme, "body2")}
                  />
                </div>
              </div>
              <div className="mb-4 grid lg:grid-cols-3">
                <label
                  htmlFor="frequency"
                  className="block text-nowrap my-auto"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Frequency:
                </label>
                <div className="flex items-center w-full col-span-2">
                  <input
                    id="frequency"
                    type="text"
                    defaultValue="Twice a day"
                    className="text-body focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-full"
                    placeholder="Enter Frequency"
                    style={getFontStyle(fontTheme, "body2")}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="px-8 py-3 bg-primary border border-primary rounded-full text-white hover:bg-opacity-[0.9] transition-all duration-150"
                style={getFontStyle(fontTheme, "body1")}
              >
                Add Current Medication
              </button>
            </div>
          </div>
        </div>
        <div className="bg-grey rounded-2xl">
          <div
            className="rounded-t-2xl py-3 px-5 border-b"
            style={getFontStyle(fontTheme, "subHeading")}
          >
            <h6
              className="text-xl"
              style={getFontStyle(fontTheme, "subHeading")}
            >
              Current Medication List
            </h6>
          </div>
          <div className="p-6">
            <ol className="list-decimal ps-3">
              <li className="ps-3 mb-4">
                <div
                  className="relative bg-white text-body rounded-full px-5 py-3"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  <span>Paracetamol</span>
                  <span
                    className="bg-grey rounded-full px-5 py-2 absolute right-1 top-[4px] cursor-pointer"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Once a Day
                  </span>
                </div>
              </li>
              <li className="ps-3 mb-4">
                <div
                  className="relative bg-white text-body rounded-full px-5 py-3"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  <span>Ibuprofen</span>
                  <span
                    className="bg-grey rounded-full px-5 py-2 absolute right-1 top-[4px] cursor-pointer"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Twice a Day
                  </span>
                </div>
              </li>
              <li className="ps-3 mb-4">
                <div
                  className="relative bg-white text-body rounded-full px-5 py-3"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  <span>Amoxicillin</span>
                  <span
                    className="bg-grey rounded-full px-5 py-2 absolute right-1 top-[4px] cursor-pointer"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Three times a Day
                  </span>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientCurrentMedicationPage;
