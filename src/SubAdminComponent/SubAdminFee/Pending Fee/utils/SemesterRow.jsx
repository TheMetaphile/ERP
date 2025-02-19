import React from 'react';
import { Link } from 'react-router-dom';

const SemesterRow = ({ student }) => {

    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-3 py-4">{student.rollNumber}</td>
            <td className="px-3 py-4">
                <h1 className="w-44 mobile:max-tablet:w- text-lg flex items-center gap-2 text-center mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                    <img src={student.studentProfileLink} alt="profile pic" className='w-10 h-10 rounded-full mobile:max-sm:hidden' />
                    <div className='w-32'>
                        {student.studentName}
                    </div>
                </h1>
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