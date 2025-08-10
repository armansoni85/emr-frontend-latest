import { useEffect, useState } from "react";
import { NavLinkButton } from "@src/components";
import { getRoutePath } from "@src/utils/routeUtils";

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

const HippaComplianceRegulatoryPage = () => {
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

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
          <NavLinkButton
            to={getRoutePath("doctor.hippa_compliance")}
            color="primary"
            className={"px-5"}
            style={{
              ...getFontStyle(fontTheme, "main"),
              border: `1.5px solid ${customTheme.primaryColor}`,
            }}
          >
            Audit Logs &amp; Monitoring
          </NavLinkButton>
          <NavLinkButton
            to={getRoutePath("doctor.regulatory_compliance")}
            color="primary"
            className={"px-5"}
            style={{
              ...getFontStyle(fontTheme, "main"),
              backgroundColor: customTheme.primaryColor,
              color: "#fff",
              border: `1.5px solid ${customTheme.primaryColor}`,
            }}
          >
            Regulatory Compliance
          </NavLinkButton>
          <NavLinkButton
            to={getRoutePath("doctor.hippa_policy")}
            color="primary"
            className={"px-5"}
            style={{
              ...getFontStyle(fontTheme, "main"),
              border: `1.5px solid ${customTheme.primaryColor}`,
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
            style={getFontStyle(fontTheme, "subHeading")}
          >
            You all Data is End to End Encrypted
          </h6>
          <p
            className="text-gray-500 text-center max-w-[90%]"
            style={getFontStyle(fontTheme, "body1")}
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
                <td className="p-3" style={getFontStyle(fontTheme, "body1")}>
                  <i className="material-icons text-green-500 pt-1">check</i>{" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fugit, optio?
                </td>
                <td className="p-3" style={getFontStyle(fontTheme, "body1")}>
                  <i className="material-icons text-green-500">check</i>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugit, optio?
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-3" style={getFontStyle(fontTheme, "body1")}>
                  <i className="material-icons text-green-500 pt-1">check</i>{" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fugit, optio?
                </td>
                <td className="p-3" style={getFontStyle(fontTheme, "body1")}>
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
