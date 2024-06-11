

function Table({ data }) {


    const timetable = data?.timetable || [];
    return (
        <div className="container mx-auto p-4">

            <div className="  p-4">
                <table className="w-full table-auto items-center">
                    <thead>
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
                                    <td className="px-4 py-2">{item.subject}</td>
                                    <td className="px-4 py-2">{item.class}</td>
                                    <td className="px-4 py-2">{item.section}</td>
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
