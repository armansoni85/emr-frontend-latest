import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { RoleId } from "@src/constant/enumRole";
import { getRoutePath } from "@src/utils/routeUtils";
import { logout } from "../../redux/reducers/auth/authReducer";
import { toggleSidebar } from "../../redux/reducers/sidebarReducer";
import { useState } from "react";

const TopBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    // console.log("TopBar", user);

    const { activeMenu } = useSelector((state) => state.sideNavBar);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        console.log("Dropdown toggled", isDropdownOpen);
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="flex justify-between items-center mb-6 bg-white p-6 shadow ">
            <div className="flex">
                <span
                    className="material-icons text-gray-500 text-3xl mr-3 cursor-pointer"
                    onClick={() => dispatch(toggleSidebar())}>
                    menu
                </span>
                <h1 className="text-2xl font-semibold text-[#585858]">
                    {activeMenu?.text}
                    {/* {activeSubMenu && `/ ${activeSubMenu?.text}`} */}
                </h1>
            </div>
            {/* Profile Section */}
            <div className="flex items-center">
                <span className="material-icons notifications text-gray-500 mr-4 cursor-pointer">notifications</span>
                <div className="flex items-center space-x-4">
                    <img
                        src="/assets/images/flag.png"
                        alt="flag"
                        className="w-6 h-4"
                    />
                    <div className="relative flex gap-2 bg-grey rounded-full p-1 pe-3">
                        <img
                            src={user?.profile_picture || "/assets/images/profile.png"}
                            onClick={toggleDropdown}
                            alt="profile"
                            onError={(e) => {
                                e.target.onerror = null; // Prevents infinite loop
                                e.target.src = "/assets/images/profile.png"; // Fallback image
                            }}
                            className="rounded-full w-6 h-6"
                        />
                        <span
                            className="text-gray-600 font-medium my-auto md:block hidden hover:bg-opacity-50 cursor-pointer"
                            onClick={toggleDropdown}>
                            {user?.first_name} {user?.last_name}
                        </span>
                        <div
                            id="dropdownMenuNavbar"
                            className={`absolute bg-white shadow-lg rounded-2xl mt-2 top-6 right-0 py-1 ${isDropdownOpen ? "block" : "hidden"}`}>
                            <Link
                                to={getRoutePath(`${user?.role === RoleId.PATIENT ? "patient" : "doctor"}.profile.personal_details`)}
                                className="block px-4 py-1 text-gray-800 text-link hover:bg-gray-200 rounded-2xl">
                                Personal Details
                            </Link>
                            <Link
                                to={getRoutePath(`${user?.role === RoleId.PATIENT ? "patient" : "doctor"}.profile.change_password`)}
                                className="block px-4 py-1 text-gray-800 text-link hover:bg-gray-200 rounded-2xl">
                                Change Password
                            </Link>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(logout());
                                }}
                                className="block px-4 py-1 text-gray-800 text-link hover:bg-gray-200 rounded-2xl">
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
