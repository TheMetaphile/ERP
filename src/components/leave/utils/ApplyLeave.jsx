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
        console.log(authState.accessToken, startDate,endDate, authState.userDetails.email,reason)
        try {
            const response = await axios.post('https://studentleaveapi.onrender.com/leave/apply', {
                accessToken: authState.accessToken,
                startDate,
                endDate,
                email: authState.userDetails.email,
                reason
            });
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
            <ToastContainer />
            <h1 className="text-center text-lg md:text-xl font-medium">Apply Leave</h1>
            <div className='mt-3 w-full md:w-2/3 lg:w-1/2'>


                <div className="flex flex-row mobile:max-laptop:flex-col  mt-2  gap-4">
                    <div>
                        <div>
                            <label className="text-sm font-medium">From Date</label>
                            <input type="date" className="mt-2 border border-black rounded-lg w-full md:w-auto" value={startDate} onChange={((e) => setStartDate(e.target.value))} />
                        </div>
                        <div className='mt-3'>
                            <label className="text-sm font-medium">To Date</label>
                            <input type="date" className="mt-2 border border-black rounded-lg w-full md:w-auto" value={endDate} onChange={((e) => setEndDate(e.target.value))} />
                        </div>

                    </div>
                    <div className=" text-sm font-medium">
                        <label className="block">Reason</label>
                        <textarea className="mt-2 border border-black rounded-lg w-full" rows={9} value={reason} onChange={((e) => setReason(e.target.value))}></textarea>
                    </div>
                </div>




            </div>
            <button className="bg-green-400 text-white px-4 py-2 rounded-lg mt-4 mb-1 hover:bg-green-600" onClick={handleApply}>{isLoading ? <Loading /> : 'Apply'}</button>
        </div>
    );
}
