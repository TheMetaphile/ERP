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
    const [selectedClass, setSelectedClass] = useState("9th");
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const { authState } = useContext(AuthContext);
    const [showDiscountStructure, setShowDiscountStructure] = useState(false);
    const session = getSessions();
    const [selectedSession, setSelectedSession] = useState(session[0]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(1);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
        setShowDiscountStructure(false);
    };

    const handleChange = (event) => {
        setSelectedSession(event.target.value);
    };

    useEffect(() => {
        if (selectedClass !== "" && selectedSession !== "") {
            setStart(0);
            setDetails([]);
            setAllDataFetched(false);
            setLoading(false);
        }
    }, [selectedClass, selectedSession]);

    useEffect(() => {
        if (start === 0 && details.length === 0 && !allDataFetched && !loading) {
            // fetchDiscount();
        }
    }, [start, details, allDataFetched, loading]);

    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };


    // useEffect(() => {
    //     if (start !== 0) {
    //         fetchDiscount();
    //     }
    // }, [start]);

    // const fetchDiscount = async () => {
    //     if (loading || allDataFetched) return;
    //     setLoading(true);
    //     try {
    //         const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/discount?end=${end}&start=${start}&class=${selectedClass}`, {
    //             headers: {
    //                 Authorization: `Bearer ${authState.accessToken}`
    //             }
    //         });
    //         if (response.status === 200) {
    //             const data = response.data.length;
    //             if (data < end) {
    //                 toast.success('All data fetched');
    //                 setAllDataFetched(true);
    //             }
    //             setDetails(prevData => [...prevData, ...response.data]);
    //             setLoading(false);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         setLoading(false);
    //     }
    // }

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
                        <select id="Class" name="Class" value={selectedClass} onChange={handleClassChange} className="bg-white border-2 border-purple-300 rounded-md py-2 px-4 text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300">
                            <option value="">Select Class</option>
                            {["Pre-Nursery", "Nursery", "L.K.G", "U.K.G", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"].map(cls => (
                                <option key={cls} value={cls}>{cls}</option>
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
                                {["Roll No.", "Student Name", "Current Class", "Session", "Discount", "By", "Employee ID", "Action"].map(header => (
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

                                        <td className="py-3 px-4">{detail.to.rollNumber}</td>
                                        <td className="py-3 px-4 flex items-center">
                                            <img src={detail.to.profileLink} alt="profile" className="h-8 w-8 rounded-full mr-3 border-2 border-indigo-300" />
                                            {detail.to.name}
                                        </td>
                                        <td className="py-3 px-4">{detail.to.currentClass}</td>
                                        <td className="py-3 px-4">{detail.session}</td>
                                        <td className="py-3 px-4 font-semibold text-green-600">{detail.amount}</td>
                                        <td className="py-3 px-4">{detail.by.name}</td>
                                        <td className="py-3 px-4">{detail.by.employeeId}</td>
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