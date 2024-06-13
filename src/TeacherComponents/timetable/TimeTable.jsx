import React, { useState, useContext, useEffect } from 'react'
import Selection from './utils/Selection'
import Table from './utils/Table'
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';

function TimeTable() {
    const [data, setData] = useState(null);
    const { authState } = useContext(AuthContext);
    const [teacherEmail, setTeacherEmail] = useState('bhanu68tyagi@gmail.com');
    const [day, setDay] = useState('tuesday');

    useEffect(() => {
        handleSearch();
    }, []);

   

    const handleDayChange = (value) => {
        setDay(value);
    };

    const handleSearch = async () => {
        

            console.log(authState.userDetails.email, day)
            try {
               
                const payload = {
                    accessToken: authState.accessToken,
                    email: authState.userDetails.email,
                    day: day
                };

                const response = await axios.post('https://timetableapi-1wfp.onrender.com/timetable/fetch/teacher', payload);
                if (response.status === 200) {
                    console.log('response from fetchhh', response.data);
                    setData(response.data); 
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        
    };
    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2  mb-3 no-scrollbar">
            <h1 className='text-2xl'>Time Table</h1>
            <div className=' mt-4  w-full'>
                <Selection 
                 onSearch={handleSearch}
                 
                 onDayChange={handleDayChange}/>
            </div>

            <div className='   w-full rounded-lg border shadow-md'>
                <Table data={data}/>
            </div>

        </div>

    )
}

export default TimeTable