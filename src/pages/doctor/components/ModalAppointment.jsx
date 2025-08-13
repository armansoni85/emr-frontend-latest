import { RoleId } from "@src/constant/enumRole";
import StatusText from "./StatusText";
import { showModal } from "@src/redux/reducers/modalReducer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

export const useShowModalAppointment = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const headerModal = (user = {}, appointment = {}) => {
    if (user?.role === RoleId.PATIENT) {
      return (
        <div className="mb-3">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr style={getFontStyle(theme, "body2")}>
                <th className="py-2 px-4 text-start font-medium">
                  Doctor Name
                </th>
                <th className="py-2 px-4 text-start font-medium">
                  Date &amp; Time
                </th>
                <th className="py-2 px-4 text-start font-medium">Disease</th>
                <th className="py-2 px-4 text-start font-medium">
                  Reason Of Visit
                </th>
                <th className="py-2 px-4 text-start font-medium">
                  AI Visit Notes Status
                </th>
              </tr>
            </thead>
            <tbody
              className="text-body"
              style={getFontStyle(theme, "body1")}
            >
              <tr>
                <td className="py-2 px-4">
                  <div
                    className="flex items-center cursor-pointer"
                    onclick="window.location.href = 'patient_profile.html'"
                  >
                    <img
                      src="/assets/images/profile.png"
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-start">
                      <p style={getFontStyle(theme, "body1")}>
                        {user.first_name} {user.last_name}
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
                  className="py-2 px-4"
                  style={getFontStyle(theme, "body1")}
                >
                  August 1, 2024 - 9:00AM
                </td>
                <td
                  className="py-2 px-4"
                  style={getFontStyle(theme, "body1")}
                >
                  <span style={getFontStyle(theme, "body2")}>
                    <Badge color="info">{appointment?.disease}</Badge>
                  </span>
                </td>
                <td
                  className="py-2 px-4"
                  style={getFontStyle(theme, "body1")}
                >
                  {appointment.reason_of_visit}
                </td>
                <td
                  className="py-2 px-4"
                  style={getFontStyle(theme, "body1")}
                >
                  {StatusText(appointment.appointment_status)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="mb-3 grid lg:grid-cols-2 grid-cols-1">
          <div className="p-3 rounded-2xl">
            <div className="flex gap-3">
              <div className="relative">
                <img
                  src="/assets/images/johnson.png"
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
                    {user.first_name} {user.last_name}
                  </h6>
                  <div
                    className="flex gap-1 text-sm"
                    style={getFontStyle(theme, "body2")}
                  >
                    <span>Date of Birth :</span>
                    <span className="text-muted">May 20, 2000</span>
                  </div>
                  <div
                    className="flex gap-1 text-sm"
                    style={getFontStyle(theme, "body2")}
                  >
                    <span>Last Visit :</span>
                    <span className="text-muted">August 12, 2025 - 2:00PM</span>
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
                    Status: {StatusText(appointment.appointment_status)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-3 rounded-2xl">
            <div className="bg-grey px-2 rounded-lg py-3">
              <table className="w-full">
                <tbody>
                  <tr style={getFontStyle(theme, "body2")}>
                    <th className="font-medium">Gender</th>
                    <th className="font-medium">Age</th>
                    <th className="font-medium">Weight</th>
                    <th className="font-medium">Height</th>
                    <th className="font-medium">Blood Group</th>
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
      );
    }
  };

  return ({ title = "", user = {}, appointment }) => {
    dispatch(
      showModal({
        id: "modal-detail-appointment",
        title: title,
        size: "large",
        content: (
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
              {headerModal(user, appointment)}
              <div className="flex gap-3 mb-4">
                <div
                  className="relative flex justify-between text-primary border border-primary rounded-full ps-4 pe-16 py-3"
                  style={getFontStyle(theme, "body2")}
                >
                  <span className="my-auto">Recording 1</span>
                  <span className="absolute right-2 top-2 bg-danger text-white rounded-full p-1 h-8 w-8 flex items-center justify-center">
                    <i className="material-icons">play_arrow</i>
                  </span>
                </div>
                <div
                  className="relative flex justify-between text-primary border border-primary rounded-full ps-4 pe-16 py-3"
                  style={getFontStyle(theme, "body2")}
                >
                  <span className="my-auto">Recording 2</span>
                  <span className="absolute right-2 top-2 bg-danger text-white rounded-full p-1 h-8 w-8 flex items-center justify-center">
                    <i className="material-icons">play_arrow</i>
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <h3
                  className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2"
                  style={getFontStyle(theme, "subHeading")}
                >
                  Subjective
                </h3>
                <p
                  className="text-body px-2"
                  style={getFontStyle(theme, "body1")}
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
                  style={getFontStyle(theme, "subHeading")}
                >
                  Subjective
                </h3>
                <div className="px-2">
                  <table className="w-full">
                    <tbody>
                      <tr style={getFontStyle(theme, "body2")}>
                        <th className="font-medium text-start">Vitals:</th>
                        <th className="font-medium text-start">Exam:</th>
                      </tr>
                      <tr>
                        <td
                          className="text-body"
                          style={getFontStyle(theme, "body1")}
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
                          style={getFontStyle(theme, "body1")}
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
                  style={getFontStyle(theme, "subHeading")}
                >
                  Assessment
                </h3>
                <div
                  className="px-2 text-body"
                  style={getFontStyle(theme, "body1")}
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
                  style={getFontStyle(theme, "subHeading")}
                >
                  Plan
                </h3>
                <div className="px-2">
                  <table className="w-full">
                    <tbody>
                      <tr style={getFontStyle(theme, "body2")}>
                        <th className="font-medium text-start">Medications:</th>
                      </tr>
                      <tr>
                        <td
                          className="text-body"
                          style={getFontStyle(theme, "body1")}
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
                      <tr style={getFontStyle(theme, "body2")}>
                        <th className="font-medium text-start">
                          Lifestyle Modifications:
                        </th>
                      </tr>
                      <tr>
                        <td
                          className="text-body"
                          style={getFontStyle(theme, "body1")}
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
        ),
      })
    );
  };
};
