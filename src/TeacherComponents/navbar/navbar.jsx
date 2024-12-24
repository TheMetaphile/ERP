import React, { useContext, useEffect, useState } from 'react';
import logo from './../../assets/metaphile_logo.png';
import { Link } from 'react-router-dom';
import { FaBars, FaUserCircle, FaBell } from 'react-icons/fa';
import { useRef } from 'react';
import AuthContext from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TeacherNavbar({ onDrawerToggle, onEndDrawerToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
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
    <div className="flex flex-grow mobile:max-tablet:flex-col h-full mt-1 px-2 py-3 mb-2 items-center justify-between bg-gradient-to-r from-blue-300 to-blue-200 rounded-lg shadow-md mobile:max-tablet:gap-2 z-50">
      <div className="flex items-center mobile:max-tablet:w-full mobile:max-tablet justify-center">
        <FaBars onClick={onDrawerToggle} className='w-11 h-fit mr-4 px-3 py-2 rounded-lg bg-blue-200 shadow-lg cursor-pointer' />
        <div className="flex items-end gap-1">
          <img src={logo} alt="Metaphile Public School" className="w-8" />
          <span className="tablet:text-lg font-medium text-text_blue mobile:text-sm mr-2">etaphile Public School</span>
        </div>

        <div className=' tablet:hidden'>
          <FaBell onClick={onEndDrawerToggle} className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 mobile:max-laptop:w-7 mobile:max-laptop:h-7 rounded-lg" />
        </div>
      </div>
      <h1 className='text-2xl font-medium mobile:max-tablet:text-xl items-center flex'>Teacher Panel</h1>
      <nav className=' mobile:max-tablet:w-full mobile:max-tablet:py-1'>
        <ul className="flex w-full justify-around items-center mobile:max-tablet:text-sm">
          <li className="flex items-center space-x-4 pr-3">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-4 focus:outline-none"
              >
                <span className="flex items-center gap-2 font-medium">
                  {authState.userDetails.name}
                  <FaUserCircle className="text-3xl" />
                </span>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg  font-medium text-black">
                  <Link
                    to="/Teacher-Dashboard/Profile"
                    className="block px-4 py-2 hover:bg-blue-300 rounded-t-lg"
                  >
                    Profile
                  </Link>
                  <Link
                    to=""
                    className="block px-4 py-2 hover:bg-blue-300 rounded-t-lg"
                  >
                    Home
                  </Link>
                  <Link
                    to="/Teacher-Dashboard/timetable"
                    className="block px-4 py-2 hover:bg-blue-300 rounded-t-lg"
                  >
                    Time Table
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-300 rounded-b-lg"
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
