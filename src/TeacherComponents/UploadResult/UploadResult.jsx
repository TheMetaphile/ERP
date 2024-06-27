import React, { useState, useEffect, useContext } from 'react'
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header';
import axios from 'axios';
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login } from '../../Config';

function UploadResult() {
  const [students, setStudents] = useState([]);
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [sectionsResult, setResult] = useState({});


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


  const fetchResult = async (email) => {
    console.log(email, authState.ClassDetails.class, '2023-24')
    // setLoading(true);
    // try {
    //   const response = await axios.get(`https://studentresult-ztxk.onrender.com/result/fetch/student`, {
    //     params: { email, class: currentClass, session }
    //   });
    //   if (response.status === 200) {
    //     setResult(prevResult => ({
    //       ...prevResult,
    //       [email]: response.data
    //     }));
    //     console.log(response.data);
    //   }
    // } catch (error) {
    //   console.error("Error fetching result:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleClick = (email) => {
    setExpandedRows(prevState => ({
      ...prevState,
      [email]: !prevState[email]
    }));

    if (!sectionsResult[email]) {
      fetchResult(email);
    }
  };

  return (
    <div className="overflow-y-auto w-full items-start px-2 py-1 no-scrollbar">
      <div className='w-full flex items-center justify-between my-2'>
        <h1 className="text-2xl font-medium mb-2">Upload Report Card</h1>
      </div>
      {loading ? (
        <Loading />
      ) : students.length === 0 ? (
        <>No student found</>
      ) : (
        <div className='rounded-lg shadow-md border border-gray-300 w-full mb-2'>
          <Header headings={['Roll No.', 'Name', 'Email']} />
          {students.map((detail, index) => (
            <div key={index}>
              <div
                className='flex justify-evenly border border-gray-300 shadow-md items-center py-2 pl-2 w-full cursor-pointer'
                onClick={() => handleClick(detail.email)}
              >
                <div className='w-40 text-center'>{detail.rollNumber}</div>
                <div className='w-52 text-center'>{detail.name}</div>
                <div className='w-40 text-center flex items-center gap-1'>
                  <img src={detail.profileLink} alt="img" className='w-8 h-8 rounded-full' />
                  <div>{detail.email}</div>
                </div>
                <div className="self-center">
                  {expandedRows[detail.email] ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              {expandedRows[detail.email] && sectionsResult[detail.email] && (
                <div className="p-4 border-t border-gray-300">
                  <h2>Result Details:</h2>
                  <pre>{JSON.stringify(sectionsResult[detail.email], null, 2)}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UploadResult











