import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './protectedRoutes';

const Login = lazy(() => import('../layouts/authLayouts/pages/Login'));
const Signup = lazy(() => import('../layouts/authLayouts/pages/Signup'));
const Layout = lazy(() => import('../layouts/libraryLayouts/pages/Layout'));
const HomePage = lazy(() => import('../layouts/libraryLayouts/components/HomePage'));
const Admin = lazy(() => import('../layouts/libraryLayouts/components/AdminPanel'));
const Saved = lazy(() => import('../layouts/libraryLayouts/components/Saved'));
const BookDetails = lazy(() => import('../layouts/libraryLayouts/components/BookDetail'));
const Books = lazy(() => import('../layouts/libraryLayouts/components/Books'));
const Search = lazy(() => import('../layouts/libraryLayouts/components/Search'));


const AppRoutes: React.FC = () => {

    const userRole = localStorage.getItem("type");

    console.log("User Role:", userRole);


    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />

                    {/* Role-protected routes */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute element={<Admin />} allowedRoles={["ADMIN"]} userRole={userRole} />
                        }
                    />
                    <Route
                        path="/saved"
                        element={
                            <ProtectedRoute element={<Saved />} allowedRoles={["USER"]} userRole={userRole} />
                        }
                    />

                    {/* for now these are only accessible to users, will be public on demand */}
                    <Route path="/book/:id" element={
                        <ProtectedRoute element={<BookDetails />} allowedRoles={["USER"]} userRole={userRole} />
                    } />
                    <Route path="/books" element={
                        <ProtectedRoute element={<Books />} allowedRoles={["USER"]} userRole={userRole} />
                    } />
                    <Route path="/search" element={
                        <ProtectedRoute element={<Search />} allowedRoles={["USER"]} userRole={userRole} />
                    } />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;