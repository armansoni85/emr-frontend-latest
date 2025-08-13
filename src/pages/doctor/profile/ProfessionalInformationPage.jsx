import { InputWithLabel, MultipleInput } from "@src/components";
import { useEffect, useState } from "react";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

const LOCAL_STORAGE_KEY = "customColorTheme";

const ProfessionalInformationPage = () => {
  const { theme } = useTheme();
  return (
    <>
      <div
        className="bg-white rounded-2xl grid lg:grid-cols-2 grid-cols-1 px-3 py-3"
        style={getFontStyle(theme, "main")}
      >
        <div className="">
          <InputWithLabel
            wrapperClassName={"p-4"}
            label={"Speciality:"}
            id={"speciality"}
            type={"text"}
            value={"Cardiology"}
            readOnly=""
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
          />
          <InputWithLabel
            wrapperClassName={"p-4"}
            label={"Sub Speciality:"}
            id={"subSpeciality"}
            type={"select"}
            value={"Interventional Cardiology"}
            readOnly=""
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
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
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
          />
          <InputWithLabel
            wrapperClassName={"p-4"}
            label={"Experience:"}
            id={"experience"}
            type={"text"}
            value={"10 years"}
            readOnly=""
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
          />
          <MultipleInput
            wrapperClassName={"mb-4"}
            label={"Qualification:"}
            id={"qualification"}
            defaultList={["MD, Cardiology", "PhD, Medical Science"]}
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
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
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
          />

          <MultipleInput
            wrapperClassName={"mb-4"}
            label={"Certifications:"}
            id={"certifications"}
            defaultList={[
              "Board Certified Cardiologist",
              "Certified Medical Educator",
            ]}
            style={getFontStyle(theme, "body1")}
            labelStyle={getFontStyle(theme, "body1")}
          />
        </div>
      </div>
    </>
  );
};

export default ProfessionalInformationPage;
