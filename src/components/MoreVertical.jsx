import { useEffect, useRef, useState } from "react";

const MoreVertical = ({ children, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={menuRef}
            className={`float-right relative ${className}`}>
            <button
                className="px-3 py-1"
                onClick={toggleMenu}>
                <i className="material-icons">more_vert</i>
            </button>
            <div className={`absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10 ${isOpen ? "" : "hidden"}`}>{children}</div>
        </div>
    );
};

export default MoreVertical;
