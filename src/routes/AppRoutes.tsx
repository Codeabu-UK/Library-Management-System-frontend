import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
    return (
        <Router>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />

                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/books/" element={<Books />} />
                    <Route path="/search" element={<Search />} />
                    {/* Add more routes as needed */}


                </Route>

            </Routes>
        </Router>
    );
};

export default AppRoutes;