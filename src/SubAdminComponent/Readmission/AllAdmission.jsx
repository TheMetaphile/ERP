import { useState, useContext, useEffect, useRef } from "react";
import Header from './utils/Header';
import SearchBar from "./utils/SearchBar";
import StudentDetailTile from "./utils/AdmissionTile";
import axios from 'axios';
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_Login } from "../../Config";
import { ToastContainer } from "react-toastify";

export default function AllAdmission() {
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

    console.log(authState.accessToken, 'aa')
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
    const Class = "10th"

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
            console.log(err);
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

    const handleRemove = (student) => {
        setUserData((prev) => prev.filter(user => user.email !== student.email));
    };

    console.log("********************************", typeof (handleRemove));

    return (
        <>
            <div className="flex pt-4 items-center bg-white mb-4 px-2 ">
                <ToastContainer />
                <div className=" flex mobile:max-tablet:justify-between items-center w-full">
                    <h1 className="text-2xl mobile:max-tablet:-ml mobile:max-tablet:text-xl font-medium ">Students Re-admission</h1>
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
                                    // handleClassChange={handleClassChange}
                                    handleSectionChange={handleSectionChange}
                                    handlebothEventsCalled={handlebothEventsCalled}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="h-fit w-full items-start mb-3 px-2 ">
                {/* Original SearchBar for non-mobile screens */}
                <div className="w-full tablet:block hidden my-2">
                    <SearchBar
                        rollNumber={rollNumber}
                        name={name}
                        Class={Class}
                        Section={Section}
                        handleRollNumberChange={handleRollNumberChange}
                        handleNameChange={handleNameChange}
                        // handleClassChange={handleClassChange}
                        handleSectionChange={handleSectionChange}
                        handlebothEventsCalled={handlebothEventsCalled}
                    />
                </div>


                <div className="mobile:max-laptop:overflow-y-auto">
                    <div className="rounded-lg shadow-md border h-screen text-center border-black w-full mobile:max-tablet:w-fit overflow-auto whitespace-nowrap" ref={containerRef} onScroll={handleScroll}>
                        <div className="stutable">
                            <Header headings={['Name', 'Class', 'Section', 'Phone No.', 'E-mail', 'Action']} />
                        </div>
                        {loading && userData.length < 1 ? (
                            <Loading />
                        ) : Array.isArray(filteredStudents) && filteredStudents.length === 0 ? (
                            <div>No students found</div>
                        ) : Array.isArray(filteredStudents) ? (
                            <StudentDetailTile userData={filteredStudents} handleRemove={handleRemove} />
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
