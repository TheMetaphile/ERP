import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from './../../assets/metaphile_logo.png';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import { FaBars, FaUserCircle, FaBell } from 'react-icons/fa';

export default function Navbar({ onDrawerToggle, onEndDrawerToggle }) {
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
    <div className="flex flex-grow mobile:max-tablet:flex-col h-full mt-1 px-2 py-3 mb-2 items-center justify-between bg-gradient-to-r from-blue-300 to-blue-200 rounded-lg shadow-md z-10">
      <div className="flex items-center mobile:max-tablet:w-full mobile:max-tablet:mb-3">
        <FaBars onClick={onDrawerToggle} className='w-11 h-fit mr-4 px-3 py-2 rounded-lg bg-blue-100 shadow-lg cursor-pointer' />
        <div className='flex items-center'>
          <img src={logo} alt="Metaphile Public School" className="w-10" />
          <span className=" mobile:max-tablet:text-sm font-medium text-text_blue mobile:text-xl">etaphile Public School</span>

        </div>
      </div>
      <nav>
        <ul className="flex w-full items-center mobile:max-tablet:text-sm gap-3">


          <li className="flex items-center space-x-4">
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
                    to="/Student-Dashboard/profile"
                    className="block px-4 py-2 hover:bg-blue-300 rounded-t-lg"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/Student-Dashboard/home"
                    className="block px-4 py-2 hover:bg-blue-300 rounded-t-lg"
                  >
                    Home
                  </Link>
                  <Link
                    to="/Student-Dashboard/fee-due"
                    className="block px-4 py-2 hover:bg-blue-300 rounded-t-lg"
                  >
                    Fee
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-300 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </li>

          <li className='laptop:hidden '>
            <FaBell onClick={onEndDrawerToggle} className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 mobile:max-laptop:w-9 mobile:max-laptop:h-9 rounded-lg ml-auto" />
          </li>


          <li>
          </li>

        </ul>
      </nav>
    </div>
  );
}
