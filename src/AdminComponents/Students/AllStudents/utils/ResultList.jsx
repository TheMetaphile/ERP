import React from "react";
import { Link } from "react-router-dom";

export default function ResultList(){
    const students = [
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", totalMarks: "1000", percentage:'90%' },
        { id: '1006', name: "Alice", class: "XII", section: "A", marks: "900", totalMarks: "1000", percentage:'90%' },
        { id: '1004', name: "bob", class: "XII", section: "A", marks: "900", totalMarks: "1000", percentage:'90%' },
        { id: '1002', name: "Abhishek", class: "XII", section: "A", marks: "900",totalMarks: "1000", percentage:'90%' },
        { id: '1055', name: "Avni", class: "XII", section: "A", marks: "900", totalMarks: "1000", percentage:'90%' },
        { id: '1032', name: "Avni", class: "XII", section: "A", marks: "900", totalMarks: "1000", percentage:'90%' },
        { id: '1006', name: "Avni", class: "XII", section: "A", marks: "900", totalMarks: "1000", percentage:'90%' },
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", totalMarks: "1000", percentage:'90%' },
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", totalMarks: "1000", percentage:'90%'},
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", totalMarks: "1000", percentage:'90%' },
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", totalMarks: "1000", percentage:'90%' },
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", totalMarks: "1000", percentage:'90%' },
    ];
    return(
        <div className="rounded-xl shadow-lg mb-4">
    <div className="overflow-x-auto w-full mt-8 mb-4">
    <table className="min-w-full divide-y divide-gray-600">
        <thead>
            <tr>
                <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">ID</th>
                <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Name</th>
                <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Class</th>
                <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Section</th>
                <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Marks Obtain</th>
                <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Total Marks</th>
                <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Percentage %</th>
            </tr>
        </thead>
        <tbody className="bg-white">
            {students.map((student, index) => (
                <tr key={index}>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={`/Admin-Dashboard/StudentResult/Details`} className="block">{student.id}</Link>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={`/Admin-Dashboard/StudentResult/Details`} className="block">{student.name}</Link>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={`/Admin-Dashboard/StudentResult/Details`} className="block">{student.class}</Link>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={`/Admin-Dashboard/StudentResult/Details`} className="block">{student.section}</Link>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={`/Admin-Dashboard/StudentResult/Details`} className="block">{student.marks}</Link>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={`/Admin-Dashboard/StudentResult/Details`} className="block">{student.totalMarks}</Link>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={`/Admin-Dashboard/StudentResult/Details`} className="block">{student.percentage}</Link>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
</div>


    )
}