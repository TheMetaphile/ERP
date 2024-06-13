

function Table({ data }) {


    const timetable = data?.timetable || [];
    return (
        <div className="container ">

            <div className=" ">
                <table className="w-full  items-center">
                    <thead className="bg-secondary">
                        <tr>
                            <th className="px-4 py-2">Lecture</th>
                            <th className="px-4 py-2">Subject</th>
                            <th className="px-4 py-2">Class</th>
                            <th className="px-4 py-2">Section</th>

                        </tr>
                    </thead>
                    <tbody>
                        {timetable.length > 0 ? (
                            timetable.sort((a,b)=>a.lectureNo - b.lectureNo).map((item) => (
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


        </div>
    );
}

export default Table;
