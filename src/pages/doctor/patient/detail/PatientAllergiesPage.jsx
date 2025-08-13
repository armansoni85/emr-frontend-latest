import { useEffect, useState } from "react";
import PatientDetailLayout from "./PatientDetailLayout";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

const PatientAllergiesPage = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div
          className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b"
          style={getFontStyle(theme, "subHeading")}
        >
          <h2
            className="text-lg font-medium"
            style={getFontStyle(theme, "subHeading")}
          >
            All Allergies
          </h2>
          <div className="text-end inline-block">
            <button
              className="bg-primary text-white rounded-full text-nowrap px-3 py-2"
              type="button"
              style={getFontStyle(theme, "body2")}
              onClick={() =>
                window.openModal && window.openModal("modalTemplate")
              }
            >
              + Add Allergies
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr style={getFontStyle(theme, "body2")}>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Allergen*
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Reaction(s)
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Allergy Severities
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Date of Onset
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Comments
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
              style={getFontStyle(theme, "body1")}
            >
              <tr>
                <td className="py-2 px-4 border-b ">Allergen 1</td>
                <td className="py-2 px-4 border-b">Reaction 1</td>
                <td className="py-2 px-4 border-b">Mild</td>
                <td className="py-2 px-4 border-b">01/01/2022</td>
                <td className="py-2 px-4 border-b">No comments</td>
                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:underline"
                    type="button"
                    style={getFontStyle(theme, "body2")}
                    onClick={() => window.editAllergy && window.editAllergy(1)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    type="button"
                    style={getFontStyle(theme, "body2")}
                    onClick={() =>
                      window.deleteAllergy && window.deleteAllergy(1)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">Allergen 2</td>
                <td className="py-2 px-4 border-b">Reaction 2</td>
                <td className="py-2 px-4 border-b">Moderate</td>
                <td className="py-2 px-4 border-b">02/01/2022</td>
                <td className="py-2 px-4 border-b">Follow-up needed</td>
                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:underline"
                    type="button"
                    style={getFontStyle(theme, "body2")}
                    onClick={() => window.editAllergy && window.editAllergy(2)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    type="button"
                    style={getFontStyle(theme, "body2")}
                    onClick={() =>
                      window.deleteAllergy && window.deleteAllergy(2)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">Allergen 3</td>
                <td className="py-2 px-4 border-b">Reaction 3</td>
                <td className="py-2 px-4 border-b">Severe</td>
                <td className="py-2 px-4 border-b">03/01/2022</td>
                <td className="py-2 px-4 border-b">
                  Immediate attention required
                </td>
                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:underline"
                    type="button"
                    style={getFontStyle(theme, "body2")}
                    onClick={() => window.editAllergy && window.editAllergy(3)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    type="button"
                    style={getFontStyle(theme, "body2")}
                    onClick={() =>
                      window.deleteAllergy && window.deleteAllergy(3)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">Allergen 4</td>
                <td className="py-2 px-4 border-b">Reaction 4</td>
                <td className="py-2 px-4 border-b">Mild</td>
                <td className="py-2 px-4 border-b">04/01/2022</td>
                <td className="py-2 px-4 border-b">No comments</td>
                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:underline"
                    type="button"
                    style={getFontStyle(theme, "body2")}
                    onClick={() => window.editAllergy && window.editAllergy(4)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    type="button"
                    style={getFontStyle(theme, "body2")}
                    onClick={() =>
                      window.deleteAllergy && window.deleteAllergy(4)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b ">Allergen 5</td>
                <td className="py-2 px-4 border-b">Reaction 5</td>
                <td className="py-2 px-4 border-b">Moderate</td>
                <td className="py-2 px-4 border-b">05/01/2022</td>
                <td className="py-2 px-4 border-b">Monitor closely</td>
                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:underline"
                    type="button"
                    style={getFontStyle(theme, "body2")}
                    onClick={() => window.editAllergy && window.editAllergy(5)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    type="button"
                    style={getFontStyle(theme, "body2")}
                    onClick={() =>
                      window.deleteAllergy && window.deleteAllergy(5)
                    }
                  >
                    Delete
                  </button>
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

export default PatientAllergiesPage;
