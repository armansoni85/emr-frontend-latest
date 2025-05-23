import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GuestLayout from "./components/layout/GuestLayout";
import PrivateLayout from "./components/layout/PrivateLayout";
import ROUTES from "./routes";

const renderRoutes = (routes) => {
    return Object.entries(routes).map(([key, route], index) => {
        return (
            <Route
                key={index}
                index={route.index}
                path={route.path}
                element={route.element}>
                {route.childRoutes && renderRoutes(route.childRoutes)}
            </Route>
        );
    });
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route element={<GuestLayout />}>
                    {Object.values(ROUTES.public).map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Route>

                {renderRoutes(ROUTES.private)}

                {/* Redirect to login if no match */}
                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
