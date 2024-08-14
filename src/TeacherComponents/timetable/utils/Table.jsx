import React from "react";
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


        <div className=" rounded-lg border border-gray-400 overflow-auto">
            <table className="mobile:max-tablet:w-fit w-full items-center  rounded-lg ">
                <thead className='w-fit  bg-secondary '>
                    <tr className='w-fit'>
                        <th className="w-32 px-4 py-2 font-medium border-r border-gray-400">Lecture</th>
                        <th className="w-60 px-4 py-2 font-medium border-r border-gray-400">Timing</th>
                        <th className="w-60 px-4 py-2 font-medium border-r border-gray-400">Class</th>
                        <th className="w-60 px-4 py-2 font-medium border-r border-gray-400">Section</th>
                        <th className="w-60 px-4 py-2 font-medium border-r border-gray-400">Subject</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.length > 0 ? (
                        timetable.sort((a, b) => a.lectureNo - b.lectureNo).map((item, idx) => {
                            console.log(item.lectureNo,"lecture");
                            console.log(numberOfLeacturesBeforeLunch);

                            return (
                            <React.Fragment key={item._id}>
                                
                                <tr className='text-center border-t border-gray-400'>
                                    <td className="w-32 px-4 py-2 border-r border-gray-400">{item.lectureNo}</td>
                                    <td className="w-60 px-4 py-2 border-r whitespace-nowrap border-gray-400 bg-green-200">{`${formatTime(Time[item.lectureNo - 1].start)}-${formatTime(Time[item.lectureNo - 1].end)}`}</td>
                                    <td className="w-60 px-4 py-2 border-r border-gray-400 bg-green-200">{item.class}</td>
                                    <td className="w-60 px-4 py-2 border-r border-gray-400 bg-blue-200">{item.section}</td>
                                    <td className="w-60 px-4 py-2 whitespace-nowrap bg-blue-200">{item.subject}</td>
                                </tr>
                                {(numberOfLeacturesBeforeLunch === item.lectureNo || (timetable[idx].lectureNo < numberOfLeacturesBeforeLunch && timetable[idx+1].lectureNo >numberOfLeacturesBeforeLunch)) && (
                                    <tr className="w-full h-8 border-t border-gray-400 bg-secondary text-xl text-center">
                                        <td colSpan="5">LUNCH</td>
                                    </tr>
                                )}
                            </React.Fragment>
                        )}
                    )
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>


    );
}

export default Table;
