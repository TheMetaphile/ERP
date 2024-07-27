import React, { useState, useEffect, useContext } from 'react'
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header'
import { Link } from "react-router-dom";
import NewReport from './utils/NewReport';
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ReportCard() {
    const [students, setStudents] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
    const [allDataFetched, setAllDataFetched] = useState(false);


    const handleClose = () => {
        setIsDialogOpen(false);
    }

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
        <div className="overflow-y-auto w-full items-start  px-2 py-1 no-scrollbar">
            <ToastContainer />

            <div className='w-full flex items-center justify-between  my-2'>
                <h1 className="text-2xl mobile:max-tablet:text-lg font-medium mb-2">Search Report Card</h1>

                {/* <span className='flex gap-2 w-fit'>
                    <Selection />
                </span> */}
            </div>
            <div className=' overflow-auto'>
                {loading ? (
                    <Loading />
                ) : students.length === 0 ? (
                    <>No student found</>
                ) : (
                    <div className=' rounded-lg shadow-md border border-gray-300 w-full mb-2 overflow-auto'>
                        <Header headings={['Roll No.', 'Name', "Class", "Section"]} />
                        {students.map((detail, index) => (
                            <Link to={`/Teacher-Dashboard/class_activity/reportcard/${detail.email}`} key={index}>
                                <div key={index} className='flex justify-between items-center py-2 pl-2  h-fit  border border-gray-300 text-center w-fit mobilemedium:w-full laptop:w-full  gap-2' >
                                    <div className=' w-40 mobile:max-tablet:w-20 text-center'>{detail.rollNumber}</div>
                                    <div className=' w-48 mobile:max-tablet:w-40 text-center flex justify-center'>
                                        <img src={detail.profileLink} alt="img" className='w-8 h-8 rounded-full mr-2'></img>
                                        <div className='w-52 text-center'>{detail.name}</div>
                                    </div>
                                    <div className=' w-40 mobile:max-tablet:w-20 text-center'>{authState.ClassDetails.class}</div>
                                    <div className=' w-40 mobile:max-tablet:w-20 text-center'>{authState.ClassDetails.section}</div>

                                </div>
                            </Link>
                        ))}
                        {!allDataFetched && (
                            <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
                        )}
                    </div>
                )
                }
            </div>
            {isDialogOpen && <NewReport onClose={handleClose} />}
        </div>

    )
}

export default ReportCard











