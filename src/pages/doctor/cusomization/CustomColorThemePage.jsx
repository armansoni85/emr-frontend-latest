import { useEffect, useState } from "react";
import { NavLinkButton } from "@src/components";
import { getRoutePath } from "@src/utils/routeUtils";
import { useTheme } from "@src/context/ThemeContext";

const DEFAULT_THEME = {
  primaryColor: "#002952",
  primaryColorOpacity: 100,
  secondaryColor: "#CF0000",
  secondaryColorOpacity: 100,
  tertiaryColor: "#00A1CF",
  tertiaryColorOpacity: 100,
  headingColor: "#333333",
  headingColorOpacity: 100,
  bodyTextColor: "#666666",
  bodyTextColorOpacity: 100,
  borderColor: "#CCCCCC",
  borderColorOpacity: 100,
  linkColor: "#1A73E8",
  linkColorOpacity: 100,
  // Typography defaults
  fontFamily: "Poppins",
  fontWeight: 400,
  fontSize: "16px",
  subHeadingFontFamily: "Poppins",
  subHeadingFontWeight: 500,
  subHeadingFontSize: "18px",
  bodyText1FontFamily: "Poppins",
  bodyText1FontWeight: 400,
  bodyText1FontSize: "14px",
  bodyText2FontFamily: "Poppins",
  bodyText2FontWeight: 400,
  bodyText2FontSize: "12px",
};

const LOCAL_STORAGE_KEY = "customColorTheme";

