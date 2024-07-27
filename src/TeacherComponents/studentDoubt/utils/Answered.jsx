import React, { useState, useEffect, useContext } from 'react'
import AnsweredTile from './AnsweredTile'
import Loading from '../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext'
import { BASE_URL_AskDoubt } from '../../../Config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Answered({Class,Section,Subject}) {
    const { authState } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);
 

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (authState.accessToken && Class && Section && Subject) {
            setStart(0);
            setData([]);
            setAllDataFetched(false);

            fetchUserData();
        } else {
            setError('No access token available');
            setLoading(false);
        }
    }, [authState.accessToken, Class, Section, Subject]);

    useEffect(() => {
        if (start !== 0) {
            fetchUserData();
        }
    }, [start]);

    const fetchUserData = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${BASE_URL_AskDoubt}/doubts/fetch/teacher?class=${Class}&section=${Section}&subject=${Subject}&status=${'Resolved'}&start=${start}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
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

        }
        finally {
            setLoading(false);

        }
    };

    if (loading) {
        return <Loading />;
    }



    return (
        <div className=''>
            
            <AnsweredTile data={data} />
            {!allDataFetched && (
                <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
            )}
        </div>
    )
}

export default Answered