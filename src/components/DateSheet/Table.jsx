import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import signature from './../../assets/signature.jpg';
import axios from 'axios'
import Loading from "../../LoadingScreen/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Table() {
  const { authState } = useContext(AuthContext);
  const [exams, setExams] = useState([]);

 

  const fetchDateSheet = async () => {
   
    try {
      const response = await axios.post('https://examapi-jep8.onrender.com/fetchDateSheet', {
        accessToken: authState.accessToken,
        class: authState.userDetails.currentClass
      });
      console.log("API response datesheet:", response.data);
      if (response.data && response.data.dateSheet) {
        const schedules = response.data.dateSheet.flatMap(sheet => sheet.schedule);
        setExams(schedules);
      } else {
        toast.error('Unexpected response format');
      }

    }
    catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred';
      toast.error(errorMessage);
    }
  }

  useEffect(() => {

    if (authState.accessToken && authState.userDetails.currentClass) {
      fetchDateSheet();
    } else {
      toast.error('No access token available');


    }
  }, [authState.accessToken, authState.userDetails.currentClass]);

  return (
    <div className=' flex justify-evenly '>
            <ToastContainer />

      <table className=' mt-7  w-full justify-evenly items-center ml-5 mr-5 shadow-md my-2 px-2 border border-gray-300 rounded-lg mb-3'>
        <thead>
          <tr className='rounded-t-lg border-b-2 border-gray-400 mt-3  no-underline text-xl'>
            <th className='no-underline text-xl py-3'>Date </th>
            <th className='no-underline text-xl bg-blue-200 py-3'>Subject </th>
            <th className='no-underline text-xl bg-green-200 py-3'>Time </th>
          </tr>
        </thead>


        <tbody >
          {exams && exams.length > 0 ? (
            exams.map((exam, index) => (
              <tr key={index} className='rounded-t-lg border-b-2 border-gray-400 mt-3  no-underline text-xl'>
                <td className="font-normal text-gray-700 text-center py-3 ">{exam.date}</td>
                <td className="font-normal bg-blue-200 text-gray-700 text-center py-3">{exam.subject}</td>
                <td className="font-normal bg-green-200 text-gray-700 text-center py-3">{exam.time}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center text-lg"><Loading /></td>
            </tr>
          )}
        </tbody>


        <tr>
          <td></td>
          <td></td>
          <td className='flex items-center justify-center font-medium'>
            <h1>
              <img src={signature} alt="" />
              Principal
            </h1>
          </td>

        </tr>
      </table>




    </div>


  )
}
