import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import AuthContext from "../../Context/AuthContext";
import axios from "axios";
import Switch from "./utils/switch";
import { toast, ToastContainer } from "react-toastify";
import Loading from '../../LoadingScreen/Loading';
import { BASE_URL_Fee } from "../../Config";
import SubjectSelection from "../classWork/utils/SubjectSelection";

const Status = () => {
    const { id } = useParams();
    const { authState } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('Maths');


    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        console.log("Selected Subject:", subject);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_Fee}/notebook/fetch/student?subject=${selectedSubject}`, {
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
    }, [authState.accessToken, selectedSubject]);


    return (
        <div className=" items-center  px-4 py-1 mb-2">
            <ToastContainer />
            <div className="flex items-center justify-between">
                <h1 className="text-xl mobile:max-tablet:text-lg font-medium my-3">Checked Notebooks</h1>
                <SubjectSelection onSubjectSelect={handleSubjectSelect} />
            </div>
            {loading ? (
                <Loading />
            ) : data.length === 0 ? (
                <div className="w-full text-center">No data available</div>
            ) : (
                <div className="w-full overflow-x-auto rounded-lg mt-4">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-300 to-blue-100 text-gray-600 text-lg leading-normal">

                                <th className="py-2 px-6 text-center whitespace-nowrap">Notebook Checked By</th>
                                <th className="py-2 px-6 text-center">Date</th>
                                <th className="py-2 px-6 text-center">Chapter</th>
                                <th className="py-2 px-6 text-center ">Topic</th>
                                <th className="py-2 px-6 text-center rounded-t-l">Checked</th>

                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-md font-normal ">
                            {data.map((Student, index) => (

                                <tr key={index} className="border-b border-gray-200  last:border-none">

                                    <td className="flex py-3 px-6 items-center gap-2"><img src={Student.by.profileLink} alt="img" className="rounded-full h-10 w-10" />{Student.by.name}</td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">{Student.date}</td>
                                    <td className="py-3 px-6 text-center">{Student.chapter}</td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">{Student.topic}</td>
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
