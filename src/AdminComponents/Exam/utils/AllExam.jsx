import React, { useEffect, useState, useContext } from "react";
import NewExam from "./NewExam";
import axios from 'axios'
import AuthContext from "../../../Context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Exam } from "../../../Config";

export default function AllExam() {
    const [exams, setExams] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const { authState } = useContext(AuthContext);
    const [edit, setEdit] = useState(null);
    const [tempExam, setTempExam] = useState({});
    const [selectedClass, setSelectedClass] = useState("");

    const togglePopUp = () => {
        setPopUp(!popUp);
    };
    const addExam = (newExam) => {
        setExams([...exams, newExam]);
        togglePopUp();
    };
    const deleteExam = async (index) => {
        const examToDelete = exams[index];
        try {
            const response = await axios.delete(`${BASE_URL_Exam}/deleteExam`, {
                data: {
                    accessToken: authState.accessToken,
                    examId: examToDelete._id,
                    class: examToDelete.class
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
        try {
            const response = await axios.post(`${BASE_URL_Exam}/fetchExams`, {
                accessToken: authState.accessToken
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
                setExams(flattenedExams);
            } else {
                toast.error('Unexpected response format');
            }

        }
        catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            toast.error(errorMessage);
        }
    }

    useEffect(() => {

        if (authState.accessToken) {
            fetchExam();
        } else {
            toast.error('No access token available');


        }
    }, [authState.accessToken]);


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

    const filteredExams = selectedClass ? exams.filter(exam => exam.class === selectedClass) : exams;

    return (
        <div className="flex flex-col mb-4">
            <ToastContainer />

            <div>
                <h1 className="text-3xl mx-4">All Exam Schedule</h1>
            </div>
            <div className="flex justify-between">
                <div>
                    <select
                        className="mx-4 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                        id="Class"
                        name="Class"
                        value={selectedClass}
                        onChange={handleClassChange}
                        required
                    >
                        <option value="" >Select Class</option>
                        <option value="Pre-Nursery">Pre-Nursery</option>
                        <option value="Nursery">Nursery</option>
                        <option value="L.K.J">L.K.J</option>
                        <option value="U.K.J">U.K.J</option>
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
                <div><button className="rounded-lg border bg-blue-400 px-4 text-xl hover:bg-blue-200" onClick={togglePopUp}>Schedule New Exam</button></div>
            </div>
            <div className="rounded-xl shadow-lg mb-4">
                <div className="overflow-x-auto w-full mt-4 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-600">
                        <thead className="">
                            <tr>
                                <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Class</th>
                                <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Subject</th>
                                <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Time</th>
                                <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Date</th>
                                <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Duration</th>
                                <th className="px-6 py-3 text-center text-xl font-normal bg-secondary">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {filteredExams ? filteredExams.length > 0 ? (
                                filteredExams.map((exam, index) => (
                                    <tr key={exam._id ? exam._id : index}>
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
                                                    <button onClick={() => handleSave(index)} className="text-green-600 hover:text-green-900">Save</button>&nbsp;&nbsp;/ &nbsp;
                                                    <button onClick={handleCancelEdit} className="text-red-600 hover:text-red-900">Cancel</button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.class}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.subject}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.time}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.date}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.duration}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                                    <button onClick={() => deleteExam(index)} className="text-red-600 hover:text-red-900">Delete</button>&nbsp;&nbsp;/ &nbsp;
                                                    <button onClick={() => handleEditClick(index)} className="text-green-600 hover:text-green-900">Edit</button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))
                            ) : <tr>
                                <td colSpan="6" className="px-4 py-2 text-center text-lg"><Loading /></td>
                            </tr> : (
                                <div className="text-center py-2 ">No exam schedule found</div>
                            )}
                        </tbody>
                    </table>
                </div>
                {
                    popUp && (
                        <NewExam onClose={togglePopUp} addExam={addExam} />
                    )
                }
            </div>
        </div>
    )
}