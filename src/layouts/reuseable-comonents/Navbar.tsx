import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../authLayouts/hooks/useAuthData";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSearchQuery } from "../../store/slices/searchSlice";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { mutate: logout } = useLogout();
    const dispatch = useAppDispatch();

    const query = useAppSelector((state) => state.search.query);

    const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setSearchQuery(e.target.value));

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
            setIsMenuOpen(false);
        }
    };



    const userType = localStorage.getItem("type");
    const isAdmin = userType === "ADMIN";
    const isUser = userType === "USER";

    const user = isAdmin || isUser;

    return (
        <nav className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 backdrop-blur-xl shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand */}
                    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center cursor-pointer">
                        <div className="w-10 h-10 bg-white/50 backdrop-blur-lg rounded-full flex items-center justify-center mr-3 shadow-md">
                            <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                        <span className="text-2xl font-extrabold text-white drop-shadow-lg tracking-wide">Library</span>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-4">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="relative flex items-center">
                            <input
                                type="text"
                                value={query}
                                onChange={searchHandle}
                                placeholder="Search books..."
                                className="px-4 py-2 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/70 shadow-inner w-56"
                            />
                            <button type="submit" className="absolute right-3 text-emerald-700 hover:text-emerald-900">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </form>

                        {/* Nav Links (simple, explicit rendering by role) */}
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-full text-base font-semibold tracking-wide transition-all ${isActive ? "bg-white text-emerald-700 shadow-lg" : "text-white hover:bg-white/30 hover:text-emerald-900"
                                }`
                            }
                        >
                            Home
                        </NavLink>

                        {isUser && (
                            <>
                                <NavLink
                                    to="/books"
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-full text-base font-semibold tracking-wide transition-all ${isActive ? "bg-white text-emerald-700 shadow-lg" : "text-white hover:bg-white/30 hover:text-emerald-900"
                                        }`
                                    }
                                >
                                    Books
                                </NavLink>

                                <NavLink
                                    to="/saved"
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-full text-base font-semibold tracking-wide transition-all ${isActive ? "bg-white text-emerald-700 shadow-lg" : "text-white hover:bg-white/30 hover:text-emerald-900"
                                        }`
                                    }
                                >
                                    Saved
                                </NavLink>
                            </>
                        )}

                        {isAdmin && (
                            <NavLink
                                to="/admin"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-full text-base font-semibold tracking-wide transition-all ${isActive ? "bg-white text-emerald-700 shadow-lg" : "text-white hover:bg-white/30 hover:text-emerald-900"
                                    }`
                                }
                            >
                                Admin
                            </NavLink>
                        )}

                        {/* Logout (desktop) */}

                        {user ? (
                            // If user exists → Logout (desktop)
                            <div className="hidden sm:block">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-full text-base font-semibold bg-white text-emerald-700 shadow-lg hover:bg-emerald-100 tracking-wide"
                                >
                                    Sign Out
                                </motion.button>
                            </div>
                        ) : (
                            // If user does NOT exist → Login (desktop)
                            <div className="hidden sm:block">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogin} // you should define handleLogin
                                    className="px-4 py-2 rounded-full text-base font-semibold bg-emerald-700 text-white shadow-lg hover:bg-emerald-800 tracking-wide"
                                >
                                    Login
                                </motion.button>
                            </div>
                        )}

                        {/* Mobile version */}
                        <div className="block sm:hidden">
                            {user ? (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-full text-base font-semibold bg-white text-emerald-700 shadow-lg hover:bg-emerald-100 tracking-wide"
                                >
                                    Sign Out
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogin}
                                    className="px-4 py-2 rounded-full text-base font-semibold bg-emerald-700 text-white shadow-lg hover:bg-emerald-800 tracking-wide"
                                >
                                    Login
                                </motion.button>
                            )}
                        </div>


                        {/* Mobile Menu Button */}
                        <div className="flex items-center sm:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-white hover:bg-white/20 focus:outline-none">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="sm:hidden bg-white/50 backdrop-blur-xl shadow-inner"
                        >
                            <div className="pt-2 pb-4 space-y-2 px-4">
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={searchHandle}
                                        placeholder="Search books..."
                                        className="w-full px-4 py-2 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 shadow-inner"
                                    />
                                </form>

                                {["/", "/books", "/saved", "/admin"].map((path) => {
                                    const labels: Record<string, string> = {
                                        "/": "Home",
                                        "/books": "Books",
                                        "/saved": "Saved",
                                        "/admin": "Admin",
                                    };
                                    const shouldRender =
                                        path === "/" ||
                                        (isUser && (path === "/books" || path === "/saved")) ||
                                        (isAdmin && path === "/admin");
                                    return (
                                        shouldRender && (
                                            <NavLink
                                                key={path}
                                                to={path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={({ isActive }) =>
                                                    `block px-4 py-2 rounded-full text-lg font-semibold tracking-wide ${isActive ? "bg-emerald-600 text-white shadow-md" : "text-emerald-900 hover:bg-emerald-200"
                                                    }`
                                                }
                                            >
                                                {labels[path]}
                                            </NavLink>
                                        )
                                    );
                                })}

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 rounded-full text-lg font-semibold bg-emerald-600 text-white shadow-md hover:bg-emerald-700 tracking-wide"
                                >
                                    Sign Out
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};


export default Navbar;