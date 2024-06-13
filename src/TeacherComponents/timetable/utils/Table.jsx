import { useEffect, useState } from 'react';
import Loading from '../../../LoadingScreen/Loading'
function Table({ data }) {
    const [isLoading, setIsLoading] = useState(true);
    const timetable = data?.timetable || [];

    useEffect(() => {
        if (data) {
            setIsLoading(false);
        }
    }, [data]);

    return (
        <div className="container rounded-lg ">
            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <Loading />
                </div>
            ) : (
                <div className=" rounded-lg">
                    <table className="w-full  items-center  rounded-lg">
                        <thead className='rounded-lg  bg-secondary '>
                            <tr className='rounded-lg'>
                                <th className="px-4 py-2">Lecture</th>
                                <th className="px-4 py-2 ">Subject</th>
                                <th className="px-4 py-2 ">Class</th>
                                <th className="px-4 py-2 rounded-lg">Section</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timetable.length > 0 ? (
                                timetable.map((item) => (
                                    <tr key={item._id} className='text-center'>
                                        <td className="px-4 py-2">{item.lectureNo}</td>
                                        <td className="px-4 py-2 bg-blue-200">{item.subject}</td>
                                        <td className="px-4 py-2">{item.class}</td>
                                        <td className="px-4 py-2 bg-green-200">{item.section}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Table;
