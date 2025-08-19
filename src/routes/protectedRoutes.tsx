import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    element: React.ReactNode;
    allowedRoles: string[];
    userRole: string | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles, userRole }) => {
    if (!userRole) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(userRole)) return <Navigate to="/" replace />;

    return <>{element}</>;
};

export default ProtectedRoute;
