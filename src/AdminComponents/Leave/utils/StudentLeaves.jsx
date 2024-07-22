import React, { useState, useEffect, useContext } from "react";
import { userimg } from "../../Teachers/utils/images/index.js";
import Loading from "../../../LoadingScreen/Loading.jsx";
import AuthContext from "../../../Context/AuthContext.jsx";
import axios from "axios";
import { BASE_URL_Student_Leave } from "../../../Config.js";
import { ToastContainer, toast } from "react-toastify";
export default function StudentLeaves() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const { authState } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const [status, setStatus] = useState('Pending');

  const handleClick = (index) => {
    setExpanded(expanded === index ? null : index);
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {

    setStart(0);
    setData([]);
    setLoading(true);
    fetchUserData();

  }, [authState.accessToken, status]);

  const handleViewMore = () => {
    setStart(prevStart => prevStart + end);
  };

  useEffect(() => {
    if (start !== 0) {
      fetchUserData();
    }
  }, [start]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL_Student_Leave}/leave/fetch/admin?start=${start}&end=${end}&status=${status}`, {
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      }
      );

      const leave = response.data.StudentsLeaves.length;
      console.log("API response:", response.data.StudentsLeaves);
      if (leave < end) {
        toast.success('All data fetched');
        console.log('All data fetched')
        setAllDataFetched(true);
      }
      setData(prevData => [...prevData, ...response.data.StudentsLeaves]);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col space-y-4 mb-4">
      <ToastContainer />
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-medium">Old Leave</h1>
        <select
          value={status}
          onChange={handleStatusChange}
          className="border border-gray-300 rounded-lg px-2 py-1"
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      {loading ? (
        <Loading />
      ) : data.length === 0 ? (
        <div>No data available</div>
      ) : (
        <>
          {data.map((leave, index) => (
            <div key={index} className={`rounded-md border p-4 flex flex-col w-full`}>
              <div className="flex justify-between" onClick={() => handleClick(`${index}`)}>
                <div className="flex">
                  <img src={leave.profileLink} alt="" className="h-12 w-12 mobile:max-tablet:hidden rounded-full" />
                  <p className="text-xl mb-2 mt-2 px-2 mobile:max-tablet:text-lg">{leave.name}</p>
                </div>
                <div>
                  <h1 className="text-xl mt-2 mobile:max-tablet:text-lg mobile:max-tablet:px-2">
                    Class: {leave.class} {leave.section}
                  </h1>
                </div>

              </div>
              {expanded === `${index}` && (
                <p className="text-xl">Reason for Leave: {leave.reason}</p>
              )}
              <div className="flex justify-between text-gray-900 mobile:max-tablet:flex-col">
                <span className="text-lg">Leave Taken on: {leave.startDate}</span>
                <span className="text-lg">Expected Arrival: {leave.endDate}</span>
              </div>
            </div>
          ))}
          {!allDataFetched && (
            <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
          )}
        </>
      )}


    </div>
  );
}