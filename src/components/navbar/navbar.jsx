import React from 'react';
import logo from './../../assets/metaphile_logo.png';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
export default function Navbar({ onDrawerToggle, onEndDrawerToggle }) {

  return (
    <div className="flex flex-grow mobile:max-tablet:flex-col h-full mt-1 px-2 py-3 mb-2 items-center justify-between bg-teal-300 rounded-lg shadow-md z-50">
      <div className="flex items-center mobile:max-tablet:w-full mobile:max-tablet:mb-3">
        <FaBars onClick={onDrawerToggle} className='w-11 h-fit mr-4 px-3 py-2 rounded-lg bg-secondary shadow-lg cursor-pointer' />
        <div className='flex items-center'>
          <img src={logo} alt="Metaphile Public School" className="w-10" />
          <span className=" mobile:max-tablet:text-sm font-medium text-text_blue mobile:text-xl">etaphile Public School</span>
          <div>
            <FaBell onClick={onEndDrawerToggle} className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 mobile:max-tablet:w-9 mobile:max-tablet:h-9 rounded-lg" />
          </div>
        </div>
      </div>
      <nav>
        <ul className="flex w-full items-center mobile:max-tablet:text-sm ">
          <li className="mr-4">
            <Link to="/Student-Dashboard/home" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Home</Link>
          </li>
          <li className="mr-4">
            <Link to="/Student-Dashboard/fee-due" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Fee</Link>
          </li>
          {/* <li className="mr-4">
            <Link to="/Student-Dashboard/events" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Events</Link>
          </li>
          <li>
            <Link to="/Student-Dashboard/exam" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Examination</Link>
          </li> */}
          <li>
          </li>
        </ul>
      </nav>
    </div>
  );
}
