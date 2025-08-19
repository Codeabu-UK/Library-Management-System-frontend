import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    element: React.ReactNode;
    allowedRoles: string[];
    userRole: string | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles, userRole }) => {

    const normalizedRole = userRole?.trim().toUpperCase() || null;
    const normalizedAllowed = allowedRoles.map(r => r.trim().toUpperCase());

    console.log("Role check → user:", normalizedRole, "allowed:", normalizedAllowed);

    if (!normalizedRole) return <Navigate to="/login" replace />;
    if (!normalizedAllowed.includes(normalizedRole)) return <Navigate to="/" replace />;


    return <>{element}</>;
};

export default ProtectedRoute;
