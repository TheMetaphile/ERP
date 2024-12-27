import React, { useEffect, useState, useContext, useRef } from "react";
import NewExam from "./NewExam";
import axios from 'axios'
import AuthContext from "../../../Context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Exam } from "../../../Config";
import { MdEdit, MdDeleteForever, MdCheck, MdCancel } from "react-icons/md";
import { motion } from 'framer-motion';

export default function AllExam() {
    const [exams, setExams] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const { authState } = useContext(AuthContext);
    const [edit, setEdit] = useState(null);
    const [tempExam, setTempExam] = useState({});
    const [selectedClass, setSelectedClass] = useState("");
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(0);
    const end = 2;
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

    const togglePopUp = () => {
        setPopUp(!popUp);
    };
    const addExam = (newExam) => {
        console.log(newExam.class, selectedClass, newExam, typeof (newExam.class), typeof (selectedClass));

        if (newExam.class === selectedClass) {
            console.log('sadf')
            const schedule = newExam.schedule;
            schedule.forEach(value => { value.class = newExam.class, value.stream = newExam.stream, value.term = newExam.term });

            console.log(schedule, 'flat ')
            setExams([...exams, ...schedule]);
            // console.log([...exams, newExamEntry], 'Added new exam');

        }

        togglePopUp();
    };

    useEffect(() => {
        setStart(0);
        setExams([]);
        setAllDataFetched(false);
        setLoading(false);
    }, [selectedClass]);

    useEffect(() => {
        if (start === 0 && exams.length === 0 && !allDataFetched && !loading) {
            fetchExam();
        }
    }, [start, exams, allDataFetched, loading]);

    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        if (start !== 0) {
            fetchExam();
        }
    }, [start]);

    const deleteExam = async (index) => {
        const examToDelete = exams[index];
        try {
            const response = await axios.delete(`${BASE_URL_Exam}/deleteExam`, {
                data: {
                    accessToken: authState.accessToken,
                    examId: examToDelete._id,
                    class: examToDelete.class,
                    term: examToDelete.term,
                    stream: examToDelete.stream
                }
            })
            if (response.status === 200) {
                const updatedExams = [...exams];
                console.log("Success")
                toast.success('Exam Deleted')
                updatedExams.splice(index, 1);
                setExams(updatedExams);
            } else {
                toast.error('Failed to delete exam');
            }
        }
        catch (error) {
            toast.error(error.error);

        }

    };


    const fetchExam = async () => {
        if (loading || allDataFetched) return;

        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL_Exam}/fetchExams`, {
                accessToken: authState.accessToken,
                start: start,
                end: end,
                class: selectedClass
            });
            console.log("API response exam:", response.data);
            if (response.data && response.data.Exams) {
                const flattenedExams = response.data.Exams.flatMap((exam) =>
                    exam.schedule.map((schedule) => ({
                        ...schedule,
                        class: exam.class,
                        stream: exam.stream,
                        term: exam.term
                    }))
                );


                const data = flattenedExams.length;
                if (data < end) {
                    toast.success('All data fetched');
                    console.log('All data fetched')
                    setAllDataFetched(true);
                }
                setExams(prevData => [...prevData, ...flattenedExams]);
            }
        }
        catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }




    const handleEditClick = (index) => {
        setEdit(index);
        setTempExam(exams[index]);
    };

    const handleCancelEdit = () => {
        setEdit(null);
        setTempExam({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempExam({ ...tempExam, [name]: value });
    };

    const handleSave = async (index) => {
        const examToEdit = tempExam;
        const updateFields = {
            subject: examToEdit.subject,
            time: examToEdit.time,
            date: examToEdit.date,
            duration: examToEdit.duration,
            class: examToEdit.class
        };
        try {
            const response = await axios.put(`${BASE_URL_Exam}/updateExam`, {
                accessToken: authState.accessToken,
                examId: examToEdit._id,
                class: examToEdit.class,
                update: updateFields

            });

            if (response.status === 200) {
                const updatedExams = [...exams];
                updatedExams[index] = tempExam;
                setExams(updatedExams);
                setEdit(null);
                setTempExam({});
                toast.success('Exam Updated');
            } else {
                toast.error('Failed to update exam');
            }
        } catch (error) {
            toast.error(error.error);
        }
    };

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !allDataFetched && !loading) {
                    console.log("Fetching more data...");
                    handleViewMore();
                }
            },
            { root: null, rootMargin: '0px', threshold: 1.0 }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, [allDataFetched, loading]);

    const filteredExams = selectedClass ? exams.filter(exam => exam.class === selectedClass) : exams;

    return (
        <motion.div
            className="flex flex-col mb-4 mobile:max-tablet:mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <ToastContainer />

            <motion.div
                className="flex items-center justify-between mobile:max-tablet:items-start mobile:max-tablet:flex-col"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <h1 className="text-3xl mx-4 mobile:max-tablet:text-xl mobile:max-tablet:mb-2 mobile:max-tablet:mx-1 text-black font-medium">
                    All Exam Schedule
                </h1>
                <motion.div
                    className="flex gap-2 justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div>
                        <select
                            className="mobile:max-tablet:px-0  border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight  mobile:max-tablet:mt-0"
                            id="Class"
                            name="Class"
                            value={selectedClass}
                            onChange={handleClassChange}
                            required
                        >
                            <option value="">Select Class</option>
                            <option value="Pre-Nursery">Pre-Nursery</option>
                            <option value="Nursery">Nursery</option>
                            <option value="L.K.G">L.K.G</option>
                            <option value="U.K.G">U.K.G</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                            <option value="4th">4th</option>
                            <option value="5th">5th</option>
                            <option value="6th">6th</option>
                            <option value="7th">7th</option>
                            <option value="8th">8th</option>
                            <option value="9th">9th</option>
                            <option value="10th">10th</option>
                            <option value="11th">11th</option>
                            <option value="12th">12th</option>
                        </select>
                    </div>
                    <div>
                        <motion.button
                            className="py-2 mobile:max-tablet:text-sm rounded-lg border bg-purple-300 hover:bg-purple-400 px-3  "
                            onClick={togglePopUp}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Schedule New Exam
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className="rounded-xl shadow-lg mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="overflow-x-auto w-full mt-4 rounded-lg">
                    {loading ? (
                        <Loading />
                    ) : (
                        <table className="min-w-full ">
                            <thead className="bg-gradient-to-r from-purple-200 to-purple-100 text-center text-xl font-normal ">
                                <tr>
                                    <th className="px-6 py-3  ">
                                        Class
                                    </th>
                                    <th className="px-6 py-3  ">
                                        Subject
                                    </th>
                                    <th className="px-6 py-3   ">
                                        Time
                                    </th>
                                    <th className="px-6 py-3   ">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 ">
                                        Duration
                                    </th>
                                    <th className="px-6 py-3  ">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {filteredExams.length === 0 ? (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <td
                                            colSpan={6}
                                            className="px-4 py-2 whitespace-nowrap text-lg border-r text-center text-purple-600 font-medium"
                                        >
                                            No Exam Found
                                        </td>
                                    </motion.tr>
                                ) : (
                                    filteredExams.map((exam, index) => (
                                        <motion.tr
                                            key={exam._id ? exam._id : index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                        >
                                            {edit === index ? (
                                                <>
                                                    <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                                        <input
                                                            type="text"
                                                            name="Class"
                                                            value={tempExam.class}
                                                            onChange={handleChange}
                                                            className="border p-1"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                                        <input
                                                            type="text"
                                                            name="subject"
                                                            value={tempExam.subject}
                                                            onChange={handleChange}
                                                            className="border p-1"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                                        <input
                                                            type="text"
                                                            name="time"
                                                            value={tempExam.time}
                                                            onChange={handleChange}
                                                            className="border p-1"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                                        <input
                                                            type="text"
                                                            name="date"
                                                            value={tempExam.date}
                                                            onChange={handleChange}
                                                            className="border p-1"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                                        <input
                                                            type="text"
                                                            name="duration"
                                                            value={tempExam.duration}
                                                            onChange={handleChange}
                                                            className="border p-1"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                                        <div className="flex items-center gap-1 justify-center">
                                                            <motion.button
                                                                className="bg-green-400 hover:bg-green-700  px-3 py-1 rounded-lg shadow-md flex items-center"
                                                                onClick={() => handleSave(index)}
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                <MdCheck className="" />
                                                            </motion.button>
                                                            <motion.button
                                                                className="bg-red-400 hover:bg-red-700  px-3 py-1 rounded-lg shadow-md"
                                                                onClick={handleCancelEdit}
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                <MdCancel className="" />
                                                            </motion.button>
                                                        </div>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                                        {exam.class}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                                        {exam.subject}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                                        {exam.time}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                                        {exam.date}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                                        {exam.duration}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                                        <div className="flex items-center gap-1 justify-center">
                                                            <motion.button
                                                                className="bg-blue-400 hover:bg-blue-700  px-3 py-1 rounded-lg shadow-md flex items-center"
                                                                onClick={() => handleEditClick(index)}
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                <MdEdit className="" />
                                                            </motion.button>
                                                            <motion.button
                                                                className="bg-red-400 hover:bg-red-700  px-3 py-1 rounded-lg shadow-md flex items-center"
                                                                onClick={() => deleteExam(index)}
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                <MdDeleteForever className="" />
                                                            </motion.button>
                                                        </div>
                                                    </td>
                                                </>
                                            )}
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                            <div ref={sentinelRef} className="h-10">
                                {loading && start > 0 && (
                                    <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                                )}
                            </div>
                        </table>
                    )}
                </div>
                {popUp && <NewExam onClose={togglePopUp} addExam={addExam} />}
            </motion.div>
        </motion.div>
    )
}