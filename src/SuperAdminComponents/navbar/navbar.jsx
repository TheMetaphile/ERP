import React, { useContext, useEffect, useState } from 'react';
import logo from './../../assets/metaphile_logo.png';
import { FaBars, FaUserCircle, FaBell } from 'react-icons/fa';
import AuthContext from '../../Context/AuthContext';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function SuperAdminNavbar({ onDrawerToggle, onEndDrawerToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, authState, setAuthState } = useContext(AuthContext);
  const [branches, setBranches] = useState(["Haridwar", "Modinagar"]);
  const [selectedBranch, setSelectedBranch] = useState(
    authState?.userDetails?.branch || branches[0]
  );

  const handleBranchChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "add_new") {
      addBranch();
    } else {
      setSelectedBranch(selectedValue);

      setAuthState((prevState) => ({
        ...prevState,
        userDetails: {
          ...prevState.userDetails,
          branch: selectedValue,
        },
      }));
    }
  };

  const addBranch = () => {
    const newBranch = prompt("Enter new branch name:");
    if (newBranch && !branches.includes(newBranch)) {
      setBranches([...branches, newBranch]);
      setSelectedBranch(newBranch);
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
  console.log(authState.userDetails)
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  console.log(authState.userDetails)
  return (
    <div className="flex flex-grow mobile:max-tablet:flex-col h-full mt-1 px-2 py-3 mb-2 mobile:max-tablet:mb-0 items-center justify-between bg-gradient-to-r from-purple-200 to-purple-100 rounded-lg shadow-md mobile:max-tablet:gap-2">
      <div className="flex items-center mobile:max-tablet:w-full mobile:max-tablet:mb-0 mobile:max-tablet:justify-center">
        <FaBars onClick={onDrawerToggle} className="w-11 h-fit mr-4 px-3 py-2 rounded-lg bg-white hover:bg-purple-200 shadow-lg cursor-pointer" />
        <img src={logo} alt="Metaphile Public School" className="w-10" />
        <span className="tablet:text-lg font-medium  mobile:text-sm mr-2">etaphile Public School</span>
        <div className=' tablet:hidden'>
          <FaBell onClick={onEndDrawerToggle} className=" font-medium bg-white hover: px-2 py-1 mobile:max-tablet:w-7 mobile:max-tablet:h-7 rounded-lg" />
        </div>
      </div>
      <h1 className="text-2xl font-medium mobile:max-tablet:text-xl ">
        Super Admin Panel
      </h1>
      <nav className="mobile:max-tablet:w-full">
        <ul className="flex w-full justify-center items-center mobile:max-tablet:text-sm mobile:max-tablet:text-center mobile:max-tablet:px-4">
          <li className="flex items-center space-x-4 pr-3">
            <div>
              <select
                id="branch"
                value={selectedBranch}
                onChange={handleBranchChange}
                className="border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight"
              >
                <option>Branch </option>
                {branches.map((branch, index) => (
                  <option key={index} value={branch}>
                    {branch}
                  </option>
                ))}
                <option value="add_new">➕ Add New Branch</option>
              </select>
            </div>

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
                    to="/Sup-Admin/Profile"
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
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 hover:bg-purple-200 rounded-b-lg"
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
