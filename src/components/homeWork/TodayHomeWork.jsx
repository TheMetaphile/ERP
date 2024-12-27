import React, { useState, useEffect, useContext, useRef } from "react";
import Loading from "../../LoadingScreen/Loading";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL_Homework } from "../../Config";
import SubjectHomeWorkTile from "./utils/SubjectHomeWorkTile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubjectSelection from "../classWork/utils/SubjectSelection";

export default function TodayHomeWork() {
    const [selectedSubject, setSelectedSubject] = useState('Maths');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const { authState } = useContext(AuthContext);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

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
        console.log(authState.userDetails.currentClass, new Date().getMonth() + 1, authState.userDetails.academicYear, authState.userDetails.section, selectedSubject)
        if (loading || allDataFetched) return;

        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Homework}/homework/fetch/student?class=${authState.userDetails.currentClass}&month=${new Date().getMonth() + 1}&year=${authState.userDetails.academicYear}&section=${authState.userDetails.section}&subject=${selectedSubject}&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`,
                }
            });

            const work = response.data.homework.length;
            console.log("API response:", response.data.homework);
            if (work < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setDetails(prevData => [...prevData, ...response.data.homework]);
            console.log('fetch', response.data)
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
        <div className="flex flex-col">
            {/* <h1 className="text-lg font-medium px-2">Today HomeWork</h1>
            <HomeWorkGrid /> */}
            <ToastContainer />
            <div className="flex justify-between items-center px-3 mobile:max-tablet:mt-4">
                <h1 className="text-3xl mobile:max-laptop:text-lg font-medium px-2">Homework</h1>
                <SubjectSelection onSubjectSelect={handleSubjectSelect} />
            </div>

            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="w-full text-center mt-2">No homework found</div>
            ) : (
                <>
                    <SubjectHomeWorkTile subject={selectedSubject} details={details} />
                    <div ref={sentinelRef} className="h-10"></div>
                    {loading && start > 0 && (
                        <div className="text-center w-full text-gray-600 text-sm">Loading more...</div>
                    )}
                </>
            )
            }
            {/* <HomeSubjectGrid /> */}
        </div>
    )
}