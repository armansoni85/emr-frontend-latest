import { useEffect, useState } from "react";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

const EmailSupportPage = () => {
  const { theme } = useTheme();



  const getButtonStyle = (filled = true, color = "primary") => {
    const colorMap = {
      primary: theme.primaryColor || "#002952",
      danger: theme.secondaryColor || "#CF0000",
      success: "#22C55E",
      white: "#fff",
    };
    const mainColor = colorMap[color] || colorMap.primary;
    return {
      backgroundColor: filled ? mainColor : "#fff",
      color: filled ? "#fff" : mainColor,
      border: `1.5px solid ${mainColor}`,
      fontFamily: theme.fontFamily || "inherit",
      fontWeight: theme.fontWeight || 400,
      fontSize: theme.fontSize || "16px",
      transition: "all 0.15s",
    };
  };

  return (
    <>
      <div className="grid md:gap-4 md:grid-cols-3 grid-cols-1">
        <div className="bg-white rounded-[20px] shadow-lg mb-4 flex flex-col">
          <div className=" h-full">
            <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
              <h2
                className="text-lg font-medium"
                style={getFontStyle(theme, "subHeading")}
              >
                Chat History
              </h2>
            </div>
            <div className="relative">
              <div className="flex justify-content-between border-b px-3 pt-4 pb-2 cursor-pointer hover:bg-black hover:bg-opacity-[0.1]">
                <div className="flex gap-2 w-full">
                  <span className="inline-block bg-danger text-primary bg-grey rounded-full p-1 px-2 h-8 w-8 flex items-center justify-center">
                    <i className="material-icons text-sm">chat</i>
                  </span>
                  <div className="text-medium text-start">
                    <p
                      className="leading-none"
                      style={getFontStyle(theme, "body1")}
                    >
                      Advanced Pharmacology and Drug Management
                    </p>
                    <span
                      className="text-muted text-sm"
                      style={getFontStyle(theme, "body2")}
                    >
                      Just Now
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-content-between border-b px-3 pt-4 pb-2 cursor-pointer hover:bg-black hover:bg-opacity-[0.1]">
                <div className="flex gap-2 w-full">
                  <span className="inline-block bg-danger text-primary bg-grey rounded-full p-1 px-2 h-8 w-8 flex items-center justify-center">
                    <i className="material-icons text-sm">chat</i>
                  </span>
                  <div className="text-medium text-start">
                    <p
                      className="leading-none"
                      style={getFontStyle(theme, "body1")}
                    >
                      Advanced Pharmacology and Drug Management
                    </p>
                    <span
                      className="text-muted text-sm"
                      style={getFontStyle(theme, "body2")}
                    >
                      Just Now
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-content-between border-b px-3 pt-4 pb-2 cursor-pointer hover:bg-black hover:bg-opacity-[0.1]">
                <div className="flex gap-2 w-full">
                  <span className="inline-block bg-danger text-primary bg-grey rounded-full p-1 px-2 h-8 w-8 flex items-center justify-center">
                    <i className="material-icons text-sm">chat</i>
                  </span>
                  <div className="text-medium text-start">
                    <p
                      className="leading-none"
                      style={getFontStyle(theme, "body1")}
                    >
                      Advanced Pharmacology and Drug Management
                    </p>
                    <span
                      className="text-muted text-sm"
                      style={getFontStyle(theme, "body2")}
                    >
                      Just Now
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-content-between border-b px-3 pt-4 pb-2 cursor-pointer hover:bg-black hover:bg-opacity-[0.1]">
                <div className="flex gap-2 w-full">
                  <span className="inline-block bg-danger text-primary bg-grey rounded-full p-1 px-2 h-8 w-8 flex items-center justify-center">
                    <i className="material-icons text-sm">chat</i>
                  </span>
                  <div className="text-medium text-start">
                    <p
                      className="leading-none"
                      style={getFontStyle(theme, "body1")}
                    >
                      Advanced Pharmacology and Drug Management
                    </p>
                    <span
                      className="text-muted text-sm"
                      style={getFontStyle(theme, "body2")}
                    >
                      Just Now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <button
              style={getButtonStyle(true, "primary")}
              className="w-full px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150"
            >
              Start New Conversation
            </button>
          </div>
        </div>
        <div className="bg-white rounded-[20px] shadow-lg mb-4 col-span-2">
          <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
            <h2
              className="text-lg font-medium"
              style={getFontStyle(theme, "subHeading")}
            >
              Live Chat with Agent
            </h2>
            <a
              href=""
              className="text-danger"
              style={getFontStyle(theme, "body1")}
            >
              End Chat
            </a>
          </div>
          <div className="p-4">
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label
                htmlFor="patientName"
                className="block text-nowrap my-auto"
                style={getFontStyle(theme, "body1")}
              >
                To:
              </label>
              <div className="flex items-center w-full col-span-4">
                <input
                  id="patientName"
                  type="text"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                  placeholder="support@meducare.com"
                  style={getFontStyle(theme, "body2")}
                />
              </div>
            </div>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label
                htmlFor="patientName"
                className="block text-nowrap my-auto"
                style={getFontStyle(theme, "body1")}
              >
                Subject:
              </label>
              <div className="flex items-center w-full col-span-4">
                <input
                  id="patientName"
                  type="text"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                  placeholder="Lorem Ipsum"
                  style={getFontStyle(theme, "body2")}
                />
              </div>
            </div>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label
                htmlFor="reasonsOfVisit"
                className="block text-nowrap mb-auto mt-2"
                style={getFontStyle(theme, "body1")}
              >
                Reasons of Visit:
              </label>
              <div className="flex items-center w-full col-span-4 relative">
                <textarea
                  id="reasonsOfVisit"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-2xl"
                  placeholder="Enter Reasons of Visit"
                  rows={10}
                  cols={30}
                  defaultValue={""}
                  style={getFontStyle(theme, "body2")}
                />
                <div className="flex absolute bottom-0 p-2 gap-2">
                  <button
                    style={getButtonStyle(true, "primary")}
                    className="w-full px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150"
                  >
                    Send
                  </button>
                  <button className="bg-white rounded-full p-2 pb-1 transform rotate-45">
                    <i className="material-icons text-body">attach_file</i>
                  </button>
                </div>
                <div className="flex absolute bottom-0 right-0 p-2 gap-2">
                  <button className="bg-white rounded-full p-2 pb-1 transform">
                    <i className="material-icons text-body">delete</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailSupportPage;
