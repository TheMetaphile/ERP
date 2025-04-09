import React from 'react';
import { MdDeleteForever } from "react-icons/md";

export default function DiscountRow({ discount, handleDeleteDiscount, darkMode }) {
    return (
        <tr className={`border-b transition-colors duration-200 
            ${darkMode
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
        >
            <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium 
                ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {discount.amount}
            </td>
            <td className={`px-6 py-4 whitespace-nowrap text-sm 
                ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="font-semibold">
                    {discount.discountType }
                </span>
            </td>
            <td className={`px-6 py-4 whitespace-nowrap text-sm 
                ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="font-semibold">{discount.discountTargetType || 'N/A'} - (
                    <span className="font-semibold">
                    {discount.discountTargetType === "wing"
                        ? discount.selectedWing
                        : discount.discountTargetType === "particular class"
                            ? discount.classes.map(cls => `${cls.Class} - Sections: ${cls.sections.join(", ")}`).join("; ")
                            : ""}
                </span>
                )
                </span>
            </td>
            <td className={`px-6 py-4 whitespace-nowrap text-sm 
                ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="font-semibold">{discount.discountGivenBy || 'N/A'}</span>
            </td>
            <td className={`px-6 py-4 whitespace-nowrap text-sm 
                ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="font-semibold">{discount.title || 'N/A'}</span>
            </td>
            <td className={`px-6 py-4 whitespace-nowrap text-sm 
                ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="font-semibold">{discount.duration || 'N/A'}</span>
            </td>
            <td className={`px-6 py-4 whitespace-nowrap text-sm 
                ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span className="font-semibold">{discount.permission || 'N/A'}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                    className={`px-3 py-1 rounded-md shadow-md transition-colors duration-200 flex items-center
                        ${darkMode
                            ? 'bg-red-700 hover:bg-red-800 text-white'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                    onClick={() => handleDeleteDiscount(discount._id)}
                >
                    <MdDeleteForever className="mr-1" /> Delete
                </button>
            </td>
        </tr>
    );
}