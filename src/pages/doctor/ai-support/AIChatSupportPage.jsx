import { useEffect, useState } from "react";

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

const AIChatSupportPage = () => {
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

  const getButtonStyle = (filled = true, color = "primary") => {
    const colorMap = {
      primary: customTheme.primaryColor || "#002952",
      danger: customTheme.secondaryColor || "#CF0000",
      success: "#22C55E",
      white: "#fff",
    };
    const mainColor = colorMap[color] || colorMap.primary;
    return {
      backgroundColor: filled ? mainColor : "#fff",
      color: filled ? "#fff" : mainColor,
      border: `1.5px solid ${mainColor}`,
      fontFamily: fontTheme.fontFamily || "inherit",
      fontWeight: fontTheme.fontWeight || 400,
      fontSize: fontTheme.fontSize || "16px",
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
                style={getFontStyle(fontTheme, "subHeading")}
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
                      style={getFontStyle(fontTheme, "body1")}
                    >
                      Advanced Pharmacology and Drug Management
                    </p>
                    <span
                      className="text-muted text-sm"
                      style={getFontStyle(fontTheme, "body2")}
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
                      style={getFontStyle(fontTheme, "body1")}
                    >
                      Advanced Pharmacology and Drug Management
                    </p>
                    <span
                      className="text-muted text-sm"
                      style={getFontStyle(fontTheme, "body2")}
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
                      style={getFontStyle(fontTheme, "body1")}
                    >
                      Advanced Pharmacology and Drug Management
                    </p>
                    <span
                      className="text-muted text-sm"
                      style={getFontStyle(fontTheme, "body2")}
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
                      style={getFontStyle(fontTheme, "body1")}
                    >
                      Advanced Pharmacology and Drug Management
                    </p>
                    <span
                      className="text-muted text-sm"
                      style={getFontStyle(fontTheme, "body2")}
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
              style={getFontStyle(fontTheme, "subHeading")}
            >
              AI Chat Support Agent
            </h2>
          </div>
          <div className="p-4 min-h-96">
            <div className="mb-6 flex gap-2">
              <div
                style={{
                  backgroundColor: customTheme.primaryColor || "#002952",
                }}
                className="px-3 py-2 text-white h-[40px] w-[40px] text-center rounded-full"
              >
                <span style={getFontStyle(fontTheme, "body2")}>AI</span>
              </div>
              <div className="bg-grey text-body p-4 rounded-2xl max-w-lg">
                <span style={getFontStyle(fontTheme, "body1")}>
                  Hi!, I am your AI Chat support agent, How can I help you ?
                </span>
              </div>
            </div>
            <div className="mb-6 flex gap-2 flex-row-reverse">
              <div
                style={{
                  backgroundColor: customTheme.primaryColor || "#002952",
                }}
                className="px-3 py-2 text-white h-[40px] w-[40px] text-center rounded-full"
              >
                <span style={getFontStyle(fontTheme, "body2")}>JP</span>
              </div>
              <div className="bg-grey text-body p-4 rounded-2xl max-w-lg">
                <span style={getFontStyle(fontTheme, "body1")}>
                  What are the latest advancements in biologics for autoimmune
                  diseases like rheumatoid arthritis or psoriasis?
                </span>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="flex gap-2">
              <div className="relative w-full">
                <input
                  id="patientName"
                  type="text"
                  className="focus:outline-none w-full mt-1 px-14 py-3 bg-grey text-muted border rounded-full"
                  placeholder="Type a message"
                  style={getFontStyle(fontTheme, "body1")}
                />
                <div className="absolute left-1 top-2">
                  <button className="bg-white rounded-full p-2 pb-1 transform rotate-45">
                    <i className="material-icons text-body">attach_file</i>
                  </button>
                </div>
                <div className="absolute right-2 top-2">
                  <button className="rounded-full p-2 pb-1">
                    <i className="material-icons text-body">mic</i>
                  </button>
                </div>
              </div>
              <div className="relative pt-1">
                <button
                  style={getButtonStyle(true, "primary")}
                  className="w-full px-3 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150"
                >
                  <i className="material-icons">send</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChatSupportPage;
