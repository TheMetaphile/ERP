import { useState, useContext, useEffect, useRef } from "react";
import Header from './Header';
import SearchBar from "../utils/SearchBar";
import StudentDetailTile from "../utils/StudentDetailTile";
import axios from 'axios';
import AuthContext from "../../../../Context/AuthContext";
import Loading from '../../../../LoadingScreen/Loading';
import { BASE_URL_Login } from "../../../../Config";

export default function StudentsList() {
    const [name, setName] = useState('');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authState } = useContext(AuthContext);
    const containerRef = useRef(null);
    const [rollNumber, setRollNumber] = useState('');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(20);
    const [loadMore, setLoadMore] = useState(false);

    const handleRollNumberChange = (event) => {
        setStart(0);
        setUserData([]);
        setRollNumber(event.target.value);
    };

    const handleNameChange = (event) => {
        setStart(0);
        setUserData([]);
        setName(event.target.value);
    };

    const [Class, setClass] = useState('');
    const handleClassChange = (event) => {
        setStart(0);
        setUserData([]);
        setClass(event.target.value);
    };

    const [Section, setSection] = useState('');
    const handleSectionChange = (event) => {
        setStart(0);
        setUserData([]);
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

    const fetchUserData = async () => {
        try {
            console.log(start, "-", end);
            const response = await axios.post(`${BASE_URL_Login}/fetchMultiple/student`, {
                accessToken: authState.accessToken,
                currentClass: Class,
                section: Section,
                rollNumber: rollNumber,
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
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authState.accessToken) {
            fetchUserData();
        } else {
            setError('No access token available');
            setLoading(false);
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }, [authState.accessToken, Class, rollNumber, Section, name, start]);

    const filteredStudents = userData.filter(student => {
        return (
            (rollNumber ? student.rollNumber === rollNumber : true) &&
            student.name.toLowerCase().includes(name.toLowerCase()) &&
            student.currentClass.toLowerCase().includes(Class.toLowerCase()) &&
            student.section.toLowerCase().includes(Section.toLowerCase())
        );
    });

    const showAddRollNumberButton = filteredStudents.some(student => !student.rollNumber);

    const handleRollNumber = async () => {
        if (!Class || !Section) {
            setError('Please select a class and section first');
            return;
        }
        try {
            setLoading(true);
            console.log("start");
            const response = await axios.post(`${BASE_URL_Login}/assignRollNumber`, {
                accessToken: authState.accessToken,
                currentClass: Class,
                section: Section
            });
            setStart(0);
            console.log("end");
            // console.log(response.data);
            fetchUserData();
        } catch (err) {
            setError(err.message);
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

    // State to control the dropdown visibility
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    return (
        <>
            <div className="flex tablet:max-laptop:mt-5  mobile:max-tablet:my-3 justify-between items-center mobile:max-tablet:items-baseline mobile:max-tablet:pl-1 mobile:max-tablet:py-2 px-2  mobile:max-tablet:fixed top-34 left-0 right-0 bg-white mb-4">
                <h1 className="text-2xl font-medium px-2 mobile:max-tablet:text-lg ">All Students Data</h1>
                <div className="block tablet:hidden">
                    <button
                        className="p-2 border rounded"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                    >
                        Filter
                    </button>
                    {isDropdownVisible && (
                        <div className="absolute bg-white shadow-lg px-2 rounded mt-2 right-2 left-2 z-20 justify-center flex tablet:w-4/6 py-2">
                            <SearchBar
                                rollNumber={rollNumber}
                                name={name}
                                Class={Class}
                                Section={Section}
                                handleRollNumberChange={handleRollNumberChange}
                                handleNameChange={handleNameChange}
                                handleClassChange={handleClassChange}
                                handleSectionChange={handleSectionChange}
                                handlebothEventsCalled={handlebothEventsCalled}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="h-fit w-full items-start mb-3 px-2">
                {/* Original SearchBar for non-mobile screens */}
                <div className="w-full tablet:block hidden my-2">
                    <SearchBar
                        rollNumber={rollNumber}
                        name={name}
                        Class={Class}
                        Section={Section}
                        handleRollNumberChange={handleRollNumberChange}
                        handleNameChange={handleNameChange}
                        handleClassChange={handleClassChange}
                        handleSectionChange={handleSectionChange}
                        handlebothEventsCalled={handlebothEventsCalled}
                    />
                </div>

                {loading && userData.length > 0 ? <Loading /> : null}
                {(showAddRollNumberButton && Class && Section && !loading) && (
                    <button
                        className=" rounded-lg shadow-md px-3 py-1 mr-2 border-2 border-r-gray-200 text-lg bg-secondary float-right mb-3"
                        onClick={handleRollNumber}
                    >
                        Add Roll Number
                    </button>
                )}
                <div className="mobile:max-laptop:overflow-y-auto">
                    <div className="rounded-lg shadow-md border h-screen text-center border-black w-full mobile:max-tablet:w-fit overflow-auto whitespace-nowrap mobile:max-tablet:mt-20" ref={containerRef} onScroll={handleScroll}>
                        <div className="stutable">
                            <Header headings={['Roll Number', 'Name', 'Class', 'Section', 'Phone No.', 'E-mail']} />
                        </div>
                        {loading && userData.length < 1 ? (
                            <Loading />
                        ) : Array.isArray(filteredStudents) && filteredStudents.length === 0 ? (
                            <div>No students found</div>
                        ) : Array.isArray(filteredStudents) ? (
                            <StudentDetailTile userData={filteredStudents} />
                        ) : (
                            <div>Unexpected data format</div>
                        )}
                        {loadMore && userData.length > 0 ? <Loading /> : null}
                    </div>
                </div>
            </div>
        </>
    );
}
