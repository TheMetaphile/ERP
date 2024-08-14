import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../LoadingScreen/Loading';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import CreateDiscount from './CreateDiscount';
import { MdDeleteForever, MdAdd, MdRemove } from "react-icons/md";
import { BASE_URL_Fee } from '../../../Config';

const getSessions = () => {
    const currentYear = new Date().getFullYear();
    const newSessions = [];

    for (let i = 0; i < 5; i++) {
        const startYear = currentYear - i;
        const endYear = startYear + 1;
        newSessions.push(`${startYear}-${endYear.toString().slice(-2)}`);
    }

    return newSessions;
}

function FeeDiscount() {
    const [selectedClass, setSelectedClass] = useState("9th");
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const { authState } = useContext(AuthContext);
    const [showDiscountStructure, setShowDiscountStructure] = useState(false);
    const session = getSessions();
    const [selectedSession, setSelectedSession] = useState(session[0]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
        setShowDiscountStructure(false);
    };

    const handleChange = (event) => {
        setSelectedSession(event.target.value);
    };
    useEffect(() => {
        if (selectedClass !== "" && selectedSession !== "") {
            setDetails([]);
            setStart(0);
            setAllDataFetched(false);
            fetchDiscount();
        }
    }, [selectedClass, selectedSession]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchDiscount();
        }
    }, [start]);

    const fetchDiscount = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/discount?end=${end}&start=${start}&class=${selectedClass}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                const data = response.data.length;
                if (data < end) {
                    toast.success('All data fetched');
                    setAllDataFetched(true);
                }
                setDetails(prevData => [...prevData, ...response.data]);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const handleDelete = async (index, id) => {
        try {
            const response = await axios.delete(`${BASE_URL_Fee}/fee/delete/discount?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                const updatedDiscount = details.filter((_, i) => i !== index);
                setDetails(updatedDiscount);
                toast.success('Discount Deleted Successfully');
            }
        } catch (error) {
            console.error("Error deleting Discount:", error);
            toast.error('Error deleting Discount');
        }
    };

    return (
        <div className="flex flex-col px-3 bg-gray-100 min-h-screen">
            <ToastContainer />
            <div className='flex justify-between items-center'>
                <h1 className="text-2xl p-2">Student Fee Discount</h1>
                <div className='flex gap-4 items-center'>
                    <select
                        id="sessionSelector"
                        value={selectedSession}
                        onChange={handleChange}
                        className="border rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary transition duration-300"
                    >
                        {session.map((session, index) => (
                            <option key={index} value={session}>{session}</option>
                        ))}
                    </select>
                    <select
                        id="Class"
                        name="Class"
                        value={selectedClass}
                        onChange={handleClassChange}
                        className="border rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary transition duration-300"
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
                    <button
                        className={`flex items-center gap-2 py-2 px-4 rounded-md text-white transition duration-300 ${showDiscountStructure ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'
                            }`}
                        onClick={() => setShowDiscountStructure(!showDiscountStructure)}
                    >
                        {showDiscountStructure ? <><MdRemove /> Cancel</> : <><MdAdd /> Add</>}
                    </button>
                </div>
            </div>
            <div className='w-full'>
                {showDiscountStructure && <CreateDiscount selectedSession={selectedSession} />}
                <div className='mt-8 bg-white border rounded-lg shadow-md overflow-hidden'>
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-teal-400 to-blue-500 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Roll No.</th>
                                <th className="py-3 px-4 text-left">Student Name</th>
                                <th className="py-3 px-4 text-left">Current Class</th>
                                <th className="py-3 px-4 text-left">Session</th>
                                <th className="py-3 px-4 text-left">Discount</th>
                                <th className="py-3 px-4 text-left">By</th>
                                <th className="py-3 px-4 text-left">Employee ID</th>
                                <th className="py-3 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-4">
                                        <Loading />
                                    </td>
                                </tr>
                            ) : details.length > 0 ? (
                                details.map((detail, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-100 transition duration-200">
                                        <td className="py-3 px-4">{detail.to.rollNumber}</td>
                                        <td className="py-3 px-4 flex items-center">
                                            <img src={detail.to.profileLink} alt="profile" className="h-8 w-8 rounded-full mr-3" />
                                            {detail.to.name}
                                        </td>
                                        <td className="py-3 px-4">{detail.to.currentClass}</td>
                                        <td className="py-3 px-4">{detail.session}</td>
                                        <td className="py-3 px-4">{detail.amount}</td>
                                        <td className="py-3 px-4">{detail.by.name}</td>
                                        <td className="py-3 px-4">{detail.by.employeeId}</td>
                                        <td className="py-3 px-4">
                                            <button
                                                className="text-red-500 hover:text-red-700 transition duration-200"
                                                onClick={() => handleDelete(index, detail._id)}
                                            >
                                                <MdDeleteForever size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-4">No Fee Discount available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {!allDataFetched && (
                    <div className="text-center mt-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300"
                            onClick={handleViewMore}
                        >
                            View More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FeeDiscount;