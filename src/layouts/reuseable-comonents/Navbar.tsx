import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from '../authLayouts/hooks/useAuthData';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setSearchQuery } from '../../store/slices/searchSlice';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate: logout } = useLogout();

  const dispatch = useAppDispatch();

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearchQuery(e.target.value));

  const query = useAppSelector((state) => state.search.query);




  const handleLogout = () => {
    logout();
    navigate('/login');
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

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">Library Management</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={searchHandle}
                placeholder="Search books..."
                className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-48"
              />
              <button type="submit" className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            {/* Nav Links */}
            <NavLink to="/" className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
              } transition-colors duration-200`}>
              Home
            </NavLink>
            {isUser && (
              <NavLink to="/books" className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                } transition-colors duration-200`}>
                Books
              </NavLink>
            )}
            {isUser && (
              <NavLink to="/saved" className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                } transition-colors duration-200`}>
                Saved
              </NavLink>
            )}

            {isAdmin && (
              <NavLink to="/admin" className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                } transition-colors duration-200`}>
                Admin
              </NavLink>
            )}

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
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
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button type="submit" className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            {/* Mobile Links */}
            <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
              } transition-colors duration-200`}>
              Home
            </NavLink>

            <NavLink to="/books" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
              } transition-colors duration-200`}>
              Books
            </NavLink>

            {isUser && (
              <NavLink to="/saved" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                } transition-colors duration-200`}>
                Saved
              </NavLink>
            )}

            {isAdmin && (
              <NavLink to="/admin" onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                } transition-colors duration-200`}>
                Admin
              </NavLink>
            )}

            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
