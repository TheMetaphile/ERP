import React, { useState, useEffect, useContext } from 'react';
import BacklogTransactionRow from './BacklogTransactionRow';
import { useLocation, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import { BASE_URL_Login } from '../../../../Config';
import { ToastContainer, toast } from 'react-toastify';
// import { useFilters } from '../../Students/utils/Filters';
import Loading from '../../../../LoadingScreen/Loading';

const BacklogTransaction = () => {
  const [data, setData] = useState([]);
  const { authState, logout, updateAccessToken } = useContext(AuthContext);
  const [start, setStart] = useState(0);
  const end = 20;
  const [allDataFetched, setAllDataFetched] = useState(false);
  const { startDate, endDate, searchMain } = useOutletContext();
  // const { filters } = useFilters();
  // const { course, Semester, session } = filters;
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    if (!(session)) {
      toast.error('Select Session');
      return;
    }
    setLoading(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL_Login}/transaction/fetch/backFee?session=${session}&course=${course}&semester=${Semester}&start=${start}&end=${end}&startDate=${startDate}&endDate=${endDate}&search=${searchMain}`,
      headers: {
        'Authorization': `Bearer ${authState.accessToken}`
      },
      data: ''
    };

    try {
      const response = await axios.request(config);
      //console.log(response.data);

      setData(prevData => [...prevData, ...response.data.fee]);
      const stud = response.data.fee;
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
          logout();
        }
      } else {
        toast.error(error.response.data.error);
      }
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   const handler = setTimeout(async () => {
  //     fetchStudents();
  //   }, 500);
  //   return () => {
  //     clearTimeout(handler);
  //   };

  // }, [start, course, Semester, session, startDate, endDate, searchMain]);
  

  // useEffect(() => {
  //   if (session !== "") {
  //     setAllDataFetched(false);
  //     setData([]);
  //   }
  // }, [course, Semester, session, startDate, endDate, searchMain]);

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
        <thead className="text-xs whitespace-nowrap  uppercase bg-gradient-to-r from-purple-300 to-purple-100">
          <tr>
            <th scope="col" className="px-3 py-3">Name</th>
            <th scope="col" className="px-3 py-3">Email</th>
            <th scope="col" className="px-3 py-3">Date</th>
            <th scope="col" className="px-3 py-3">Subject</th>
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
            <BacklogTransactionRow key={student._id} student={student} session={session} course={course} Semester={Semester} data={setData} />
          ))}
          {!allDataFetched && (
            <h1 className='text-purple-500 hover:text-purple-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BacklogTransaction;