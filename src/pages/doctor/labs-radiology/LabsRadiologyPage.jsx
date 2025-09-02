import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

const LabsRadiologyPage = () => {
  const { showModal } = useSelector((state) => state.modal);
  const { theme } = useTheme();



  const getButtonStyle = (filled = false) => ({
    backgroundColor: filled ? theme.primaryColor : "#fff",
    color: filled ? "#fff" : theme.primaryColor,
    border: `1.5px solid ${theme.primaryColor}`,
    fontFamily: theme.fontFamily || "inherit",
    fontWeight: theme.fontWeight || 400,
    fontSize: theme.fontSize || "16px",
    transition: "all 0.15s",
  });

  const getIconButtonStyle = () => ({
    backgroundColor: "#fff",
    color: theme.primaryColor,
    border: `1.5px solid ${theme.primaryColor}`,
    fontFamily: theme.fontFamily || "inherit",
    fontWeight: theme.fontWeight || 400,
    fontSize: theme.fontSize || "16px",
    transition: "all 0.15s",
  });

  const getIconStyle = () => ({
    color: theme.primaryColor,
    fontSize: theme.fontSize || "20px",
    fontFamily: theme.fontFamily || "inherit",
    fontWeight: theme.fontWeight || 400,
  });

  const handleOpenModal = () => {
    showModal({
      id: "detail-consultation-modal",
      title: "Consultation Details",
      content: (
        <>
          <div className="bg-white rounded-[20px] border mb-4 col-span-2">
            <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
              <h2
                className="text-lg font-medium"
                style={getFontStyle(theme, "subHeading")}
              >
                Recordings and Output
              </h2>
            </div>
            <div className="p-4">
              <div className="mb-3 grid lg:grid-cols-2 grid-cols-1">
                <div className="p-3 rounded-2xl">
                  <div className="flex gap-3">
                    <div className="relative">
                      <img
                        src="./assets/images/johnson.png"
                        className="rounded-xl h-20 w-24"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-between w-full text-nowrap">
                      <div className="text-start">
                        <h6
                          className="text-2xl text-darkBlue font-medium"
                          style={getFontStyle(theme, "subHeading")}
                        >
                          Henry Johnson
                        </h6>
                        <div className="flex gap-1 text-sm">
                          <span style={getFontStyle(theme, "body2")}>
                            Date of Birth :
                          </span>
                          <span
                            className="text-muted"
                            style={getFontStyle(theme, "body2")}
                          >
                            May 20, 2000
                          </span>
                        </div>
                        <div className="flex gap-1 text-sm">
                          <span style={getFontStyle(theme, "body2")}>
                            Last Visit :
                          </span>
                          <span
                            className="text-muted"
                            style={getFontStyle(theme, "body2")}
                          >
                            August 12, 2025 - 2:00PM
                          </span>
                        </div>
                      </div>
                      <div className="text-end">
                        <a
                          href=""
                          className="text-primary"
                          style={getFontStyle(theme, "body2")}
                        >
                          View Profile
                        </a>
                        <p
                          className="mt-7 text-sm"
                          style={getFontStyle(theme, "body2")}
                        >
                          Status: <span className="text-success">Done</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-3 rounded-2xl">
                  <div className="bg-grey px-2 rounded-lg py-3">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <th
                            className="font-medium"
                            style={getFontStyle(theme, "body2")}
                          >
                            Gender
                          </th>
                          <th
                            className="font-medium"
                            style={getFontStyle(theme, "body2")}
                          >
                            Age
                          </th>
                          <th
                            className="font-medium"
                            style={getFontStyle(theme, "body2")}
                          >
                            Weight
                          </th>
                          <th
                            className="font-medium"
                            style={getFontStyle(theme, "body2")}
                          >
                            Height
                          </th>
                          <th
                            className="font-medium"
                            style={getFontStyle(theme, "body2")}
                          >
                            Blood Group
                          </th>
                        </tr>
                        <tr>
                          <td
                            className="text-muted text-center"
                            style={getFontStyle(theme, "body2")}
                          >
                            Male
                          </td>
                          <td
                            className="text-muted text-center"
                            style={getFontStyle(theme, "body2")}
                          >
                            26 Years
                          </td>
                          <td
                            className="text-muted text-center"
                            style={getFontStyle(theme, "body2")}
                          >
                            68Kg
                          </td>
                          <td
                            className="text-muted text-center"
                            style={getFontStyle(theme, "body2")}
                          >
                            5ft 9in
                          </td>
                          <td
                            className="text-muted text-center"
                            style={getFontStyle(theme, "body2")}
                          >
                            O+
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mb-4">
                <div className="relative flex justify-between text-primary border border-primary rounded-full ps-4 pe-16 py-3">
                  <span
                    className="my-auto"
                    style={getFontStyle(theme, "body1")}
                  >
                    Recording 1
                  </span>
                  <span
                    className="absolute right-2 top-2 bg-danger text-white rounded-full p-1 h-8 w-8 flex items-center justify-center"
                    style={getIconButtonStyle()}
                  >
                    <i className="material-icons" style={getIconStyle()}>
                      play_arrow
                    </i>
                  </span>
                </div>
                <div className="relative flex justify-between text-primary border border-primary rounded-full ps-4 pe-16 py-3">
                  <span
                    className="my-auto"
                    style={getFontStyle(theme, "body1")}
                  >
                    Recording 2
                  </span>
                  <span
                    className="absolute right-2 top-2 bg-danger text-white rounded-full p-1 h-8 w-8 flex items-center justify-center"
                    style={getIconButtonStyle()}
                  >
                    <i className="material-icons" style={getIconStyle()}>
                      play_arrow
                    </i>
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <h3
                  className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2"
                  style={getFontStyle(theme, "body1")}
                >
                  Subjective
                </h3>
                <p
                  className="text-body px-2"
                  style={getFontStyle(theme, "body2")}
                >
                  Patient John Doe, a 35-year-old male, reports experiencing
                  persistent headaches for the past two weeks. He describes the
                  pain as a throbbing sensation on the left side of his head,
                  which worsens with physical activity. He also notes symptoms
                  of nausea and sensitivity to light. He rates the pain as 7 out
                  of 10.
                </p>
              </div>
              <div className="mb-3">
                <h3
                  className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2"
                  style={getFontStyle(theme, "body1")}
                >
                  Subjective
                </h3>
                <div className="px-2">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <th
                          className="font-medium text-start"
                          style={getFontStyle(theme, "body1")}
                        >
                          Vitals:
                        </th>
                        <th
                          className="font-medium text-start"
                          style={getFontStyle(theme, "body1")}
                        >
                          Exam:
                        </th>
                      </tr>
                      <tr>
                        <td
                          className="text-body"
                          style={getFontStyle(theme, "body2")}
                        >
                          <ul className="ps-5 list-disc">
                            <li>BP: [e.g., 120/80 mmHg]</li>
                            <li>HR: [e.g., 72 bpm]</li>
                            <li>RR: [e.g., 16 breaths/min]</li>
                            <li>Temp: [e.g., 98.6°F]</li>
                          </ul>
                        </td>
                        <td
                          className="text-body"
                          style={getFontStyle(theme, "body2")}
                        >
                          <ul className="ps-5 list-disc">
                            <li>BP: [e.g., 120/80 mmHg]</li>
                            <li>HR: [e.g., 72 bpm]</li>
                            <li>RR: [e.g., 16 breaths/min]</li>
                            <li>Temp: [e.g., 98.6°F]</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mb-3">
                <h3
                  className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2"
                  style={getFontStyle(theme, "body1")}
                >
                  Assessment
                </h3>
                <div
                  className="px-2 text-body"
                  style={getFontStyle(theme, "body2")}
                >
                  <ul className="ps-5 list-disc">
                    <li>Likely diagnosis: Migraine without aura</li>
                    <li>Other possible diagnoses: None</li>
                  </ul>
                </div>
              </div>
              <div className="mb-3">
                <h3
                  className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2"
                  style={getFontStyle(theme, "body1")}
                >
                  Plan
                </h3>
                <div className="px-2">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <th
                          className="font-medium text-start"
                          style={getFontStyle(theme, "body1")}
                        >
                          Medications:
                        </th>
                      </tr>
                      <tr>
                        <td
                          className="text-body"
                          style={getFontStyle(theme, "body2")}
                        >
                          <ul className="ps-8 list-disc">
                            <li>
                              Sumatriptan 100mg: take at the onset of headache
                            </li>
                            <li>
                              Consider preventive medication: Propranolol or
                              Topiramate if headache is frequent
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <th
                          className="font-medium text-start"
                          style={getFontStyle(theme, "body1")}
                        >
                          Lifestyle Modifications:
                        </th>
                      </tr>
                      <tr>
                        <td
                          className="text-body"
                          style={getFontStyle(theme, "body2")}
                        >
                          <ul className="ps-8 list-disc">
                            <li>
                              Sumatriptan 100mg: take at the onset of headache
                            </li>
                            <li>
                              Consider preventive medication: Propranolol or
                              Topiramate if headache is frequent
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    });
  };

  return (
    <>
      <div className="mb-3 grid grid-cols-1 md:grid-cols-3 md:gap-4">
        <div className="mb-3">
          <label htmlFor="search" style={getFontStyle(theme, "body1")}>
            Search
          </label>
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search by Name or DOB"
              className="w-full rounded-full pe-4 ps-10 py-3 border-grey focus:outline-grey2"
              style={getFontStyle(theme, "body2")}
            />
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              search
            </span>
            <button
              style={getButtonStyle(true)}
              className="absolute right-2 top-[6px] px-5 2xl:py-2 py-1 text-sm rounded-full text-white hover:bg-opacity-[0.9] transition-all duration-150"
            >
              Search
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="search" style={getFontStyle(theme, "body1")}>
            Disease or Allergy
          </label>
          <div className="relative mt-2 text-muted">
            <select
              className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none"
              style={getFontStyle(theme, "body2")}
            >
              <option value="" disabled="" selected="">
                Search by Disease
              </option>
            </select>
            <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              arrow_drop_down
            </i>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="search" style={getFontStyle(theme, "body1")}>
            Select Date
          </label>
          <div className="relative mt-2 text-muted">
            <input
              type="date"
              className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2"
              style={getFontStyle(theme, "body2")}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="search" style={getFontStyle(theme, "body1")}>
            Select by Lab Name
          </label>
          <div className="relative mt-2 text-muted">
            <select
              className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none"
              style={getFontStyle(theme, "body2")}
            >
              <option value="" disabled="" selected="">
                Search by Lab Name
              </option>
            </select>
            <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              arrow_drop_down
            </i>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
          <h2
            className="text-lg font-medium"
            style={getFontStyle(theme, "subHeading")}
          >
            Lab Reports
          </h2>
          <div className="text-end inline-block">
            <span
              className="text-muted"
              style={getFontStyle(theme, "body2")}
            >
              Total 1460 Lab Results Found
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr style={getFontStyle(theme, "body2")}>
                <th className="py-2 px-4 border-b text-start font-medium">
                  <div className="flex items-center cursor-pointer">
                    <span>Lab Name</span>
                  </div>
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Patient Name &amp; ID
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Report Name
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  <div className="flex items-center cursor-pointer">
                    <span>Doctor Name</span>
                  </div>
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Test Date &amp; Name
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody
              className="text-body"
              style={getFontStyle(theme, "body1")}
            >
              <tr>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../src/assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>John Doe</p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #12345678
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../src/assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>Jane Smith</p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #23456789
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  X-Ray
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../src/assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Michael Johnson
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #34567890
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  August 15, 2024
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    disabled
                    style={getButtonStyle(false)}
                    className="disabled:opacity-30 disabled:pointer-events-none px-3 py-1 border rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                  >
                    Download Report
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../src/assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Emily Davis
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #45678901
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../src/assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Chris Brown
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #56789012
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  MRI Scan
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../src/assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Jessica Taylor
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #67890123
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  September 20, 2024
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    disabled
                    className="disabled:opacity-30 disabled:pointer-events-none px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                  >
                    Download Report
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../src/assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        David Wilson
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #78901234
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../src/assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Linda Martinez
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #89012345
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  CT Scan
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../src/assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Robert Garcia
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #90123456
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  October 5, 2024
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="disabled:opacity-30 disabled:pointer-events-none px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                    Download Report
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../src/assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Patricia Lee
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #01234567
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../src/assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        James White
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #12345678
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  Urine Test
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="../src/assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Daniel Harris
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #23456789
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  November 12, 2024
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="disabled:opacity-30 disabled:pointer-events-none px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                    Download Report
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end items-center mt-4 mx-4">
            <div className="space-x-1" style={getFontStyle(theme, "body2")}>
              <span>Page</span>
              <button
                style={getButtonStyle(false)}
                className="px-4 border rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
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

export default LabsRadiologyPage;
