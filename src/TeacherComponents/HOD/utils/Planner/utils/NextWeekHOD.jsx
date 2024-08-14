import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL_Login } from '../../../../../Config';
import axios from 'axios';
import AuthContext from '../../../../../Context/AuthContext';
import Loading from '../../../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NextWeekHODRow from './NextWeekHODRow';

const NextWeekHOD = ({ selectedTab, Class, section, subject }) => {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [remark, setRemark] = useState('');
    const [id, setId] = useState('');
    const [status, setStatus] = useState('');

    const getCurrentSession = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        return currentMonth >= 3 ? `${currentYear}-${(currentYear + 1).toString().slice(-2)}` : `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    };

    const defaultPlan = () => {
        return Array.from({ length: 6 }, (_, i) => {
            const date = new Date(nextWeekStart);
            date.setDate(nextWeekStart.getDate() + i);
            return { date: date.toISOString().split('T')[0], teachingAids: '', chapter: '', topic: '', Activity: '' };
        })
    }


    const session = getCurrentSession();
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const nextWeekStart = new Date();
    nextWeekStart.setDate(currentWeekStart.getDate() + 7);


    const nextWeekFormattedDate = nextWeekStart.toISOString().split('T')[0];
    const [details, setDetails] = useState(defaultPlan());

    console.log(selectedTab)
    useEffect(() => {
        console.log(nextWeekFormattedDate)
        const fetchPlan = async () => {

            try {
                const response = await axios.get(`${BASE_URL_Login}/lessonPlan/fetch/coordinator?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${nextWeekFormattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                });
                console.log("API response:", response.data);
                if (response.data.plan && response.data.plan.length > 0) {
                    setDetails(response.data.plan);
                    setId(response.data._id);
                    setRemark(response.data.coordinatorRemark);
                    setStatus(response.data.coordinatorStatus);
                } else {
                    setDetails(defaultPlan());
                    setId('');
                }
                setLoading(false);
            } catch (err) {
                console.log(err.response.data.error);
                setDetails(defaultPlan());
                setError(err.response.data.error);
                setLoading(false);
            }
        };
        if (Class && section && subject) {
            setLoading(true);
            setDetails([]);
            fetchPlan();
        }
    }, [Class, section, subject, nextWeekFormattedDate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!status) {
            alert('Please fill status');
        }
        const data = {
            accessToken: authState.accessToken,
            id: id,
            status: status,
            remark: remark,
        };
        console.log(data, id);

        try {
            const response = await axios.put(
                `${BASE_URL_Login}/lessonPlan/update/coordinator?id=${id}&status=${status}&remark=${remark}&session=${session}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                }
            );
            console.log("API response:", response.data);
            toast.success('Plan Saved Successfully');
        }catch (err) {
            console.log(err.response.data.error);
            toast.error(err.response.data.error);

        }
    };


    return (
        <div className='rounded-md overflow-auto'>
            {loading ? (
                <Loading />
            ) : details.length === 0 && selectedTab === 'Next Week' ? (
                <>No Data Available</>
            ) : (
                <form onSubmit={handleSubmit}>
                    <table className='w-full rounded-md border border-black'>
                        <thead className='bg-secondary border-b border-black'>
                            <tr className='p-4 text-center'>
                                <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold'>Date</th>
                                <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold'>Chapter</th>
                                <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold'>Topic</th>
                                <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold'>Teaching Aids</th>
                                <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold'>Activity (if any)</th>
                            </tr>
                        </thead>
                        <tbody className='text-center whitespace-nowrap'>
                            {details.map((data, index) => (
                                <NextWeekHODRow details={data} index={index} setDetails={setDetails} />
                            ))}
                        </tbody>
                    </table>

                    <div className='flex justify-center items-center py-2 gap-2'>
                        <textarea
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            placeholder='Enter your remark'
                            className='w-full p-2 border border-black rounded-md mb-4'
                        />

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className='p-5 border border-black rounded-md mb-4 '
                        >
                            <option value="">Select status</option>
                            <option value="Accept">Accept</option>
                            <option value="Reject">Reject</option>
                        </select>

                    </div>
                    <div className='flex justify-center items-center py-4'>
                        <button
                            type="submit"
                            className='p-1 px-4 rounded-md bg-secondary font-semibold border-black border hover:bg-white hover:text-black hover:border-black hover:border-2'>
                            SAVE
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default NextWeekHOD;
