import React, { useState, useEffect, useContext } from "react";
import UploadTile from './UploadTile';
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../../Config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaSpinner, FaUpload, FaChevronDown } from 'react-icons/fa';

export default function Upload() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);
    const [allDataFetched, setAllDataFetched] = useState(false);

    function getCurrentSession() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        if (currentMonth > 3) {
            return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
        } else {
            return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
        }
    }

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchNotice();
        }
    }, [start]);

    useEffect(() => {
        if (authState.accessToken) {
            fetchNotice();
        }
    }, [authState.accessToken]);

    const fetchNotice = async () => {
        setLoading(true);
        console.log(start, 'start', end, 'end')
        try {
            const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/teacher?start=${start}&limit=${end}&session=${getCurrentSession()}&type=${'by'}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`,
                }
            });

            const notice = response.data.notices;
            setDetails(prevData => [...prevData, ...response.data.notices]);
            console.log('fetch', response.data);
            if (notice.length < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }

        } catch (error) {
            console.error("Error fetching notice:", error);
        }
        finally {
            setLoading(false)
        }
    };


    return (
        <div className='mx-3'>

            {loading ? (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="flex justify-center items-center h-40"
                >
                    <FaSpinner className="text-4xl text-blue-600" />
                </motion.div>
            ) : details.length === 0 ? (
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="w-full text-center text-blue-800 font-semibold py-10 bg-white rounded-lg shadow-inner"
                >
                    No data available
                </motion.div>
            ) : (
                <>
                    <UploadTile details={details} />
                    {!allDataFetched && (
                        <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
                    )}
                </>
            )}
        </div>
    )
}

