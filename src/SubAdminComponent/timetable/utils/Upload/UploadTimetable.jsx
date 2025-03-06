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
import { FaSpinner } from 'react-icons/fa';

export default function UploadTimetable({ handleChange }) {
    const days = ["monday", 'tuesday', 'wednesday', 'thursday', "friday", 'saturday'];
    const [sectionsDetails, setSectionsDetails] = useState([]);
    const subjects = ["Hindi", "English", "Mathematics", "Science", "Social Science", "Drawing", "Computer", "Sanskrit", "Physics", "Chemistry", "Economics", "Business", "Accounts"];
    const { authState, darkMode } = useContext(AuthContext);
    const { setClass, structureDetails } = useTimetableContext();
    const [isLoading, setIsLoading] = useState(false);

    const [schedule, setSchedule] = useState(() => {
        let initialSchedule = {};
        days.forEach((day) => {
            initialSchedule[day] = structureDetails?.lectureStructure?.map((lecture) => ({
                subject: '',
                teacher: '',
                lectureNo: lecture.lectureNo,
                optional: false,
                optionalSubjects: [],
            }));
        });
        return initialSchedule;
    });

    const [rowState, setRowState] = useState(null);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSection] = useState('');

    useEffect(() => {
        let initialSchedule = {};
        days.forEach((day) => {
            initialSchedule[day] = structureDetails?.lectureStructure?.map((lecture) => ({
                subject: '',
                teacher: '',
                lectureNo: lecture.lectureNo,
                optional: false,
                optionalSubjects: [],
            }));
        });
        setSchedule(initialSchedule);
    }, [structureDetails]);

    const fetchSections = async (selectedClass) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/classTeacher/fetch/sections`, {
                accessToken: authState.accessToken,
                class: selectedClass,
            });
            const sectionsDetail = response.data.sections.map(sectionObj => sectionObj.section);
            setSectionsDetails(sectionsDetail);
        } catch (error) {
            toast.error("Error fetching sections: " + error.message);
        } finally {
            setIsLoading(false);
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
        setIsLoading(true);
        try {
            if (!selectedClass || !selectedSection) {
                toast.error("Please ensure class and section are selected.");
                setIsLoading(false);
                return;
            }
            const timetable = structuredClone(schedule);


            console.log("upload", timetable);

            for (const day of Object.keys(timetable)) {
                for (const lecture of timetable[day]) {
                    lecture.teacher = typeof lecture.teacher === 'object' ? lecture.teacher._id : lecture.teacher;
                    if (lecture.optional && lecture.optionalSubjects.length > 0) {
                        for (const optional of lecture.optionalSubjects) {
                            optional.teacher = optional?.teacher?._id;
                        }
                    }
                }
            }



            const timetableData = {
                accessToken: authState.accessToken,
                class: selectedClass,
                section: selectedSection,
                schedule: timetable
            };


            const response = await axios.post(`${BASE_URL}/timetable/upload`, timetableData);
            if (response.status === 200) {
                toast.success('Timetable uploaded successfully');
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.error || 'Failed to upload timetable';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTimeTable = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                `${BASE_URL}/timetable/fetch/student`,
                { class: selectedClass, section: selectedSection },
                {
                    headers: {
                        'Authorization': `Bearer ${authState?.accessToken}`
                    }
                }
            );

            if (response.status === 200 && response.data) {
                let rowState = {};
                for (const day of Object.keys(response.data)) {
                    rowState[day] = {};
                    for (const lecture of response.data[day]) {
                        rowState[day][`${lecture.lectureNo}`] = {
                            teacherInput: lecture.teacher.name,
                            suggestions: [],
                            showSuggestions: false,
                            remark: 'Good to go'
                        };
                    }
                }
                console.log("upload", response.data);

                setSchedule(response.data);
                setRowState(rowState);
            }
        } catch (error) {
            toast.error("Error fetching timetable: " + error.message);
            setRowState({});
            let initialSchedule = {};
            days.forEach((day) => {
                initialSchedule[day] = structureDetails.lectureStructure.map((lecture) => ({
                    subject: '',
                    teacher: '',
                    lectureNo: lecture.lectureNo,
                    optional: false,
                    optionalSubjects: [],
                }));
            });
            setSchedule(initialSchedule);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedClass && selectedSection) fetchTimeTable();
    }, [selectedClass, selectedSection]);

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
            className={`w-full ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
        >
            <form onSubmit={handleSubmit} className='w-full'>
                <div className="grid grid-cols-2 gap-4 mb-4 mt-4">
                    <div>
                        <label className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Class
                        </label>
                        <select
                            className={`w-full border p-2 rounded-md ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                : 'bg-white border-gray-300'
                                }`}
                            name="Class"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            required
                            disabled={isLoading}
                        >
                            <option value="" disabled>Select Class</option>
                            {['Pre-Nursery', 'L.K.G', 'U.K.G', 'U.K.J', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map((cls) => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Section
                        </label>
                        <select
                            className={`w-full border p-2 rounded-md ${darkMode
                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                : 'bg-white border-gray-300'
                                }`}
                            name="section"
                            value={selectedSection}
                            onChange={(e) => setSection(e.target.value)}
                            required
                            disabled={isLoading}
                        >
                            <option value="">Select Section</option>
                            {sectionsDetails.map((section, index) => (
                                <option key={index} value={section}>{section}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={`border rounded-md overflow-auto ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <table className='w-full border-collapse'>
                        <TimetableHeader
                            fields={structureDetails.lectureStructure}
                            numberOfLecturesBeforeLunch={structureDetails.numberOfLeacturesBeforeLunch}
                            darkMode={darkMode}
                        />
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
                                    darkMode={darkMode}
                                    isLoading={isLoading}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-6 py-2 rounded-md font-bold ${darkMode
                            ? 'bg-purple-600 hover:bg-purple-700 text-white'
                            : 'bg-purple-500 hover:bg-purple-600 text-white'
                            } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading && <FaSpinner className="animate-spin" />}
                        {isLoading ? 'Uploading...' : 'Upload'}
                    </motion.button>
                </div>

            </form>

        </motion.div>
    );
}