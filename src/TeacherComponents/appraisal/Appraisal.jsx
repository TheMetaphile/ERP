import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Appraisal() {
  const { authState } = useContext(AuthContext);
  const [selectedLink, setSelectedLink] = useState('/Teacher-Dashboard/appraisal/apply');


  const handleLinkSelect = (link) => {
    setSelectedLink(link);
  };


  return (
    <div className=" flex flex-col px-3 mobile:max-tablet:px-0  items-start mobile:max-tablet:mt-0 mobile:max-tablet:mx-3 mt-2 mb-3">
      <ToastContainer />
      <h1 className='text-3xl mobile:max-tablet:text-lg'>Appraisal</h1>
      <div className=' border shadow-md mt-4 rounded-lg w-full '>
        <div className=" flex   ml-3 mr-3 items-center justify-between">
          <div className=" flex  gap-2 mt-2">
            {/* <Link
                            to={'/Teacher-Dashboard/noticeboard/allnotice'}
                            className={`text-xl font-medium px-2 rounded-lg py-1 ${selectedLink === '/Teacher-Dashboard/noticeboard/allnotice' ? 'bg-secondary ' : 'bg-gray-300'}`}
                            onClick={() => handleLinkSelect('/Teacher-Dashboard/noticeboard/allnotice')}
                        >
                            All
                        </Link> */}
            <Link
              to={'/Teacher-Dashboard/appraisal/applied'}
              className={`text-xl mobile:max-tablet:text-sm font-medium px-2 rounded-lg py-1 ${selectedLink === '/Teacher-Dashboard/appraisal/applied' ? 'bg-secondary ' : 'bg-gray-300'}`}
              onClick={() => handleLinkSelect('/Teacher-Dashboard/appraisal/applied')}
            >
              Applied
            </Link>
            <Link
              to={'/Teacher-Dashboard/appraisal/apply'}
              className={`text-xl mobile:max-tablet:text-sm font-medium px-2 rounded-lg  py-1 ${selectedLink === '/Teacher-Dashboard/appraisal/apply' ? 'bg-secondary ' : 'bg-gray-300'}`}
              onClick={() => handleLinkSelect('/Teacher-Dashboard/appraisal/apply')}
            >
              Apply
            </Link>

          </div>
        </div>
        <Outlet />
        <br></br>
      </div>
    </div>
  )
}

export default Appraisal