import React, { useState, useEffect, useContext } from 'react'
import NewDoubtTile from './NewDoubtTile'
import Loading from '../../../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../../../Context/AuthContext'
import { BASE_URL_AskDoubt } from '../../../../../Config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewDoubt({ Class, Section, Subject }) {
    const { authState } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [allDataFetched, setAllDataFetched] = useState(false);

    console.log(Class, Section, Subject)
    useEffect(() => {
        setStart(0);
        setData([]);
        setLoading(true);
        setAllDataFetched(false);
        fetchUserData();
    }, [Class, Section, Subject]);

    const handleViewMore = () => {
        setStart(prevStart => prevStart + end);
    };

    useEffect(() => {
        if (start !== 0) {
            fetchUserData();
        }
    }, [start]);

    const fetchUserData = async () => {
        console.log(Subject, start, end)
        if(!Class || !Section || !Subject) {setLoading(false); return ;} ;
        try {
            const response = await axios.get(`${BASE_URL_AskDoubt}/doubts/fetch/teacher?class=${Class}&section=${Section}&subject=${Subject}&start=${start}&end=${end}&status=${'Pending'}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            const doubt = response.data.doubts;
            console.log("API response:", response.data);
            if (doubt.length < end) {
                toast.success('All data fetched');
                console.log('All data fetched')
                setAllDataFetched(true);
            }
            setData(prevData => [...prevData, ...response.data.doubts]);


        } catch (err) {
            setError(err.message);

        }
        finally {
            setLoading(false);

        }
    };

    if (loading && start === 0) {
        return <Loading />;
    }

    return (
        <div className='mobile:max-tablet:mr-0 mr-3'>
            {data.length > 0 ? (
                <>
                    <NewDoubtTile data={data} Class={Class} />
                    {(!allDataFetched) && (
                        <h1 className='text-blue-500 hover:text-blue-800 mt-3 cursor-pointer text-center' onClick={handleViewMore}>View More</h1>
                    )}
                </>
            ) : (
                <div className='w-full text-center mt-3 text-blue-500'>No new doubt</div>
            )}

        </div>
    )
}

export default NewDoubt