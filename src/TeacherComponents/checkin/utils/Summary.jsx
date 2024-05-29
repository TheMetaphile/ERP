import React from 'react';
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
const Summary = () => {
    const entries = [
        { date: '11', day: 'Tue', checkIn: '09:00am', checkOut: '05:45pm', hours: '07h 30m', color: 'green' },
        { date: '10', day: 'Mon', checkIn: '09:00am', checkOut: '05:45pm', hours: '07h 30m', color: 'red' },
        { date: '09', day: 'Sat',  },
        { date: '08', day: 'Sun',  },
        { date: '07', day: 'Fri', checkIn: '09:00am', checkOut: '05:45pm', hours: '07h 30m', color: 'green' },
        { date: '06', day: 'Thu', checkIn: '09:00am', checkOut: '05:45pm', hours: '07h 30m', color: 'green' },
       
    ];
  return (
    <div className=" rounded-md ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="px-3 py-2">Attendance Summary</h1>
        <div className="flex items-center p-2">
          
        <FaLessThan /><span className="ml-2 mr-2">April 2024</span><FaGreaterThan />
          
        </div>
      </div>
      <table className="w-full border-collapse">
            <thead className="bg-orange-200">
                <tr>
                    <th className="px-4 py-2 text-left border-b">Date</th>
                    <th className="px-4 py-2 text-left border-b">Check In</th>
                    <th className="px-4 py-2 text-left border-b">Check Out</th>
                    <th className="px-4 py-2 text-left border-b">Working Hours</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry, index) => (
                    <tr key={index} className={` ${entry.day === 'Sat' || entry.day === 'Sun' ? 'bg-yellow-100' : ''}`}>
                        <td className="px-4 py-2 text-center border-b">
                            <div className="flex items-center justify-center">
                                <span className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                                    {entry.date}
                                </span>
                                <span className="ml-2">{entry.day}</span>
                            </div>
                        </td>
                        <td className={`px-4 py-2 text-${entry.color}-500 border-b`}>{entry.checkIn}</td>
                        <td className={`px-4 py-2 text-${entry.color}-500 border-b`}>{entry.checkOut}</td>
                        <td className={`px-4 py-2 text-${entry.color}-500 border-b`}>{entry.hours}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default Summary;