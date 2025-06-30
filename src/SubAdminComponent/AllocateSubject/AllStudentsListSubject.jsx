import { useState, useContext, useEffect, useRef } from "react";
import Header from './utils/Header';
import SearchBar from "./utils/SearchBar";
import StudentDetailTile from "./utils/StudentDetailTile";
import axios from 'axios';
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL } from "../../Config";
import { ToastContainer, toast } from "react-toastify";
import { refreshAccessToken } from "../../RefreshTokenHelper";

export default function AllStudentsListSubject() {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [start, setStart] = useState(0);
    const end = 9;
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

    const [Class, setClass] = useState('');
    const handleClassChange = (event) => {
        setStart(0);
        setUserData([]);
        setAllDataFetched(false);
        setClass(event.target.value);
    };

    const [Section, setSection] = useState('');
    const handleSectionChange = (event) => {
        setStart(0);
        setUserData([]);
        setAllDataFetched(false);
        setSection(event.target.value);
    };

    const [bothEventsCalled, setBothEventsCalled] = useState(false);
    const handlebothEventsCalled = (event) => {
        setBothEventsCalled(true);
    };

    useEffect(() => {
        if (bothEventsCalled) {
            console.log(Class);
            console.log(Section);
            setBothEventsCalled(false);
        }
    }, [Class, Section, bothEventsCalled]);

    useEffect(() => {
        if (authState?.accessToken) {
            fetchUserData();
        }
    }, [authState?.accessToken, Class, Section]);

    useEffect(() => {
        if (start !== 0) {
            fetchUserData();
        }
    }, [start, Class, Section]);

    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !allDataFetched && !loading) {
                    console.log("Fetching more data...");
                    handleViewMore();
                }
            },
            { root: null, rootMargin: '0px', threshold: 1.0 }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, [allDataFetched, loading]);

    const fetchUserData = async () => {
        if (loading || allDataFetched) return;
        setLoading(true);
        try {
            console.log(start, "-", end);
            const response = await axios.post(`${BASE_URL}/allocateSubject/fetch/list/student`, {
                accessToken: authState?.accessToken,
                currentClass: Class,
                section: Section,
                end: end,
                start: start
            });

            const list = response.data.Students.length;
            console.log("API response:", response.data.Students);
            if (list < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setUserData(prevData => [...prevData, ...response.data.Students]);

        } catch (err) {
            console.log(err);
            if (
                err.response &&
                err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchUserData();
                } catch (refreshError) {
                }
            } else {
                toast.error(err.response?.data?.error || "An error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = userData.filter(student => {
        return (
            student.currentClass.toLowerCase().includes(Class.toLowerCase()) &&
            student.section.toLowerCase().includes(Section.toLowerCase())
        );
    });
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    return (
        <>
            <div className={`flex pt-3 items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} mb-3 px-2 transition-colors duration-300`}>
                <ToastContainer theme={darkMode ? 'dark' : 'light'} />
                <div className="flex mobile:max-tablet:justify-between w-full items-center">
                    <h1 className="text-2xl mobile:max-tablet:text-lg font-medium px-2">Optional Subject Allocate</h1>
                    <div className="block tablet:hidden">
                        <button
                            className={`p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                            onClick={() => setDropdownVisible(!isDropdownVisible)}
                        >
                            Filter
                        </button>
                        {isDropdownVisible && (
                            <div className={`absolute ${darkMode ? 'bg-gray-800 shadow-dark' : 'bg-white shadow-lg'} px-2 rounded mt-2 right-2 left-2 z-20 justify-center flex tablet:w-4/6 py-2`}>
                                <SearchBar
                                    Class={Class}
                                    Section={Section}
                                    handleClassChange={handleClassChange}
                                    handleSectionChange={handleSectionChange}
                                    handlebothEventsCalled={handlebothEventsCalled}
                                    darkMode={darkMode}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={`h-fit w-full items-start mb-3 px-2 ${darkMode ? 'text-white' : ''}`}>
                <div className="w-full tablet:block hidden my-2">
                    <SearchBar
                        Class={Class}
                        Section={Section}
                        handleClassChange={handleClassChange}
                        handleSectionChange={handleSectionChange}
                        handlebothEventsCalled={handlebothEventsCalled}
                        darkMode={darkMode}
                    />
                </div>

                <div className="mobile:max-laptop:overflow-y-auto">
                    <div className={`rounded-lg shadow-md border h-screen text-center ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-black bg-white'} w-full mobile:max-tablet:w-fit overflow-auto whitespace-nowrap transition-colors duration-300`}>
                        <div className="stutable">
                            <Header headings={['Name', 'Class', 'Section', 'Phone No.', 'E-mail', 'Action']} darkMode={darkMode} />
                        </div>
                        {loading && userData.length === 0 ? (
                            <Loading />
                        ) : Array.isArray(filteredStudents) && filteredStudents.length === 0 ? (
                            <div className={`p-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>No students found</div>
                        ) : (
                            <div>
                                <StudentDetailTile userData={filteredStudents} darkMode={darkMode} />
                                <div ref={sentinelRef} className="h-10"></div>
                                {loading && start > 0 && (
                                    <div className={`text-center w-full ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Loading more...</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}