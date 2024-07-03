import React, { useState, useContext, useEffect } from 'react';
import { BASE_URL_TeacherLeave } from './../../../Config';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import Loading from '../../../LoadingScreen/Loading'
import { toast } from 'react-toastify';
import HistoryTile from './HistoryTile';

function History() {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        if (authState.accessToken) {
            setLoading(true);
            fetchLeaves();
        } else {
            toast.error('No access token available');
        }
    }, [authState.accessToken]);

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

    const fetchLeaves = async () => {
        const session = getCurrentSession();

        try {
            const response = await axios.get(`${BASE_URL_TeacherLeave}/leave/fetch/teacher?start=0&end=10&session=${session}`, {
                headers: {
                    'Authorization': `Bearer ${authState.accessToken}`
                }
            });
            console.log(response.data.Leaves)
            setDetails(response.data.Leaves)
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
                    <HistoryTile details={details} />
                )}
        </div>
    )
}

export default History