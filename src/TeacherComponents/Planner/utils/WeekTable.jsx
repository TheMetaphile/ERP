import React, { useState } from 'react';
import { topics, plans, chapters } from './topics';

const WeekTable = ({ selectedTab }) => {
    const [nextWeekPlans, setNextWeekPlans] = useState(Array(6).fill(''));
    const [nextWeekTopics, setNextWeekTopics] = useState(topics);
    const [nextWeekActivities, setNextWeekActivities] = useState(plans);
    const [nextWeekChapters, setNextWeekChapters] = useState(chapters);

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

    const renderTableRows = (days, topics, plans, chapters, editable = false) => {
        return days.map((day, index) => (
            <tr className='' key={index}>
                <td className=' border-y p-4 border-black'>{day.toDateString()}</td>
                <td className=' border-y p-4 border-black'>{editable ? (
                    <input
                        className=' border-secondary border-2 rounded-md p-2'
                        type="text"
                        value={chapters[index]}
                        onChange={(e) => handleInputChange(index, 'chapter', e.target.value)}
                    />
                ) : chapters[index]}</td>
                <td className=' border-y p-4 border-black'>{editable ? (
                    <input
                        className=' border-secondary border-2 rounded-md p-2'
                        type="text"
                        value={topics[index]}
                        onChange={(e) => handleInputChange(index, 'topic', e.target.value)}
                    />
                ) : topics[index]}</td>
                <td className=' border-y p-4 border-black'>{editable ? (
                    <input
                        className=' border-secondary border-2 rounded-md p-2'
                        type="text"
                        value={plans[index]}
                        onChange={(e) => handleInputChange(index, 'plan', e.target.value)}
                    />
                ) : plans[index]}</td>
                <td className=' border-y p-4 border-black'>{editable ? (
                    <input
                        className=' border-secondary border-2 rounded-md p-2'
                        type="text"
                        value={nextWeekPlans[index]}
                        onChange={(e) => handleInputChange(index, 'activity', e.target.value)}
                    />
                ) : nextWeekPlans[index]}</td>
            </tr>
        ));
    };

    return (
        <div className=' rounded-md'>
            {selectedTab === 'Current Week' ? (
                <table className='w-full rounded-md border border-purple-700'>
                    <thead className=' bg-secondary border-b border-black '>
                        <tr className='p-4 text-center'>
                            <th className='border-y border-black py-2 text-xl font-semibold'>Date</th>
                            <th className='border-y border-black py-2 text-xl font-semibold'>Chapter</th>
                            <th className='border-y border-black py-2 text-xl font-semibold'>Topic</th>
                            <th className='border-y border-black py-2 text-xl font-semibold'>Plan</th>
                            <th className='border-y border-black py-2 text-xl font-semibold'>Activity (if any)</th>
                        </tr>
                    </thead>
                    <tbody className=' text-center'>
                        {renderTableRows(daysOfWeek, topics, plans, chapters)}
                    </tbody>
                </table>
            ) : (
                <div>
                    <form onSubmit={handleSubmit}>
                        <table className='w-full rounded-md border border-purple-700'>
                            <thead className=' bg-secondary border-b border-black '>
                                <tr className='p-4 text-center'>
                                    <th className='border-y border-black py-2 text-xl font-semibold'>Date</th>
                                    <th className='border-y border-black py-2 text-xl font-semibold'>Chapter</th>
                                    <th className='border-y border-black py-2 text-xl font-semibold'>Topic</th>
                                    <th className='border-y border-black py-2 text-xl font-semibold'>Plan</th>
                                    <th className='border-y border-black py-2 text-xl font-semibold'>Activity (if any)</th>

                                </tr>
                            </thead>
                            <tbody className=' text-center'>
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
