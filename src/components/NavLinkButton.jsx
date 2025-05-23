import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NavLinkButton = ({ children, to = "#", color = "primary", size = "medium", rounded = "rounded-full", className = "", ...rest }) => {
    const location = useLocation();
    const { pathname } = location;
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!to || to === "#") {
            return;
        }

        if (pathname === to) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [pathname, to]);

    const enumButtonColor = {
        primary: "bg-primary text-white hover:bg-opacity-90",
        secondary: "bg-secondary text-white hover:bg-opacity-90",
        danger: "bg-danger text-white hover:bg-opacity-90",
        success: "bg-success text-white hover:bg-opacity-90",
        warning: "bg-warning text-white hover:bg-opacity-90",
        grey: "bg-grey text-primary hover:bg-primary hover:text-white",
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
        small: `text-sm px-2 py-2 ${rounded}`,
        medium: `text-base px-3 py-2 ${rounded}`,
        large: `text-lg px-4 py-3 ${rounded}`,
    };

    const defaultClassName = "transition duration-150";

    return (
        <NavLink
            to={to}
            className={`${!isActive ? enumButtonOutlineColor[color] : enumButtonColor[color]} ${
                enumButtonSize[size]
            } ${defaultClassName} ${className}`}
            {...rest}>
            {children}
        </NavLink>
    );
};

export default NavLinkButton;
