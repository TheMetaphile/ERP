import React, { useState, useEffect, useContext } from "react";
import { userimg } from "../../Teachers/utils/images/index.js";
import Loading from "../../../LoadingScreen/Loading.jsx";
import AuthContext from "../../../Context/AuthContext.jsx";
import axios from "axios";
import { BASE_URL_Student_Leave } from "../../../Config.js";

export default function StudentLeaves() {

  const [selectedLeave, setSelectedLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,setError] =useState(null);
  const [data, setData] = useState('');
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (authState.accessToken) {
      setLoading(true);
      fetchUserData();
    } else {
      setError('No access token available');
      setLoading(false);
    }
  }, [authState.accessToken]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL_Student_Leave}/leave/fetch/admin?start=${0}&end=${10}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      }
      );
      console.log("API response admin:", response.data.StudentsLeaves);
      setData(response.data.StudentsLeaves);
      setLoading(false);
    } catch (err) {
      setError(err.message);
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
                <img src={leave.profileLink} alt="" className="h-12 w-12 mobile:max-tablet:hidden rounded-full" />
                <p className="text-xl mb-2 mt-2 px-2 mobile:max-tablet:text-lg">{leave.name}</p>
              </div>
              <div>
                <h1 className="text-xl mt-2 mobile:max-tablet:text-lg mobile:max-tablet:px-2">
                  Class: {leave.class} {leave.section}
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
          <div className="bg-white rounded-lg p-6 items-center">
            <h2 className="text-2xl mb-4 text-center">Confirm Leave</h2>
            <p className="text-xl">Name of Student: {selectedLeave.name}</p>
            <p className="text-xl">Class: {selectedLeave.class} {selectedLeave.section}</p>
            <p className="text-xl">Reason for Leave: {selectedLeave.reason}</p>
            <div className="mt-4 flex justify-center">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleClosePopup}
              >
                Close
              </button>
              {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Confirm
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}