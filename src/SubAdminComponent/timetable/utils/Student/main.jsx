import React, { useState, useContext, useEffect } from 'react';
import Selection from './../Selection';
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import TableStudent from './../TableStudent';
import Loading from '../../../../LoadingScreen/Loading';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../../../Config';
import { useTimetableContext } from '../TimetableContext';

function StudentsTimeTableSubAdmin() {
    const { structureDetails, selectClass, setClass, dayStudent, setDayStudent } = useTimetableContext();
    const [data, setData] = useState(null);
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [lectureTimes, setLectureTimes] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSection] = useState('');
    const [sectionsDetails, setSectionsDetails] = useState([]);

    const fetchSections = async (selectedClass) => {
        try {
            const response = await axios.post(`${BASE_URL}/classTeacher/fetch/sections`, {
                accessToken: authState?.accessToken,
                class: selectedClass,
            });

            const sectionsDetail = response.data.sections.map(sectionObj => sectionObj.section);
            setSectionsDetails(sectionsDetail);
        } catch (error) {
            console.error("Error while fetching section:", error);
        }
    };

    useEffect(() => {
        if (selectedClass !== "") {
            const e = { target: { name: "Class", value: selectedClass } };

            fetchSections(selectedClass);
            setClass(selectedClass);
        }
    }, [selectedClass]);

    useEffect(() => {
        if (selectedSection !== "") {
            const e = { target: { name: "section", value: selectedSection } };

        }
    }, [selectedSection]);

    const calculateLectureTimes = () => {
        if (!structureDetails) return;

        const { firstLectureTiming, durationOfEachLeacture, numberOfLecturesBeforeLunch, durationOfLunch, numberOfLecture } = structureDetails;

        // Check if durationOfEachLecture and durationOfLunch are defined and are strings
        console.log(structureDetails);


        const times = [];
        let currentTime = convertToDate(firstLectureTiming);
        // const lectureDuration = parseInt(durationOfEachLeacture.split(' ')[0], 10);
        // const lunchDuration = parseInt(durationOfLunch.split(' ')[0], 10);

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


    // useEffect(() => {
    //     if (structureDetails) calculateLectureTimes();
    // }, [structureDetails]);

    useEffect(() => {
        if (structureDetails) {
            handleSearch();
            setData([]);
        }
    }, [structureDetails, selectedClass, dayStudent, selectedSection]);

    const handleClass = (value) => setSelectedClass(value);
    const handleSection = (value) => setSection(value);
    const handleStudentDayChange = (value) => setDayStudent(value);

    const handleSearch = async () => {
        if (selectedClass && selectedSection) {
            setLoading(true);
            try {
               

                var response = await axios.post(`${BASE_URL}/timetable/fetch/student`,
                    {  
                        class: selectedClass,
                        section: selectedSection,
                        day: dayStudent },
                    {
                        headers: {
                            'Authorization': `Bearer ${authState?.accessToken}`  // Safe access
                        }
                    }
                );

                if (response.status === 200) {
                    setData(response.data);
                }
                console.log(response.data)
            } catch (error) {
                toast.error(error.response.data.error);
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex flex-col w-full mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 mb-3 no-scrollbar mobile:max-tablet:mt-4">
            <div className='mt-4 w-full'>
                {/* <Selection
                    selectClass={selectedClass}
                    selectedSection={selectedSection}
                    dayStudent={dayStudent}
                    onClassChange={handleClass}
                    sectionsDetail={sectionsDetails}
                    onSectionChange={handleSection}
                    onStudentDayChange={handleStudentDayChange}
                    onSearch={handleSearch}
                /> */}
                <div className="grid grid-cols-2 gap-4 mb-4 mt-4">
                    <div>
                        <label className='text-black dark:text-white font-medium'>Class</label>
                        <select
                            className="w-full border p-2 rounded-md dark:bg-dark-100 dark:border-dark-300"
                            name="Class"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Class</option>
                            {['Pre-Nursery', 'L.K.G', 'U.K.G', 'U.K.J', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map((cls) => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className='text-black dark:text-white font-medium'>Section</label>
                        <select
                            type="text"
                            name="section"
                            value={selectedSection}
                            onChange={(e) => setSection(e.target.value)}
                            required
                            className="w-full border p-2 rounded-md dark:bg-dark-100 dark:border-dark-300"
                        >
                            <option value="">Select Section</option>
                            {sectionsDetails.map((section, index) => (
                                <option key={index} value={section}>
                                    {section}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

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
                                to="/Sub-Admin/TimeTable/upload"
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

export default StudentsTimeTableSubAdmin;
