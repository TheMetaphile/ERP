import React, { useState, useEffect, useContext, useRef } from "react";
import TeacherTile from './TeacherTile';
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL_Notice } from "../../../Config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

export default function Teacher() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

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
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        if (start !== 0) {
            fetchNotice();
        }
    }, [start]);

    useEffect(() => {
        if (start === 0 && details.length === 0 && !allDataFetched && !loading) {
            fetchNotice();
        }
    }, [start, details, allDataFetched, loading]);


    const fetchNotice = async () => {
        if (loading || allDataFetched) return;
        setLoading(true);
        console.log(start, 'start', end, 'end')
        try {
            const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/teacher?start=${start}&limit=${end}&session=${getCurrentSession()}&type=${'for'}`, {
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
                    className="w-full text-center text-blue-800 font-semibold py-10"
                >
                    No data available
                </motion.div>
            ) : (
                <>
                    <TeacherTile details={details} />
                    <div ref={sentinelRef} className="h-10">
                        {loading && start > 0 && (
                            <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                        )}
                    </div>
                </>
            )}

        </div>
    )
}

