import React from 'react';
import { Link } from 'react-router-dom';

const SemesterRow = ({ student }) => {

    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-3 py-4">{student.rollNumber}</td>
            <td className="px-3 py-4">
                <Link to={`/Sub-Admin/Students/details/${student.email}`} className="rounded-full flex items-center gap-2 text-center px-3 py-2 font-semibold bg-blue-100 text-blue-800">
                    <img src={student.studentProfileLink} alt="profile pic" className=' w-8 h-8 rounded-full mobile:max-sm:hidden' />
                    {student.studentName}
                </Link>
            </td>
            <td className="px-3 py-4">{student.fatherNumber}</td>
            <td className="px-3 py-4">
                <div className='text-blue-700 px-2 py-1 bg-blue-100 font-semibold border border-blue-600 rounded-full'>
                    ₹ {student.totalFee}
                </div>
            </td>
            <td className="px-3 py-4">
                <div className='text-blue-700 px-2 py-1 bg-blue-100 font-semibold border border-blue-600 rounded-full'>
                    ₹ {student.manualDiscount + student.categoryDiscount}
                </div>
            </td>
            <td className="px-3 py-4">
                <div className='text-green-700 px-2 py-1 bg-green-100 font-semibold border border-green-600 rounded-full'>
                    ₹ {student.paidFee}
                </div>
            </td>
            <td className="px-3 py-4">
                <div className='text-red-700 px-2 py-1 bg-red-100 font-semibold border border-red-600 rounded-full'>
                    ₹ {student.totalFee - student.manualDiscount - student.categoryDiscount - student.paidFee}
                </div>
            </td>
        </tr>
    );
};

export default SemesterRow;