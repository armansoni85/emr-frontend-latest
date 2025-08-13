import { useEffect, useState } from "react";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

const PatientMedicalHistoryPage = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className="bg-white rounded-2xl grid lg:grid-cols-3 grid-cols-1 p-6 gap-4">
        <div className="bg-white rounded-2xl border">
          <div
            className="bg-grey bg-opacity rounded-t-2xl py-3 px-5 border-b"
            style={getFontStyle(theme, "subHeading")}
          >
            <h6
              className="text-xl"
              style={getFontStyle(theme, "subHeading")}
            >
              Appointments &amp; Lab History
            </h6>
          </div>
          <div className="pt-8 pb-3">
            <div className="ps-8 pe-6 pb-1">
              <div
                className="flex justify-between border-l ps-4 border-primary relative pb-5"
                style={getFontStyle(theme, "body1")}
              >
                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                <div className="text-start">
                  <h6 style={getFontStyle(theme, "body1")}>Appointment</h6>
                  <span
                    className="text-muted font-light"
                    style={getFontStyle(theme, "body2")}
                  >
                    Doctor: John Smith
                  </span>
                </div>
                <div
                  className="text-end text-muted font-light text-sm"
                  style={getFontStyle(theme, "body2")}
                >
                  <p>August 20,2024</p>
                  <p>2:00PM</p>
                </div>
              </div>
            </div>
            <div className="ps-8 pe-6 pb-1">
              <div
                className="flex justify-between border-l ps-4 border-primary relative pb-5"
                style={getFontStyle(theme, "body1")}
              >
                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                <div className="text-start">
                  <h6 style={getFontStyle(theme, "body1")}>Lab Report</h6>
                  <span
                    className="text-muted font-light"
                    style={getFontStyle(theme, "body2")}
                  >
                    Report of: Blood Sugar
                  </span>
                </div>
                <div
                  className="text-end text-muted font-light text-sm"
                  style={getFontStyle(theme, "body2")}
                >
                  <p>August 20,2024</p>
                  <p>2:00PM</p>
                </div>
              </div>
            </div>
            <div className="ps-8 pe-6 pb-1">
              <div
                className="flex justify-between border-l ps-4 border-primary relative pb-5"
                style={getFontStyle(theme, "body1")}
              >
                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                <div className="text-start">
                  <h6 style={getFontStyle(theme, "body1")}>Appointment</h6>
                  <span
                    className="text-muted font-light"
                    style={getFontStyle(theme, "body2")}
                  >
                    Doctor: John Smith
                  </span>
                </div>
                <div
                  className="text-end text-muted font-light text-sm"
                  style={getFontStyle(theme, "body2")}
                >
                  <p>August 20,2024</p>
                  <p>2:00PM</p>
                </div>
              </div>
            </div>
            <div className="ps-8 pe-6 pb-1">
              <div
                className="flex justify-between border-l ps-4 border-primary relative pb-5"
                style={getFontStyle(theme, "body1")}
              >
                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                <div className="text-start">
                  <h6 style={getFontStyle(theme, "body1")}>Lab Report</h6>
                  <span
                    className="text-muted font-light"
                    style={getFontStyle(theme, "body2")}
                  >
                    Report of: Blood Sugar
                  </span>
                </div>
                <div
                  className="text-end text-muted font-light text-sm"
                  style={getFontStyle(theme, "body2")}
                >
                  <p>August 20,2024</p>
                  <p>2:00PM</p>
                </div>
              </div>
            </div>
            <div className="ps-8 pe-6 pb-1">
              <div
                className="flex justify-between border-l ps-4 border-primary relative pb-5"
                style={getFontStyle(theme, "body1")}
              >
                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                <div className="text-start">
                  <h6 style={getFontStyle(theme, "body1")}>Appointment</h6>
                  <span
                    className="text-muted font-light"
                    style={getFontStyle(theme, "body2")}
                  >
                    Doctor: John Smith
                  </span>
                </div>
                <div
                  className="text-end text-muted font-light text-sm"
                  style={getFontStyle(theme, "body2")}
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
                style={getFontStyle(theme, "body1")}
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
                  style={getFontStyle(theme, "body2")}
                />
                <span
                  className="absolute right-5 text-primary top-5 cursor-pointer"
                  style={getFontStyle(theme, "body2")}
                >
                  Add New
                </span>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <div
                className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative"
                style={getFontStyle(theme, "body2")}
              >
                <span>Appendectomy (2016)</span>
                <span className="material-icons text-muted cursor-pointer absolute right-3 top-[7px] cursor-pointer">
                  close
                </span>
              </div>
              <div
                className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative"
                style={getFontStyle(theme, "body2")}
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
                style={getFontStyle(theme, "body1")}
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
                  style={getFontStyle(theme, "body2")}
                />
                <span
                  className="absolute right-5 text-primary top-5 cursor-pointer"
                  style={getFontStyle(theme, "body2")}
                >
                  Add New
                </span>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <div
                className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative"
                style={getFontStyle(theme, "body2")}
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
                style={getFontStyle(theme, "body1")}
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
                  style={getFontStyle(theme, "body2")}
                />
                <span
                  className="absolute right-5 text-primary top-5 cursor-pointer"
                  style={getFontStyle(theme, "body2")}
                >
                  Add New
                </span>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <div
                className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative"
                style={getFontStyle(theme, "body2")}
              >
                <span>Heart Disease (Mother)</span>
                <span className="material-icons text-muted cursor-pointer absolute right-3 top-[7px] cursor-pointer">
                  close
                </span>
              </div>
              <div
                className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative"
                style={getFontStyle(theme, "body2")}
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
