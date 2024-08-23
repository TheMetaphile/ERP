import React, { useContext, useEffect, useState } from 'react';
import logo from './../../assets/metaphile_logo.png';
import { FaBars, FaUserCircle, FaBell } from 'react-icons/fa';
import AuthContext from '../../Context/AuthContext';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function AdminNavbar({ onDrawerToggle, onEndDrawerToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, authState } = useContext(AuthContext);

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
    <div className="flex flex-grow mobile:max-tablet:flex-col h-full mt-1 px-2 py-3 mb-2 mobile:max-tablet:mb-0 items-center justify-between bg-gradient-to-r from-purple-200 to-purple-100 rounded-lg shadow-md mobile:max-tablet:gap-2">
      <div className="flex items-center mobile:max-tablet:w-full mobile:max-tablet:mb-0 mobile:max-tablet:justify-center">
        <FaBars onClick={onDrawerToggle} className="w-11 h-fit mr-4 px-3 py-2 rounded-lg bg-purple-100 hover:bg-purple-300 shadow-lg cursor-pointer" />
        <img src={logo} alt="Metaphile Public School" className="w-10" />
        <span className="tablet:text-lg font-medium  mobile:text-sm mr-2">etaphile Public School</span>
        <div>
          <FaBell onClick={onEndDrawerToggle} className=" font-medium hover:bg-purple-200 hover: px-2 py-1 mobile:max-tablet:w-7 mobile:max-tablet:h-7 rounded-lg" />
        </div>
      </div>
      <h1 className="text-2xl font-medium mobile:max-tablet:text-xl ">
        Admin Panel
      </h1>
      <nav className="mobile:max-tablet:w-full">
        <ul className="flex w-full items-center mobile:max-tablet:text-sm mobile:max-tablet:text-center mobile:max-tablet:px-4">
          <li className="flex items-center space-x-4 pr-3">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-4 focus:outline-none "
              >
                <span className="flex items-center gap-2 font-medium">
                  {authState.userDetails.name}
                  <FaUserCircle className="text-3xl" />
                </span>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg font-medium text-black">
                  <Link
                    to="/Admin-Dashboard/Profile"
                    className="block px-4 py-2 hover:bg-purple-200 rounded-t-lg"
                  >
                    Profile
                  </Link>
                  <Link
                    to=""
                    className="block px-4 py-2 hover:bg-purple-200 rounded-t-lg"
                  >
                    Home
                  </Link>
                  <Link
                    to="/Admin-Dashboard/StudentsFee"
                    className="block px-4 py-2 hover:bg-purple-200 rounded-t-lg"
                  >
                    Fee
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-purple-200 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
