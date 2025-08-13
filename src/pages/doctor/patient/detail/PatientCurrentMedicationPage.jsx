import { useEffect, useState } from "react";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

const PatientCurrentMedicationPage = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className="bg-white rounded-2xl grid lg:grid-cols-2 grid-cols-1 p-6 gap-4">
        <div className="bg-grey rounded-2xl">
          <div
            className="rounded-t-2xl py-3 px-5 border-b"
            style={getFontStyle(theme, "subHeading")}
          >
            <h6
              className="text-xl"
              style={getFontStyle(theme, "subHeading")}
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
                  style={getFontStyle(theme, "body1")}
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
                    style={getFontStyle(theme, "body2")}
                  />
                </div>
              </div>
              <div className="mb-4 grid lg:grid-cols-3">
                <label
                  htmlFor="dosage"
                  className="block text-nowrap my-auto"
                  style={getFontStyle(theme, "body1")}
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
                    style={getFontStyle(theme, "body2")}
                  />
                </div>
              </div>
              <div className="mb-4 grid lg:grid-cols-3">
                <label
                  htmlFor="frequency"
                  className="block text-nowrap my-auto"
                  style={getFontStyle(theme, "body1")}
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
                    style={getFontStyle(theme, "body2")}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="px-8 py-3 bg-primary border border-primary rounded-full text-white hover:bg-opacity-[0.9] transition-all duration-150"
                style={getFontStyle(theme, "body1")}
              >
                Add Current Medication
              </button>
            </div>
          </div>
        </div>
        <div className="bg-grey rounded-2xl">
          <div
            className="rounded-t-2xl py-3 px-5 border-b"
            style={getFontStyle(theme, "subHeading")}
          >
            <h6
              className="text-xl"
              style={getFontStyle(theme, "subHeading")}
            >
              Current Medication List
            </h6>
          </div>
          <div className="p-6">
            <ol className="list-decimal ps-3">
              <li className="ps-3 mb-4">
                <div
                  className="relative bg-white text-body rounded-full px-5 py-3"
                  style={getFontStyle(theme, "body2")}
                >
                  <span>Paracetamol</span>
                  <span
                    className="bg-grey rounded-full px-5 py-2 absolute right-1 top-[4px] cursor-pointer"
                    style={getFontStyle(theme, "body2")}
                  >
                    Once a Day
                  </span>
                </div>
              </li>
              <li className="ps-3 mb-4">
                <div
                  className="relative bg-white text-body rounded-full px-5 py-3"
                  style={getFontStyle(theme, "body2")}
                >
                  <span>Ibuprofen</span>
                  <span
                    className="bg-grey rounded-full px-5 py-2 absolute right-1 top-[4px] cursor-pointer"
                    style={getFontStyle(theme, "body2")}
                  >
                    Twice a Day
                  </span>
                </div>
              </li>
              <li className="ps-3 mb-4">
                <div
                  className="relative bg-white text-body rounded-full px-5 py-3"
                  style={getFontStyle(theme, "body2")}
                >
                  <span>Amoxicillin</span>
                  <span
                    className="bg-grey rounded-full px-5 py-2 absolute right-1 top-[4px] cursor-pointer"
                    style={getFontStyle(theme, "body2")}
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
