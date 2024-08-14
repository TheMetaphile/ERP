import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL_Login } from '../../../Config';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NextWeekRow from './NextWeekRow';

const NextWeek = ({ selectedTab, Class, section, subject }) => {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('');
    const [remark, setRemark] = useState('');

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

    const nextWeekDays = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(nextWeekStart);
        date.setDate(nextWeekStart.getDate() + i);
        return date;
    });

    const nextWeekFormattedDate = nextWeekStart.toISOString().split('T')[0];
    const [details, setDetails] = useState(defaultPlan());


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            accessToken: authState.accessToken,
            class: Class,
            section: section,
            subject: subject,
            startingDate: nextWeekFormattedDate,
            session: session,
            plan: details
        };
        console.log(data);

        try {
            const response = await axios.post(`${BASE_URL_Login}/lessonPlan/create`, data, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            console.log("API response:", response.data);
            toast.success('Plan Saved Successfully');

        } catch (err) {
            console.log(err.response.data.error);
            toast.error(err.response.data.error);

        }
    };


    console.log(selectedTab)
    useEffect(() => {
        const fetchPlan = async () => {

            try {
                const response = await axios.get(`${BASE_URL_Login}/lessonPlan/fetch/teacher?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${nextWeekFormattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                });
                console.log("API response:", response.data);
                if (response.data.plan && response.data.plan.length > 0) {
                    setDetails(response.data.plan);
                    setStatus(response.data.coordinatorStatus);
                    setRemark(response.data.coordinatorRemark);
                } else {
                    setDetails(defaultPlan());
                    setStatus('');
                    setRemark('');
                }
                setLoading(false);
            } catch (err) {
                console.log(err.response.data.error);
                setDetails(defaultPlan());
                setStatus('');
                setRemark('');
                setError(err.response.data.error);
                setLoading(false);
            }
        };
        if (Class && section && subject) {
            setLoading(true);
            fetchPlan();
        }
    }, [Class, section, subject, nextWeekFormattedDate]);




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
                                status === "Accept" ? (
                                    <>
                                        <NextWeekRow details={data} index={index} setDetails={setDetails} status={true} />
                                    </>
                                ) : (
                                    <>
                                        <NextWeekRow details={data} index={index} setDetails={setDetails} status={false} />
                                    </>

                                )
                            ))}
                        </tbody>
                    </table>
                    <div className='flex justify-center items-center py-4'>
                        {status === "Accept" ? (
                            <div className='flex flex-col text-lg'>
                                <div className='flex items-center'>
                                    Status : {status}
                                </div>
                                <div className='flex items-center'>
                                    Remark : {remark}
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col text-lg'>
                                <div className='flex items-center'>
                                    Status : {status}
                                </div>
                                <div className='flex items-center'>
                                    Remark : {remark}
                                </div>
                                <button
                                    type="submit"
                                    className='p-1 px-4 rounded-md bg-secondary font-semibold border-black border hover:bg-white hover:text-black hover:border-black hover:border-2'>
                                    SAVE
                                </button>
                            </div>

                        )}

                    </div>
                </form>

            )
            }
        </div >
    );
};

export default NextWeek;
