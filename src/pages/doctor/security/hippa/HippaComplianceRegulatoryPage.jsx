import { useEffect, useState } from "react";
import { NavLinkButton } from "@src/components";
import { getRoutePath } from "@src/utils/routeUtils";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

const HippaComplianceRegulatoryPage = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
          <NavLinkButton
            to={getRoutePath("doctor.hippa_compliance")}
            color="primary"
            className={"px-5"}
            style={{
              ...getFontStyle(theme, "main"),
              border: `1.5px solid ${theme.primaryColor}`,
            }}
          >
            Audit Logs &amp; Monitoring
          </NavLinkButton>
          <NavLinkButton
            to={getRoutePath("doctor.regulatory_compliance")}
            color="primary"
            className={"px-5"}
            style={{
              ...getFontStyle(theme, "main"),
              backgroundColor: theme.primaryColor,
              color: "#fff",
              border: `1.5px solid ${theme.primaryColor}`,
            }}
          >
            Regulatory Compliance
          </NavLinkButton>
          <NavLinkButton
            to={getRoutePath("doctor.hippa_policy")}
            color="primary"
            className={"px-5"}
            style={{
              ...getFontStyle(theme, "main"),
              border: `1.5px solid ${theme.primaryColor}`,
            }}
          >
            HIPPA Policy
          </NavLinkButton>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="shadow-lg border p-3 rounded-2xl">
            <img src="./assets/images/lock.png" alt="" />
          </div>
          <h6
            className="text-2xl font-medium text-center py-4"
            style={getFontStyle(theme, "subHeading")}
          >
            You all Data is End to End Encrypted
          </h6>
          <p
            className="text-gray-500 text-center max-w-[90%]"
            style={getFontStyle(theme, "body1")}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            sapiente qui aliquid inventore modi, eaque asperiores numquam rem
            adipisci eos. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. In deleniti id dolorum nobis possimus reiciendis distinctio
            omnis dolor quos consequatur!
          </p>
          <table className="text-start">
            <tbody>
              <tr>
                <td className="p-3" style={getFontStyle(theme, "body1")}>
                  <i className="material-icons text-green-500 pt-1">check</i>{" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fugit, optio?
                </td>
                <td className="p-3" style={getFontStyle(theme, "body1")}>
                  <i className="material-icons text-green-500">check</i>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugit, optio?
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-3" style={getFontStyle(theme, "body1")}>
                  <i className="material-icons text-green-500 pt-1">check</i>{" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fugit, optio?
                </td>
                <td className="p-3" style={getFontStyle(theme, "body1")}>
                  <i className="material-icons text-green-500">check</i>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugit, optio?
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HippaComplianceRegulatoryPage;
