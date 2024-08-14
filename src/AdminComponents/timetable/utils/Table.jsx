import React from 'react';

function Table({  data, Time, numberOfLeacturesBeforeLunch }) {

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
        <div className="w-full overflow-auto mobile:max-tablet:w-auto mt-4 rounded-lg border border-gray-400 shadow-md">
            <div className="">
                <table className="w-full mobile:max-tablet:w-auto items-center rounded-lg whitespace-nowrap">
                    <thead className="bg-secondary ">
                        <tr>
                            <th className="px-4 py-2 font-medium border-r border-gray-400">Lecture</th>
                            <th className="px-4 py-2 font-medium border-r border-gray-400">Timing</th>
                            <th className="px-4 py-2 font-medium border-r border-gray-400">Class</th>
                            <th className="px-4 py-2 font-medium border-r border-gray-400">Section</th>
                            <th className="px-4 py-2 font-medium border-r border-gray-400">Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetable.length > 0 ? (
                            timetable.sort((a, b) => a.lectureNo - b.lectureNo).map((item, idx) => (
                                <React.Fragment key={item._id}>
                                    {numberOfLeacturesBeforeLunch === item.lectureNo - 1 && (
                                        <tr className="w-full h-8 border-t border-gray-400 bg-secondary text-xl text-center">
                                            <td colSpan="5">LUNCH</td>
                                        </tr>
                                    )}
                                    <tr className='text-center border-t border-gray-400'>
                                        <td className="px-4 py-2 border-r border-gray-400">{item.lectureNo}</td>
                                        <td className="px-4 py-2 border-r border-gray-400 bg-green-200">{`${formatTime(Time[item.lectureNo - 1].start)}-${formatTime(Time[item.lectureNo - 1].end)}`}</td>
                                        <td className="px-4 py-2 border-r border-gray-400 bg-green-200">{item.class}</td>
                                        <td className="px-4 py-2 border-r border-gray-400 bg-blue-200">{item.section}</td>
                                        <td className="px-4 py-2 border-r border-gray-400 bg-blue-200">{item.subject}</td>
                                    </tr>
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 ">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
