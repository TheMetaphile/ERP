import React, { useState, useContext, useEffect } from 'react';
import { BASE_URL_TeacherLeave } from './../../../Config';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import Loading from '../../../LoadingScreen/Loading'
import { toast } from 'react-toastify';
import HistoryTile from './HistoryTile';

function History({ additionalData }) {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);

    useEffect(() => {
        if (authState.accessToken) {
            setDetails(prevState => [...additionalData, ...prevState]);
        } else {
            toast.error('No access token available');
        }
    }, [authState.accessToken, additionalData]);

    function getCurrentSession() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        if (currentMonth >= 3) {
            return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
        } else {
            return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchLeaves();
    }, [authState.accessToken]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchLeaves();

        }
    }, [start]);

    const fetchLeaves = async () => {
        const session = getCurrentSession();
        console.log('start', start, 'end', end)
        try {
            const response = await axios.get(`${BASE_URL_TeacherLeave}/leave/fetch/teacher?start=${start}&end=${end}&session=${session}`, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });

            const leaves = response.data.Leaves.length;
            console.log("API response:", response.data.Leaves);
            if (leaves < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setDetails(prevData => [...prevData, ...response.data.Leaves]);
            console.log("API responserrrrrr:", data);


        }
        catch (error) {
            toast.error(error);
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <div className=''>
            <h1 className='text-2xl'>Leave History</h1>
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <>No data available</>
            ) :
                (
                    <>
                        <HistoryTile details={details} />
                        {!allDataFetched && (
                            <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
                        )}
                    </>
                )}
        </div>
    )
}

export default History