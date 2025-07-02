import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "@src/context/ThemeContext";

const NavLinkButton = ({
  children,
  to = "#",
  color = "primary",
  size = "medium",
  rounded = "rounded-full",
  className = "",
  ...rest
}) => {
  const location = useLocation();
  const { pathname } = location;
  const [isActive, setIsActive] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleThemeChanged = () => {
      setIsActive((v) => v);
    };
    window.addEventListener("customColorThemeChanged", handleThemeChanged);
    window.addEventListener("storage", (e) => {
      if (e.key === "customColorTheme") handleThemeChanged();
    });
    return () => {
      window.removeEventListener("customColorThemeChanged", handleThemeChanged);
      window.removeEventListener("storage", handleThemeChanged);
    };
  }, []);

  useEffect(() => {
    if (!to || to === "#") {
      return;
    }
    setIsActive(pathname === to);
  }, [pathname, to]);

  const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  const getDynamicStyles = (colorKey) => {
    if (!theme) return {};

    const colorMap = {
      primary: {
        bg: theme.primaryColor,
        opacity: theme.primaryColorOpacity,
      },
      secondary: {
        bg: theme.secondaryColor,
        opacity: theme.secondaryColorOpacity,
      },
      tertiary: {
        bg: theme.tertiaryColor,
        opacity: theme.tertiaryColorOpacity,
      },
      danger: { bg: "#dc2626", opacity: 100 },
      success: { bg: "#16a34a", opacity: 100 },
      warning: { bg: "#ca8a04", opacity: 100 },
      grey: { bg: "#6b7280", opacity: 100 },
      white: { bg: "#ffffff", opacity: 100 },
    };

    const colorConfig = colorMap[colorKey] || colorMap.primary;
    const bgColor = hexToRgba(colorConfig.bg, colorConfig.opacity);
    const borderColor = hexToRgba(
      theme.primaryColor || "#002952",
      theme.primaryColorOpacity || 100
    );
    const textColor = theme.bodyTextColor || "#ffffff";

    return {
      active: {
        backgroundColor: bgColor,
        color: textColor,
        borderColor: borderColor,
      },
      inactive: {
        backgroundColor: "transparent",
        color: colorConfig.bg,
        borderColor: borderColor,
      },
    };
  };

  const enumButtonColor = {
    primary: "bg-primary text-white hover:bg-opacity-90",
    secondary: "bg-secondary text-white hover:bg-opacity-90",
    tertiary: "bg-tertiary text-white hover:bg-opacity-90",
    danger: "bg-danger text-white hover:bg-opacity-90",
    success: "bg-success text-white hover:bg-opacity-90",
    warning: "bg-warning text-white hover:bg-opacity-90",
    grey: "bg-grey text-primary hover:bg-primary hover:text-white",
    white: "bg-white text-primary hover:bg-primary hover:text-white",
  };

  const enumButtonOutlineColor = {
    primary:
      "border border-primary text-primary hover:bg-primary hover:text-white",
    secondary:
      "border border-primary text-secondary hover:bg-secondary hover:text-white",
    tertiary:
      "border border-primary text-tertiary hover:bg-tertiary hover:text-white",
    danger:
      "border border-primary text-danger hover:bg-danger hover:text-white",
    success:
      "border border-primary text-success hover:bg-success hover:text-white",
    warning:
      "border border-primary text-warning hover:bg-warning hover:text-white",
    grey: "border border-primary text-grey hover:bg-grey hover:text-white",
    white: "border border-primary text-white hover:bg-white hover:text-primary",
  };

  const enumButtonSize = {
    small: `text-sm px-2 py-2 ${rounded}`,
    medium: `text-base px-3 py-2 ${rounded}`,
    large: `text-lg px-4 py-3 ${rounded}`,
  };

  const defaultClassName = "transition duration-150 border";

  if (theme) {
    const dynamicStyles = getDynamicStyles(color);
    const currentStyle = isActive
      ? dynamicStyles.active
      : dynamicStyles.inactive;

    return (
      <NavLink
        to={to}
        className={`${enumButtonSize[size]} ${defaultClassName} ${className}`}
        style={{
          ...currentStyle,
          fontFamily: theme.fontFamily || "inherit",
          fontSize: theme.fontSize || "inherit",
          fontWeight: theme.fontWeight || "inherit",
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            const styles = getDynamicStyles(color);
            e.target.style.backgroundColor = styles.active.backgroundColor;
            e.target.style.color = styles.active.color;
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            const styles = getDynamicStyles(color);
            e.target.style.backgroundColor = styles.inactive.backgroundColor;
            e.target.style.color = styles.inactive.color;
          }
        }}
        {...rest}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <NavLink
      to={to}
      className={`${
        !isActive ? enumButtonOutlineColor[color] : enumButtonColor[color]
      } ${enumButtonSize[size]} ${defaultClassName} ${className}`}
      {...rest}
    >
      {children}
    </NavLink>
  );
};

export default NavLinkButton;
