import { InputWithLabel, MultipleInput } from "@src/components";
import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "customColorTheme";

const ProfessionalInformationPage = () => {
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
            label={"Speciality:"}
            id={"speciality"}
            type={"text"}
            value={"Cardiology"}
            readOnly=""
            style={getFontStyle("body1")}
            labelStyle={getFontStyle("body1")}
          />
          <InputWithLabel
            wrapperClassName={"p-4"}
            label={"Sub Speciality:"}
            id={"subSpeciality"}
            type={"select"}
            value={"Interventional Cardiology"}
            readOnly=""
            style={getFontStyle("body1")}
            labelStyle={getFontStyle("body1")}
          >
            <option value={"Interventional Cardiology"}>
              Interventional Cardiology
            </option>
          </InputWithLabel>
          <InputWithLabel
            wrapperClassName={"p-4"}
            label={"Medical License:"}
            id={"medicalLicense"}
            type={"text"}
            value={"ML123456"}
            readOnly=""
            style={getFontStyle("body1")}
            labelStyle={getFontStyle("body1")}
          />
          <InputWithLabel
            wrapperClassName={"p-4"}
            label={"Experience:"}
            id={"experience"}
            type={"text"}
            value={"10 years"}
            readOnly=""
            style={getFontStyle("body1")}
            labelStyle={getFontStyle("body1")}
          />
          <MultipleInput
            wrapperClassName={"mb-4"}
            label={"Qualification:"}
            id={"qualification"}
            defaultList={["MD, Cardiology", "PhD, Medical Science"]}
            style={getFontStyle("body1")}
            labelStyle={getFontStyle("body1")}
          />
        </div>
        <div>
          <InputWithLabel
            wrapperClassName={"p-4"}
            label={"Residental Address:"}
            id={"residentialAddress"}
            type={"textarea"}
            placeholder={"Enter Address"}
            value={"867 Shemika Trail, South Rosalbaborough, AR 84252-6233"}
            readOnly=""
            style={getFontStyle("body1")}
            labelStyle={getFontStyle("body1")}
          />

          <MultipleInput
            wrapperClassName={"mb-4"}
            label={"Certifications:"}
            id={"certifications"}
            defaultList={[
              "Board Certified Cardiologist",
              "Certified Medical Educator",
            ]}
            style={getFontStyle("body1")}
            labelStyle={getFontStyle("body1")}
          />
        </div>
      </div>
    </>
  );
};

export default ProfessionalInformationPage;
