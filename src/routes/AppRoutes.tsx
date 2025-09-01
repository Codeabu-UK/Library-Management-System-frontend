import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes";

const Login = lazy(() => import("../layouts/authLayouts/pages/Login"));
const Signup = lazy(() => import("../layouts/authLayouts/pages/Signup"));
const Layout = lazy(() => import("../layouts/libraryLayouts/pages/Layout"));
const HomePage = lazy(() => import("../layouts/libraryLayouts/components/HomePage"));
const Admin = lazy(() => import("../layouts/libraryLayouts/components/AdminPanel"));
const Saved = lazy(() => import("../layouts/libraryLayouts/components/Saved"));
const BookDetails = lazy(() => import("../layouts/libraryLayouts/components/BookDetail"));
// const Books = lazy(() => import("../layouts/libraryLayouts/components/Books"));
const Search = lazy(() => import("../layouts/libraryLayouts/components/Search"));

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* App layout */}
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />

                    {/* Admin-only */}
                    <Route
                        path="/admin"
                        element={<ProtectedRoute element={<Admin />} allowedRoles={["ADMIN"]} />}
                    />

                    {/* User-only */}
                    <Route
                        path="/saved"
                        element={<ProtectedRoute element={<Saved />} allowedRoles={["USER"]} />}
                    />
                    <Route
                        path="/books/:id"
                        element={<ProtectedRoute element={<BookDetails />} allowedRoles={["USER"]} />}
                    />
                    <Route
                        path="/books"
                        element={<ProtectedRoute element={<HomePage />} allowedRoles={["USER"]} />}
                    />
                    <Route
                        path="/search"
                        element={<ProtectedRoute element={<Search />} allowedRoles={["USER"]} />}
                    />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
