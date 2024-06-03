import React, { useEffect, useState, useContext } from "react";
import NewExam from "./NewExam";
import axios from 'axios'
import AuthContext from "../../../Context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../../LoadingScreen/Loading";

export default function AllExam() {
    const [exams, setExams] = useState([]);
    const [error, setError] = useState(null);
    const [popUp, setPopUp] = useState(false);
    const { authState } = useContext(AuthContext);


    const togglePopUp = () => {
        setPopUp(!popUp);
    };
    const addExam = (newExam) => {
        setExams([...exams, newExam]);
        togglePopUp();
    };
    const deleteExam =async (index) => {
        const examToDelete=exams[index];
        try{
            const response=await axios.delete('https://examapi-jep8.onrender.com/deleteExam',{
                data: {
                accessToken:authState.accessToken,
                _id: examToDelete._id
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
            const response = await axios.post('https://examapi-jep8.onrender.com/fetchExams', {
                accessToken: authState.accessToken
            });
            console.log("API response exam:", response.data);
            if (response.data && response.data.Exams) {
                setExams(response.data.Exams);
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
                        required
                    >
                        <option value="">Select a Class</option>
                        <option value="Math">1st</option>
                        <option value="Science">2nd</option>
                        <option value="History">3rd</option>

                    </select>
                </div>
                <div><button className="rounded-lg border bg-blue-400 px-4 text-xl hover:bg-blue-200" onClick={togglePopUp}>Schedule New Exam</button></div>
            </div>
            {/* {error && <p className="text-red-500 mx-4">{error}</p>} */}
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
                            {exams && exams.length > 0 ? (
                                exams.map((exam, index) => (
                                    <tr key={exam._id?exam._id:index}>
                                        <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.Class}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.subject}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.time}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.date}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.duration}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                            <button onClick={() => deleteExam(index)} className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-2 text-center text-lg"><Loading /></td>
                                </tr>
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