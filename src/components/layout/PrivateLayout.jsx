import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ROUTES from "../../routes";
import SideBar from "./sidebar/SideBar";
import TopBar from "./TopBar";
import { useEffect } from "react";

const PrivateLayout = () => {
    document.body.classList.remove("bg-grey");
    document.body.classList.add("bg-gray-100");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { pathname } = location;

    const { isAuthenticated } = useSelector((state) => state.auth);
    const { isSidebarOpen } = useSelector((state) => state.sideNavBar);
    const { path } = useSelector((state) => state.params);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(ROUTES.public.login.path, { replace: true });
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (pathname != path && path != "") {
            dispatch({ type: "RESET_HIDDEN_PARAMS" });
        }
    }, [pathname, dispatch, path]);

    return (
        <>
            <div className={`h-screen flex transition-all`}>
                <SideBar />
                <div
                    id="main-content"
                    className={`transition-all bg-gray-100 p-0 ${isSidebarOpen ? "main-content-collapsed" : "main-content-expanded"}`}>
                    <TopBar />
                    <div className="tab-content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivateLayout;
