import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL_Login } from '../../../../../Config';
import axios from 'axios';
import AuthContext from '../../../../../Context/AuthContext';
import Loading from '../../../../../LoadingScreen/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { topics, plans, chapters } from './topics';

const WeekTable = ({ selectedTab, Class, section, subject }) => {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [nextWeekPlans, setNextWeekPlans] = useState(Array(6).fill(''));
    const [nextWeekTopics, setNextWeekTopics] = useState(topics);
    const [nextWeekActivities, setNextWeekActivities] = useState(plans);
    const [nextWeekChapters, setNextWeekChapters] = useState(chapters);
    const [error, setError] = useState(null);


    const getCurrentSession = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        return currentMonth >= 3 ? `${currentYear}-${(currentYear + 1).toString().slice(-2)}` : `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    };

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

    const nextWeekFormattedDate = `${nextWeekStart.getFullYear()}-${ nextWeekStart.getMonth() <10 ? `0${nextWeekStart.getMonth()+1}` : nextWeekStart.getMonth()+1}-${nextWeekStart.getDate()}`;

    const currentWeekFormattedDate = `${currentWeekStart.getFullYear()}-${ currentWeekStart.getMonth() <10 ? `0${currentWeekStart.getMonth()+1}` : currentWeekStart.getMonth()+1}-${currentWeekStart.getDate()}`;



    const [date, SetDate] = useState(currentWeekStart);

    useEffect(() => {

        console.log(nextWeekFormattedDate);
        const handleDate = () => {
            if (selectedTab === 'Next Week') {
                SetDate(nextWeekFormattedDate);
            }
            else {
                SetDate(currentWeekFormattedDate);
            }
        }
        handleDate();
    }, [selectedTab])





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
            TeachingAids: nextWeekPlans[index],
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

    console.log(date)
    console.log(selectedTab)
    useEffect(() => {
        console.log(date)
        const fetchPlan = async () => {

            try {
                const response = await axios.get(`${BASE_URL_Login}/lessonPlan/fetch/coordinator?class=${Class}&section=${section}&subject=${subject}&session=${session}&startingDate=${date}`, {
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
        if (Class && section && subject) {
            setLoading(true);
            setDetails([]);
            fetchPlan();
        }
    }, [authState.accessToken, Class, section, subject, session, date]);

    console.log(nextWeekDays)
    const renderTableRows = (detail, editable = false) => {
        return detail.map((day, index) => (
            <tr key={index}>
                <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                    {day.date}
                </td>

                <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                    {day.chapter}
                </td>
                <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                    {day.topic}
                </td>
                <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                    {day.plan}
                </td>
                <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                    {day.Activity}
                </td>
                {editable && (
                    <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                        <input
                            className='border-secondary border-2 rounded-md p-2'
                            type="text"
                            value={nextWeekActivities[index]}
                            onChange={(e) => handleInputChange(index, 'activity', e.target.value)}
                        />
                    </td>
                )}

            </tr>
        ));
    };


    return (
        <div className='rounded-md overflow-auto'>
            {loading ? (
                <Loading />
            ) : details.length === 0 && selectedTab === 'Current Week' ? (
                <>No Data Available</>
            ) : (
                selectedTab === 'Current Week' ? (
                    <table className='w-full rounded-md border border-black'>
                        <thead className='bg-secondary border-b border-black'>
                            <tr className='p-4 text-center'>
                                <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 font-semibold'>Date</th>
                                <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold'>Chapter</th>
                                <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold'>Topic</th>
                                <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold'>Teaching Aids</th>
                                <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal gap-2 whitespace-nowrap font-semibold'>Activity (if any)</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {renderTableRows(details)}
                        </tbody>
                    </table>
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
                                    <th className='border-y border-black py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:font-normal whitespace-nowrap font-semibold'>Remark</th>
                                </tr>
                            </thead>
                            <tbody className='text-center whitespace-nowrap'>
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
