import React, { useState, useEffect, useContext } from 'react'
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header'
import { Link } from "react-router-dom";
import NewReport from './utils/NewReport';
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login } from '../../Config';

function ReportCard() {
    const [students, setStudents] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)



    const handleClose = () => {
        setIsDialogOpen(false);
    }

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
        <div className="overflow-y-auto w-full items-start  px-2 py-1 no-scrollbar">
            <div className='w-full flex items-center justify-between  my-2'>
                <h1 className="text-2xl font-medium mb-2">Search Report Card</h1>

                <span className='flex gap-2 w-fit'>
                    <Selection />
                </span>
            </div>

            {loading ? (
                <Loading />
            ) : students.length === 0 ? (
                <>No student found</>
            ) : (
                <div className='  rounded-lg shadow-md border border-gray-300 w-full mb-2'>
                    <Header headings={['Roll No.', 'Name',"Class","Section"]} />
                    {students.map((detail, index) => (
                        <Link to={`/Teacher-Dashboard/class_activity/reportcard/${detail.email}`} key={index}>
                            <div key={index} className='flex justify-evenly border border-gray-300 shadow-md items-center py-2 pl-2  w-full' >
                                <div className=' w-40 text-center'>{detail.rollNumber}</div>
                                <div className=' w-52 text-center flex justify-center'>
                                    <img src={detail.profileLink} alt="img" className='w-8 h-8 rounded-full mr-2'></img>
                                    <div className='w-52 text-center'>{detail.name}</div>
                                </div>
                                <div className=' w-40 text-center'>{authState.ClassDetails.class}</div>
                                <div className=' w-40 text-center'>{authState.ClassDetails.section}</div>

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











