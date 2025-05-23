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
    const enumButtonColor = {
        primary: "bg-primary text-white hover:bg-opacity-90",
        secondary: "bg-secondary text-white hover:bg-opacity-90",
        danger: "bg-danger text-white hover:bg-opacity-90",
        success: "bg-success text-white hover:bg-opacity-90",
        warning: "bg-warning text-white hover:bg-opacity-90",
        grey: "bg-grey text-primary hover:bg-primary hover:text-white",
        info: "bg-info text-white hover:bg-opacity-90",
        white: "bg-white text-primary hover:bg-primary hover:text-white",
    };

    const enumButtonOutlineColor = {
        primary: "border border-primary text-primary hover:bg-primary hover:text-white",
        secondary: "border border-secondary text-secondary hover:bg-secondary hover:text-white",
        danger: "border border-danger text-danger hover:bg-danger hover:text-white",
        success: "border border-success text-success hover:bg-success hover:text-white",
        warning: "border border-warning text-warning hover:bg-warning hover:text-white",
        grey: "border border-grey text-grey hover:bg-grey hover:text-white",
        info: "border border-info text-info hover:bg-info hover:text-white",
        white: "border border-white text-white hover:bg-white hover:text-primary",
    };

    const enumButtonSize = {
        small: `text-sm px-3 py-2 ${rounded} ${isBold ? "font-semibold" : "font-normal"}`,
        medium: `text-base px-3 py-2 ${rounded} ${isBold ? "font-semibold" : "font-normal"}`,
        large: `text-lg px-3 py-3 ${rounded} ${isBold ? "font-semibold" : "font-normal"}`,
    };

    const defaultClassName = "transition duration-150";

    // Add disabled styles if needed
    const disabledClassName = disabled
        ? "opacity-50 cursor-not-allowed pointer-events-none"
        : "";

    return (
        <button
            type={type}
            className={`${isOutline ? enumButtonOutlineColor[color] : enumButtonColor[color]} ${enumButtonSize[size]
                } ${defaultClassName} ${disabledClassName} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
