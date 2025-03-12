import React, { useState, useEffect, useContext, useRef } from "react";
import AllNotificationTile from './AllNotificationTile';
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL } from "../../../Config";
import { toast } from "react-toastify";

function AllNotification() {
    const { authState, darkMode } = useContext(AuthContext);
    const [globalLoading, setGlobalLoading] = useState(false);
    const [fetchingMore, setFetchingMore] = useState(false);
    const [details, setDetails] = useState([]);
    const [start, setStart] = useState(0);
    const end = 6;
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

    const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
    const textClass = darkMode ? 'text-white' : 'text-black';
    const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';

    useEffect(() => {
        if (start === 0 && details.length === 0 && !allDataFetched && !globalLoading) {
            fetchNotice(true); // Initial load
        }
    }, [start, details, allDataFetched, globalLoading]);

    const handleViewMore = () => {
        if (!allDataFetched && !fetchingMore) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        if (start !== 0) {
            fetchNotice(false);
        }
    }, [start]);

    const fetchNotice = async (isInitialLoad) => {
        if (isInitialLoad ? globalLoading : fetchingMore) return;

        if (isInitialLoad) {
            setGlobalLoading(true);
        } else {
            setFetchingMore(true);
        }
        try {
            const response = await axios.get(`${BASE_URL}/notice/fetch/student?start=${start}&limit=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`,
                }
            });
            const notice = response.data.notices.length;
            if (notice < end) {
                toast.success('All data fetched');
                setAllDataFetched(true);
            }
            setDetails(prevData => [...prevData, ...response.data.notices]);
        } catch (error) {
            console.error("Error fetching notice:", error);
        }
        finally {
            if (isInitialLoad) {
                setGlobalLoading(false);
            } else {
                setFetchingMore(false);
            }
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !allDataFetched && !fetchingMore) {
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
    }, [allDataFetched, fetchingMore]);

    return (
        <div className={`px-3 w-full ${bgClass}`}>
            {globalLoading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className={`w-full text-center ${subTextClass}`}>
                    No data available
                </div>
            ) : (
                <>
                    <AllNotificationTile 
                        details={details} 
                        darkMode={darkMode} 
                    />
                    <div ref={sentinelRef} className="h-10">
                        {fetchingMore && (
                            <div className={`text-center w-full text-sm ${subTextClass}`}>
                                <Loading />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default AllNotification;