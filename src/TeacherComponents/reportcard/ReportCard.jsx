import React, { useState, useEffect, useContext } from 'react'
import { MdEdit } from "react-icons/md";
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header'
import { Link } from "react-router-dom";
import NewReport from './utils/NewReport';
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Attendence } from '../../Config';

function ReportCard() {
    const [students, setStudents] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)


    const handleOpen = () => {
        setIsDialogOpen(true);
    }
    const handleClose = () => {
        setIsDialogOpen(false);
    }

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
        <div className="overflow-y-auto w-full items-start  px-2 no-scrollbar">
            <div className='w-full flex items-center justify-between px-4 my-2'>
                <h1 className="text-2xl font-medium mb-2">Search Report Card</h1>

                <span className='flex gap-2 w-fit'>
                    <Selection />
                    <h1 className='flex items-center text-sm bg-secondary p-2 rounded-lg shadow-md self-end'>Edit <MdEdit className='ml-1' /></h1>
                    <h1 className='f text-sm bg-purple-200 p-2 rounded-lg shadow-md self-end cursor-pointer' onClick={handleOpen}>Add New Report Card</h1>
                </span>
            </div>

            {loading ? (
                <Loading />
            ) : students.length === 0 ? (
                <>No student found</>
            ) : (
                <div className='  rounded-lg shadow-md border border-gray-300 w-full mb-2'>
                    <Header headings={['Roll No.', 'Name', 'Email']} />
                    {students.map((detail, index) => (
                        <Link to={`/Teacher-Dashboard/reportcard/${detail.email}`} key={index}>
                            <div key={index} className='flex justify-between border border-gray-300 shadow-md items-center py-2 pl-2  w-full' >
                                <div className=' w-full text-center'>{detail.rollNumber}</div>
                                <div className=' w-full text-center'>{detail.name}</div>
                                <div className=' w-full text-center flex items-center gap-1'>
                                    <img src={detail.profileLink} alt="img" className='w-8 h-8 rounded-full'></img>
                                    <div >{detail.email}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )
            }
            {isDialogOpen && <NewReport onClose={handleClose} />}
        </div>

    )
}

export default ReportCard











