import React from "react";

export default function PromotedStudentsDetails({ students }) {
    return (
        <div className="overflow-x-auto w-full mt-8 mb-4">
            <table className="min-w-full divide-y divide-gray-600">
                <thead className="">
                    <tr>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r">ID</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r">Name</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r">Class</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r">Section</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r">Marks</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r">GPA</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r">Remark</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{student.id}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{student.name}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{student.class}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{student.section}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{student.marks}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{student.gpa}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r">
                                <div className="flex justify-center">
                                    <button className={`${student.remark === 'Promoted' ? 'bg-green-500' : 'bg-red-500'} px-4 py-4 text-lg text-black rounded-md`}>
                                        {student.remark}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}