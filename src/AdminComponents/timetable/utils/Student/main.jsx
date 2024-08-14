import React, { useState, useContext, useEffect } from 'react';
import Selection from './../Selection';
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import TableStudent from './../TableStudent';
import Loading from '../../../../LoadingScreen/Loading';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_TimeTable } from '../../../../Config';
import { useTimetableContext } from '../TimetableContext';

function StudentsTimeTable() {
    const { structureDetails, selectClass, setClass,selectedSection, setSection,dayStudent, setDayStudent } = useTimetableContext();
    const [data, setData] = useState(null);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [lectureTimes, setLectureTimes] = useState([]);

    const calculateLectureTimes = () => {
        if (!structureDetails) return;
    
        const { firstLectureTiming, durationOfEachLeacture, numberOfLecturesBeforeLunch, durationOfLunch, numberOfLecture } = structureDetails;
    
        // Check if durationOfEachLecture and durationOfLunch are defined and are strings
        console.log(structureDetails);

    
        const times = [];
        let currentTime = convertToDate(firstLectureTiming);
        const lectureDuration = parseInt(durationOfEachLeacture.split(' ')[0], 10);
        const lunchDuration = parseInt(durationOfLunch.split(' ')[0], 10);
    
        if (isNaN(lectureDuration) || isNaN(lunchDuration)) {
            console.error('Parsed durations are NaN:', { lectureDuration, lunchDuration });
            return;
        }
    
        for (let i = 1; i <= numberOfLecture; i++) {
            const endTime = new Date(currentTime.getTime() + lectureDuration * 60000);
            times.push({ start: new Date(currentTime), end: new Date(endTime) });
    
            currentTime = endTime;
            if (i === numberOfLecturesBeforeLunch) {
                currentTime = new Date(currentTime.getTime() + lunchDuration * 60000);
            }
        }
        setLectureTimes(times);
        setLoading(false);
    };
    

    const convertToDate = (timeString) => {
        if (!timeString) {
            console.error('timeString is undefined or null:', timeString);
            return new Date();
        }
    
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') hours = '0';
        if (modifier === 'pm') hours = parseInt(hours, 10) + 12;
    
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
    
        return date;
    };
    

    useEffect(() => {
        if (structureDetails) calculateLectureTimes();
    }, [structureDetails]);

    useEffect(() => {
        if (structureDetails) {
            handleSearch();
            setData([]);
        }
    }, [structureDetails, selectClass, dayStudent, selectedSection]);

    const handleClass = (value) => setClass(value);
    const handleSection = (value) => setSection(value);
    const handleStudentDayChange = (value) => setDayStudent(value);

    const handleSearch = async () => {
        if (selectClass && selectedSection) {
            setLoading(true);
            try {
                const url = `${BASE_URL_TimeTable}/timetable/fetch/student`;
                const payload = {
                    accessToken: authState.accessToken,
                    class: selectClass,
                    section: selectedSection,
                    day: dayStudent
                };
                const response = await axios.post(url, payload);
                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (error) {
                toast.error('Error fetching data.');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex flex-col w-full mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 mb-3 no-scrollbar mobile:max-tablet:mt-4">
            <div className='mt-4 w-full mobile:max-tablet:hidden'>
                <Selection
                    selectClass={selectClass}
                    selectedSection={selectedSection}
                    dayStudent={dayStudent}
                    onClassChange={handleClass}
                    onSectionChange={handleSection}
                    onStudentDayChange={handleStudentDayChange}
                    onSearch={handleSearch}
                />
            </div>

            <div className='mt-3 w-full'>
                {!loading ? (
                    structureDetails ? (
                        <TableStudent
                            data={data}
                            selectClass={selectClass}
                            selectedSection={selectedSection}
                            dayStudent={dayStudent}
                            Time={lectureTimes}
                            numberOfLeacturesBeforeLunch={structureDetails.numberOfLeacturesBeforeLunch}
                        />
                    ) : (
                        <div className='py-2 text-center'>
                            No Timetable found. Please upload one.
                            <Link
                                to="/Admin-Dashboard/timetable/upload"
                                className="px-4 py-1 ml-5 rounded-md mr-2 bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                            >
                                Upload
                            </Link>
                        </div>
                    )
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
}

export default StudentsTimeTable;
