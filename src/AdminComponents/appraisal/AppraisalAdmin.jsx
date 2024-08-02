import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import Loading from '../../LoadingScreen/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppraisalAdmin() {
  const { authState } = useContext(AuthContext);
  const [selectedLink, setSelectedLink] = useState('/Admin-Dashboard/appraisal/apply');


  const handleLinkSelect = (link) => {
    setSelectedLink(link);
  };


  return (
    <div className=" flex flex-col px-3 mobile:max-tablet:px-0  items-start mobile:max-tablet:mt-0 mobile:max-tablet:mx-3 mt-2 mb-3">
      <ToastContainer />
      <h1 className='text-3xl mobile:max-tablet:text-lg'>Appraisal</h1>
      <div className=' border shadow-md mt-4 rounded-lg w-full '>
        <Outlet />
        <br></br>
      </div>
    </div>
  )
}

export default AppraisalAdmin