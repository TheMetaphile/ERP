import React from 'react';
import logo from './../../assets/metaphile_logo.png';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
export default function AdminNavbar({onDrawerToggle}) {

  return (
    <div className="flex flex-grow h-16 mt-1 px-2 py-3 mb-2 items-center justify-between bg-teal-300 rounded-lg shadow-md">
      <div className="flex items-center">
      <FaBars onClick={onDrawerToggle} className='w-11 h-fit mr-4 px-3 py-2 rounded-lg bg-secondary shadow-lg' />
        <img src={logo} alt="Metaphile Public School" className="w-10" />
        <span className="text-black ml-2">Metaphile Public School</span>
      </div>
      <nav>
        <ul className="flex min-w-full">
          <li className="mr-4">
            <Link to="/dashboard/home" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Home</Link>
          </li>
          <li className="mr-4">
            <Link to="/dashboard/fee-due" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Fee</Link>
          </li>
          <li className="mr-4">
            <Link to="/dashboard/events" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Events</Link>
          </li>
          <li>
            <Link to="/dashboard/timetable" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Time Table</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}