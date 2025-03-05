import React, { useState, useEffect, useContext } from 'react';
import TimetableHeader from './../timetableHeader';
import TimetableRow from './Timetablerow';
import axios from 'axios';
import AuthContext from '../../../../Context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../../../Config';
import { motion } from 'framer-motion';
import { useTimetableContext } from '../TimetableContext';

export default function UploadTimetable({ handleChange }) {
    const days = ["monday", 'tuesday', 'wednesday', 'thursday', "friday", 'saturday'];
    const [sectionsDetails, setSectionsDetails] = useState([]);
    const subjects = ["Hindi", "English", "Mathematics", "Science", "Social Science", "Drawing", "Computer", "Sanskrit", "Physics", "Chemistry", "Economics", "Business", "Accounts"];
    const { authState } = useContext(AuthContext);
    const { setClass, structureDetails } = useTimetableContext();


    const [schedule, setSchedule] = useState(() => {
        let initialSchedule = {};

        days.forEach((day) => {
            initialSchedule[day] = structureDetails.lectureStructure.map((lecture) => ({
                subject: '',
                teacher: '',
                lectureNo: lecture.lectureNo,
                merge: false,
                mergeWithSection: ''
            }));
        });

        return initialSchedule;
    });


    const [rowState, setRowState] = useState(null);


    useEffect(() => {

        let initialSchedule = {};

        days.forEach((day) => {
            initialSchedule[day] = structureDetails.lectureStructure.map((lecture) => ({
                subject: '',
                teacher: '',
                lectureNo: lecture.lectureNo,
                merge: false,
                mergeWithSection: ''
            }));
        });

        setSchedule(initialSchedule);

    }, [structureDetails])

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSection] = useState('');

    const fetchSections = async (selectedClass) => {
        try {
            const response = await axios.post(`${BASE_URL}/classTeacher/fetch/sections`, {
                accessToken: authState.accessToken,
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
            handleChange(0, e);
            fetchSections(selectedClass);
            setClass(selectedClass);
        }
    }, [selectedClass]);

    useEffect(() => {
        if (selectedSection !== "") {
            const e = { target: { name: "section", value: selectedSection } };
            handleChange(0, e);
        }
    }, [selectedSection]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedClass || !selectedSection) {
            toast.error("Please ensure class, section, and day are selected.");
            return;
        }

        const timetableData = {
            accessToken: authState.accessToken,
            class: selectedClass,
            section: selectedSection,
            schedule: schedule
        };

        try {
            const response = await axios.post(`${BASE_URL}/timetable/upload`, timetableData);
            if (response.status === 200) {
                toast.success('Timetable uploaded successfully');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to upload timetable';
            toast.error(errorMessage);
        }
    };


    const fetchTimeTable = async () => {
        try {
            var response = await axios.post(`${BASE_URL}/timetable/fetch/student`,
                { class: selectedClass, section: selectedSection },
                {
                    headers: {
                        'Authorization': `Bearer ${authState?.accessToken}`  // Safe access
                    }
                }
            );
            // console.log("Timetable Data:", response.data);
            if (response.status === 200 && response.data) {
                var rowState = {};
                for (const day of Object.keys(response.data)) {
                    rowState[day] = {};
                    for (const lecture of response.data[day]) {
                        console.log(lecture, day);
                        // const remark = await fetchTeacherAvailability(lecture.lectureNo, lecture.teacher._id, day)
                        rowState[day][`${lecture.lectureNo}`] = { teacherInput: lecture.teacher.name, suggestions: [], showSuggestions: false, remark: 'Good to go' };
                    }
                };

                setSchedule(response.data);
                setRowState(rowState);
                console.log(rowState, "cjecsudghilau");
            }
        } catch (error) {
            console.error("Error fetching timetable:", error.response?.data || error.message);
            setRowState({});
            let initialSchedule = {};

            days.forEach((day) => {
                initialSchedule[day] = structureDetails.lectureStructure.map((lecture) => ({
                    subject: '',
                    teacher: '',
                    lectureNo: lecture.lectureNo,
                    merge: false,
                    mergeWithSection: ''
                }));
            });
            setSchedule(initialSchedule);

        }


    }

    useEffect(() => {
        if (selectedClass && selectedSection) fetchTimeTable();
    }, [selectedClass, selectedSection])

    const fetchTeacherAvailability = async (lecture, email, day) => {
        if (!lecture || !email || !day) return "Incomplete information";

        try {
            const response = await axios.get(`${BASE_URL}/timetable/fetch/checkAvailability`, {
                params: { lecture, day, email },
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`,
                    'Content-Type': 'application/json',
                }
            });
            return response.data.remark;
        } catch (error) {
            console.error('Availability check failed:', error);
            return "Availability unknown";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full "
        >
            <form onSubmit={handleSubmit} className='w-full  '>
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

                <div className='border rounded-md  max-w-[1080p] overflow-auto dark:border-dark-300'>
                    <table className=' border-collapse'>
                        <TimetableHeader fields={structureDetails.lectureStructure} numberOfLecturesBeforeLunch={structureDetails.numberOfLeacturesBeforeLunch} />
                        <tbody>
                            {days.map((day, index) => (
                                <TimetableRow
                                    key={index}
                                    schedule={schedule[day]}
                                    lectureStructure={structureDetails.lectureStructure}
                                    numberOfLeacturesBeforeLunch={structureDetails.numberOfLeacturesBeforeLunch}
                                    subjects={subjects}
                                    handleSchedule={setSchedule}
                                    sections={sectionsDetails}
                                    selectedSection={selectedSection}
                                    day={day}
                                    fetchTeacherAvailability={fetchTeacherAvailability}
                                    rowStateWeek={rowState?.[day] || ""}

                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Upload
                    </motion.button>
                </div>
            </form>
        </motion.div>
    )
}