import React, { useContext, useEffect, useState } from 'react';
import logo from './../../assets/metaphile_logo.png';
import { FaBars, FaUserCircle, FaBell, FaMoon, FaSun } from 'react-icons/fa';
import AuthContext from '../../Context/AuthContext';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function AdminNavbar({ onDrawerToggle, onEndDrawerToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, authState, toggleDarkMode, darkMode } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  console.log(authState?.userDetails)
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    // <div className="flex flex-grow mobile:max-tablet:flex-col h-full mt-1 px-2 py-3 mb-2 mobile:max-tablet:mb-0 items-center justify-between bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg shadow-md mobile:max-tablet:gap-2">
    //   <div className="flex items-center mobile:max-tablet:w-full mobile:max-tablet:mb-0 mobile:max-tablet:justify-center">
    //     <FaBars onClick={onDrawerToggle} className="w-11 h-fit mr-4 px-3 py-2 rounded-lg bg-white hover:bg-blue-200 shadow-lg cursor-pointer" />
    //     <img src={logo} alt="Metaphile Public School" className="w-10" />
    //     <span className="tablet:text-lg font-medium  mobile:text-sm mr-2">etaphile Public School</span>
    //     <div className=' tablet:hidden'>
    //       <FaBell onClick={onEndDrawerToggle} className=" font-medium bg-white hover: px-2 py-1 mobile:max-tablet:w-7 mobile:max-tablet:h-7 rounded-lg" />
    //     </div>
    //   </div>
    //   <h1 className="text-2xl font-medium mobile:max-tablet:text-xl ">
    //     Admin Panel
    //   </h1>
    //   <nav className="mobile:max-tablet:w-full">
    //     <ul className="flex w-full justify-center items-center mobile:max-tablet:text-sm mobile:max-tablet:text-center mobile:max-tablet:px-4">
    //       <li className="flex items-center space-x-4 pr-3">
    //         <div className="relative" ref={dropdownRef}>
    //           <button
    //             onClick={toggleDropdown}
    //             className="flex items-center space-x-4 focus:outline-none "
    //           >
    //             <span className="flex items-center gap-2 font-medium">
    //               {authState?.userDetails?.name}
    //               <FaUserCircle className="text-3xl" />
    //             </span>
    //           </button>
    //           {isOpen && (
    //             <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg font-medium text-black">
    //               <Link
    //                 to="/Admin-Dashboard/Profile"
    //                 className="block px-4 py-2 hover:bg-blue-200 rounded-t-lg"
    //               >
    //                 Profile
    //               </Link>
    //               <Link
    //                 to=""
    //                 className="block px-4 py-2 hover:bg-blue-200 rounded-t-lg"
    //               >
    //                 Home
    //               </Link>
    //               <Link
    //                 to="/Admin-Dashboard/StudentsFee"
    //                 className="block px-4 py-2 hover:bg-blue-200 rounded-t-lg"
    //               >
    //                 Fee
    //               </Link>
    //               <button
    //                 onClick={logout}
    //                 className="block w-full px-4 py-2 hover:bg-blue-200 rounded-b-lg"
    //               >
    //                 Logout
    //               </button>
    //             </div>
    //           )}
    //         </div>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
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
        Admin Panel
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
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg font-medium text-black">
                  <Link
                    to="/Admin-Dashboard/Profile"
                    className="block px-4 py-2 hover:bg-blue-200 rounded-t-lg"
                  >
                    Profile
                  </Link>
                  <Link
                    to=""
                    className="block px-4 py-2 hover:bg-blue-200 rounded-t-lg"
                  >
                    Home
                  </Link>
                  <Link
                    to="/Admin-Dashboard/StudentsFee"
                    className="block px-4 py-2 hover:bg-blue-200 rounded-t-lg"
                  >
                    Fee
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 hover:bg-blue-200 rounded-b-lg"
                  >
                    Logout
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
