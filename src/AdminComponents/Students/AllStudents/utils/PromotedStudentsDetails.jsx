import React from "react";

export default function PromotedStudentsDetails({ students }) {
    const numToRoman = {
        '1': "I",
        "12": "XII"
    };
    return (
        <div className="rounded-xl shadow-lg mb-4">
            <div className="overflow-x-auto w-full mt-4 mobile:max-tablet:mt-12 rounded-lg">
                <table className="min-w-full divide-y divide-gray-600">
                    <thead className="">
                        <tr>
                            <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">ID</th>
                            <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Name</th>
                            <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Class</th>
                            <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Section</th>
                            <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Marks</th>
                            <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">GPA</th>
                            <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Remark</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{student.id}</td>
                                <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{student.name}</td>
                                <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{numToRoman[student.class]}</td>
                                <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{student.section}</td>
                                <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{student.marks}</td>
                                <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{student.gpa}</td>
                                <td className="px-6 py-2 whitespace-nowrap text-lg border-r">
                                    <div className="flex justify-center">
                                        <button className={`${student.remark === 'Promoted' ? 'bg-green-300' : 'bg-red-300'} px-2 py-1 text-lg text-black rounded-md`}>
                                            {student.remark}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}