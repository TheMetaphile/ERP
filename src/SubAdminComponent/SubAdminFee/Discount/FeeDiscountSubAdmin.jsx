import React, { useState, useContext, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../LoadingScreen/Loading';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import CreateDiscount from './CreateDiscount';
import { MdDeleteForever, MdAdd, MdRemove, MdSchool } from "react-icons/md";
import { BASE_URL_Fee } from '../../../Config';
import { motion } from "framer-motion";

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
    const { authState } = useContext(AuthContext);
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
            const response = await axios.get(`${BASE_URL_Fee}/fee/apply/fetch/discount?end=${end}&start=${start}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
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
            const response = await axios.delete(`${BASE_URL_Fee}/fee/delete/discount?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
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
        <div className="flex flex-col px-6 py-8 min-h-screen mobile:max-tablet:p-2">
            <ToastContainer />
            <div className='flex justify-between items-center mb-6 mobile:max-tablet:flex-col mobile:max-tablet:items-start'>
                <h1 className="text-3xl font-bold text-purple-500 flex items-center mobile:max-tablet:text-lg"><MdSchool className="mr-2" /> Student Fee Discount</h1>
                <div className='flex gap-4 items-center mobile:max-tablet:flex-col'>
                    <div className=' flex gap-2'>
                        <select id="sessionSelector" value={selectedSession} onChange={handleChange} className="bg-white border-2 border-purple-300 rounded-md py-2 px-4 text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300">
                            {session.map((session, index) => (
                                <option key={index} value={session}>{session}</option>
                            ))}
                        </select>
                    </div>

                    <button className={`flex items-center mobile:max-tablet:justify-start gap-2 py-2 px-4 rounded-md text-white transition duration-300 ${showDiscountStructure ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'}`} onClick={() => setShowDiscountStructure(!showDiscountStructure)}>
                        {showDiscountStructure ? <><MdRemove /> Cancel</> : <><MdAdd /> Add</>}
                    </button>
                </div>
            </div>
            <div className='w-full'>
                {showDiscountStructure && <CreateDiscount selectedSession={selectedSession} />}
                <div className='mt-3 bg-white border border-purple-200 rounded-lg shadow-lg overflow-auto'>
                    <table className="w-full">
                        <thead className="bg-purple-200 whitespace-nowrap">
                            <tr>
                                {["Roll No.", "Student Name", "Class & Section", "Discount Type", "Title", "Amount", "By", "Department", "Date", "Start Month", "End Month", "Action"].map(header => (
                                    <th key={header} className="py-3 px-4 text-left">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className=' whitespace-nowrap'>
                            {loading ? (
                                <tr><td colSpan="8" className="text-center py-4"><Loading /></td></tr>
                            ) : details.length > 0 ? (
                                details.map((detail, index) => (
                                    <motion.tr
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                    >

                                        <td className="py-3 px-4">{detail.student.rollNumber}</td>
                                        <td className="py-3 px-4 flex items-center">
                                            <img src={detail.student.profileLink} alt="profile" className="h-8 w-8 rounded-full mr-3 border-2 border-indigo-300" />
                                            {detail.student.name}
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
                                            <button className="text-red-500 hover:text-red-700 transition duration-200" onClick={() => handleDelete(index, detail._id)}>
                                                <MdDeleteForever size={20} />
                                            </button>
                                        </td>
                                    </motion.tr>

                                ))
                            ) : (
                                <tr><td colSpan="8" className="text-center py-4 text-gray-500">No Fee Discount available</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div ref={sentinelRef} className="h-10"></div>
                {loading && start > 0 && (
                    <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                )}
            </div>
        </div>
    );
}

export default FeeDiscountSubAdmin;