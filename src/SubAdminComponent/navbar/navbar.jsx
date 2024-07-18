import React from 'react';
import logo from './../../assets/metaphile_logo.png';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
export default function SubAdminNavbar({ onDrawerToggle, onEndDrawerToggle }) {

  return (
    <div className="flex flex-grow mobile:max-tablet:flex-col h-full mt-1 px-2 py-3 mb-2 mobile:max-tablet:mb-0 items-center justify-between bg-purple-300 rounded-lg shadow-md">
      <div className="flex items-center mobile:max-tablet:w-full mobile:max-tablet:mb-3 mobile:max-tablet:justify-center">
        <FaBars onClick={onDrawerToggle} className='w-11 h-fit mr-4 px-3 py-2 rounded-lg bg-white shadow-lg cursor-pointer' />
        <img src={logo} alt="Metaphile Public School" className="w-10" />
        <span className="tablet:text-lg font-medium mobile:text-sm mr-2">etaphile Public School</span>
      </div>
      <h1 className='text-2xl font-medium mobile:max-tablet:text-xl'>
        Sub Admin Panel
      </h1>
      <nav className=' mobile:max-tablet:w-full'>
        <ul className="flex w-full items-center mobile:max-tablet:text-sm mobile:max-tablet:text-center mobile:max-tablet:px-4">
          <li className="mr-4 mobile:max-tablet:mr-0.5 mobile:max-tablet:flex-1">
            <Link to="/Sub-Admin/Students" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Students</Link>
          </li>
          <li className="mr-4 mobile:max-tablet:mr-0.5 mobile:max-tablet:flex-1">
            <Link to="/Sub-Admin/Certificates" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Certificate</Link>
          </li>
          <li className="mr-4 mobile:max-tablet:mr-0.5 mobile:max-tablet:flex-1">
            <Link to="/Sub-Admin/Result" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Result</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
