import React, { useState, useEffect, useContext } from 'react'
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header';
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login } from '../../Config';
import UploadResultRow from './UploadResultRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadResult() {
  const [students, setStudents] = useState([]);
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [allDataFetched, setAllDataFetched] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [authState.accessToken]);

  const handleViewMore = () => {
    setStart(prevStart => prevStart + end);
  };

  useEffect(() => {
    if (start !== 0) {
      fetchStudents();
    }
  }, [start]);


  const fetchStudents = async () => {
    setLoading(true);
    console.log('start', start, 'end', end)
    try {
      const response = await axios.post(`${BASE_URL_Login}/fetchMultiple/student`, {
        accessToken: authState.accessToken,
        currentClass: authState.ClassDetails.class,
        section: authState.ClassDetails.section,
        start: start,
        end: end
      });
      if (response.status == 200) {
        const student = response.data.Students.length;
        console.log("API response:", response.data.Students);
        if (student < end) {
          toast.success('All data fetched');
          console.log('All data fetched')
          setAllDataFetched(true);
        }
        setStudents(prevData => [...prevData, ...response.data.Students]);
        console.log("API responserrrrrr:", response.data.Students);

      }

    } catch (error) {
      console.error("Error fetching student:", error);
    }
    finally {
      setLoading(false)
    }
  };




  return (
    <div className="overflow-y-auto w-full items-start px-2 py-1 no-scrollbar">
      <ToastContainer />
      <div className='w-full flex items-center justify-between my-2'>
        <h1 className="text-2xl font-medium mb-2">Upload Report Card</h1>
      </div>
      {loading ? (
        <Loading />
      ) : students.length === 0 ? (
        <>No student found</>
      ) : (
        <div className='rounded-lg shadow-md border border-gray-300 w-full mb-2 h-screen overflow-auto'>
          <Header headings={['Roll No.', 'Name', "Class", "section", ""]} />
          {students.map((detail, index) => (
            <UploadResultRow key={index} rollNumber={detail.rollNumber} name={detail.name} profileLink={detail.profileLink} email={detail.email} Class={authState.ClassDetails.class} section={authState.ClassDetails.section} />
          ))}
          {!allDataFetched && (
            <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
          )}
        </div>
      )}
    </div>
  )
}

export default UploadResult











