import React, { useState, useEffect, useContext, useRef } from 'react'
import AnsweredTile from './AnsweredTile'
import Loading from '../../../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../../../Context/AuthContext'
import { BASE_URL } from '../../../../../Config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { refreshAccessToken } from '../../../../../RefreshTokenHelper'

function Answered({ Class, Section, Subject }) {
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(2);
    const [allDataFetched, setAllDataFetched] = useState(false);
    const sentinelRef = useRef(null);

    const handleViewMore = () => {
        if (!allDataFetched && !loading) {
            setStart((prevStart) => prevStart + end);
        }
    };

    useEffect(() => {
        setStart(0);
        setData([]);
        setLoading(false);
        setAllDataFetched(false);
    }, [Class, Section, Subject]);

    useEffect(() => {
        if (start === 0 && data.length === 0 && !allDataFetched && !loading) {
            fetchUserData();
        }
    }, [start, data, allDataFetched, loading]);

    useEffect(() => {
        if (start !== 0) {
            fetchUserData();
        }
    }, [start]);

    const fetchUserData = async () => {
        if (!Class || !Section || !Subject) return;
        if (loading || allDataFetched) return;
        setLoading(true);

        try {
            const response = await axios.get(`${BASE_URL}/doubts/fetch/teacher?class=${Class}&section=${Section}&subject=${Subject}&status=${'Resolved'}&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken}`
                }
            });
            const doubt = response.data.doubts;
            console.log("API response:", response.data);
            setData(prevData => [...prevData, ...response.data.doubts]);
            if (doubt.length < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }

        } catch (err) {
            setError(err.message);
            if (
                err.response &&
                err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchUserData();
                } catch (refreshError) {
                }
            } else {
                toast.error(err.response?.data?.error || "An error occurred");
            }

        }
        finally {
            setLoading(false);

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

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={`mobile:max-tablet:mr-0 mr-3 `}>
            {data.length > 0 ? (
                <>
                    <AnsweredTile data={data} Class={Class} />
                    <div ref={sentinelRef} className="h-10">
                        {loading && start > 0 && (
                            <div className={`text-center w-full text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Loading more...
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className={`w-full text-center mt-3 ${darkMode ? 'text-blue-300' : 'text-blue-500'}`}>
                    No answered doubt
                </div>
            )}
        </div>
    )
}

export default Answered