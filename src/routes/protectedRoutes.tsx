import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    element: React.ReactNode;
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {

    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("type");

    const isAuthenticated = !!token && !!userType;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const isAuthorized = allowedRoles.includes(userType);

    if (!isAuthorized) {
        return <Navigate to="/" replace />;
    }

    return <>{element}</>;
};

export default ProtectedRoute;
