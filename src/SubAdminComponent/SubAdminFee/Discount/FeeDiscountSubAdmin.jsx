import React, { useState, useContext, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../LoadingScreen/Loading';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import CreateDiscount from './CreateDiscount';
import { MdDeleteForever, MdAdd, MdRemove, MdSchool } from "react-icons/md";
import { BASE_URL } from '../../../Config';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const getSessions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => {
        const startYear = currentYear - i;
        return `${startYear}-${(startYear + 1).toString().slice(-2)}`;
    });
}

function FeeDiscountSubAdmin() {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const { authState, darkMode } = useContext(AuthContext);
    const [showDiscountStructure, setShowDiscountStructure] = useState(false);
    const session = getSessions();
    const [selectedSession, setSelectedSession] = useState(session[0]);
    const [start, setStart] = useState(0);
    const end = 10
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

    const handleChange = (event) => {
        setSelectedSession(event.target.value);
    };

    useEffect(() => {
        if (start === 0) fetchDiscount();
    }, [start]);

    const fetchDiscount = async () => {
        if (loading || allDataFetched) return;
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/fee/apply/fetch/discount?end=${end}&start=${start}`, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`
                }
            });

            if (response.status === 200) {
                const fetchedData = response.data.list;
                console.log(fetchedData)
                if (fetchedData.length < end) {
                    toast.success('All data fetched');
                    setAllDataFetched(true);
                }
                setDetails(prevData => [...prevData, ...fetchedData]);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            toast.error('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    console.log(details)
    const handleDelete = async (index, id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/fee/delete/discount?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`
                }
            });

            if (response.status === 200) {
                setDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
                toast.success('Discount Deleted Successfully');
            }
        } catch (error) {
            console.error("Error deleting Discount:", error);
            toast.error('Error deleting Discount');
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !allDataFetched && !loading) {
                    setStart(prevStart => prevStart + end);
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

    return (
        <div className={`flex flex-col px-6 py-8 min-h-screen mobile:max-tablet:p-2 ${darkMode ? 'bg-gray-900 text-gray-100' : ''
            }`}>
            <ToastContainer />
            <div className='flex justify-between items-center mb-6 mobile:max-tablet:flex-col mobile:max-tablet:items-start'>
                <h1 className={`text-3xl font-bold flex items-center mobile:max-tablet:text-lg ${darkMode ? 'text-blue-300' : 'text-blue-500'
                    }`}>
                    <MdSchool className="mr-2" /> Student Fee Discount
                </h1>
                <div className='flex gap-4 items-center mobile:max-tablet:flex-col'>
                    <div className='flex gap-2'>
                        <select
                            id="sessionSelector"
                            value={selectedSession}
                            onChange={handleChange}
                            className={`${darkMode
                                ? 'bg-gray-700 text-gray-200 border-gray-600 focus:ring-blue-600'
                                : 'bg-white border-blue-300 text-blue-700 focus:ring-blue-500'
                                } border-2 rounded-md py-2 px-4 focus:outline-none focus:ring-2 transition duration-300`}
                        >
                            {session.map((session, index) => (
                                <option
                                    key={index}
                                    value={session}
                                    className={darkMode ? 'bg-gray-800 text-gray-200' : ''}
                                >
                                    {session}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className={`flex items-center mobile:max-tablet:justify-start gap-2 py-2 px-4 rounded-md text-white transition duration-300 ${showDiscountStructure
                            ? (darkMode
                                ? 'bg-red-700 hover:bg-red-800'
                                : 'bg-red-500 hover:bg-red-600')
                            : (darkMode
                                ? 'bg-blue-700 hover:bg-blue-800'
                                : 'bg-blue-500 hover:bg-blue-600')
                            }`}
                        onClick={() => setShowDiscountStructure(!showDiscountStructure)}
                    >
                        {showDiscountStructure ? <><MdRemove /> Cancel</> : <><MdAdd /> Apply Discount</>}
                    </button>
                </div>
            </div>
            <div className='w-full'>
                {showDiscountStructure && <CreateDiscount selectedSession={selectedSession} />}
                <div className={`mt-3 rounded-lg shadow-lg overflow-auto ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-200 border'
                    }`}>
                    <table className="w-full">
                        <thead className={`whitespace-nowrap ${darkMode ? 'bg-gray-700' : 'bg-blue-200'
                            }`}>
                            <tr>
                                {["Roll No.", "Student Name", "Class & Section", "Discount Type", "Title", "Amount", "By", "Department", "Date", "Start Month", "End Month", "Action"].map(header => (
                                    <th key={header} className={`py-3 px-4 text-left ${darkMode ? 'text-gray-300' : 'text-gray-800'
                                        }`}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='whitespace-nowrap'>
                            {loading ? (
                                <tr><td colSpan="12" className="text-center py-4"><Loading /></td></tr>
                            ) : details.length > 0 ? (
                                details.map((detail, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className={`border-b transition-colors ${darkMode
                                            ? 'border-gray-700 hover:bg-gray-700'
                                            : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : ''
                                            }`}>{detail.student.rollNumber}</td>
                                        <td className="py-3 px-4">
                                            <Link
                                                to={`/Sub-Admin/Students/details/${detail.student.email}`}
                                                className={`text-center px-3 py-2 font-semibold flex w-fit ${darkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-800'
                                                    }`}
                                            >
                                                <img
                                                    src={detail.student.profileLink}
                                                    alt="profile"
                                                    className="h-6 w-6 rounded-full mr-3 border-2 border-indigo-300"
                                                />
                                                {detail.student.name}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-4">{detail.student.currentClass} {detail.student.section}</td>
                                        <td className="py-3 px-4">{detail.discount.discountType}</td>
                                        <td className="py-3 px-4">{detail.discount.title}</td>
                                        <td className="py-3 px-4 font-semibold text-green-600">{detail.discount.amount}</td>
                                        <td className="py-3 px-4">{detail.by.name}</td>
                                        <td className="py-3 px-4">{detail.by.department}</td>
                                        <td className="py-3 px-4"> {new Date(detail.date).toLocaleDateString('en-GB')}</td>
                                        <td className="py-3 px-4">{detail.startMonth}</td>
                                        <td className="py-3 px-4">{detail.endMonth}</td>

                                        <td className="py-3 px-4">
                                            <button
                                                className={`transition duration-200 ${darkMode
                                                    ? 'text-red-400 hover:text-red-300'
                                                    : 'text-red-500 hover:text-red-700'
                                                    }`}
                                                onClick={() => handleDelete(index, detail._id)}
                                            >
                                                <MdDeleteForever size={20} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="12"
                                        className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}
                                    >
                                        No Fee Discount available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div ref={sentinelRef} className="h-10"></div>
                {loading && start > 0 && (
                    <div className={`text-center w-full text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Loading more...
                    </div>
                )}
            </div>
        </div>
    );
}

export default FeeDiscountSubAdmin;