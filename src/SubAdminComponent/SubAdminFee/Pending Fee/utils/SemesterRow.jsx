import React from 'react';
import { Link } from 'react-router-dom';

const SemesterRow = ({ student }) => {

    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-3 py-4">{student.enrollmentNo}</td>
            <td className="px-3 py-4">
                <Link to={`/Department-Dashboard/student/${student.id}`} className="whitespace-nowrap rounded-full text-center px-3 py-2 font-semibold bg-blue-100 text-blue-800">
                    {student.name}
                </Link>
            </td>
            <td className="px-3 py-4">{student.studentWhatsAppNo}</td>
            <td className="px-3 py-4">
                <div className='text-blue-700 px-2 py-1 bg-blue-100 font-semibold border border-blue-600 rounded-full'>
                    ₹ {student.totalSemesterFee}
                </div>
            </td>
            <td className="px-3 py-4">
                <div className='text-blue-700 px-2 py-1 bg-blue-100 font-semibold border border-blue-600 rounded-full'>
                    ₹ {student.totalDiscount}
                </div>
            </td>
            <td className="px-3 py-4">
                <div className='text-green-700 px-2 py-1 bg-green-100 font-semibold border border-green-600 rounded-full'>
                    ₹ {student.totalSemesterPaid}
                </div>
            </td>
            <td className="px-3 py-4">
                <div className='text-red-700 px-2 py-1 bg-red-100 font-semibold border border-red-600 rounded-full'>
                    ₹ {student.totalSemesterFee - student.totalSemesterPaid - student.totalDiscount}
                </div>
            </td>
            <td className="px-3 py-4">
                <div className='text-blue-700 px-2 py-1 bg-blue-100 font-semibold border border-blue-600 rounded-full'>
                    ₹ {student.totalAdditionalFee}
                </div>
            </td>
            <td className="px-3 py-4">
                <div className='text-green-700 px-2 py-1 bg-green-100 font-semibold border border-green-600 rounded-full'>
                    ₹ {student.totalAdditionalPaid}
                </div>
            </td>
            <td className="px-3 py-4">
                <div className='text-red-700 px-2 py-1 bg-red-100 font-semibold border border-red-600 rounded-full'>
                    ₹ {student.totalAdditionalFee - student.totalAdditionalPaid}
                </div>
            </td>
        </tr>
    );
};

export default SemesterRow;