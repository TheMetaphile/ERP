import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import AuthContext from "../../Context/AuthContext";
import axios from "axios";
import Switch from "./utils/switch";
import { toast, ToastContainer } from "react-toastify";
import Loading from '../../LoadingScreen/Loading';
import { BASE_URL } from "../../Config";
import SubjectSelection from "../classWork/utils/SubjectSelection";

const Status = () => {
    const { id } = useParams();
    const { authState, darkMode } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('Maths');

    const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-black';
    const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';
    const headerBgClass = darkMode 
        ? 'bg-gradient-to-r from-gray-800 to-gray-700' 
        : 'bg-gradient-to-r from-blue-300 to-blue-100';
    const headerTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';

    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/notebook/fetch/student?subject=${selectedSubject}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                    }
                });
                setData(response.data.notebookRecord);
            } catch (error) {
                console.error("Error fetching notice:", error);
            }
            finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [authState?.accessToken, selectedSubject]);

    return (
        <div className={`items-center px-4 py-1 mb-2 ${bgClass}`}>
            <ToastContainer theme={darkMode ? 'dark' : 'light'} />
            <div className="flex items-center justify-between">
                <h1 className={`text-xl mobile:max-tablet:text-lg font-medium my-3 ${textClass}`}>
                    Checked Notebooks
                </h1>
                <SubjectSelection 
                    onSubjectSelect={handleSubjectSelect} 
                    darkMode={darkMode} 
                />
            </div>
            {loading ? (
                <Loading />
            ) : data.length === 0 ? (
                <div className={`w-full text-center ${subTextClass}`}>
                    No data available
                </div>
            ) : (
                <div className="w-full overflow-x-auto rounded-lg mt-4">
                    <table className={`min-w-full ${bgClass} border ${borderClass} rounded-lg`}>
                        <thead>
                            <tr className={`${headerBgClass} ${headerTextClass} text-lg leading-normal`}>
                                <th className="py-2 px-6 text-center whitespace-nowrap">Notebook Checked By</th>
                                <th className="py-2 px-6 text-center">Date</th>
                                <th className="py-2 px-6 text-center">Chapter</th>
                                <th className="py-2 px-6 text-center">Topic</th>
                                <th className="py-2 px-6 text-center rounded-t-l">Checked</th>
                            </tr>
                        </thead>
                        <tbody className={`${subTextClass} text-md font-normal`}>
                            {data.map((Student, index) => (
                                <tr 
                                    key={index} 
                                    className={`
                                        border-b 
                                        ${borderClass} 
                                        last:border-none 
                                        hover:${darkMode ? 'bg-gray-800' : 'bg-gray-50'}
                                    `}
                                >
                                    <td className={`flex py-3 px-6 items-center gap-2 ${textClass}`}>
                                        <img 
                                            src={Student.by.profileLink} 
                                            alt="img" 
                                            className="rounded-full h-10 w-10 border-2 border-indigo-500" 
                                        />
                                        {Student.by.name}
                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">{Student.date}</td>
                                    <td className="py-3 px-6 text-center">{Student.chapter}</td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">{Student.topic}</td>
                                    <td className="flex py-3 px-6 justify-center">
                                        <Switch 
                                            checked={Student.status} 
                                            darkMode={darkMode} 
                                        />
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