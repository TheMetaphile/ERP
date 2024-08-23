import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { FaBookOpen, FaClock, FaListOl, FaHourglassHalf, FaUtensils, FaPause } from 'react-icons/fa';

export default function CreateTimetableStrucutre({ handleSubmit, handleChange }) {
    const [selectedClass, setSelectedClass] = useState('');
    useEffect(() => {
        if (selectedClass != "") {
            const e = { target: { name: "Class", value: selectedClass } };
            handleChange(e);
        }
    }, [selectedClass]);

    const [selectLectureNumber, setSelectedLectureNumber] = useState('');
    useEffect(() => {
        if (selectLectureNumber != "") {
            const e = { target: { name: "lecture", value: selectLectureNumber } };
            handleChange(e);
        }
    }, [selectLectureNumber]);

    const [selectStart, setStart] = useState('');
    useEffect(() => {
        if (selectStart != "") {
            const e = { target: { name: "start", value: selectStart } };
            handleChange(e);
        }
    }, [selectStart]);

    const [selectbefore, setbefore] = useState('');
    useEffect(() => {
        if (selectbefore != "") {
            const e = { target: { name: "before", value: selectbefore } };
            handleChange(e);
        }
    }, [selectbefore]);

    const [selectDuration, setDuration] = useState('');
    useEffect(() => {
        if (selectDuration != "") {
            const e = { target: { name: "duration", value: selectDuration } };
            handleChange(e);
        }
    }, [selectDuration]);

    const [selectbreak, setBreak] = useState('');
    useEffect(() => {
        if (selectbreak != "") {
            const e = { target: { name: "break", value: selectbreak } };
            handleChange(e);
        }
    }, [selectbreak]);


    return (
        <motion.form
            onSubmit={handleSubmit}
            className='mt-6 w-full p-6 rounded-lg shadow-lg bg-purple-50 border'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grid grid-cols-1 gap-6 mb-6 rounded-lg">
                <motion.h1
                    className='text-2xl font-bold text-purple-800'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Create Structure
                </motion.h1>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormField icon={FaBookOpen} label="Class Range" isSelect={true}>
                        <select
                            className="w-full border-2 border-purple-300 p-2 rounded-md focus:outline-none focus:border-purple-500 bg-white"
                            name="Class"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Class</option>
                            <option value="Pre-Nursery - U.K.J">Pre-Nursery - U.K.J</option>
                            <option value="1st-12th">1st - 12th</option>
                        </select>
                    </FormField>

                    <FormField icon={FaClock} label="Starting Time">
                        <input
                            type="time"
                            name="start"
                            value={selectStart}
                            onChange={(e) => setStart(e.target.value)}
                            required
                            className="w-full border-2 border-purple-300 p-2 rounded-md focus:outline-none focus:border-purple-500"
                        />
                    </FormField>

                    <FormField icon={FaListOl} label="Number Of Lectures" isSelect={true}>
                        <select
                            name="lecture"
                            value={selectLectureNumber}
                            onChange={(e) => setSelectedLectureNumber(e.target.value)}
                            required
                            className="w-full border-2 border-purple-300 p-2 rounded-md focus:outline-none focus:border-purple-500 bg-white"
                        >
                            <option value="" disabled>Select Lecture</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </FormField>

                    <FormField icon={FaHourglassHalf} label="Lecture Duration" isSelect={true}>
                        <select
                            name="duration"
                            value={selectDuration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                            className="w-full border-2 border-purple-300 p-2 rounded-md focus:outline-none focus:border-purple-500 bg-white"
                        >
                            <option value="" disabled>Select Duration</option>
                            {['30 m', '35 m', '40 m', '45 m', '50 m'].map(duration => (
                                <option key={duration} value={duration}>{duration}</option>
                            ))}
                        </select>
                    </FormField>

                    <FormField icon={FaUtensils} label="No. Of Lectures Before Lunch">
                        <input
                            type="number"
                            name="before"
                            value={selectbefore}
                            onChange={(e) => setbefore(e.target.value)}
                            required
                            className="w-full border-2 border-purple-300 p-2 rounded-md focus:outline-none focus:border-purple-500"
                        />
                    </FormField>

                    <FormField icon={FaPause} label="Duration Of Lunch" isSelect={true}>
                        <select
                            name="break"
                            value={selectbreak}
                            onChange={(e) => setBreak(e.target.value)}
                            required
                            className="w-full border-2 border-purple-300 p-2 rounded-md focus:outline-none focus:border-purple-500 bg-white"
                        >
                            <option value="" disabled>Select Duration</option>
                            {['30 m', '35 m', '40 m', '45 m', '50 m'].map(duration => (
                                <option key={duration} value={duration}>{duration}</option>
                            ))}
                        </select>
                    </FormField>
                </div>
            </div>
            <div className="flex items-center justify-end mt-6">
                <motion.button
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300"
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Create Structure
                </motion.button>
            </div>
        </motion.form>
    )
}

const inputVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
};

const FormField = ({ icon: Icon, label, children, isSelect }) => (
    <motion.div variants={inputVariants} whileHover="hover" whileTap="tap">
        <label className='text-purple-800 font-medium mb-1 block'>{label}</label>
        <div className="relative">
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600" />
            <div className={`pl-10 ${isSelect ? '' : 'pr-3'}`}>
                {children}
            </div>
        </div>
    </motion.div>
);