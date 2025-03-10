import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from './../../assets/metaphile_logo.png';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaUserCircle, FaBell, FaMoon, FaSun } from 'react-icons/fa';

export default function SubAdminNavbar({ onDrawerToggle, onEndDrawerToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, authState, toggleDarkMode, darkMode } = useContext(AuthContext);


  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`flex flex-grow mobile:max-tablet:flex-col h-full px-4 py-3 mb-2 mobile:max-tablet:mb-0 items-center justify-between rounded-lg shadow-md transition-colors duration-300 ${darkMode
      ? 'bg-gray-800 text-white'
      : 'bg-gradient-to-r from-blue-300 to-blue-200 text-gray-800'
      }`}>
      <div className="flex items-center mobile:max-tablet:w-full mobile:max-tablet:mb-3 mobile:max-tablet:justify-between">

        <FaBars
          onClick={onDrawerToggle}
          className={`w-11 h-fit mr-4 px-3 py-2 rounded-lg cursor-pointer transform hover:scale-105 transition-transform ${darkMode
            ? 'bg-gray-700 text-white hover:bg-gray-600'
            : 'bg-white shadow-lg hover:bg-gray-100'
            }`}
        />

        <div className='flex items-center gap-2'>
          <img
            src={logo}
            alt="Metaphile Public School"
            className="w-10 h-10 object-contain"
          />
          <span className={`tablet:text-lg font-medium mobile:text-sm ${darkMode ? 'text-white' : 'text-gray-800'
            }`}>
            etaphile Public School
          </span>
        </div>
        <div className="tablet:hidden">
          <FaBell
            onClick={onEndDrawerToggle}
            className={`font-medium py-1 mobile:max-laptop:w-6 mobile:max-laptop:h-6 rounded-lg transform hover:scale-110 transition-transform ${darkMode
              ? 'text-white hover:text-yellow-300'
              : 'text-black hover:bg-blue-500 hover:text-white'
              }`}
          />
        </div>
      </div>

      <h1 className={`text-2xl font-medium mobile:max-tablet:text-xl ${darkMode ? 'text-white' : 'text-gray-800'
        }`}>
        Sub Admin Panel
      </h1>

      <nav className='mobile:max-tablet:w-full mobile:max-tablet:py-1'>
        <ul className="flex w-full items-center mobile:max-tablet:text-sm gap-3 mobile:max-tablet:justify-center mobile:max-tablet:gap-8">
          <li>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transform hover:scale-110 transition-transform ${darkMode
                ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                : 'bg-blue-100 text-gray-700 hover:bg-blue-200'
                }`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </li>

          <li className="flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <span className={`flex items-center gap-2 font-medium ${darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                  {authState?.userDetails?.name}
                  <FaUserCircle className={`text-3xl ${darkMode ? 'text-blue-300' : 'text-blue-800'
                    }`} />
                </span>
              </button>

              {isOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden z-10 ${darkMode
                  ? 'bg-gray-700 text-white border border-gray-600'
                  : 'bg-white text-gray-800 border border-gray-200'
                  }`}>
                  <Link
                    to="/Sub-Admin/Profile"
                    className={`block px-4 py-3 font-medium hover:transition-colors duration-200 ${darkMode
                      ? 'hover:bg-gray-600'
                      : 'hover:bg-blue-200'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaUserCircle />
                      Profile
                    </div>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-3 font-medium transition-colors duration-200 ${darkMode
                      ? 'hover:bg-gray-600 text-red-300'
                      : 'hover:bg-blue-200 text-red-600'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v1a1 1 0 102 0V9z" clipRule="evenodd" />
                      </svg>
                      Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
          </li>

          <li className="hidden tablet:block">
            <button
              onClick={onEndDrawerToggle}
              className={`p-2 rounded-full transform hover:scale-110 transition-transform ${darkMode
                ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                : 'bg-blue-100 text-gray-700 hover:bg-blue-200'
                }`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {<FaBell />}
            </button>
          </li>

        </ul>
      </nav>
    </div>
  );
}