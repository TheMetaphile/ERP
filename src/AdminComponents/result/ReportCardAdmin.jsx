import React, { useState, useEffect, useContext, useRef } from 'react'
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header';
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';

function ReportCardAdmin() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    // State to control the dropdown visibility
    const [Class, setClass] = useState(localStorage.getItem('Class') || '');
    const [Section, setSection] = useState(localStorage.getItem('Section') || '');
    const [selectedSession, setSelectedSession] = useState(localStorage.getItem('selectedSession') || '');
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const [userData, setUserData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(20);
    const [allDataFetched, setAllDataFetched] = useState(false);

    useEffect(() => {
        localStorage.setItem('Class', Class);
        localStorage.setItem('Section', Section);
        localStorage.setItem('selectedSession', selectedSession);
    }, [Class, Section, selectedSession]);

    const handleClassChange = (event) => {
        setUserData([]);
        setAllDataFetched(false);
        setClass(event.target.value);
        setStart(0);
    };

    const handleSectionChange = (event) => {

        setUserData([]);
        setAllDataFetched(false);
        setSection(event.target.value);
        setStart(0);
    };

    const handleSessionChange = (session) => {
        setSelectedSession(session);
    };

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if(start!==0){
            fetchStudents();
        }
    }, [start]);

    console.log('ll', Class, Section, selectedSession)
    useEffect(() => {
        fetchStudents();
    }, [authState.accessToken, Class, Section]);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            console.log(start, "-", end);
            const response = await axios.post(`${BASE_URL_Login}/fetchMultiple/student`, {
                accessToken: authState.accessToken,
                currentClass: Class,
                section: Section,
                end: end,
                start: start
            });
            console.log("API response:", response.data, response.data.Students.length);

            if (response.data.Students) {
                // const users = response.data.Students.map(user => ({
                //     ...user,
                //     profileLogo: user.profileLink || profilelogo,
                // }));

                const list = response.data.Students.length;
                if (list < end) {
                    toast.success('All data fetched');
                    console.log('All data fetched')
                    setAllDataFetched(true);
                }
                setUserData(prevUsers => [...prevUsers, ...response.data.Students]);


            } else {
                setError('Unexpected response format');
                setTimeout(() => {
                    setError('');
                }, 2000);
            }

            setLoading(false);
        } catch (err) {
            setError(err.message);
            console.log(err);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
        }
    };



    return (
        <>
            <div className='   '>
                <ToastContainer />
                <div className="flex items-center justify-between px-3 py-2">

                    <h1 className="text-xl font-medium mb-2 ">Report Card</h1>


                    <span className='w-fit flex items-center gap-2 mobile:max-laptop:hidden'>
                        {/* <Link to={`/Sub-Admin/exStudent`}>
                        <h1 className="p-2 rounded-lg bg-purple-300 hover:bg-purple-500 ">Ex Student</h1>
                    </Link> */}
                        <Selection
                            Class={Class}
                            Section={Section}
                            Session={selectedSession}
                            handleClassChange={handleClassChange}
                            handleSectionChange={handleSectionChange}
                            handleSessionChange={handleSessionChange}
                        />

                    </span>
                </div>

            </div>
            <div className=" w-full items-start overflow-y-auto  px-2 no-scrollbar mobile:max-tablet:mt-2 ">
                {loading && start == 0 ? (
                    <Loading />
                ) : userData.length === 0 ? (
                    <>No student found</>
                ) : (
                    <div className='  rounded-lg shadow-md border border-gray-300 w-full mb-2 h-fit  report-header' ref={containerRef} >
                        <Header headings={['Name', 'Class', 'Section', 'Email']} />
                        {userData.map((detail, index) => (
                            <Link to={`/Admin-Dashboard/Result/${detail.email}?session=${selectedSession}&Class=${Class}`} key={index}>
                                <div key={index} className='flex justify-between border border-gray-300 shadow-md items-center py-2 pl-2  w-full' >
                                    <div className='  flex flex-1 justify-center whitespace-nowrap  mobile:max-tablet:text-sm'>{detail.name}</div>
                                    <div className='  flex flex-1 justify-center whitespace-nowrap  mobile:max-tablet:text-sm'>{detail.currentClass}</div>
                                    <div className='  flex flex-1 justify-center whitespace-nowrap  mobile:max-tablet:text-sm'>{detail.section}</div>
                                    <div className=' flex flex-1 justify-center gap-1 mobile:max-tablet:text-sm '>
                                        <img src={detail.profileLink} alt="img" className='w-8 h-8 rounded-full mobile:max-tablet:hidden'></img>
                                        <div >{detail.email}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {!allDataFetched && (

                            <div colSpan="4" className="text-center">
                                <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer' onClick={handleViewMore}>View More</h1>
                            </div>

                        )}
                    </div>
                )
                }

            </div>
        </>
    )
}

export default ReportCardAdmin























