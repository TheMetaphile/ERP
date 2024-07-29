import React, { useContext } from 'react';
import logo from './../../assets/metaphile_logo.png';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import AuthContext from '../../Context/AuthContext';
export default function TeacherNavbar({ onDrawerToggle, onEndDrawerToggle }) {
  const { authState } = useContext(AuthContext);

  return (

    <div className="flex flex-grow mobile:max-tablet:flex-col h-full mt-1 px-2 py-3 mb-2 items-center justify-between bg-teal-300 rounded-lg shadow-md mobile:max-tablet:gap-2 z-50">
      <div className="flex items-center mobile:max-tablet:w-full mobile:max-tablet justify-center">
        <FaBars onClick={onDrawerToggle} className='w-11 h-fit mr-4 px-3 py-2 rounded-lg bg-secondary shadow-lg' />
        <img src={logo} alt="Metaphile Public School" className="w-10" />
        <span className="tablet:text-lg font-medium text-text_blue mobile:text-sm mr-2">etaphile Public School</span>

      </div>
      <h1 className='text-2xl font-medium mobile:max-tablet:text-xl items-center flex'>Teacher Panel</h1>
      <nav className=' mobile:max-tablet:w-full mobile:max-tablet:py-1'>
        <ul className="flex w-full items-center mobile:max-tablet:text-sm">
          <li className="mr-4 mobile:max-tablet:-mr-4 mobile:max-tablet:ml-0.5 mobile:max-tablet:flex-1">
            <Link to="" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Home</Link>
          </li>
          {
            authState.userDetails.admin
              ?
              <li className="mr-4 mobile:max-tablet:mr-0.5 mobile:max-tablet:flex-1 whitespace-nowrap">
                <Link to="/Admin-Dashboard" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Admin  </Link>
              </li>
              :
              <div></div>
          }
          {/* <li className="mr-4">
            <Link to="/Teacher-Dashboard/studentfee" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Fee</Link>
          </li> */}
          {/* <li className="mr-4">
            <Link to="" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Salary</Link>
          </li> */}
          <li className='mobile:max-tablet:mr-0 mobile:max-tablet:flex-1'>
            <Link to="/Teacher-Dashboard/timetable" className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg">Time Table</Link>
          </li>
          <li>
            <FaBell onClick={onEndDrawerToggle} className="text-black font-medium hover:bg-blue-500 hover:text-white px-2 py-1 mobile:max-laptop:w-7 mobile:max-laptop:h-7 rounded-lg" />
          </li>
        </ul>
      </nav>
    </div>
  );
}
