import React, { useState, useContext, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Fee } from '../../../Config';
import { Link, Outlet } from 'react-router-dom';
import { MdSchool } from 'react-icons/md';
import { motion } from "framer-motion";

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

function PreviousFeeDetailsSubAdmin() {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([])
    const { authState } = useContext(AuthContext);
    const session = getSessions();
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(2);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

    const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setClickedIndex(index);
    };
    useEffect(() => {
        setStart(0);
        setDetails([]);
        setAllDataFetched(false);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (start === 0 && details.length === 0 && !allDataFetched && !loading) {
            fetchDetails();
        }
    }, [start, details, allDataFetched, loading]);

    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        if (start !== 0) {
            fetchDetails();
        }
    }, [start]);

    const fetchDetails = async () => {
        if (loading || allDataFetched) return;

        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Fee}/fee/fetch/pendingFeeStats?end=${end}&start=${start}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                console.log(response.data);
                const list = response.data.length;
                if (list < end) {
                    toast.success('All data fetched');
                    console.log('All data fetched')
                    setAllDataFetched(true);
                }
                setDetails(prevUsers => [...prevUsers, ...response.data]);
                setLoading(false);

            }

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

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

        <div className="flex flex-col px-6 mobile:max-tablet:p-2 py-8">
            <ToastContainer />
            <div className='flex justify-between items-center mb-8 mobile:max-tablet:flex-col'>
                <h1 className="text-3xl font-bold text-purple-500 flex items-center mobile:max-tablet:text-lg whitespace-nowrap"><MdSchool className="mr-2" />Previous Fee Details</h1>
            </div>
            <div className=' overflow-auto'>
                <div className='overflow-auto w-full'>
                    <div className="flex justify-between  py-2  bg-purple-200 rounded-t-lg border border-b-2  whitespace-nowrap mobile:max-tablet:w-fit">
                        <h1 className="w-44 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Name
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Class
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Section
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Session
                        </h1>
                        <h1 className="w-44 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Phone Number
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Total Fee
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Discount
                        </h1>
                        <h1 className="w-32 text-lg text-center font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm">
                            Payable
                        </h1>
                    </div>

                    {loading ? (
                        <Loading />
                    ) : (
                        details.length > 0 ? (
                            <div className=' mobile:max-tablet:w-fit overflow-auto'>
                                {details.map((details, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors "
                                    >
                                        <Link to={`/Sub-Admin/StudentsFee/PreviousFeeSubAdmin/${details.Student.email}?Class=${details.Student.currentClass}&session=${details.session}&name=${details.Student.name}&section=${details.Student.section}`}>
                                            <div key={index} className={`px-1 flex justify-between w-full py-2 pl-2 h-fit border gap-x-4 items-center ${clickedIndex === index ? 'bg-secondary' : 'bg-white'}`} onClick={() => handleClick(index)}>
                                                <h1 className="w-44 mobile:max-tablet:w- text-lg flex items-center gap-2 text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    <img src={details.Student.profileLink} alt="profile pic" className='w-10 h-10 rounded-full mobile:max-sm:hidden' />
                                                    <div className='w-32'>
                                                        {details.Student.name}
                                                    </div>
                                                </h1>
                                                <h1 className="w-32 mobile:max-tablet:w-24 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.Student.currentClass}
                                                </h1>
                                                <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.Student.section}
                                                </h1>
                                                <h1 className="w-32 mobile:max-tablet:w-24 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.session}
                                                </h1>
                                                <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.Student.fatherPhoneNumber}
                                                </h1>
                                                <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.total}
                                                </h1>
                                                <h1 className="w-32 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.discount}
                                                </h1>
                                                <h1 className="w-32 mobile:max-tablet:w-28 text-lg text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                                                    {details.total - details.discount}
                                                </h1>
                                            </div>
                                        </Link>
                                    </motion.div>

                                ))}
                                <div ref={sentinelRef} className="h-10">
                                    {loading && start > 0 && (
                                        <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className='text-center mt-2'>No Fee Details available</div>
                        )
                    )}

                </div>
            </div>
            <Outlet />
        </div>
    );
}



export default PreviousFeeDetailsSubAdmin;

