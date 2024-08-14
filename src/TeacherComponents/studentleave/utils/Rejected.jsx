import React, { useState, useEffect, useContext } from 'react'
import RejectedTile from './RejectedTile'
import Loading from '../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext'
import { BASE_URL_Student_Leave } from '../../../Config'

export default  function Rejected() {

    const { authState } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUserData = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${BASE_URL_Student_Leave}/leave/fetch/classTeacher?start=${0}&end=${20}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response:", response.data);
            setData(response.data || []); 
            
        } catch (err) {
            setError(err.message);
        
        }
        finally{
            setLoading(false);

        }
    };
    useEffect(() => {

        if (authState.accessToken) {
            fetchUserData();
        } else {
            setError('No access token available');
            setLoading(false);
        }
    }, [authState.accessToken]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

   
    return (
        <div className='w-full mr-3'>
            <RejectedTile data={data}/>   
        </div>
    )
}

