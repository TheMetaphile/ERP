import React, { useState, useEffect, useContext } from 'react';
import SemesterRow from './SemesterRow';
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import { BASE_URL } from '../../../../Config';
import { toast } from 'react-toastify';
import Loading from '../../../../LoadingScreen/Loading';
import { refreshAccessToken } from '../../../../RefreshTokenHelper';

const SemesterPendingFee = ({ selectedClass, selectedSection, selectedMonth, selectedSession }) => {
  const [data, setData] = useState([]);
  const { authState, updateAccessToken, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);


  const fetchStudents = async () => {
    if (!selectedClass || !selectedMonth || !selectedSection || !selectedSession) {
      toast.error("Select all filters");
      return;
    }

    setLoading(true);

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/fee/fetch/pendingFeeReport/${selectedClass}/${selectedSection}/${selectedSession}/${selectedMonth}`,
      headers: {
        'Authorization': `Bearer ${authState?.accessToken}`
      },
      data: ''
    };

    try {
      const response = await axios.request(config);
      //console.log(response.data);
      setData(response.data.PendingFee);
    } catch (error) {
      console.log(error);
      //console.error('Error fetching agents:', error.response.data.error);
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await fetchStudents();
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
    setLoading(false);
  };


  useEffect(() => {
    fetchStudents();
    setData([]);
  }, [selectedClass, selectedSection, selectedMonth, selectedSession]);


  if (loading) {
    return <Loading />;
  }
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full text-sm text-left ">
        <thead className="text-xs whitespace-nowrap  uppercase bg-gradient-to-r from-blue-300 to-blue-100">
          <tr>
            <th scope="col" className="px-3 py-3">RollNo.</th>
            <th scope="col" className="px-3 py-3">Name</th>
            <th scope="col" className="px-3 py-3">Phone No.</th>
            <th scope="col" className="px-3 py-3">Total Fee</th>
            <th scope="col" className="px-3 py-3">Total Discount (Manual + Category)</th>
            <th scope="col" className="px-3 py-3">Paid Fee</th>
            <th scope="col" className="px-3 py-3">Pending Fee</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <SemesterRow key={student._id} student={student} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SemesterPendingFee;