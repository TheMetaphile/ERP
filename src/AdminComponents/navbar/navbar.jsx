import React from 'react';
import logo from './../../assets/metaphile_logo.png';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
export default function AdminNavbar({ onDrawerToggle, onEndDrawerToggle }) {

  return (
    <div className="flex flex-grow mobile:max-tablet:flex-col h-full mt-1 px-2 py-3 mb-2 mobile:max-tablet:mb-0 items-center justify-between bg-teal-300 rounded-lg shadow-md mobile:max-tablet:gap-2">
      <div className="flex items-center mobile:max-tablet:w-full mobile:max-tablet:mb-0 mobile:max-tablet:justify-center">
        <FaBars onClick={onDrawerToggle} className='w-11 h-fit mr-4 px-3 py-2 rounded-lg bg-secondary shadow-lg' />
        <img src={logo} alt="Metaphile Public School" className="w-10" />
        <span className="tablet:text-lg font-medium text-text_blue mobile:text-sm mr-2">etaphile Public School</span>
        <div>
          <FaBell onClick={onEndDrawerToggle} className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 mobile:max-tablet:w-7 mobile:max-tablet:h-7 rounded-lg" />
        </div>
      </div>
      <h1 className='text-2xl font-medium mobile:max-tablet:text-xl'>
        Admin Panel
      </h1>
      <nav className=' mobile:max-tablet:w-full'>
        <ul className="flex w-full items-center mobile:max-tablet:text-sm mobile:max-tablet:text-center mobile:max-tablet:px-4">
          <li className="mr-4 mobile:max-tablet:mr-0.5 mobile:max-tablet:flex-1">
            <Link to="" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Home</Link>
          </li>
          <li className="mr-4 mobile:max-tablet:mr-0.5 mobile:max-tablet:flex-1">
            <Link to="/Admin-Dashboard/StudentsFee" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Fee</Link>
          </li>
          <li className="mr-4 mobile:max-tablet:mr-0.5">
            <Link to="/Teacher-Dashboard" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg mobile:flex">Teacher Panel</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
