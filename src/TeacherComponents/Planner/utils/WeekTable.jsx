import React, { useEffect, useState, useContext } from 'react';
import { topics, plans, chapters } from './topics';
import { BASE_URL_Login } from '../../../Config';
import axios from "axios";
import AuthContext from '../../../Context/AuthContext';
import Loading from '../../../LoadingScreen/Loading';

const WeekTable = ({ selectedTab, Class, section, subject }) => {
    const { authState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);
    const [nextWeekPlans, setNextWeekPlans] = useState(Array(6).fill(''));
    const [nextWeekTopics, setNextWeekTopics] = useState(topics);
    const [nextWeekActivities, setNextWeekActivities] = useState(plans);
    const [nextWeekChapters, setNextWeekChapters] = useState(chapters);

    function getCurrentSession() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        if (currentMonth >= 3) {
            return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
        } else {
            return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
        }
    }
    const session = getCurrentSession();

    const currentDate = new Date();
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const daysOfWeek = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date;
    });

    const nextWeekStart = new Date(startOfWeek);
    nextWeekStart.setDate(startOfWeek.getDate() + 7);
    const nextWeekDays = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(nextWeekStart);
        date.setDate(nextWeekStart.getDate() + i);
        return date;
    });


    const formattedDate = nextWeekStart.toISOString().split('T')[0];
    console.log(formattedDate, session, Class, section, subject);

    const handleInputChange = (index, field, value) => {
        if (field === 'plan') {
            const newPlans = [...nextWeekPlans];
            newPlans[index] = value;
            setNextWeekPlans(newPlans);
        } else if (field === 'topic') {
            const newTopics = [...nextWeekTopics];
            newTopics[index] = value;
            setNextWeekTopics(newTopics);
        } else if (field === 'activity') {
            const newActivities = [...nextWeekActivities];
            newActivities[index] = value;
            setNextWeekActivities(newActivities);
        } else if (field === 'chapter') {
            const newChapters = [...nextWeekChapters];
            newChapters[index] = value;
            setNextWeekChapters(newChapters);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };


    useEffect(() => {
        const fetchPlan = async () => {
            const session = getCurrentSession();
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
                console.log(err)
                setLoading(false);
            }
        };
        fetchPlan();
    }, [authState.accessToken, Class, section, subject])


    const renderTableRows = (days, topics, plans, chapters, editable = false) => {
        return days.map((day, index) => (
            <tr className='' key={index}>
                <td className=' border-y p-4 border-black whitespace-nowrap'>{day.toDateString()}</td>
                <td className=' border-y p-4 border-black whitespace-nowrap'>{editable ? (
                    <input
                        className=' border-secondary border-2 rounded-md p-2 mobile:max-tablet:p-1 '
                        type="text"
                        value={chapters[index]}
                        onChange={(e) => handleInputChange(index, 'chapter', e.target.value)}
                    />
                ) : chapters[index]}</td>
                <td className=' border-y p-4 border-black whitespace-nowrap'>{editable ? (
                    <input
                        className=' border-secondary border-2 rounded-md p-2 mobile:max-tablet:p-1'
                        type="text"
                        value={topics[index]}
                        onChange={(e) => handleInputChange(index, 'topic', e.target.value)}
                    />
                ) : topics[index]}</td>
                <td className=' border-y p-4 border-black whitespace-nowrap'>{editable ? (
                    <input
                        className=' border-secondary border-2 rounded-md p-2 mobile:max-tablet:p-1'
                        type="text"
                        value={plans[index]}
                        onChange={(e) => handleInputChange(index, 'plan', e.target.value)}
                    />
                ) : plans[index]}</td>
                <td className=' border-y p-4 border-black whitespace-nowrap'>{editable ? (
                    <input
                        className=' border-secondary border-2 rounded-md p-2 mobile:max-tablet:p-1'
                        type="text"
                        value={nextWeekPlans[index]}
                        onChange={(e) => handleInputChange(index, 'activity', e.target.value)}
                    />
                ) : nextWeekPlans[index]}</td>
            </tr>
        ));
    };

    return (
        <div className=' rounded-md border border-black overflow-auto'>
            {selectedTab === 'Current Week' ? (
                <table className='w-full '>
                    <thead className=' bg-secondary  '>
                        <tr className='p-4 text-center'>
                            <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:py-1 font-semibold'>Date</th>
                            <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:py-1 font-semibold'>Chapter</th>
                            <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:py-1 font-semibold'>Topic</th>
                            <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:py-1 font-semibold'>Plan</th>
                            <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:py-1 font-semibold'>Activity (if any)</th>
                        </tr>
                    </thead>
                    <tbody className=' text-center'>
                        {renderTableRows(daysOfWeek, topics, plans, chapters)}
                    </tbody>
                </table>
            ) : (
                <div className=' '>
                    <form onSubmit={handleSubmit}>
                        <table className='w-full'>
                            <thead className=' bg-secondary  mobile:max-tablet:text-lg mobile:max-tablet:font-normal'>
                                <tr className='p-4 text-center '>
                                    <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:py-1 font-semibold'>Date</th>
                                    <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:py-1 font-semibold'>Chapter</th>
                                    <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:py-1 font-semibold'>Topic</th>
                                    <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:py-1 font-semibold'>Plan</th>
                                    <th className=' py-2 text-xl mobile:max-tablet:text-lg mobile:max-tablet:py-1 font-semibold'>Activity <br />(if any)</th>

                                </tr>
                            </thead>
                            <tbody className=' text-center whitespace-nowrap'>
                                {renderTableRows(nextWeekDays, nextWeekTopics, nextWeekActivities, nextWeekChapters, true)}
                            </tbody>
                        </table>
                        <div className=' flex justify-center items-center py-4'>
                            <button type="submit" className='p-1 px-4 rounded-md bg-secondary font-semibold border-black border hover:bg-white hover:text-black hover:border-black hover:border-2'>SAVE</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default WeekTable;
