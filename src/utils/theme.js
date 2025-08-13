
const THEME_STORAGE_KEY = "customColorTheme";
// Remove localStorage dependency and update getFontStyle to work with ThemeContext
export const getFontStyle = (theme, type = "main") => {
    if (!theme) return {};
    if (type === "subHeading") {
        return {
            fontFamily: theme.subHeadingFontFamily || theme.fontFamily,
            fontWeight: theme.subHeadingFontWeight || theme.fontWeight,
            fontSize: theme.subHeadingFontSize || theme.fontSize,
        };
    }
    if (type === "body1") {
        return {
            fontFamily: theme.bodyText1FontFamily || theme.fontFamily,
            fontWeight: theme.bodyText1FontWeight || theme.fontWeight,
            fontSize: theme.bodyText1FontSize || theme.fontSize,
        };
    }
    if (type === "body2") {
        return {
            fontFamily: theme.bodyText2FontFamily || theme.fontFamily,
            fontWeight: theme.bodyText2FontWeight || theme.fontWeight,
            fontSize: theme.bodyText2FontSize || theme.fontSize,
        };
    }
    return {
        fontFamily: theme.fontFamily,
        fontWeight: theme.fontWeight,
        fontSize: theme.fontSize,
    };
};

// Keep getFontTheme for backward compatibility but mark as deprecated
export const getFontTheme = () => {
    console.warn('getFontTheme is deprecated. Use ThemeContext instead.');
    try {
        const theme = localStorage.getItem("customColorTheme");
        return theme ? JSON.parse(theme) : {};
    } catch {
        return {};
    }
};