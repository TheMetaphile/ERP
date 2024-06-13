import React, { useState, useEffect, useContext } from 'react'
import NewTile from './NewTile'
import Loading from '../../../LoadingScreen/Loading'
import axios from 'axios'
import AuthContext from '../../../Context/AuthContext'
function New() {
    const { authState } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUserData = async () => {
        setLoading(true);

        try {
            const response = await axios.post('https://studentleaveapi.onrender.com/leave/fetch/classTeacher', {
                accessToken: authState.accessToken,
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
        <div className='ml-3 mr-3'>
            

            <NewTile data={data}/>
           
        </div>
    )
}

export default New