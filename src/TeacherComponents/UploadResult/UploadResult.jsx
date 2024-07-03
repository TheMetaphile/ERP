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
 

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL_Login}/fetchMultiple/student`, {
          accessToken: authState.accessToken,
          currentClass: authState.ClassDetails.class,
          section: authState.ClassDetails.section

        });
        if (response.status == 200) {
          setStudents(response.data.Students);
          console.log(response.data.Students)
        }

      } catch (error) {
        console.error("Error fetching student:", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchStudents();
  }, [authState.accessToken]);



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
          <Header headings={['Roll No.', 'Name',"Class","section",""]} />
          {students.map((detail, index) => (
            <UploadResultRow key={index} rollNumber={detail.rollNumber} name={detail.name} profileLink={detail.profileLink} email= {detail.email} Class={authState.ClassDetails.class} section={authState.ClassDetails.section}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default UploadResult











