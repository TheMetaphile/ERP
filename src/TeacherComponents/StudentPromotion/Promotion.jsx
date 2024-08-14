import React, { useState, useEffect, useContext } from 'react'
import Header from './utils/Header'
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from './utils/switch';
import PromotionRow from './utils/PromotionRow';

function Promotion() {
    const [students, setStudents] = useState([])
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const classes = [
        "Pre-Nursery", "Nursery", "L.K.G", "U.K.G",
        "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th",
        "9th", "10th", "11th", "12th"
    ];

    function getNextClass(currentClass) {
        const currentIndex = classes.indexOf(currentClass);
        if (currentIndex === -1 || currentIndex === classes.length - 1) {
            return currentClass;
        }
        return classes[currentIndex + 1];
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

    function getSession() {
        const currentYear = new Date().getFullYear();
        const prevYear = currentYear - 1;
        const session = `${prevYear}-${currentYear.toString().slice(-2)}`;
        return session;
    }

    const session = getSession();

    function getNextSession() {
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        const session = `${currentYear}-${nextYear.toString().slice(-2)}`;
        return session;
    }

    const nextSession = getNextSession();

    const fetchStudents = async () => {
        console.log(session);
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL_Login}/fetchMultiple/student`, {
                accessToken: authState.accessToken,
                currentClass: authState.ClassDetails.class,
                section: authState.ClassDetails.section,
                start: start,
                end: end,
                session: session

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

    const handleSwitchChange = (studentId, checked) => {
        if (checked) {
            setSelectedStudents(prev => ([
                ...prev,
                studentId
            ]));
        }
        else {
            setSelectedStudents(prev => prev.filter(item => item !== studentId));
        }
    };

    const handleSave = async () => {
        const currentClass = authState.ClassDetails.class;
        const nextClass = getNextClass(currentClass);

        const payload = {
            email: selectedStudents,
            nextClass: nextClass,
            nextSection: authState.ClassDetails.section,
            nextSession: nextSession
        };

        console.log(payload)
        try {
            const response = await axios.put(`${BASE_URL_Login}/promote/student?session=${session}&class=${currentClass}&section=${authState.ClassDetails.section}`, payload, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log(response.data);
                setStudents(students.filter((_, i) => i !== index));
                toast.success('Students promoted successfully!');
            }
        } catch (error) {
            console.error("Error saving students:", error);
            toast.error('Failed to promote students.');
        }
    }
    return (
        <div className="overflow-y-auto w-full items-start  px-2 py-1 no-scrollbar">
            <ToastContainer />
            <div className='w-full flex items-center justify-between  my-2'>
                <h1 className="text-2xl mobile:max-tablet:text-lg font-medium mb-2">Promotion</h1>
                <button className="text-xl text-green-500 border border-green-500 px-4  rounded-md shadow-md font-medium mb-2 hover:bg-green-600 hover:text-white hover:border-white" onClick={handleSave}>
                    Save
                </button>
            </div>
            <div className=' overflow-auto'>
                {loading ? (
                    <Loading />
                ) : students.length === 0 ? (
                    <>No student found</>
                ) : (
                    <div className=' rounded-lg shadow-md border border-gray-300 mb-2 overflow-auto'>
                        <Header headings={['Roll No.', 'Name', "Class", "Section", "Action"]} />
                        {students.map((detail, index) => (
                            <PromotionRow
                                key={detail._id}
                                detail={detail}
                                index={index}
                                authState={authState}
                                selectedStudents={selectedStudents}
                                handleSwitchChange={handleSwitchChange}
                            />
                        ))}
                        {!allDataFetched && (
                            <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Promotion

