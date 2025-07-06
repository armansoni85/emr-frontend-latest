import { InputWithLabel } from "@src/components";
import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "customColorTheme";

const ScheduleAndAvailabilityPage = () => {
  const [fontTheme, setFontTheme] = useState(() => {
    try {
      const theme = localStorage.getItem(LOCAL_STORAGE_KEY);
      return theme ? JSON.parse(theme) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const theme = localStorage.getItem(LOCAL_STORAGE_KEY);
        setFontTheme(theme ? JSON.parse(theme) : {});
      } catch {
        setFontTheme({});
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("customColorThemeChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "customColorThemeChanged",
        handleStorageChange
      );
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

  const getFontStyle = (type = "main") => {
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

  return (
    <>
      <div
        className="bg-white rounded-2xl grid lg:grid-cols-2 grid-cols-1 px-3 py-3"
        style={getFontStyle("main")}
      >
        <div className="">
          <InputWithLabel
            wrapperClassName={"p-4"}
            label={"Departement:"}
            id={"department"}
            type={"text"}
            value={"Cardiology"}
            readOnly=""
            style={getFontStyle("body1")}
            labelStyle={getFontStyle("body1")}
          />
          <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
            <label
              htmlFor="shiftTimings"
              className="block text-nowrap my-auto"
              style={getFontStyle("body1")}
            >
              Shift Timings:
            </label>
            <div className="flex items-center w-full col-span-2">
              <div className="flex gap-2 mt-1">
                <span
                  className="flex items-center pr-3"
                  style={getFontStyle("body1")}
                >
                  From
                </span>
                <input
                  id="shiftStart"
                  type="time"
                  className="focus:outline-none w-full px-5 py-3 bg-grey border rounded-full"
                  style={getFontStyle("body1")}
                />
              </div>
              <div className="flex gap-2 mt-1 ml-2">
                <span
                  className="flex items-center pr-3"
                  style={getFontStyle("body1")}
                >
                  To
                </span>
                <input
                  id="shiftEnd"
                  type="time"
                  className="focus:outline-none w-full px-5 py-3 bg-grey border rounded-full"
                  style={getFontStyle("body1")}
                />
              </div>
            </div>
          </div>
          <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
            <label
              htmlFor="medicalLicense"
              className="block text-nowrap my-auto"
              style={getFontStyle("body1")}
            >
              Medical License:
            </label>
            <div className="flex items-center w-full col-span-2">
              <div className="flex gap-2 mt-1">
                <span
                  className="flex items-center pr-3"
                  style={getFontStyle("body1")}
                >
                  From
                </span>
                <input
                  id="shiftStart"
                  type="text"
                  placeholder="Monday"
                  className="focus:outline-none w-full px-5 py-3 bg-grey border rounded-full"
                  style={getFontStyle("body1")}
                />
              </div>
              <div className="flex gap-2 mt-1 ml-2">
                <span
                  className="flex items-center pr-3"
                  style={getFontStyle("body1")}
                >
                  To
                </span>
                <input
                  id="shiftEnd"
                  type="text"
                  placeholder="Friday"
                  className="focus:outline-none w-full px-5 py-3 bg-grey border rounded-full"
                  style={getFontStyle("body1")}
                />
              </div>
            </div>
          </div>
          <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
            <label
              htmlFor="onCallAvailability"
              className="block text-nowrap my-auto"
              style={getFontStyle("body1")}
            >
              On Call Availability:
            </label>
            <div className="flex items-center w-full col-span-2">
              <select
                id="onCallAvailability"
                className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full"
                style={getFontStyle("body1")}
              >
                <option value="" disabled="" selected="">
                  Yes
                </option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
          <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
            <label
              htmlFor="consultationRoom"
              className="block text-nowrap my-auto"
              style={getFontStyle("body1")}
            >
              Consultation Room:
            </label>
            <div className="flex items-center w-full col-span-2">
              <input
                id="consultationRoom"
                type="text"
                readOnly=""
                className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full"
                defaultValue="Room 101"
                placeholder="Enter Consultation Room"
                style={getFontStyle("body1")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleAndAvailabilityPage;
