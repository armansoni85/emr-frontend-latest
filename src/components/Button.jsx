import { useTheme } from "@src/context/ThemeContext";

const Button = ({
  children,
  onClick,
  type = "button",
  color = "primary",
  size = "medium",
  rounded = "rounded-full",
  isOutline = false,
  isBold = false,
  className = "",
  disabled = false,
}) => {
  const { theme } = useTheme();

  const getThemeColor = (key, fallback) => theme?.[key] || fallback;

  const enumButtonColor = {
    primary: `bg-[${getThemeColor(
      "primaryColor",
      "#002952"
    )}] text-white hover:bg-opacity-90`,
    secondary: `bg-[${getThemeColor(
      "secondaryColor",
      "#CF0000"
    )}] text-white hover:bg-opacity-90`,
    danger: `bg-[${getThemeColor(
      "dangerColor",
      "#DC2626"
    )}] text-white hover:bg-opacity-90`,
    success: `bg-[${getThemeColor(
      "successColor",
      "#22C55E"
    )}] text-white hover:bg-opacity-90`,
    warning: `bg-[${getThemeColor(
      "warningColor",
      "#F59E42"
    )}] text-white hover:bg-opacity-90`,
    grey: `bg-[${getThemeColor(
      "greyColor",
      "#F3F4F6"
    )}] text-[${getThemeColor(
      "primaryColor",
      "#002952"
    )}] hover:bg-[${getThemeColor(
      "primaryColor",
      "#002952"
    )}] hover:text-white`,
    info: `bg-[${getThemeColor(
      "infoColor",
      "#3B82F6"
    )}] text-white hover:bg-opacity-90`,
    white: `bg-white text-[${getThemeColor(
      "primaryColor",
      "#002952"
    )}] hover:bg-[${getThemeColor(
      "primaryColor",
      "#002952"
    )}] hover:text-white`,
  };

  const enumButtonOutlineColor = {
    primary: `border border-[${getThemeColor(
      "primaryColor",
      "#002952"
    )}] text-[${getThemeColor(
      "primaryColor",
      "#002952"
    )}] hover:bg-[${getThemeColor(
      "primaryColor",
      "#002952"
    )}] hover:text-white`,
    secondary: `border border-[${getThemeColor(
      "secondaryColor",
      "#CF0000"
    )}] text-[${getThemeColor(
      "secondaryColor",
      "#CF0000"
    )}] hover:bg-[${getThemeColor(
      "secondaryColor",
      "#CF0000"
    )}] hover:text-white`,
    danger: `border border-[${getThemeColor(
      "dangerColor",
      "#DC2626"
    )}] text-[${getThemeColor(
      "dangerColor",
      "#DC2626"
    )}] hover:bg-[${getThemeColor("dangerColor", "#DC2626")}] hover:text-white`,
    success: `border border-[${getThemeColor(
      "successColor",
      "#22C55E"
    )}] text-[${getThemeColor(
      "successColor",
      "#22C55E"
    )}] hover:bg-[${getThemeColor(
      "successColor",
      "#22C55E"
    )}] hover:text-white`,
    warning: `border border-[${getThemeColor(
      "warningColor",
      "#F59E42"
    )}] text-[${getThemeColor(
      "warningColor",
      "#F59E42"
    )}] hover:bg-[${getThemeColor(
      "warningColor",
      "#F59E42"
    )}] hover:text-white`,
    grey: `border border-[${getThemeColor(
      "greyColor",
      "#F3F4F6"
    )}] text-[${getThemeColor(
      "greyColor",
      "#F3F4F6"
    )}] hover:bg-[${getThemeColor("greyColor", "#F3F4F6")}] hover:text-white`,
    info: `border border-[${getThemeColor(
      "infoColor",
      "#3B82F6"
    )}] text-[${getThemeColor(
      "infoColor",
      "#3B82F6"
    )}] hover:bg-[${getThemeColor(
      "infoColor",
      "#3B82F6"
    )}] hover:text-white`,
    white: `border border-white text-white hover:bg-white hover:text-[${getThemeColor(
      "primaryColor",
      "#002952"
    )}]`,
  };

  const enumButtonSize = {
    small: `text-sm px-3 py-2 ${rounded} ${isBold ? "font-semibold" : "font-normal"
      }`,
    medium: `text-base px-3 py-2 ${rounded} ${isBold ? "font-semibold" : "font-normal"
      }`,
    large: `text-lg px-3 py-3 ${rounded} ${isBold ? "font-semibold" : "font-normal"
      }`,
  };

  const defaultClassName = "transition duration-150";
  const disabledClassName = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const style =
    color === "primary"
      ? {
        backgroundColor: !isOutline ? theme.primaryColor : undefined,
        color: isOutline ? theme.primaryColor : undefined,
        borderColor: isOutline ? theme.primaryColor : undefined,
        fontFamily: theme.fontFamily,
      }
      : color === "secondary"
        ? {
          backgroundColor: !isOutline ? theme.secondaryColor : undefined,
          color: isOutline ? theme.secondaryColor : undefined,
          borderColor: isOutline ? theme.secondaryColor : undefined,
          fontFamily: theme.fontFamily,
        }
        : color === "grey"
          ? {
            backgroundColor: !isOutline ? theme.borderColor : undefined,
            color: isOutline ? theme.borderColor : undefined,
            borderColor: isOutline ? theme.borderColor : undefined,
            fontFamily: theme.fontFamily,
          }
          : {
            fontFamily: theme.fontFamily,
          };

  return (
    <button
      type={type}
      className={`${isOutline ? enumButtonOutlineColor[color] : enumButtonColor[color]
        } ${enumButtonSize[size]
        } ${defaultClassName} ${disabledClassName} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
