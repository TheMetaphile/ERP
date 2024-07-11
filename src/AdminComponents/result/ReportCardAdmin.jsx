import React, { useState, useEffect, useContext } from 'react'
import { MdEdit } from "react-icons/md";
import Selection from './utils/Selection';
import Header from '../Home/utils/TeachersDetails/LeftCard/Header'
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Attendence } from '../../Config';

function ReportCardAdmin() {
    const [students, setStudents] = useState([])
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    // State to control the dropdown visibility
    const [isDropdownVisible, setDropdownVisible] = useState(false);



    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const today = new Date();
                const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
                const response = await axios.get(`${BASE_URL_Attendence}/studentAttendance/fetch/student/list?date=${formattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });
                const studentsList = response.data.studentsList.map(student => ({
                    ...student,
                }));
                setStudents(studentsList);
                console.log('fetch', studentsList)
            } catch (error) {
                console.error("Error fetching student attendance:", error);
            }
            finally {
                setLoading(false)
            }
        };

        fetchStudents();
    }, [authState.accessToken]);


    return (
        <>
            <div className='w-full flex items-center justify-between px-4 my-2 mobile:max-tablet:mt-4 mobile:max-tablet:px-4'>
                <h1 className="text-2xl font-medium mb-2 mobile:max-tablet:text-sm">Report Card</h1>
                <div className="block laptop:hidden">
                    <button
                        className="p-2 border rounded"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                    >
                        Filter
                    </button>
                    {isDropdownVisible && (
                        <div className="absolute bg-white shadow-lg py-2 rounded right-1 left-1 z-20 justify-center flex flex-col">
                            <Selection />
                        </div>
                    )}
                </div>
                <span className='flex gap-2 w-fit mobile:max-laptop:hidden'>
                    <Selection />

                </span>
            </div>
            <div className="overflow-y-auto w-full items-start  px-2 no-scrollbar mobile:max-tablet:mt-2 ">
                {loading ? (
                    <Loading />
                ) : students.length === 0 ? (
                    <>No student found</>
                ) : (
                    <div className='  rounded-lg shadow-md border border-gray-300 w-full mb-2 mobile:max-tablet:overflow-auto report-header'>
                        <Header headings={['Roll No.', 'Name', 'Email']} />
                        {students.map((detail, index) => (
                            <Link to={`/Admin-Dashboard/Result/${detail.email}`} key={index}>
                                <div key={index} className='flex justify-between border border-gray-300 shadow-md items-center py-2 pl-2  w-full' >
                                    <div className=' flex flex-1 justify-center'>{detail.rollNumber}</div>
                                    <div className='  flex flex-1 justify-center whitespace-nowrap  mobile:max-tablet:text-sm'>{detail.name}</div>
                                    <div className=' flex flex-1 justify-center gap-1 mobile:max-tablet:text-sm '>
                                        <img src={detail.profileLink} alt="img" className='w-8 h-8 rounded-full mobile:max-tablet:hidden'></img>
                                        <div >{detail.email}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )
                }

            </div>
        </>
    )
}

export default ReportCardAdmin











