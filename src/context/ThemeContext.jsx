import React, { createContext, useContext, useEffect, useState } from "react";

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

const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setTheme({ ...DEFAULT_THEME, ...JSON.parse(stored) });
      } catch {
        setTheme(DEFAULT_THEME);
      }
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", theme.primaryColor);
    root.style.setProperty(
      "--primary-color-opacity",
      theme.primaryColorOpacity / 100
    );
    root.style.setProperty("--secondary-color", theme.secondaryColor);
    root.style.setProperty(
      "--secondary-color-opacity",
      theme.secondaryColorOpacity / 100
    );
    root.style.setProperty("--tertiary-color", theme.tertiaryColor);
    root.style.setProperty(
      "--tertiary-color-opacity",
      theme.tertiaryColorOpacity / 100
    );
    root.style.setProperty("--heading-color", theme.headingColor);
    root.style.setProperty(
      "--heading-color-opacity",
      theme.headingColorOpacity / 100
    );
    root.style.setProperty("--body-text-color", theme.bodyTextColor);
    root.style.setProperty(
      "--body-text-color-opacity",
      theme.bodyTextColorOpacity / 100
    );
    root.style.setProperty("--border-color", theme.borderColor);
    root.style.setProperty(
      "--border-color-opacity",
      theme.borderColorOpacity / 100
    );
    root.style.setProperty("--link-color", theme.linkColor);
    root.style.setProperty(
      "--link-color-opacity",
      theme.linkColorOpacity / 100
    );
    root.style.setProperty("--font-family", theme.fontFamily);
    root.style.setProperty("--font-weight", theme.fontWeight);
    root.style.setProperty("--font-size", theme.fontSize);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
