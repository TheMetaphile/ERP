import React, { useState, useEffect, useContext, useRef } from "react";
import Loading from "../../LoadingScreen/Loading";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Config";
import SubjectHomeWorkTile from "./utils/SubjectHomeWorkTile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubjectSelection from "../classWork/utils/SubjectSelection";
import { FaBook } from "react-icons/fa";

export default function TodayHomeWork() {
    const [selectedSubject, setSelectedSubject] = useState('Maths');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const { authState, darkMode } = useContext(AuthContext);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

    const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-black';
    const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';

    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        console.log("Selected Subject:", subject);
    }

    useEffect(() => {
        setStart(0);
        setDetails([]);
        setAllDataFetched(false);
        setLoading(false);
    }, [selectedSubject]);

    useEffect(() => {
        if (start === 0 && details.length === 0 && !allDataFetched && !loading) {
            fetchHomework();
        }
    }, [start, details, allDataFetched, loading]);

    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        if (start !== 0) {
            fetchHomework();
        }
    }, [start]);

    const fetchHomework = async () => {
        if (loading || allDataFetched) return;

        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/homework/fetch/student?class=${authState?.userDetails?.currentClass}&month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}&section=${authState?.userDetails?.section}&subject=${selectedSubject}&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`,
                }
            });

            const work = response.data.homework.length;
            if (work < end) {
                toast.success('All data fetched');
                setAllDataFetched(true);
            }
            setDetails(prevData => [...prevData, ...response.data.homework]);
        } catch (error) {
            console.error("Error fetching student homework:", error);
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !allDataFetched && !loading) {
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
        <div className={`flex flex-col ${bgClass}`}>
            <ToastContainer />
            <div className="flex justify-between items-center px-3 mobile:max-tablet:mt-4">
                <h1 className={`text-2xl mobile:max-tablet:text-lg mr-1 font-semibold ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-blue-600 hover:text-blue-800'} flex items-center`}>
                    <FaBook className={`mr-2 ${darkMode ? 'text-indigo-400' : 'text-blue-600'}`} />
                    Homework
                </h1>
                <SubjectSelection onSubjectSelect={handleSubjectSelect} />
            </div>

            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className={`w-full text-center mt-2 ${subTextClass}`}>
                    No homework found
                </div>
            ) : (
                <>
                    <SubjectHomeWorkTile
                        subject={selectedSubject}
                        details={details}
                        darkMode={darkMode}
                    />
                    <div ref={sentinelRef} className="h-10"></div>
                    {loading && start > 0 && (
                        <div className={`text-center w-full text-sm ${subTextClass}`}>
                            Loading more...
                        </div>
                    )}
                </>
            )}
        </div>
    )
}