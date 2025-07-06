import { useEffect, useState } from "react";
import { NavLinkButton } from "@src/components";
import { getRoutePath } from "@src/utils/routeUtils";

const LOCAL_STORAGE_KEY = "customNotificationPreferences";
const THEME_STORAGE_KEY = "customColorTheme";

const DEFAULT_PREFS = {
  appointmentBooking: false,
  newPatient: false,
  labReports: false,
  upcomingAppointments: false,
  adminActivity: false,
};

const getFontStyle = (fontTheme, type = "main") => {
  if (!fontTheme) return {};
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

const CustomNotificationPage = () => {
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [showSavedPopup, setShowSavedPopup] = useState(false);

  const [fontTheme, setFontTheme] = useState(() => {
    try {
      const theme = localStorage.getItem(THEME_STORAGE_KEY);
      return theme ? JSON.parse(theme) : {};
    } catch {
      return {};
    }
  });

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

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setPrefs({ ...DEFAULT_PREFS, ...JSON.parse(stored) });
      } catch {
        setPrefs(DEFAULT_PREFS);
      }
    }
    const reloadTheme = () => {
      try {
        const theme = localStorage.getItem(THEME_STORAGE_KEY);
        setFontTheme(theme ? JSON.parse(theme) : {});
      } catch {
        setFontTheme({});
      }
    };
    window.addEventListener("customColorThemeChanged", reloadTheme);
    window.addEventListener("storage", (e) => {
      if (e.key === THEME_STORAGE_KEY) reloadTheme();
    });
    return () => {
      window.removeEventListener("customColorThemeChanged", reloadTheme);
      window.removeEventListener("storage", reloadTheme);
    };
  }, []);

  const handleToggle = (key) => {
    setPrefs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prefs));
    setShowSavedPopup(true);
    setTimeout(() => setShowSavedPopup(false), 2000);
  };

  const handleCancel = () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setPrefs({ ...DEFAULT_PREFS, ...JSON.parse(stored) });
      } catch {
        setPrefs(DEFAULT_PREFS);
      }
    } else {
      setPrefs(DEFAULT_PREFS);
    }
  };

  return (
    <div style={getFontStyle(fontTheme, "main")}>
      {showSavedPopup && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="px-6 py-3 rounded-lg shadow-lg text-white font-semibold bg-green-600">
            Preferences saved!
          </div>
        </div>
      )}
      <div className="flex justify-between mb-4">
        <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
          <NavLinkButton
            to={getRoutePath("doctor.customizations.color_theme")}
            color="primary"
            className="px-5 py-2 rounded-full font-light"
            style={{
              ...getFontStyle(fontTheme, "main"),
              backgroundColor: "#fff",
              color: fontTheme.primaryColor,
              border: `1.5px solid ${fontTheme.primaryColor}`,
            }}
          >
            Color Theme
          </NavLinkButton>
          <NavLinkButton
            to={getRoutePath("doctor.customizations.notification_preferences")}
            color="primary"
            className="px-5 py-2 rounded-full font-light"
            style={{
              ...getFontStyle(fontTheme, "main"),
              backgroundColor: fontTheme.primaryColor,
              color: "#fff",
              border: `1.5px solid ${fontTheme.primaryColor}`,
            }}
          >
            Notification Preferences
          </NavLinkButton>
          <NavLinkButton
            to={getRoutePath("doctor.customizations.integration")}
            color="primary"
            className="px-5 py-2 rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white text-primary"
            style={{
              ...getFontStyle(fontTheme, "main"),
              backgroundColor: "#fff",
              color: fontTheme.primaryColor,
              border: `1.5px solid ${fontTheme.primaryColor}`,
            }}
          >
            Integration Preferences
          </NavLinkButton>
        </div>
        <div>
          <div className="flex justify-end mb-4 gap-2">
            <button
              className="px-8 py-1 text-sm bg-white border border-danger rounded-full text-danger hover:bg-danger hover:text-white transition-all duration-150"
              onClick={handleCancel}
              type="button"
              style={getFontStyle(fontTheme, "main")}
            >
              Cancel
            </button>
            <button
              className="bg-primary border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150"
              onClick={handleSave}
              type="button"
              style={getFontStyle(fontTheme, "main")}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 px-3 py-3 gap-3">
        <div className="bg-white rounded-[20px] shadow-lg mb-4 flex flex-col">
          <div className="h-full">
            <div
              className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]"
              style={getFontStyle(fontTheme, "main")}
            >
              <h2
                className="text-lg font-medium"
                style={getFontStyle(fontTheme, "main")}
              >
                Set Notification Preferences
              </h2>
            </div>
            <div className="relative">
              <div className="p-4 flex justify-between">
                <label
                  htmlFor="appointmentBookingToggle"
                  className="block text-nowrap my-auto"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Patient's Appointment Booking:
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="appointmentBookingToggle"
                    className="sr-only peer"
                    checked={prefs.appointmentBooking}
                    onChange={() => handleToggle("appointmentBooking")}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full border border-grey peer peer-focus:ring-4 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="p-4 flex justify-between">
                <label
                  htmlFor="newPatientToggle"
                  className="block text-nowrap my-auto"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  New Patient added by admin:
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="newPatientToggle"
                    className="sr-only peer"
                    checked={prefs.newPatient}
                    onChange={() => handleToggle("newPatient")}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full border border-grey peer peer-focus:ring-4 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="p-4 flex justify-between">
                <label
                  htmlFor="labReportsToggle"
                  className="block text-nowrap my-auto"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Lab Reports Received:
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="labReportsToggle"
                    className="sr-only peer"
                    checked={prefs.labReports}
                    onChange={() => handleToggle("labReports")}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full border border-grey peer peer-focus:ring-4 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="p-4 flex justify-between">
                <label
                  htmlFor="upcomingAppointmentsToggle"
                  className="block text-nowrap my-auto"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Upcoming Appointments:
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="upcomingAppointmentsToggle"
                    className="sr-only peer"
                    checked={prefs.upcomingAppointments}
                    onChange={() => handleToggle("upcomingAppointments")}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full border border-grey peer peer-focus:ring-4 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="p-4 flex justify-between">
                <label
                  htmlFor="adminActivityToggle"
                  className="block text-nowrap my-auto"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  Any Activity by Admin in your profile:
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="adminActivityToggle"
                    className="sr-only peer"
                    checked={prefs.adminActivity}
                    onChange={() => handleToggle("adminActivity")}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full border border-grey peer peer-focus:ring-4 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNotificationPage;
