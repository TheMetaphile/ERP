import React, { useState, useEffect, useContext, useRef } from "react";
import AllNotificationTile from './AllNotificationTile';
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../../Config";
import { toast } from "react-toastify";

function AllNotification() {
    const { authState } = useContext(AuthContext);
    const [globalLoading, setGlobalLoading] = useState(false);
    const [fetchingMore, setFetchingMore] = useState(false);
    const [details, setDetails] = useState([]);
    const [start, setStart] = useState(0);
    const end= 6;
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

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
            const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/student?start=${start}&limit=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`,
                }
            });
            const notice = response.data.notices.length;
            console.log("API response:", response.data.notices);
            if (notice < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setDetails(prevData => [...prevData, ...response.data.notices]);
            console.log('fetch', response.data);
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
    }, [allDataFetched, fetchingMore]);

    return (
        <div className='px-3 w-full'>
            {globalLoading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="w-full text-center">No data available</div>
            ) : (
                <>
                    <AllNotificationTile details={details} />
                    <div ref={sentinelRef} className="h-10">
                        {fetchingMore && (
                            <div className="text-center w-full text-gray-600 text-sm">
                                <Loading/>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default AllNotification;