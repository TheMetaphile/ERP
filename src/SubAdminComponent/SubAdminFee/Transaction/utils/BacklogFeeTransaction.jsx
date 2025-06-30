import React, { useState, useEffect, useContext } from 'react';
import BacklogTransactionRow from './BacklogTransactionRow';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import { BASE_URL } from '../../../../Config';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../../../LoadingScreen/Loading';
import { refreshAccessToken } from '../../../../RefreshTokenHelper';


const BacklogTransaction = () => {
  const [data, setData] = useState([]);
  const { authState, logout, updateAccessToken } = useContext(AuthContext);
  const [start, setStart] = useState(0);
  const end = 20;
  const [allDataFetched, setAllDataFetched] = useState(false);
  const { startDate, endDate, searchMain, selectedSession } = useOutletContext();
  const { transactionData, selectedStudent } = useOutletContext();
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    if (!(selectedSession)) {
      toast.error('Select Session');
      return;
    }
    setLoading(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/fee/fetch/allTransactions?session=${selectedSession}&start=${start}&end=${end}&startDate=${startDate}&endDate=${endDate}&search=${searchMain}`,
      headers: {
        'Authorization': `Bearer ${authState?.accessToken}`
      },
      data: ''
    };

    try {
      const response = await axios.request(config);
      //console.log(response.data);

      setData(prevData => [...prevData, ...response.data.transactions]);
      const stud = response.data.transactions;
      if (stud.length < (start + end)) {
        toast.success('All data fetched');
        //console.log('All data fetched')
        setAllDataFetched(true);
      }
    } catch (error) {
      console.log(error);
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
    const handler = setTimeout(async () => {
      fetchStudents();
    }, 500);
    return () => {
      clearTimeout(handler);
    };

  }, [start, selectedSession, startDate, endDate, searchMain]);


  useEffect(() => {
    if (selectedSession !== "") {
      setAllDataFetched(false);
      setData([]);
    }
  }, [selectedSession, startDate, endDate, searchMain]);


  const handleViewMore = () => {
    setStart(prevStart => prevStart + end);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <ToastContainer />
      <table className="w-full text-sm text-left ">
        <thead className="text-xs whitespace-nowrap  uppercase bg-gradient-to-r from-blue-300 to-blue-100">
          <tr>
            <th scope="col" className="px-3 py-3">Name</th>
            <th scope="col" className="px-3 py-3">Date</th>
            <th scope="col" className="px-3 py-3">Month</th>
            <th scope="col" className="px-3 py-3">Amount</th>
            <th scope="col" className="px-3 py-3">Discount</th>
            <th scope="col" className="px-3 py-3">Payment Id</th>
            <th scope="col" className="px-3 py-3">Mode</th>
            <th scope="col" className="px-3 py-3">Status</th>
            <th scope="col" className="px-3 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <BacklogTransactionRow key={student._id} student={student} session={selectedSession} data={setData} />
          ))}
          {!allDataFetched && (
            <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
          )}
          {transactionData && (
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-3 py-4"><div className='flex flex-col'>
                {selectedStudent.name}
                {transactionData.rollNumber}
              </div>
              </td>

              <td className="px-3 py-4">{transactionData.date}</td>
              <td className="px-3 py-4">{transactionData.order_id}</td>
              <td className="px-3 py-4">
                <div className='text-green-700 px-2 py-1 bg-green-100 font-semibold border border-green-600 rounded-full'>
                  ₹ {transactionData.amount}
                </div>
              </td>
              <td className="px-3 py-4">
                <div className='text-blue-700 px-2 py-1 bg-blue-100 font-semibold border border-blue-600 rounded-full'>
                  ₹ {transactionData.discount ? transactionData.discount : 0}
                </div>
              </td>
              <td className="px-3 py-4">{transactionData.payment_id}</td>
              <td className="px-3 py-4">{transactionData.signature}</td>
              <td className="px-3 py-4">

              </td>
              <td className="px-3 py-4">

              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BacklogTransaction;