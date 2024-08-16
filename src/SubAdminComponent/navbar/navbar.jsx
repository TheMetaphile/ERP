import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from './../../assets/metaphile_logo.png';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logout1 from "../../assets/logout.png"
import { FaBars, FaUserCircle, FaBell } from 'react-icons/fa';



export default function SubAdminNavbar({ onDrawerToggle, onEndDrawerToggle }) {
  // const { logout, authState } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, authState } = useContext(AuthContext);
  console.log(authState.userDetails.role, authState.userDetails.department);

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
    <div className="flex flex-grow mobile:max-tablet:flex-col h-full  px-2 py-3 mb-2 mobile:max-tablet:mb-0 items-center justify-between bg-purple-300 rounded-lg shadow-md">
      <div className="flex items-center mobile:max-tablet:w-full mobile:max-tablet:mb-3 mobile:max-tablet:justify-center">
        {authState.userDetails.role === 'Accountant' && (
          <FaBars onClick={onDrawerToggle} className='w-11 h-fit mr-4 px-3 py-2 rounded-lg bg-white shadow-lg cursor-pointer' />
        )}
        <img src={logo} alt="Metaphile Public School" className="w-10" />
        <span className="tablet:text-lg font-medium mobile:text-sm mr-2">etaphile Public School</span>

      </div>
      <h1 className='text-2xl font-medium mobile:max-tablet:text-xl'>
        Sub Admin Panel
      </h1>
      <nav className='mobile:max-tablet:w-full mobile:max-tablet:py-1'>
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
                    to="/Sub-Admin/Profile"
                    className="block px-4 py-2 hover:bg-purple-200 rounded-t-lg"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/Sub-Admin/Students"
                    className="block px-4 py-2 hover:bg-purple-200 rounded-t-lg"
                  >
                    Students
                  </Link>
                  {authState.userDetails.role === 'Certificate' && authState.userDetails.department === 'Certificate' ? (
                    <Link to="/Sub-Admin/Certificates" className="block px-4 py-2 hover:bg-purple-200 rounded-t-lg">Certificate</Link>
                  ) : (
                    <></>
                  )}
                  {authState.userDetails.role === 'Result' && authState.userDetails.department === 'Result' ? (
                    <Link to="/Sub-Admin/Result" className="block px-4 py-2 hover:bg-purple-200 rounded-t-lg">Result</Link>
                  ) : (
                    <></>
                  )}
                  <button
                    onClick={handleLogout}

                    className="block w-full text-left px-4 py-2 hover:bg-purple-200 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </li>
          <li>
            <FaBell onClick={onEndDrawerToggle} className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 mobile:max-laptop:w-9 mobile:max-laptop:h-9 rounded-lg ml-auto" />
          </li>
        </ul>

      </nav>
    </div>
  );
}
