import React, { useState, useContext, useEffect } from 'react'
import Selection from './utils/Selection'
import Table from './utils/Table'
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import TableStudent from './utils/TableStudent';
import SelectionTeacher from './utils/SelectionTeacher';
import Loading from '../../LoadingScreen/Loading'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TimeTable() {

    const [selectClass, setClass] = useState('3rd')
    const [selectedSection, setSection] = useState('C');
    const [data, setData] = useState(null);
    const { authState } = useContext(AuthContext);
    const [role, setRole] = useState('Teacher');
    const [teacherEmail, setTeacherEmail] = useState('bhanu68tyagi@gmail.com');
    const [dayStudent, setDayStudent] = useState('tuesday');
    const [day, setDay] = useState('tuesday');
    const [loading, setLoading] = useState(false);
    const [fetchedTimeTableStructure, setTimetableStructure] = useState(null);
    const [lectureTimes, setLectureTimes] = useState([]);
    const [error, setError] = useState(null);
    var ClassRange = null;
    const Class = selectClass;

    useEffect(() => {
        if (Class === 'Pre-Nursery' || Class === 'L.K.G' || Class === 'U.K.G' || Class === 'U.K.J') {
            if (ClassRange != 'Pre-Nursery - U.K.J') {
                ClassRange = 'Pre-Nursery - U.K.J'
            }

        } else {
            if (ClassRange != '1st-12th') {
                ClassRange = '1st-12th'
            }
        }
    }, [Class]);

    useEffect(() => {
        if (!loading) {
            setLoading(true);
            handleTimeFetch();
        }
    }, [ClassRange]);

    const calculateLectureTimes = () => {
        if (!fetchedTimeTableStructure) {
            return;
        }
        const { firstLectureTiming, durationOfEachLeacture, numberOfLeacturesBeforeLunch, durationOfLunch, numberOfLecture } = fetchedTimeTableStructure;

        const times = [];
        let currentTime = convertToDate(firstLectureTiming);
        const lectureDuration = parseInt(durationOfEachLeacture.split(' ')[0], 10);
        const lunchDuration = parseInt(durationOfLunch.split(' ')[0], 10);

        for (let i = 1; i <= numberOfLecture; i++) {
            const endTime = new Date(currentTime.getTime() + lectureDuration * 60000);
            times.push({ start: new Date(currentTime), end: new Date(endTime) });

            currentTime = endTime;
            if (i === numberOfLeacturesBeforeLunch) {
                currentTime = new Date(currentTime.getTime() + lunchDuration * 60000);
            }
        }
        setLectureTimes(times);
        setLoading(false)

    };

    const convertToDate = (timeString) => {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '0';
        }
        if (modifier === 'pm') {
            hours = parseInt(hours, 10) + 12;
        }
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);

        return date;
    };


    useEffect(() => {
        if(fetchedTimeTableStructure!=null){
            calculateLectureTimes();
        }
    }, [fetchedTimeTableStructure,role]);




    const handleTimeFetch = async () => {
        console.log(authState.accessToken)
        console.log('classaaa', ClassRange)
        try {
            const response = await axios.post('https://timetablestructureapi.onrender.com/timeTableStructure/fetch', {
                accessToken: authState.accessToken,
                classRange: ClassRange,
            });

            if (response.status === 200) {
                console.log('response from fetch', response.data);
                if (response.data) {
                    console.log("here", response.data.numberOfLecture);
                    const scheduleArray = [];
                    for (let i = 0; i < response.data.numberOfLecture; i++) {
                        scheduleArray.push({
                            subject: '',
                            teacher: ''
                        });
                    }
                    setTimetableStructure(response.data);
                    console.log('ressssss', response.data)
                } else {
                    // setLoading(false)
                    //     // setShowTimetable(false);
                }
            }
        } catch (err) {
            console.error(err);

        }

    }


    useEffect(() => {
        if (fetchedTimeTableStructure != null) {
            var time = new Date()
            console.log(time)
            handleSearch();
        }
    }, [fetchedTimeTableStructure, role]);

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleClass = (value) => {
        setClass(value);
    }
    const handleSection = (value) => {
        setSection(value);
    }

    const handleEmailChange = (value) => {
        setTeacherEmail(value);
    };

    const handleDayChange = (value) => {
        setDay(value);
    };

    const handleStudentDayChange = (value) => {
        setDayStudent(value);
    };
    const handleSearch = async () => {
        if ((selectClass && selectedSection) || (teacherEmail && day)) {
            console.log(selectClass, selectedSection);
            console.log(teacherEmail, day)
         
            try {
                const url = role === 'Teacher' ? 'https://timetableapi-1wfp.onrender.com/timetable/fetch/teacher' : 'https://timetableapi-1wfp.onrender.com/timetable/fetch/student';
                const payload = {
                    accessToken: authState.accessToken,
                    class: selectClass,
                    section: selectedSection,
                    day: dayStudent
                };
                if (role === 'Teacher') {
                    payload.email = teacherEmail;
                    payload.day = day;
                }
                const response = await axios.post(url, payload);
                if (response.status === 200) {
                    console.log('response from fetchh', response.data);
                    setData(response.data);
                }
            } catch (error) {
                toast.error(error.response.data.error)
                console.error('Error fetching dataaaa:', error.response.data.error);
            }
            
        }
    };

    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            {/* <ToastContainer /> */}
            <div className='flex justify-between items-center w-full'>
                <h1 className='text-2xl'>Time Table</h1>
                <div className="flex gap-4 px-3 py-2  mt-2 text-lg justify-between">
                    <label className="text-lg font-medium text-center">
                        <input
                            type="radio"
                            name="role"
                            value="Teacher"
                            checked={role === "Teacher"}
                            onChange={handleRoleChange}
                            className="mr-3 w-4 h-4"

                        />
                        Teacher
                    </label>

                    <label className="text-lg font-medium text-center">
                        <input
                            type="radio"
                            name="role"
                            value="Student"
                            checked={role === "Student"}
                            onChange={handleRoleChange}
                            className="mr-3 w-4 h-4"

                        />
                        Student
                    </label>
                </div>

            </div>

            <div className=' mt-4  w-full'>
                {role === 'Teacher' ? (
                    <SelectionTeacher
                        onSearch={handleSearch}
                        onEmailChange={handleEmailChange}
                        onDayChange={handleDayChange}
                    />
                ) : (
                    <Selection
                        selectClass={selectClass}
                        selectedSection={selectedSection}
                        dayStudent={dayStudent}
                        onClassChange={handleClass}
                        onSectionChange={handleSection}
                        onStudentDayChange={handleStudentDayChange}
                        onSearch={handleSearch}
                    />
                )}
            </div>

            <div className=' mt-4 w-full rounded-lg border shadow-md '>
                {

                    !loading ?
                        (
                            fetchedTimeTableStructure ?

                                role === 'Teacher' ?
                                    <Table data={data} teacherEmail={teacherEmail} Time={lectureTimes} numberOfLeacturesBeforeLunch={fetchedTimeTableStructure.numberOfLeacturesBeforeLunch} />
                                    :
                                    <TableStudent data={data} selectClass={selectClass} selectedSection={selectedSection} dayStudent={dayStudent} Time={lectureTimes} numberOfLeacturesBeforeLunch={fetchedTimeTableStructure.numberOfLeacturesBeforeLunch} />
                                :
                                <div className='py-2 text-center '>
                                    No Timetable found please upload one.
                                    <Link
                                        to="/Admin-Dashboard/timetablestructure"
                                        className="px-4 py-1 ml-5 rounded-md mr-2 bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                                    >
                                        Upload
                                    </Link>
                                </div>

                        )
                        :
                        (
                            <Loading />
                        )
                }
            </div>

        </div>

    )
}

export default TimeTable