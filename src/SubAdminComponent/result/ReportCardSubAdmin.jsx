import React, { useState, useEffect, useContext, useRef } from 'react'
import { MdEdit } from "react-icons/md";
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header';
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Attendence, BASE_URL_Login } from '../../Config';

function ReportCardSubAdmin() {
    const [students, setStudents] = useState([])
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    // State to control the dropdown visibility
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [Class, setClass] = useState('');
    const [Section, setSection] = useState('');
    const [selectedSession, setSelectedSession] = useState('');
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const [userData, setUserData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(20);
    const [loadMore, setLoadMore] = useState(false);

    const handleClassChange = (event) => {
        setStart(0);
        setUserData([]);
        setClass(event.target.value);
    };

    const handleSectionChange = (event) => {
        setStart(0);
        setUserData([]);
        setSection(event.target.value);
    };

    const handleSessionChange = (session) => {
        setStart(0);
        setUserData([]);
        console.log('session',session)
        setSelectedSession(session);
    };


    console.log('ll', Class, Section,selectedSession)
    useEffect(() => {
        fetchStudents();
    }, [authState.accessToken, Class, Section,start]);

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
            console.log("API response:", response.data);

            if (response.data.Students) {
                const users = response.data.Students.map(user => ({
                    ...user,
                    profileLogo: user.profileLink || profilelogo,
                }));

                if (loadMore) {
                    console.log(userData.length + users.length, "length");
                    setUserData(prevUsers => [...prevUsers, ...users]);
                    setLoadMore(false);
                } else {
                    setUserData(users);
                    console.log(users.length, "length");
                }

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



    const handleScroll = () => {
        const container = containerRef.current;
        if (container && container.scrollHeight - container.scrollTop <= container.clientHeight + 50) {
            if (start + end === userData.length) {
                console.log("fetching");
                setLoadMore(true);
                setStart(prevStart => prevStart + 20);
            }
        }
    };

    return (
        <>
            <div className='w-full flex items-center pt-20 justify-between px-4 my-2 mobile:max-tablet:mt-4 mobile:max-tablet:px-4'>
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
            <div className="overflow-y-auto w-full items-start  px-2 no-scrollbar mobile:max-tablet:mt-2 ">
                {loading ? (
                    <Loading />
                ) : userData.length === 0 ? (
                    <>No student found</>
                ) : (
                    <div className='  rounded-lg shadow-md border border-gray-300 w-full mb-2 h-screen overflow-auto report-header' ref={containerRef} onScroll={handleScroll}>
                        <Header headings={[ 'Name','Class', 'Section', 'Email']} />
                        {userData.map((detail, index) => (
                            <Link to={`/Sub-Admin/Result/${detail.email}`} key={index}>
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
                    </div>
                )
                }

            </div>
        </>
    )
}

export default ReportCardSubAdmin











