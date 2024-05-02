import React from 'react';
import logo from './../../assets/metaphile_logo.png';
import { Link } from 'react-router-dom';

export default function AdminNavbar() {

  return (
    <div className="flex h-16 mt-1 ml-1 mr-1 mb-2 items-center justify-between bg-teal-300 rounded-lg p-4 shadow-md">
      <div className="flex items-center">
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
