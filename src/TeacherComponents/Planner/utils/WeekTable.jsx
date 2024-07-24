import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL_Login } from '../../../Config';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WeekTable = ({ selectedTab, Class, section, subject }) => {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [nextWeekPlans, setNextWeekPlans] = useState(Array(6).fill(''));
    const [nextWeekTopics, setNextWeekTopics] = useState(Array(6).fill(''));
    const [nextWeekActivities, setNextWeekActivities] = useState(Array(6).fill('N/A'));
    const [nextWeekChapters, setNextWeekChapters] = useState(Array(6).fill(''));
    const [error, setError] = useState(null);

    const getCurrentSession = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        return currentMonth >= 3 ? `${currentYear}-${(currentYear + 1).toString().slice(-2)}` : `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    };

    const session = getCurrentSession();
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const nextWeekStart = new Date(startOfWeek);
    nextWeekStart.setDate(startOfWeek.getDate() + 7);
    const nextWeekDays = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(nextWeekStart);
        date.setDate(nextWeekStart.getDate() + i);
        return date;
    });

    const formattedDate = nextWeekStart.toISOString().split('T')[0];

    const handleInputChange = (index, field, value) => {
        switch (field) {
            case 'plan':
                const newPlans = [...nextWeekPlans];
                newPlans[index] = value;
                setNextWeekPlans(newPlans);
                break;
            case 'topic':
                const newTopics = [...nextWeekTopics];
                newTopics[index] = value;
                setNextWeekTopics(newTopics);
                break;
            case 'activity':
                const newActivities = [...nextWeekActivities];
                newActivities[index] = value;
                setNextWeekActivities(newActivities);
                break;
            case 'chapter':
                const newChapters = [...nextWeekChapters];
                newChapters[index] = value;
                setNextWeekChapters(newChapters);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const plan = nextWeekDays.map((day, index) => ({
            date: day.toISOString().split('T')[0],
            chapter: nextWeekChapters[index],
            topic: nextWeekTopics[index],
            TeachingAids: "White board, Marker",
            Activity: nextWeekActivities[index]
        }));

        const data = {
            accessToken: authState.accessToken,
            class: Class,
            section: section,
            subject: subject,
            startingDate: formattedDate,
            session: session,
            plan: plan
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
            setNextWeekPlans('');
            setNextWeekTopics('');
            setNextWeekActivities('N/A');
            setNextWeekChapters('');
        } catch (err) {
            console.log(err.response.data.error);
            toast.error(err.response.data.error);

        }
    };

    useEffect(() => {
        const fetchPlan = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL_Login}/lessonPlan/fetch/teacher?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${formattedDate}`, {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                });
                console.log("API response:", response.data);
                setDetails(response.data.plan);
                setLoading(false);
            } catch (err) {
                console.log(err.response.data.error);
                setError(err.response.data.error);
                setLoading(false);
            }
        };
        fetchPlan();
    }, [authState.accessToken, Class, section, subject, session]);

    const renderTableRows = (detail, editable = false) => {
        return detail.map((day, index) => (
            <tr key={index}>
                <td className='border-y p-4 border-black'>{day.date}</td>
                <td className='border-y p-4 border-black'>
                    {editable ? (
                        <input
                            className='border-secondary border-2 rounded-md p-2'
                            type="text"
                            value={nextWeekChapters[index]}
                            onChange={(e) => handleInputChange(index, 'chapter', e.target.value)}
                        />
                    ) : day.chapter}
                </td>
                <td className='border-y p-4 border-black'>
                    {editable ? (
                        <input
                            className='border-secondary border-2 rounded-md p-2'
                            type="text"
                            value={nextWeekTopics[index]}
                            onChange={(e) => handleInputChange(index, 'topic', e.target.value)}
                        />
                    ) : day.topic}
                </td>
                <td className='border-y p-4 border-black'>
                    {editable ? (
                        <input
                            className='border-secondary border-2 rounded-md p-2'
                            type="text"
                            value={nextWeekPlans[index]}
                            onChange={(e) => handleInputChange(index, 'plan', e.target.value)}
                        />
                    ) : day.plan}
                </td>
                <td className='border-y p-4 border-black'>
                    {editable ? (
                        <input
                            className='border-secondary border-2 rounded-md p-2'
                            type="text"
                            value={nextWeekActivities[index]}
                            onChange={(e) => handleInputChange(index, 'activity', e.target.value)}
                        />
                    ) : day.Activity}
                </td>
            </tr>
        ));
    };

    return (
        <div className='rounded-md'>
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <>No Data Available</>
            ) : (
                selectedTab === 'Current Week' ? (
                    <table className='w-full rounded-md border border-purple-700'>
                        <thead className='bg-secondary border-b border-black'>
                            <tr className='p-4 text-center'>
                                <th className='border-y border-black py-2 text-xl font-semibold'>Date</th>
                                <th className='border-y border-black py-2 text-xl font-semibold'>Chapter</th>
                                <th className='border-y border-black py-2 text-xl font-semibold'>Topic</th>
                                <th className='border-y border-black py-2 text-xl font-semibold'>Plan</th>
                                <th className='border-y border-black py-2 text-xl font-semibold'>Activity (if any)</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {renderTableRows(details)}
                        </tbody>
                    </table>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <table className='w-full rounded-md border border-purple-700'>
                            <thead className='bg-secondary border-b border-black'>
                                <tr className='p-4 text-center'>
                                    <th className='border-y border-black py-2 text-xl font-semibold'>Date</th>
                                    <th className='border-y border-black py-2 text-xl font-semibold'>Chapter</th>
                                    <th className='border-y border-black py-2 text-xl font-semibold'>Topic</th>
                                    <th className='border-y border-black py-2 text-xl font-semibold'>Plan</th>
                                    <th className='border-y border-black py-2 text-xl font-semibold'>Activity (if any)</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {renderTableRows(nextWeekDays, true)}
                            </tbody>
                        </table>
                        <div className='flex justify-center items-center py-4'>
                            <button
                                type="submit"
                                className='p-1 px-4 rounded-md bg-secondary font-semibold border-black border hover:bg-white hover:text-black hover:border-black hover:border-2'>
                                SAVE
                            </button>
                        </div>
                    </form>
                )
            )}
        </div>
    );
};

export default WeekTable;
