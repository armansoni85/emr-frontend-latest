import { useEffect, useState } from "react";
import { NavLinkButton } from "@src/components";
import { getRoutePath } from "@src/utils/routeUtils";

const LOCAL_STORAGE_KEY = "customIntegrationPreferences";

const DEFAULT_PREFS = {
  labPreference: "allLabs",
  carequality: false,
  eHealthExchange: false,
  commonWellHealthAlliance: false,
  loremIpsumDummy: false,
};

const CustomIntegrationPage = () => {
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [showSavedPopup, setShowSavedPopup] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setPrefs({ ...DEFAULT_PREFS, ...JSON.parse(stored) });
      } catch {
        setPrefs(DEFAULT_PREFS);
      }
    }
  }, []);

  const handleLabPreference = (value) => {
    setPrefs((prev) => ({
      ...prev,
      labPreference: value,
    }));
  };

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
    <>
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
          >
            Color Theme
          </NavLinkButton>
          <NavLinkButton
            to={getRoutePath("doctor.customizations.notification_preferences")}
            color="primary"
            className="px-5 py-2 rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white text-primary"
          >
            Notification Preferences
          </NavLinkButton>
          <NavLinkButton
            to={getRoutePath("doctor.customizations.integration")}
            color="primary"
            className="px-5 py-2 rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white text-primary"
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
            >
              Cancel
            </button>
            <button
              className="bg-primary border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150"
              onClick={handleSave}
              type="button"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 px-3 py-3 gap-3">
        <div className="bg-white rounded-[20px] shadow-lg mb-4 flex flex-col">
          {/* Lab Preferences */}
          <div className="h-full">
            <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
              <h2 className="text-lg font-medium">Lab Preferences</h2>
              <button className="text-primary">Default: All Labs</button>
            </div>
            <div className="relative p-4">
              <label htmlFor="">Set Lab Preference</label>
              <div className="flex">
                <div className="flex items-center mr-4 bg-grey px-3 py-2 rounded-full">
                  <input
                    type="radio"
                    id="allLabs"
                    name="labPreference"
                    className="sr-only peer"
                    checked={prefs.labPreference === "allLabs"}
                    onChange={() => handleLabPreference("allLabs")}
                  />
                  <label
                    htmlFor="allLabs"
                    className="flex items-center cursor-pointer"
                  >
                    <div
                      className={`w-4 h-4 mr-2 rounded-full border border-grey ${
                        prefs.labPreference === "allLabs"
                          ? "bg-primary ring-2 ring-primary"
                          : ""
                      }`}
                    ></div>
                    <span>All Labs</span>
                  </label>
                </div>
                <div className="flex items-center mr-4 bg-grey px-3 py-2 rounded-full">
                  <input
                    type="radio"
                    id="preferredLabs"
                    name="labPreference"
                    className="sr-only peer"
                    checked={prefs.labPreference === "preferredLabs"}
                    onChange={() => handleLabPreference("preferredLabs")}
                  />
                  <label
                    htmlFor="preferredLabs"
                    className="flex items-center cursor-pointer"
                  >
                    <div
                      className={`w-4 h-4 mr-2 rounded-full border border-grey ${
                        prefs.labPreference === "preferredLabs"
                          ? "bg-primary ring-2 ring-primary"
                          : ""
                      }`}
                    ></div>
                    <span>Preferred Labs</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* HIE Networks */}
        <div className="bg-white rounded-[20px] shadow-lg mb-4 flex flex-col">
          <div className="h-full">
            <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
              <h2 className="text-lg font-medium">HIE Networks</h2>
            </div>
            <div className="relative">
              <div className="p-4 flex justify-between">
                <label
                  htmlFor="carequalityToggle"
                  className="block text-nowrap my-auto"
                >
                  Carequality:
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="carequalityToggle"
                    className="sr-only peer"
                    checked={prefs.carequality}
                    onChange={() => handleToggle("carequality")}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full border border-grey peer peer-focus:ring-4 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="p-4 flex justify-between">
                <label
                  htmlFor="eHealthExchangeToggle"
                  className="block text-nowrap my-auto"
                >
                  eHealth Exchange:
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="eHealthExchangeToggle"
                    className="sr-only peer"
                    checked={prefs.eHealthExchange}
                    onChange={() => handleToggle("eHealthExchange")}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full border border-grey peer peer-focus:ring-4 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="p-4 flex justify-between">
                <label
                  htmlFor="commonWellHealthAllianceToggle"
                  className="block text-nowrap my-auto"
                >
                  commonWell Health Alliance:
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="commonWellHealthAllianceToggle"
                    className="sr-only peer"
                    checked={prefs.commonWellHealthAlliance}
                    onChange={() => handleToggle("commonWellHealthAlliance")}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full border border-grey peer peer-focus:ring-4 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="p-4 flex justify-between">
                <label
                  htmlFor="loremIpsumDummyToggle"
                  className="block text-nowrap my-auto"
                >
                  Lorem Ipsum Dummy:
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="loremIpsumDummyToggle"
                    className="sr-only peer"
                    checked={prefs.loremIpsumDummy}
                    onChange={() => handleToggle("loremIpsumDummy")}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full border border-grey peer peer-focus:ring-4 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomIntegrationPage;
