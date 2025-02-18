import React, { useState, useEffect, useContext } from 'react';
import SemesterRow from './SemesterRow';
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import { BASE_URL_Login } from '../../../../Config';
import { toast } from 'react-toastify';
import Loading from '../../../../LoadingScreen/Loading';

const SemesterPendingFee = ({ selectedClass, selectedSection }) => {
  const [data, setData] = useState([]);
  const { authState, logout, updateAccessToken } = useContext(AuthContext);
  const [start, setStart] = useState(0);
  const end = 20;
  const [allDataFetched, setAllDataFetched] = useState(false);
  const [loading, setLoading] = useState(false);


  const fetchStudents = async () => {
   
    setLoading(true);

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL_Login}/additionalFee/pending?course=${selectedClass}&semester=${parseInt(selectedSection)}&start=${start}&end=${end}`,
      headers: {
        'Authorization': `Bearer ${authState.accessToken}`
      },
      data: ''
    };

    try {
      const response = await axios.request(config);
      //console.log(response.data);
      setData(prevData => [...prevData, ...response.data.data]);
      const stud = response.data.data;
      if (stud.length < (start + end)) {
        toast.success('All data fetched');
        //console.log('All data fetched')
        setAllDataFetched(true);
      }
    } catch (error) {
      //console.log(error);
      //console.error('Error fetching agents:', error.response.data.error);
      if (error.response && error.response.data.error === 'You are not permitted to access this data. Please contact the admin') {
        console.warn('Access denied. Attempting to refresh token...');

        try {
          const refreshResponse = await axios.post(`${BASE_URL_Login}/token/newAccessToken`, {
            refreshToken: authState.refreshToken,
          });

          const newAccessToken = refreshResponse.data.accessToken;
          //console.log("newasdg", newAccessToken)
          updateAccessToken(newAccessToken, authState);

          authState.accessToken = newAccessToken;

          await fetchStudents();
        } catch (refreshError) {
          //console.error('Failed to refresh token:', refreshError);
          toast.error('Session Expired');
          // logout();
        }
      } else {
        toast.error(error.response.data.error);
      }
    }
    setLoading(false);
  };


  useEffect(() => {
    const handler = setTimeout(async () => {
      fetchStudents();
    }, 500);
    return () => {
      clearTimeout(handler);
    };

  }, [start, selectedClass, selectedSection]);

  useEffect(() => {
    
      setAllDataFetched(false);
      setData([]);
    
  }, [selectedClass, selectedSection]);

  const handleViewMore = () => {
    setStart(prevStart => prevStart + end);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full text-sm text-left ">
        <thead className="text-xs whitespace-nowrap  uppercase bg-gradient-to-r from-purple-300 to-purple-100">
          <tr>
            <th scope="col" className="px-3 py-3">Enrollment No</th>
            <th scope="col" className="px-3 py-3">Name</th>
            <th scope="col" className="px-3 py-3">Phone No.</th>
            <th scope="col" className="px-3 py-3">Total Session Fee</th>
            <th scope="col" className="px-3 py-3">Session Fee Discount</th>
            <th scope="col" className="px-3 py-3">Session Fee Paid</th>
            <th scope="col" className="px-3 py-3">Session Fee Pending</th>
            <th scope="col" className="px-3 py-3">Total Additional Fee</th>
            <th scope="col" className="px-3 py-3">Additional Fee Paid</th>
            <th scope="col" className="px-3 py-3">Additional Fee Pending</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <SemesterRow key={student._id} student={student} />
          ))}
          {!allDataFetched && (
            <h1 className='text-purple-500 hover:text-purple-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SemesterPendingFee;