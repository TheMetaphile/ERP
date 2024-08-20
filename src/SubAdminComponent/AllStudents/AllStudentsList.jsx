import { useState, useContext, useEffect, useRef } from "react";
import Header from './utils/Header';
import SearchBar from "./utils/SearchBar";
import StudentDetailTile from "./utils/StudentDetailTile";
import axios from 'axios';
import AuthContext from "../../Context/AuthContext";
import Loading from "../../LoadingScreen/Loading";
import { BASE_URL_Login } from "../../Config";
import { ToastContainer, toast } from "react-toastify";

export default function AllStudentsList() {
    const [name, setName] = useState('');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authState } = useContext(AuthContext);
    const [rollNumber, setRollNumber] = useState('');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
    const [allDataFetched, setAllDataFetched] = useState(false);


    const handleRollNumberChange = (event) => {
        setStart(0);
        setRollNumber(event.target.value);
    };

    const handleNameChange = (event) => {
        setStart(0);
        setName(event.target.value);
    };

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
        if (authState.accessToken) {
            fetchUserData();
        }
    }, [authState.accessToken, Class, rollNumber, Section, name]);

    useEffect(() => {
        if (start !== 0) {
            fetchUserData();
        }
    }, [start, Class, rollNumber, Section, name]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

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
        }
    };



    const filteredStudents = userData.filter(student => {
        return (
            (rollNumber ? student.rollNumber === rollNumber : true) &&
            student.name.toLowerCase().includes(name.toLowerCase()) &&
            student.currentClass.toLowerCase().includes(Class.toLowerCase()) &&
            student.section.toLowerCase().includes(Section.toLowerCase())
        );
    });
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    return (
        <>
            <div className="flex pt-3 items-center  bg-white mb-3 px-2">
                <ToastContainer />
                <div className=" flex mobile:max-tablet:justify-between w-full items-center">
                    <h1 className="text-2xl mobile:max-tablet:text-lg font-medium px-2 ">All Students Data</h1>
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
            </div>
            <div className="h-fit w-full items-start mb-3 px-2 ">

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


                <div className="mobile:max-laptop:overflow-y-auto">
                    <div className="rounded-lg shadow-md border h-screen text-center border-black w-full mobile:max-tablet:w-fit overflow-auto whitespace-nowrap">
                        <div className="stutable">
                            <Header headings={['Name', 'Class', 'Section', 'Phone No.', 'E-mail', 'Action']} />
                        </div>
                        {loading && userData.length < 1 ? (
                            <Loading />
                        ) : Array.isArray(filteredStudents) && filteredStudents.length === 0 ? (
                            <div>No students found</div>
                        ) : Array.isArray(filteredStudents) ? (
                            <div className=''>

                                <StudentDetailTile userData={filteredStudents} />
                                {!allDataFetched && (
                                    <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
                                )}
                            </div>

                        ) : (
                            <div>Unexpected data format</div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}
