import { useEffect, useState } from "react";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

const PatientLabReportPage = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div
          className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b"
          style={getFontStyle(theme, "subHeading")}
        >
          <h2
            className="text-lg font-medium"
            style={getFontStyle(theme, "subHeading")}
          >
            Lab Results
          </h2>
          <div className="relative">
            <button
              id="dropdownButton"
              className="flex items-center px-4 py-2 bg-white text-primary"
              style={getFontStyle(theme, "body2")}
            >
              Most Recent
              <i className="material-icons ml-2">expand_more</i>
            </button>
            <div
              id="dropdownMenu"
              className="absolute right-0 mt-2 py-4 w-48 bg-white border rounded rounded-2xl shadow-lg hidden"
            >
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                style={getFontStyle(theme, "body2")}
              >
                Most Recent
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                style={getFontStyle(theme, "body2")}
              >
                Oldest First
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                style={getFontStyle(theme, "body2")}
              >
                Alphabetical
              </a>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr style={getFontStyle(theme, "body2")}>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Lab Name{" "}
                  <i className="material-icons align-middle">expand_more</i>
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Patient Name &amp; DOB
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Report Name
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Doctor Name
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Test Date &amp; Time
                </th>
                <th className="py-2 px-4 border-b text-start font-medium" />
              </tr>
            </thead>
            <tbody
              className="text-body"
              style={getFontStyle(theme, "body1")}
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
                      <p style={getFontStyle(theme, "body1")}>
                        Michael Brown
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        Just Now
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Michael Brown
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        May 20, 2020
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  Lorem Ipsum
                </td>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Michael Brown
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #123456
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  August 12, 2025 - 2:00PM
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex">
                    <button
                      className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                      style={getFontStyle(theme, "body2")}
                    >
                      View Profile
                    </button>
                    <div className="float-right relative">
                      <button
                        className="px-3 py-1"
                        style={getFontStyle(theme, "body2")}
                      >
                        <i className="material-icons">more_vert</i>
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          style={getFontStyle(theme, "body2")}
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          style={getFontStyle(theme, "body2")}
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
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Sarah Johnson
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        1 Hour Ago
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Sarah Johnson
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        June 15, 1990
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  Dolor Sit Amet
                </td>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Sarah Johnson
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #654321
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  July 10, 2025 - 11:00AM
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex">
                    <button
                      className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                      style={getFontStyle(theme, "body2")}
                    >
                      View Profile
                    </button>
                    <div className="float-right relative">
                      <button
                        className="px-3 py-1"
                        style={getFontStyle(theme, "body2")}
                      >
                        <i className="material-icons">more_vert</i>
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          style={getFontStyle(theme, "body2")}
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          style={getFontStyle(theme, "body2")}
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
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>John Doe</p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        Yesterday
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>John Doe</p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        March 5, 1985
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  Consectetur Adipiscing
                </td>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>John Doe</p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #789012
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  June 25, 2025 - 9:30AM
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex">
                    <button
                      className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                      style={getFontStyle(theme, "body2")}
                    >
                      View Profile
                    </button>
                    <div className="float-right relative">
                      <button
                        className="px-3 py-1"
                        style={getFontStyle(theme, "body2")}
                      >
                        <i className="material-icons">more_vert</i>
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          style={getFontStyle(theme, "body2")}
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          style={getFontStyle(theme, "body2")}
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
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Emily White
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        2 Days Ago
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Emily White
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        December 12, 1992
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  Elit Sed Do
                </td>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        Emily White
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #345678
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  May 15, 2025 - 4:45PM
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex">
                    <button
                      className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                      style={getFontStyle(theme, "body2")}
                    >
                      View Profile
                    </button>
                    <div className="float-right relative">
                      <button
                        className="px-3 py-1"
                        style={getFontStyle(theme, "body2")}
                      >
                        <i className="material-icons">more_vert</i>
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          style={getFontStyle(theme, "body2")}
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          style={getFontStyle(theme, "body2")}
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
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        David Smith
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        3 Days Ago
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        David Smith
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        October 10, 1980
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  Eiusmod Tempor
                </td>
                <td className="py-2 px-4 border-b ">
                  <div className="flex items-center cursor-pointer">
                    <img
                      src="assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        David Smith
                      </p>
                      <span
                        className="text-muted"
                        style={getFontStyle(theme, "body2")}
                      >
                        #901234
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={getFontStyle(theme, "body1")}
                >
                  April 20, 2025 - 3:15PM
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex">
                    <button
                      className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                      style={getFontStyle(theme, "body2")}
                    >
                      View Profile
                    </button>
                    <div className="float-right relative">
                      <button
                        className="px-3 py-1"
                        style={getFontStyle(theme, "body2")}
                      >
                        <i className="material-icons">more_vert</i>
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          style={getFontStyle(theme, "body2")}
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          style={getFontStyle(theme, "body2")}
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
            <div className="space-x-1" style={getFontStyle(theme, "body2")}>
              <span>Page</span>
              <button
                className="px-4 border border-muted rounded-full text-muted hover:bg-muted hover:text-white transition-all duration-150"
                style={getFontStyle(theme, "body2")}
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

export default PatientLabReportPage;
