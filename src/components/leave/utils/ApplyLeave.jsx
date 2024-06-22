import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../LoadingScreen/Loading';

export default function ApplyLeave() {
    const { authState } = useContext(AuthContext);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleApply = async () => {
        if (!startDate || !endDate || !reason) {
            alert("Please fill all fields");
            return;
        }
        setIsLoading(true);
        console.log(startDate, endDate, reason)
        try {
            const response = await axios.post('https://studentleaveapi.onrender.com/leave/apply', {
                startDate,
                endDate,
                reason
            },
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                }
            );
            if (response.status === 200) {
                toast.success('Leave applied successfully!');
                setStartDate('');
                setEndDate('');
                setReason('');
            }
        } catch (error) {
            toast.error(error);
        }
        finally {
            setIsLoading(false);
        }
    };


    return (
        <div className=" flex flex-col items-center p-4 ml-2 mr-2 rounded-lg shadow-md">
            {/* <ToastContainer /> */}
            <h1 className=" text-lg md:text-xl font-medium">Apply Leave</h1>
            <div className='mt-3 w-full md:w-2/3 lg:w-1/2'>


                <div className="flex flex-row mobile:max-laptop:flex-col  mt-2  ">
                    <div className='flex items-center w-full justify-between gap-3'>
                        <div className='w-full'>
                            <label className="text-sm font-medium">From Date</label>
                            <input type="date" className="mt-2 border border-black rounded-lg w-full md:w-auto" value={startDate} onChange={((e) => setStartDate(e.target.value))} />
                        </div>
                        <div className='w-full'>
                            <label className="text-sm font-medium">To Date</label>
                            <input type="date" className="mt-2 border border-black rounded-lg w-full md:w-auto" value={endDate} onChange={((e) => setEndDate(e.target.value))} />
                        </div>

                    </div>

                </div>
                <div className=" text-sm font-medium mt-3">
                    <label className="block">Reason</label>
                    <textarea className="mt-2 border border-black rounded-lg w-full" rows={4} value={reason} onChange={((e) => setReason(e.target.value))}></textarea>
                </div>



            </div>
            <button className="bg-green-400 text-white px-4 py-2 rounded-lg mt-4 mb-1 hover:bg-green-600" onClick={handleApply}>{isLoading ? <Loading /> : 'Apply'}</button>
        </div>
    );
}
