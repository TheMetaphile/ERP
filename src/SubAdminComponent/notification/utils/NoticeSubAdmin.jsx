import React, { useState, useEffect, useContext } from "react";
import AllNotificationTile from './AllNotificationTile';
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import Loading from "../../../LoadingScreen/Loading";
import { BASE_URL_Notice } from "../../../Config";
import { ToastContainer, toast } from "react-toastify";

function NoticeSubAdmin() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);
    const sessions = getLast5Sessions();
    const [selectedSession, setSelectedSession] = useState(sessions[1]);
    const [allDataFetched, setAllDataFetched] = useState(false);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        fetchNotice();
    }, [authState.accessToken, selectedSession]);

    useEffect(() => {
        if (start !== 0) {
            fetchNotice();
        }
    }, [start, selectedSession]);


    const fetchNotice = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL_Notice}/notice/fetch/subAdmin?start=${start}&limit=${end}&session=${selectedSession}&type=for`, {
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
            setLoading(false)
        }
    };


    const handleChange = (event) => {
        setStart(0);
        setAllDataFetched(false);
        setSelectedSession(event.target.value);
        setDetails([]);
    };

    return (
        <div className='px-3 w-full pt-20'>
            <ToastContainer />
            <div className=" flex  mx-3 items-center justify-between">
                <h1 className='text-2xl mobile:max-tablet:text-xl mt-2'>Notice</h1>
                <select
                    id="sessionSelector"
                    value={selectedSession}
                    onChange={handleChange}
                    className="mobile:max-tablet:mx-4 border rounded-md py-1 w-fit mobile:max-tablet:px-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                >
                    {sessions.map((session, index) => (
                        <option key={index} value={session}>
                            {session}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className="w-full text-center">No data available</div>
            ) : (
                <>
                    <AllNotificationTile details={details} />
                    {!allDataFetched && (
                        <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
                    )}
                </>
            )}
        </div>
    )
}

const getLast5Sessions = () => {
    const currentYear = new Date().getFullYear();
    const sessions = [];

    for (let i = 0; i < 5; i++) {
        const startYear = currentYear - i;
        const endYear = (currentYear - i + 1).toString().slice(2);
        sessions.push(`${startYear}-${endYear}`);
    }

    return sessions;
}

export default NoticeSubAdmin;