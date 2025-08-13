import { useEffect, useState } from "react";
import { NavLinkButton } from "@src/components";
import { getRoutePath } from "@src/utils/routeUtils";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

const EFaxDeliveryPage = () => {
  const { theme } = useTheme();

  const getButtonStyle = (filled = true) => ({
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

  return (
    <>
      <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
        <NavLinkButton
          to={getRoutePath("doctor.consultation.efax")}
          color="primary"
          className={"px-5"}
          style={{
            ...getFontStyle(theme, "main"),
            backgroundColor: theme.primaryColor,
            color: "#fff",
            border: `1.5px solid ${theme.primaryColor}`,
          }}
        >
          eFax Delivery
        </NavLinkButton>
        <NavLinkButton
          to={getRoutePath("doctor.consultation.email")}
          color="primary"
          className={"px-5"}
          style={{
            ...getFontStyle(theme, "main"),
            border: `1.5px solid ${theme.primaryColor}`,
          }}
        >
          Email Delivery
        </NavLinkButton>
      </div>
      <div className="grid md:gap-4 md:grid-cols-3 grid-cols-1">
        <div className="bg-white rounded-[20px] shadow-lg mb-4 flex flex-col">
          <div className=" h-full">
            <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
              <h2
                className="text-lg font-medium"
                style={getFontStyle(theme, "subHeading")}
              >
                History
              </h2>
            </div>
            <div className="relative">
              {[1, 2, 3, 4].map((_, idx) => (
                <div
                  key={idx}
                  className="flex justify-content-between border-b px-3 pt-4 pb-2 cursor-pointer hover:bg-black hover:bg-opacity-[0.1]"
                  style={getFontStyle(theme, "body1")}
                >
                  <div className="flex gap-2 w-full">
                    <span
                      className="inline-block bg-danger text-primary bg-grey rounded-full p-1 px-2 h-8 w-8 flex items-center justify-center"
                      style={getIconButtonStyle()}
                    >
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
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[20px] shadow-lg mb-4 col-span-2">
          <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
            <h2
              className="text-lg font-medium"
              style={getFontStyle(theme, "subHeading")}
            >
              Sending eFax
            </h2>
          </div>
          <div className="p-4">
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label
                htmlFor="recipientFax"
                className="block my-auto"
                style={getFontStyle(theme, "body1")}
              >
                Recipient eFax Number:
              </label>
              <div className="flex items-center w-full col-span-4">
                <input
                  id="recipientFax"
                  type="text"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                  placeholder="Enter eFax Number"
                  style={getFontStyle(theme, "body2")}
                />
              </div>
            </div>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label
                htmlFor="recipientName"
                className="block my-auto"
                style={getFontStyle(theme, "body1")}
              >
                Recipient Name:
              </label>
              <div className="flex items-center w-full col-span-4">
                <input
                  id="recipientName"
                  type="text"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                  placeholder="Enter Recipient Name"
                  style={getFontStyle(theme, "body2")}
                />
              </div>
            </div>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label
                htmlFor="subject"
                className="block my-auto"
                style={getFontStyle(theme, "body1")}
              >
                Subject:
              </label>
              <div className="flex items-center w-full col-span-4">
                <input
                  id="subject"
                  type="text"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                  placeholder="Enter Subject"
                  style={getFontStyle(theme, "body2")}
                />
              </div>
            </div>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label
                htmlFor="consultationDocument"
                className="block my-auto"
                style={getFontStyle(theme, "body1")}
              >
                Consultation Document:
              </label>
              <div className="flex items-center w-full col-span-4 relative">
                <input
                  id="consultationDocument"
                  type="file"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                  style={getFontStyle(theme, "body2")}
                />
                <button
                  style={getButtonStyle(false)}
                  className="px-4 py-2 rounded-full ml-2 absolute right-2"
                >
                  Browse
                </button>
              </div>
            </div>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label
                htmlFor="reasonsOfVisit"
                className="block mb-auto mt-2"
                style={getFontStyle(theme, "body1")}
              >
                Custom Message:
              </label>
              <div className="flex items-center w-full col-span-4 relative">
                <textarea
                  id="reasonsOfVisit"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-2xl"
                  placeholder="Type your message here..."
                  rows={10}
                  cols={30}
                  defaultValue={""}
                  style={getFontStyle(theme, "body2")}
                />
                <div className="flex absolute bottom-0 p-2 gap-2">
                  <button
                    style={getButtonStyle(true)}
                    className="w-full px-8 py-2 rounded-full text-sm font-light"
                  >
                    Send
                  </button>
                  <button
                    style={getIconButtonStyle()}
                    className="rounded-full p-2 pb-1 transform rotate-45"
                  >
                    <i className="material-icons">attach_file</i>
                  </button>
                </div>
                <div className="flex absolute bottom-0 right-0 p-2 gap-2">
                  <button
                    style={getIconButtonStyle()}
                    className="rounded-full p-2 pb-1 transform"
                  >
                    <i className="material-icons">delete</i>
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

export default EFaxDeliveryPage;
