import { useState } from 'react';
import Upload from './Upload';

function Table() {
    const days = [
        {
            name: 'Monday', lectures: 4, timetable: [
                { time: '09:30 - 10:30', subject: 'Chemistry', class: 'IX' },
                { time: '10:30 - 11:30', subject: 'Maths', class: 'X' },
                { time: '11:30 - 12:30', subject: 'Biology', class: 'IX' },
                { time: '12:30 - 01:30', subject: 'Break', class: '---' },
                { time: '01:30 - 02:30', subject: 'Physics', class: 'XI' },
                { time: '02:30 - 03:30', subject: 'English', class: 'X' },
            ]
        },
        {
            name: 'Tuesday', lectures: 4, timetable: [
                { time: '09:30 - 10:30', subject: 'Chemistry', class: 'IX' },
                { time: '10:30 - 11:30', subject: 'Maths', class: 'X' },
                { time: '11:30 - 12:30', subject: 'Biology', class: 'IX' },
                { time: '12:30 - 01:30', subject: 'Break', class: '---' },
                { time: '01:30 - 02:30', subject: 'Physics', class: 'XI' },
                { time: '02:30 - 03:30', subject: 'English', class: 'X' },
            ]
        },
        {
            name: 'Wednesday', lectures: 4, timetable: [
                { time: '09:30 - 10:30', subject: 'Chemistry', class: 'IX' },
                { time: '10:30 - 11:30', subject: 'Maths', class: 'X' },
                { time: '11:30 - 12:30', subject: 'Biology', class: 'IX' },
                { time: '12:30 - 01:30', subject: 'Break', class: '---' },
                { time: '01:30 - 02:30', subject: 'Physics', class: 'XI' },
                { time: '02:30 - 03:30', subject: 'English', class: 'X' },
            ]
        },
        {
            name: 'Thursday', lectures: 4, timetable: [
                { time: '09:30 - 10:30', subject: 'Chemistry', class: 'IX' },
                { time: '10:30 - 11:30', subject: 'Maths', class: 'X' },
                { time: '11:30 - 12:30', subject: 'Biology', class: 'IX' },
                { time: '12:30 - 01:30', subject: 'Break', class: '---' },
                { time: '01:30 - 02:30', subject: 'Physics', class: 'XI' },
                { time: '02:30 - 03:30', subject: 'English', class: 'X' },
            ]
        },
        {
            name: 'Friday', lectures: 4, timetable: [
                { time: '09:30 - 10:30', subject: 'Chemistry', class: 'IX' },
                { time: '10:30 - 11:30', subject: 'Maths', class: 'X' },
                { time: '11:30 - 12:30', subject: 'Biology', class: 'IX' },
                { time: '12:30 - 01:30', subject: 'Break', class: '---' },
                { time: '01:30 - 02:30', subject: 'Physics', class: 'XI' },
                { time: '02:30 - 03:30', subject: 'English', class: 'X' },
            ]
        },
        {
            name: 'Saturday',
        },
    ];
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [popUp,setPopUp]=useState(false);
    const currentDay = days.find(day => day.name === selectedDay);

    const togglePopUp=()=>{
        setPopUp(!popUp)
    }
    return (
        <div className="container mx-auto p-4">

            <div className="flex mb-4 justify-between">
                <div>
                {days.map(day => (
                    <button
                        key={day.name}
                        className={`px-4 py-2 rounded-md mr-2 ${selectedDay === day.name ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={() => setSelectedDay(day.name)}
                    >
                        {day.name}
                    </button>
                ))}
                </div>

                <button
                    className='px-4 py-2 rounded-md mr-2 bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'
                    onClick={togglePopUp}
                >
                    Upload
                </button>
            </div>
            <div className="  p-4">
                <h2 className="text-xl font-medium mb-2">
                    {selectedDay} ({currentDay.lectures} Lectures)
                </h2>
                {currentDay.timetable && (
                    <table className="w-full table-auto items-center">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Time</th>
                                <th className="px-4 py-2">Subject</th>
                                <th className="px-4 py-2">Class</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentDay.timetable.map((lesson, index) => (
                                <tr key={index} className='text-center'>
                                    <td className="px-4 py-2">{lesson.time}</td>
                                    <td className="px-4 py-2">{lesson.subject}</td>
                                    <td className="px-4 py-2">{lesson.class}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {
                    popUp && (
                        <Upload onClose={togglePopUp} />
                    )
                }
        </div>
    );
}

export default Table;
