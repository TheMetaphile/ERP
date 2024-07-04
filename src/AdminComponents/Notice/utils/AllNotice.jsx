import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../../Config";
import { MdEdit, MdCheck } from 'react-icons/md';

const AllNotice = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { authState } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (authState.accessToken) {
      setLoading(true);
      fetchAllNotices();
    } else {
      setError('No access token available');
      setLoading(false);
    }
  }, [authState.accessToken]);

  const handleClick = (index) => {
    setExpanded(expanded === index ? null : index);
  }

  function getCurrentSession() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    if (currentMonth >= 3) {
      return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
    } else {
      return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    }
  }

  const fetchAllNotices = async () => {
    const session = getCurrentSession();

    try {
      const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/admin?start=${0}&limit=${10}&session=${session}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      }
      );
      console.log("API response notice:", response.data.notices);
      setData(response.data.notices);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-4 mx-2">
      <div className="flex flex-col space-y-4 mb-4">
        {loading ? (
          <Loading />
        ) : data === null || data.length === 0 ? (
          <div>No notices available</div>
        ) : (
          data.map((notice, index) => (
            (notice.type === 'For All') && (
              <div key={index} className="bg-white shadow-md rounded-md p-4 border mt-2 text-base cursor-pointer" onClick={() => handleClick(`${index}`)}>
                <div className="w-full flex items-center justify-between  mb-2">
                  <h3 className="">Title : {notice.title}</h3>
                  <p className=" ">Type: {notice.type}</p>
                </div>
                {expanded === `${index}` && (
                  <>
                  <div className='text-base  mt-2'>
                    <p className=" ">Description : {notice.description}</p>
                  </div>
                    {/* <button className='bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md' ><MdCheck /></button>
          
                    <button className='bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center'> <MdEdit /></button> */}
                    </>
                )}

                <div className="w-full flex items-center justify-between mt-2">
                  <p className=" ">Date: {notice.date}</p>
                  <div className="flex items-center">
                    By :
                    <div className="flex items-center gap-1 px-1">
                      <img src={notice.from.profileLink} alt="" className="w-8 h-8 rounded-full" />
                      <p className=" ">{notice.from.name}</p>
                    </div>
                  </div>
                </div>

                
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
};

export default AllNotice;