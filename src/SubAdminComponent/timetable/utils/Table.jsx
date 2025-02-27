import React from 'react';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaClock, FaUsers, FaBookOpen } from 'react-icons/fa';

function Table({ data, Time, numberOfLeacturesBeforeLunch }) {

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${strMinutes} ${ampm}`;
    };

    const timetable = data?.timetable || [];
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full overflow-auto mt-4 rounded-lg border border-purple-400 shadow-lg "
        >
            <table className="w-full items-center rounded-lg whitespace-nowrap">
                <thead className="bg-gradient-to-r from-purple-200 to-purple-100 text-black">
                    <tr>
                        <th className="px-4 py-3 font-medium"><FaChalkboardTeacher className="inline mr-2" />Lecture</th>
                        <th className="px-4 py-3 font-medium"><FaClock className="inline mr-2" />Timing</th>
                        <th className="px-4 py-3 font-medium"><FaUsers className="inline mr-2" />Class</th>
                        <th className="px-4 py-3 font-medium">Section</th>
                        <th className="px-4 py-3 font-medium"><FaBookOpen className="inline mr-2" />Subject</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.length > 0 ? (
                        timetable.sort((a, b) => a.lectureNo - b.lectureNo).map((item, idx) => (
                            <React.Fragment key={item._id}>
                                {numberOfLeacturesBeforeLunch === item.lectureNo - 1 && (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-10 bg-purple-200 text-xl text-center font-semibold"
                                    >
                                        <td colSpan="5">LUNCH BREAK</td>
                                    </motion.tr>
                                )}
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                    className='text-center hover:bg-purple-100 transition-colors duration-200'
                                >
                                    <td className="px-4 py-3">{item.lectureNo}</td>
                                    <td className="px-4 py-3 ">{`${formatTime(Time[item.lectureNo - 1].start)}-${formatTime(Time[item.lectureNo - 1].end)}`}</td>
                                    <td className="px-4 py-3 ">{item.class}</td>
                                    <td className="px-4 py-3 ">{item.section}</td>
                                    <td className="px-4 py-3 ">{item.subject}</td>
                                </motion.tr>
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-6 text-purple-600">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </motion.div>

    );
}

export default Table;
