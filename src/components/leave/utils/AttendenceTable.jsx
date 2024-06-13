import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';

export default function AttendenceTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const { authState } = useContext(AuthContext);


  const fetchUserData = async () => {
    try {
      const response = await axios.post('https://studentleaveapi.onrender.com/leave/fetch/particularStudent', {
        accessToken: authState.accessToken,
        email: authState.userDetails.email
      });
      console.log("API response:", response.data);
      setData(response.data.leaves);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {

    if (authState.accessToken) {
      fetchUserData();
    } else {
      setError('No access token available');
      setLoading(false);
    }
  }, [authState.accessToken]);



  return (
    <div className='rounded-lg shadow-lg   w-full'>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className='mt-7 mb-3 w-full justify-evenly text-center outline outline-gray-400 rounded-lg'>
          <thead>
            <tr className='rounded-t-lg border-b-2 border-gray-400 mt-3 text-base font-medium'>
              <th>Leave Type</th>
              <th className='bg-blue-200'>Start Date</th>
              <th className='bg-green-200'>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((leave, index) => (
              <tr key={index}>
                <td className="font-normal">{leave.reason}</td>
                <td className="font-normal bg-blue-200">{leave.startDate}</td>
                <td className="font-normal bg-green-200">{leave.endDate}</td>
                <td className={`${leave.status === "Pending" ? "text-orange-300" :
                    leave.status === "Rejected" ? "text-red-400" :
                      "text-green-400"
                  } font-medium`}>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}




    </div>


  )
}
