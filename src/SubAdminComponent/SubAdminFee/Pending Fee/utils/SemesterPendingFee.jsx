import React, { useState, useEffect, useContext } from 'react';
import SemesterRow from './SemesterRow';
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import { BASE_URL } from '../../../../Config';
import { toast } from 'react-toastify';
import Loading from '../../../../LoadingScreen/Loading';

const SemesterPendingFee = ({ selectedClass, selectedSection, selectedMonth, selectedSession }) => {
  const [data, setData] = useState([]);
  const { authState } = useContext(AuthContext);
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
        'Authorization': `Bearer ${authState.accessToken}`
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
        <thead className="text-xs whitespace-nowrap  uppercase bg-gradient-to-r from-purple-300 to-purple-100">
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