const CustomColorThemePage = () => {
  const { theme, setTheme } = useTheme();
  const [localTheme, setLocalTheme] = useState(theme);
  const [originalTheme, setOriginalTheme] = useState(DEFAULT_THEME);
  const [showSavedPopup, setShowSavedPopup] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLocalTheme({ ...DEFAULT_THEME, ...parsed });
        setOriginalTheme({ ...DEFAULT_THEME, ...parsed });
      } catch {
        setLocalTheme(DEFAULT_THEME);
        setOriginalTheme(DEFAULT_THEME);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setLocalTheme((prev) => ({
      ...prev,
      [id]: type === "number" ? Number(value) : value,
    }));
  };

  const handleTypographyChange = (prefix, field, value) => {
    setLocalTheme((prev) => ({
      ...prev,
      [`${prefix}${field}`]: value,
    }));
  };

  const handleResetDefault = () => {
    setLocalTheme(DEFAULT_THEME);
  };

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localTheme));
    setTheme(localTheme);
    setShowSavedPopup(true);
    setTimeout(() => setShowSavedPopup(false), 2000);
  };

  const handleCancel = () => {
    setLocalTheme(originalTheme);
  };

  const getColorStyle = (color, opacity) => ({
    backgroundColor: color,
    opacity: Math.max(0, Math.min(1, opacity / 100)),
  });

  return (
    <>
      {/* Popup for saved */}
      {showSavedPopup && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="px-6 py-3 rounded-lg shadow-lg text-white font-semibold bg-green-600">
            Theme saved!
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
          {/* Recordings */}
          <div className="h-full">
            <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
              <h2 className="text-lg font-medium">Set Color Theme</h2>
              <button
                className="text-primary"
                type="button"
                onClick={handleResetDefault}
              >
                Reset to Default
              </button>
            </div>
            <div className="relative">
              {/* Primary Color */}
              <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                <label
                  htmlFor="primaryColor"
                  className="block text-nowrap my-auto"
                >
                  Primary Color:
                </label>
                <div className="flex items-center w-full col-span-2">
                  <input
                    id="primaryColor"
                    type="text"
                    placeholder="#000000"
                    value={localTheme.primaryColor}
                    onChange={handleChange}
                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full"
                  />
                  <input
                    id="primaryColorOpacity"
                    type="number"
                    min={0}
                    max={100}
                    step="1"
                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                    placeholder="Opacity"
                    value={localTheme.primaryColorOpacity}
                    onChange={handleChange}
                  />
                  <div
                    className="w-6 h-6 rounded-full ms-1 p-5 border-8 border-grey outline outline-white"
                    style={getColorStyle(
                      localTheme.primaryColor,
                      localTheme.primaryColorOpacity
                    )}
                  />
                  <div className="ml-2">
                    <button
                      className="bg-white rounded-full p-2 pb-1"
                      type="button"
                      onClick={() =>
                        setLocalTheme((prev) => ({
                          ...prev,
                          primaryColor: DEFAULT_THEME.primaryColor,
                          primaryColorOpacity:
                            DEFAULT_THEME.primaryColorOpacity,
                        }))
                      }
                    >
                      <i
                        className="material-icons text-body"
                        style={{
                          border: `2px solid ${localTheme.borderColor}`,
                          borderRadius: "50%",
                          padding: "2px",
                          color: "inherit",
                        }}
                      >
                        refresh
                      </i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Secondary Color */}
              <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                <label
                  htmlFor="secondaryColor"
                  className="block text-nowrap my-auto"
                >
                  Secondary Color:
                </label>
                <div className="flex items-center w-full col-span-2">
                  <input
                    id="secondaryColor"
                    type="text"
                    placeholder="#000000"
                    value={localTheme.secondaryColor}
                    onChange={handleChange}
                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full"
                  />
                  <input
                    id="secondaryColorOpacity"
                    type="number"
                    min={0}
                    max={100}
                    step="1"
                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                    placeholder="Opacity"
                    value={localTheme.secondaryColorOpacity}
                    onChange={handleChange}
                  />
                  <div
                    className="w-6 h-6 rounded-full ms-1 p-5 border-8 border-grey outline outline-white"
                    style={getColorStyle(
                      localTheme.secondaryColor,
                      localTheme.secondaryColorOpacity
                    )}
                  />
                  <div className="ml-2">
                    <button
                      className="bg-white rounded-full p-2 pb-1"
                      type="button"
                      onClick={() =>
                        setLocalTheme((prev) => ({
                          ...prev,
                          secondaryColor: DEFAULT_THEME.secondaryColor,
                          secondaryColorOpacity:
                            DEFAULT_THEME.secondaryColorOpacity,
                        }))
                      }
                    >
                      <i
                        className="material-icons text-body"
                        style={{
                          border: `2px solid ${localTheme.borderColor}`,
                          borderRadius: "50%",
                          padding: "2px",
                          color: "inherit",
                        }}
                      >
                        refresh
                      </i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Tertiary Color */}
              <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                <label
                  htmlFor="tertiaryColor"
                  className="block text-nowrap my-auto"
                >
                  Tertiary Color:
                </label>
                <div className="flex items-center w-full col-span-2">
                  <input
                    id="tertiaryColor"
                    type="text"
                    placeholder="#000000"
                    value={localTheme.tertiaryColor}
                    onChange={handleChange}
                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full"
                  />
                  <input
                    id="tertiaryColorOpacity"
                    type="number"
                    min={0}
                    max={100}
                    step="1"
                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                    placeholder="Opacity"
                    value={localTheme.tertiaryColorOpacity}
                    onChange={handleChange}
                  />
                  <div
                    className="w-6 h-6 rounded-full ms-1 p-5 border-8 border-grey outline outline-white"
                    style={getColorStyle(
                      localTheme.tertiaryColor,
                      localTheme.tertiaryColorOpacity
                    )}
                  />
                  <div className="ml-2">
                    <button
                      className="bg-white rounded-full p-2 pb-1"
                      type="button"
                      onClick={() =>
                        setLocalTheme((prev) => ({
                          ...prev,
                          tertiaryColor: DEFAULT_THEME.tertiaryColor,
                          tertiaryColorOpacity:
                            DEFAULT_THEME.tertiaryColorOpacity,
                        }))
                      }
                    >
                      <i
                        className="material-icons text-body"
                        style={{
                          border: `2px solid ${localTheme.borderColor}`,
                          borderRadius: "50%",
                          padding: "2px",
                          color: "inherit",
                        }}
                      >
                        refresh
                      </i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Heading Color */}
              <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                <label
                  htmlFor="headingColor"
                  className="block text-nowrap my-auto"
                >
                  Heading Text Color:
                </label>
                <div className="flex items-center w-full col-span-2">
                  <input
                    id="headingColor"
                    type="text"
                    placeholder="#000000"
                    value={localTheme.headingColor}
                    onChange={handleChange}
                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full"
                  />
                  <input
                    id="headingColorOpacity"
                    type="number"
                    min={0}
                    max={100}
                    step="1"
                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                    placeholder="Opacity"
                    value={localTheme.headingColorOpacity}
                    onChange={handleChange}
                  />
                  <div
                    className="w-6 h-6 rounded-full ms-1 p-5 border-8 border-grey outline outline-white"
                    style={getColorStyle(
                      localTheme.headingColor,
                      localTheme.headingColorOpacity
                    )}
                  />
                  <div className="ml-2">
                    <button
                      className="bg-white rounded-full p-2 pb-1"
                      type="button"
                      onClick={() =>
                        setLocalTheme((prev) => ({
                          ...prev,
                          headingColor: DEFAULT_THEME.headingColor,
                          headingColorOpacity:
                            DEFAULT_THEME.headingColorOpacity,
                        }))
                      }
                    >
                      <i
                        className="material-icons text-body"
                        style={{
                          border: `2px solid ${localTheme.borderColor}`,
                          borderRadius: "50%",
                          padding: "2px",
                          color: "inherit",
                        }}
                      >
                        refresh
                      </i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Body Text Color */}
              <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                <label
                  htmlFor="bodyTextColor"
                  className="block text-nowrap my-auto"
                >
                  Body Text Color:
                </label>
                <div className="flex items-center w-full col-span-2">
                  <input
                    id="bodyTextColor"
                    type="text"
                    placeholder="#000000"
                    value={localTheme.bodyTextColor}
                    onChange={handleChange}
                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full"
                  />
                  <input
                    id="bodyTextColorOpacity"
                    type="number"
                    min={0}
                    max={100}
                    step="1"
                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                    placeholder="Opacity"
                    value={localTheme.bodyTextColorOpacity}
                    onChange={handleChange}
                  />
                  <div
                    className="w-6 h-6 rounded-full ms-1 p-5 border-8 border-grey outline outline-white"
                    style={getColorStyle(
                      localTheme.bodyTextColor,
                      localTheme.bodyTextColorOpacity
                    )}
                  />
                  <div className="ml-2">
                    <button
                      className="bg-white rounded-full p-2 pb-1"
                      type="button"
                      onClick={() =>
                        setLocalTheme((prev) => ({
                          ...prev,
                          bodyTextColor: DEFAULT_THEME.bodyTextColor,
                          bodyTextColorOpacity:
                            DEFAULT_THEME.bodyTextColorOpacity,
                        }))
                      }
                    >
                      <i
                        className="material-icons text-body"
                        style={{
                          border: `2px solid ${localTheme.borderColor}`,
                          borderRadius: "50%",
                          padding: "2px",
                          color: "inherit",
                        }}
                      >
                        refresh
                      </i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Border Color */}
              <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                <label
                  htmlFor="borderColor"
                  className="block text-nowrap my-auto"
                >
                  Border Color:
                </label>
                <div className="flex items-center w-full col-span-2">
                  <input
                    id="borderColor"
                    type="text"
                    placeholder="#000000"
                    value={localTheme.borderColor}
                    onChange={handleChange}
                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full"
                  />
                  <input
                    id="borderColorOpacity"
                    type="number"
                    min={0}
                    max={100}
                    step="1"
                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                    placeholder="Opacity"
                    value={localTheme.borderColorOpacity}
                    onChange={handleChange}
                  />
                  <div
                    className="w-6 h-6 rounded-full ms-1 p-5 border-8 border-grey outline outline-white"
                    style={getColorStyle(
                      localTheme.borderColor,
                      localTheme.borderColorOpacity
                    )}
                  />
                  <div className="ml-2">
                    <button
                      className="bg-white rounded-full p-2 pb-1"
                      type="button"
                      onClick={() =>
                        setLocalTheme((prev) => ({
                          ...prev,
                          borderColor: DEFAULT_THEME.borderColor,
                          borderColorOpacity: DEFAULT_THEME.borderColorOpacity,
                        }))
                      }
                    >
                      <i
                        className="material-icons text-body"
                        style={{
                          border: `2px solid ${localTheme.borderColor}`,
                          borderRadius: "50%",
                          padding: "2px",
                          color: "inherit",
                        }}
                      >
                        refresh
                      </i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Link Color */}
              <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                <label
                  htmlFor="linkColor"
                  className="block text-nowrap my-auto"
                >
                  Link Color:
                </label>
                <div className="flex items-center w-full col-span-2">
                  <input
                    id="linkColor"
                    type="text"
                    placeholder="#000000"
                    value={localTheme.linkColor}
                    onChange={handleChange}
                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full"
                  />
                  <input
                    id="linkColorOpacity"
                    type="number"
                    min={0}
                    max={100}
                    step="1"
                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                    placeholder="Opacity"
                    value={localTheme.linkColorOpacity}
                    onChange={handleChange}
                  />
                  <div
                    className="w-6 h-6 rounded-full ms-1 p-5 border-8 border-grey outline outline-white"
                    style={getColorStyle(
                      localTheme.linkColor,
                      localTheme.linkColorOpacity
                    )}
                  />
                  <div className="ml-2">
                    <button
                      className="bg-white rounded-full p-2 pb-1"
                      type="button"
                      onClick={() =>
                        setLocalTheme((prev) => ({
                          ...prev,
                          linkColor: DEFAULT_THEME.linkColor,
                          linkColorOpacity: DEFAULT_THEME.linkColorOpacity,
                        }))
                      }
                    >
                      <i
                        className="material-icons text-body"
                        style={{
                          border: `2px solid ${localTheme.borderColor}`,
                          borderRadius: "50%",
                          padding: "2px",
                          color: "inherit",
                        }}
                      >
                        refresh
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Typography Settings */}
        <div className="bg-white rounded-[20px] shadow-lg mb-4">
          <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
            <h2 className="text-lg font-medium">Set Typography</h2>
            <button
              className="text-primary"
              type="button"
              onClick={() =>
                setLocalTheme((prev) => ({
                  ...prev,
                  fontFamily: DEFAULT_THEME.fontFamily,
                  fontWeight: DEFAULT_THEME.fontWeight,
                  fontSize: DEFAULT_THEME.fontSize,
                  subHeadingFontFamily: DEFAULT_THEME.subHeadingFontFamily,
                  subHeadingFontWeight: DEFAULT_THEME.subHeadingFontWeight,
                  subHeadingFontSize: DEFAULT_THEME.subHeadingFontSize,
                  bodyText1FontFamily: DEFAULT_THEME.bodyText1FontFamily,
                  bodyText1FontWeight: DEFAULT_THEME.bodyText1FontWeight,
                  bodyText1FontSize: DEFAULT_THEME.bodyText1FontSize,
                  bodyText2FontFamily: DEFAULT_THEME.bodyText2FontFamily,
                  bodyText2FontWeight: DEFAULT_THEME.bodyText2FontWeight,
                  bodyText2FontSize: DEFAULT_THEME.bodyText2FontSize,
                }))
              }
            >
              Reset to Default
            </button>
          </div>
          <div className="p-4">
            {/* Main Font */}
            <label className="block text-nowrap my-auto mb-3">Main Font:</label>
            <div className="flex items-center w-full col-span-2 mb-4">
              <select
                id="fontFamily"
                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                value={localTheme.fontFamily}
                onChange={(e) =>
                  handleTypographyChange("", "fontFamily", e.target.value)
                }
              >
                <option value="Poppins">Poppins</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
              </select>
              <select
                id="fontWeight"
                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                value={localTheme.fontWeight}
                onChange={(e) =>
                  handleTypographyChange(
                    "",
                    "fontWeight",
                    Number(e.target.value)
                  )
                }
              >
                <option value={400}>Normal</option>
                <option value={500}>Medium</option>
                <option value={600}>Semi-Bold</option>
                <option value={700}>Bold</option>
              </select>
              <select
                id="fontSize"
                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                value={localTheme.fontSize}
                onChange={(e) =>
                  handleTypographyChange("", "fontSize", e.target.value)
                }
              >
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="22px">22px</option>
                <option value="24px">24px</option>
              </select>
            </div>
            {/* Sub Heading */}
            <label className="block text-nowrap my-auto mb-3">
              Sub Heading:
            </label>
            <div className="flex items-center w-full col-span-2 mb-4">
              <select
                id="subHeadingFontFamily"
                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                value={localTheme.subHeadingFontFamily}
                onChange={(e) =>
                  handleTypographyChange(
                    "subHeading",
                    "FontFamily",
                    e.target.value
                  )
                }
              >
                <option value="Poppins">Poppins</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
              </select>
              <select
                id="subHeadingFontWeight"
                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                value={localTheme.subHeadingFontWeight}
                onChange={(e) =>
                  handleTypographyChange(
                    "subHeading",
                    "FontWeight",
                    Number(e.target.value)
                  )
                }
              >
                <option value={400}>Normal</option>
                <option value={500}>Medium</option>
                <option value={600}>Semi-Bold</option>
                <option value={700}>Bold</option>
              </select>
              <select
                id="subHeadingFontSize"
                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                value={localTheme.subHeadingFontSize}
                onChange={(e) =>
                  handleTypographyChange(
                    "subHeading",
                    "FontSize",
                    e.target.value
                  )
                }
              >
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="22px">22px</option>
                <option value="24px">24px</option>
              </select>
            </div>
            {/* Body Text 1 */}
            <label className="block text-nowrap my-auto mb-3">
              Body Text 1:
            </label>
            <div className="flex items-center w-full col-span-2 mb-4">
              <select
                id="bodyText1FontFamily"
                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                value={localTheme.bodyText1FontFamily}
                onChange={(e) =>
                  handleTypographyChange(
                    "bodyText1",
                    "FontFamily",
                    e.target.value
                  )
                }
              >
                <option value="Poppins">Poppins</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
              </select>
              <select
                id="bodyText1FontWeight"
                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                value={localTheme.bodyText1FontWeight}
                onChange={(e) =>
                  handleTypographyChange(
                    "bodyText1",
                    "FontWeight",
                    Number(e.target.value)
                  )
                }
              >
                <option value={400}>Normal</option>
                <option value={500}>Medium</option>
                <option value={600}>Semi-Bold</option>
                <option value={700}>Bold</option>
              </select>
              <select
                id="bodyText1FontSize"
                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                value={localTheme.bodyText1FontSize}
                onChange={(e) =>
                  handleTypographyChange(
                    "bodyText1",
                    "FontSize",
                    e.target.value
                  )
                }
              >
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="22px">22px</option>
                <option value="24px">24px</option>
              </select>
            </div>
            {/* Body Text 2 */}
            <label className="block text-nowrap my-auto mb-3">
              Body Text 2:
            </label>
            <div className="flex items-center w-full col-span-2">
              <select
                id="bodyText2FontFamily"
                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                value={localTheme.bodyText2FontFamily}
                onChange={(e) =>
                  handleTypographyChange(
                    "bodyText2",
                    "FontFamily",
                    e.target.value
                  )
                }
              >
                <option value="Poppins">Poppins</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
              </select>
              <select
                id="bodyText2FontWeight"
                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                value={localTheme.bodyText2FontWeight}
                onChange={(e) =>
                  handleTypographyChange(
                    "bodyText2",
                    "FontWeight",
                    Number(e.target.value)
                  )
                }
              >
                <option value={400}>Normal</option>
                <option value={500}>Medium</option>
                <option value={600}>Semi-Bold</option>
                <option value={700}>Bold</option>
              </select>
              <select
                id="bodyText2FontSize"
                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                value={localTheme.bodyText2FontSize}
                onChange={(e) =>
                  handleTypographyChange(
                    "bodyText2",
                    "FontSize",
                    e.target.value
                  )
                }
              >
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="22px">22px</option>
                <option value="24px">24px</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomColorThemePage;
