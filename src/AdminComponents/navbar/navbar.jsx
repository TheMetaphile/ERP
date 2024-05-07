import React from 'react';
import logo from './../../assets/metaphile_logo.png';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
export default function AdminNavbar({onDrawerToggle,onEndDrawerToggle}) {

  return (
    <div className="flex flex-grow mobile:max-tablet:flex-col h-full mt-1 px-2 py-3 mb-2 items-center justify-between bg-teal-300 rounded-lg shadow-md">
      <div className="flex items-center mobile:max-tablet:w-full mobile:max-tablet:mb-3">
      <FaBars onClick={onDrawerToggle} className='w-11 h-fit mr-4 px-3 py-2 rounded-lg bg-secondary shadow-lg' />
        <img src={logo} alt="Metaphile Public School" className="w-10" />
        <span className="tablet:text-xl font-medium text-text_blue mobile:text-xl">Metaphile Public School</span>
      </div>
      <nav>
        <ul className="flex min-w-full">
        <li className="mr-4">
            <Link to="/Student-Dashboard/home" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Home</Link>
          </li>
          <li className="mr-4">
            <Link to="/Student-Dashboard/fee-due" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Fee</Link>
          </li>
          <li className="mr-4">
            <Link to="/Student-Dashboard/events" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Events</Link>
          </li>
          <li>
            <Link to="/Student-Dashboard/timetable" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Time Table</Link>
          </li>
          <li>
            <FaBell onClick={onEndDrawerToggle} className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 mobile:max-tablet:w-9 mobile:max-tablet:h-9 rounded-lg" />
          </li>
        </ul>
      </nav>
    </div>
  );
}
