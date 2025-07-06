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

const PatientMedicalHistoryPage = () => {
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
      <div className="bg-white rounded-2xl grid lg:grid-cols-3 grid-cols-1 p-6 gap-4">
        <div className="bg-white rounded-2xl border">
          <div
            className="bg-grey bg-opacity rounded-t-2xl py-3 px-5 border-b"
            style={getFontStyle(fontTheme, "subHeading")}
          >
            <h6
              className="text-xl"
              style={getFontStyle(fontTheme, "subHeading")}
            >
              Appointments &amp; Lab History
            </h6>
          </div>
          <div className="pt-8 pb-3">
            <div className="ps-8 pe-6 pb-1">
              <div
                className="flex justify-between border-l ps-4 border-primary relative pb-5"
                style={getFontStyle(fontTheme, "body1")}
              >
                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                <div className="text-start">
                  <h6 style={getFontStyle(fontTheme, "body1")}>Appointment</h6>
                  <span
                    className="text-muted font-light"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Doctor: John Smith
                  </span>
                </div>
                <div
                  className="text-end text-muted font-light text-sm"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  <p>August 20,2024</p>
                  <p>2:00PM</p>
                </div>
              </div>
            </div>
            <div className="ps-8 pe-6 pb-1">
              <div
                className="flex justify-between border-l ps-4 border-primary relative pb-5"
                style={getFontStyle(fontTheme, "body1")}
              >
                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                <div className="text-start">
                  <h6 style={getFontStyle(fontTheme, "body1")}>Lab Report</h6>
                  <span
                    className="text-muted font-light"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Report of: Blood Sugar
                  </span>
                </div>
                <div
                  className="text-end text-muted font-light text-sm"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  <p>August 20,2024</p>
                  <p>2:00PM</p>
                </div>
              </div>
            </div>
            <div className="ps-8 pe-6 pb-1">
              <div
                className="flex justify-between border-l ps-4 border-primary relative pb-5"
                style={getFontStyle(fontTheme, "body1")}
              >
                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                <div className="text-start">
                  <h6 style={getFontStyle(fontTheme, "body1")}>Appointment</h6>
                  <span
                    className="text-muted font-light"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Doctor: John Smith
                  </span>
                </div>
                <div
                  className="text-end text-muted font-light text-sm"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  <p>August 20,2024</p>
                  <p>2:00PM</p>
                </div>
              </div>
            </div>
            <div className="ps-8 pe-6 pb-1">
              <div
                className="flex justify-between border-l ps-4 border-primary relative pb-5"
                style={getFontStyle(fontTheme, "body1")}
              >
                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                <div className="text-start">
                  <h6 style={getFontStyle(fontTheme, "body1")}>Lab Report</h6>
                  <span
                    className="text-muted font-light"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Report of: Blood Sugar
                  </span>
                </div>
                <div
                  className="text-end text-muted font-light text-sm"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  <p>August 20,2024</p>
                  <p>2:00PM</p>
                </div>
              </div>
            </div>
            <div className="ps-8 pe-6 pb-1">
              <div
                className="flex justify-between border-l ps-4 border-primary relative pb-5"
                style={getFontStyle(fontTheme, "body1")}
              >
                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                <div className="text-start">
                  <h6 style={getFontStyle(fontTheme, "body1")}>Appointment</h6>
                  <span
                    className="text-muted font-light"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    Doctor: John Smith
                  </span>
                </div>
                <div
                  className="text-end text-muted font-light text-sm"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  <p>August 20,2024</p>
                  <p>2:00PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 col-span-2">
          <div className="bg-grey p-6 rounded-2xl">
            <div className="mb-4 grid lg:grid-cols-3">
              <label
                htmlFor="patientName"
                className="block text-nowrap my-auto"
                style={getFontStyle(fontTheme, "body1")}
              >
                Patient Name:
              </label>
              <div className="flex items-center w-full col-span-2 relative">
                <input
                  id="patientName"
                  type="text"
                  defaultValue="Appendectomy (2016)"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-full"
                  placeholder="Enter Patient's Name"
                  style={getFontStyle(fontTheme, "body2")}
                />
                <span
                  className="absolute right-5 text-primary top-5 cursor-pointer"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  Add New
                </span>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <div
                className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative"
                style={getFontStyle(fontTheme, "body2")}
              >
                <span>Appendectomy (2016)</span>
                <span className="material-icons text-muted cursor-pointer absolute right-3 top-[7px] cursor-pointer">
                  close
                </span>
              </div>
              <div
                className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative"
                style={getFontStyle(fontTheme, "body2")}
              >
                <span>Appendectomy (2010)</span>
                <span className="material-icons text-muted cursor-pointer absolute right-3 top-[7px] cursor-pointer">
                  close
                </span>
              </div>
            </div>
          </div>
          <div className="bg-grey p-6 rounded-2xl">
            <div className="mb-4 grid lg:grid-cols-3">
              <label
                htmlFor="patientName"
                className="block text-nowrap my-auto"
                style={getFontStyle(fontTheme, "body1")}
              >
                Previous Hospitalization:
              </label>
              <div className="flex items-center w-full col-span-2 relative">
                <input
                  id="patientName"
                  type="text"
                  defaultValue="Appendectomy (2016)"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-full"
                  placeholder="Enter Patient's Name"
                  style={getFontStyle(fontTheme, "body2")}
                />
                <span
                  className="absolute right-5 text-primary top-5 cursor-pointer"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  Add New
                </span>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <div
                className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative"
                style={getFontStyle(fontTheme, "body2")}
              >
                <span>DMC Hospital (2016 for Pneumonia)</span>
                <span className="material-icons text-muted cursor-pointer absolute right-3 top-[7px] cursor-pointer">
                  close
                </span>
              </div>
            </div>
          </div>
          <div className="bg-grey p-6 rounded-2xl">
            <div className="mb-4 grid lg:grid-cols-3">
              <label
                htmlFor="patientName"
                className="block text-nowrap my-auto"
                style={getFontStyle(fontTheme, "body1")}
              >
                Family Member History:
              </label>
              <div className="flex items-center w-full col-span-2 relative">
                <input
                  id="patientName"
                  type="text"
                  defaultValue="Appendectomy (2016)"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-full"
                  placeholder="Enter Patient's Name"
                  style={getFontStyle(fontTheme, "body2")}
                />
                <span
                  className="absolute right-5 text-primary top-5 cursor-pointer"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  Add New
                </span>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <div
                className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative"
                style={getFontStyle(fontTheme, "body2")}
              >
                <span>Heart Disease (Mother)</span>
                <span className="material-icons text-muted cursor-pointer absolute right-3 top-[7px] cursor-pointer">
                  close
                </span>
              </div>
              <div
                className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative"
                style={getFontStyle(fontTheme, "body2")}
              >
                <span>Heart Disease (Father)</span>
                <span className="material-icons text-muted cursor-pointer absolute right-3 top-[7px] cursor-pointer">
                  close
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientMedicalHistoryPage;
