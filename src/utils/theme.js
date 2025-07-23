
const THEME_STORAGE_KEY = "customColorTheme";
export const getFontTheme = () => {
    try {
        const theme = localStorage.getItem(THEME_STORAGE_KEY);
        return theme ? JSON.parse(theme) : {};
    } catch {
        return {};
    }
};
export const getFontStyle = (fontTheme, type = "main") => {
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