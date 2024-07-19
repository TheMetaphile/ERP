import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import AuthContext from "../../Context/AuthContext";
import axios from "axios";
import Switch from "./utils/switch";
import { toast, ToastContainer } from "react-toastify";
import Loading from '../../LoadingScreen/Loading';
import { BASE_URL_Fee } from "../../Config";

const Status = () => {
    const { id } = useParams();
    const { authState } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [subject, setSubject] = useState('Maths');
    const subjects = ['Maths', 'Science', 'History', 'English', 'Geography'];

    const handleSubjectChange = (e) => {
        const selectedSubject = e.target.value;
        setSubject(selectedSubject);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_Fee}/notebook/fetch/student?subject=${subject}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                });
                console.log('fetch', response.data);
                setData(response.data.notebookRecord);
            } catch (error) {
                console.error("Error fetching notice:", error);
            }
            finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [authState.accessToken,subject]);


    return (
        <div className=" items-center  px-4 py-1 mb-2">
            <ToastContainer />
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-medium my-3">Checked Notebooks</h1>
                <select
                    id="subject"
                    value={subject}
                    onChange={handleSubjectChange}
                    className="mt-1 border block py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
            </div>
            {loading ? (
                <Loading />
            ) : data.length === 0 ? (
                <div className="w-full text-center">No data available</div>
            ) : (
                <div className="w-full overflow-x-auto rounded-lg">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-secondary text-gray-600 text-lg leading-normal">

                                <th className="py-2 px-6 text-center">Notebook Checked By</th>
                                <th className="py-2 px-6 text-center">Date</th>
                                <th className="py-2 px-6 text-center">Chapter</th>
                                <th className="py-2 px-6 text-center ">Topic</th>
                                <th className="py-2 px-6 text-center rounded-t-l">Checked</th>

                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-md font-normal ">
                            {data.map((Student, index) => (

                                <tr key={index} className="border-b border-gray-200  last:border-none">

                                    <td className="flex py-3 px-6 text-center justify-center items-center gap-2"><img src={Student.by.profileLink} alt="img" className="rounded-full h-10 w-10" />{Student.by.name}</td>
                                    <td className="py-3 px-6 text-center">{Student.date}</td>
                                    <td className="py-3 px-6 text-center">{Student.chapter}</td>
                                    <td className="py-3 px-6 text-center">{Student.topic}</td>
                                    <td className="flex py-3 px-6 justify-center">
                                        <Switch checked={Student.status} />
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            )}


        </div>
    );
};

export default Status;
