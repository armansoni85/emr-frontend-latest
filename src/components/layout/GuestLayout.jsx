import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ROUTES from "../../routes";
import { RoleId } from "@src/constant/enumRole";
import { useEffect } from "react";

const GuestLayout = () => {
    document.body.classList.remove("bg-gray-100");
    document.body.classList.add("bg-grey");

    const dispatch = useDispatch();
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { path, firstSet, countToReset } = useSelector((state) => state.params);

    useEffect(() => {
        if (isAuthenticated && (pathname === ROUTES.public.login.path || pathname === ROUTES.public.register.path)) {
            if (!user?.role) {
                navigate(ROUTES.public.login.path, { replace: true });
            }

            if (user?.role === RoleId.ADMIN) {
                navigate(ROUTES.private.doctor.path, { replace: true });
            } else if (user?.role === RoleId.DOCTOR) {
                navigate(ROUTES.private.doctor.path, { replace: true });
            } else {
                navigate(ROUTES.private.patient.path, { replace: true });
            }
        }
    }, [isAuthenticated, pathname, navigate, user]);

    useEffect(() => {
        if (pathname != path && path != "") {
            dispatch({ type: "RESET_HIDDEN_PARAMS" });
        }
    }, [pathname, dispatch, path]);

    return (
        <>
            <div className={`min-h-screen flex`}>
                <Outlet />
            </div>
        </>
    );
};

export default GuestLayout;
