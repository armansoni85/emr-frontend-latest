import { Link } from "react-router-dom";

const MoreVerticalItem = ({ children, className, to = "#", onClick }) => {
    return (
        <Link to={to} onClick={onClick} className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${className}`}>
            {children}
        </Link>
    );
};

export default MoreVerticalItem;
