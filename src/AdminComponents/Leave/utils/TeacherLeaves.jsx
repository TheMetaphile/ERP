import React, { useState, useEffect, useContext } from "react";
import { userimg } from "../../Teachers/utils/images/index.js";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext.jsx";
import Loading from "../../../LoadingScreen/Loading.jsx";
import { BASE_URL_TeacherLeave } from "../../../Config.js";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TeacherLeaves() {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (authState.accessToken) {
      setLoading(true);
      fetchTeacherData();
    } else {
      setError('No access token available');
      setLoading(false);
    }
  }, [authState.accessToken]);

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

  const fetchTeacherData = async () => {
    const session = getCurrentSession();

    try {
      const response = await axios.get(`${BASE_URL_TeacherLeave}/leave/fetch/admin?start=${0}&end=${10}&session=${session}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      }
      );
      console.log("API response teacher:", response.data.Leaves);
      setData(response.data.Leaves);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAction = async (actionType) => {
    const id = selectedLeave._id;
    const session = getCurrentSession();
    try {
      const response = await axios.put(
        `${BASE_URL_TeacherLeave}/leave/update?leaveId=${id}&session=${session}`,
        { status: actionType },
        {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`
          }
        }
      );

      if (response.status === 200) {
        const updatedLeaves = data.map((leave) =>
          leave._id === id ? { ...leave, status: actionType } : leave
        );
        setData(updatedLeaves);
        setSelectedLeave(null);
        toast.success(`Leave ${actionType === 'Approved' ? 'approved' : 'rejected'}`);
        console.log(`Leave ${actionType === 'Approved' ? 'approved' : 'rejected'}`);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (err) {
      console.error('Error updating leave:', err.message);
    }
  };


  const handleViewDetails = (leave) => {
    setSelectedLeave(leave);
  };

  const handleClosePopup = () => {
    setSelectedLeave(null);
  };

  return (
    <div className="flex flex-col space-y-4 mb-4">
      {loading ? (
        <Loading />
      ) : data === null ? (
        <div>No data available</div>
      ) : (
        data.map((leave, index) => (
          <div key={index} className={`rounded-md border p-4 flex flex-col w-full`}>
            <div className="flex justify-between">
              <div className="flex">
                {leave.by && leave.by[0] && (
                  <>
                    <img src={leave.by[0].profileLink} alt="" className="h-12 w-12 mobile:max-tablet:hidden rounded-full" />
                    <p className="text-xl mb-2 mt-2 px-2 mobile:max-tablet:text-lg"> {leave.by[0].name}</p>
                  </>
                )}
              </div>
              <div>
                <h1 className={` px-2 py-1 rounded-lg ${leave.status === 'Pending' ? 'bg-orange-200 text-orange-700' : leave.status === 'Approved' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                  {leave.status}
                </h1>
              </div>
              <div className="mt-2">
                <button
                  className="rounded-lg bg-blue-400 px-4 mobile:max-tablet:px-2"
                  onClick={() => handleViewDetails(leave)}
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="flex justify-between text-gray-900 mobile:max-tablet:flex-col">
              <span className="text-lg">Leave Taken on: {leave.startDate}</span>
              <span className="text-lg">Expected Arrival: {leave.endDate}</span>
            </div>
          </div>
        ))
      )}

      {selectedLeave && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl mb-4 text-center">Confirm Leave</h2>
            <p className="text-xl">Type: {selectedLeave.type}</p>
            <p className="text-xl">Reason: {selectedLeave.reason}</p>
            <div className="mt-4 flex justify-center">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleClosePopup}>
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleAction("Approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                onClick={() => handleAction("Rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}