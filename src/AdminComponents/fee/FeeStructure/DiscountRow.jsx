import React from 'react';
import { MdDeleteForever } from "react-icons/md";

export default function DiscountRow({ discount, handleDeleteDiscount }) {
    return (
        <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{discount.amount}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="font-semibold">
                    {discount.discountTargetType === "wing"
                        ? discount.selectedWing
                        : discount.discountTargetType === "particular class"
                            ? discount.classes.map(cls => `${cls.Class} - Sections: ${cls.sections.join(", ")}`).join("; ")
                            : discount.discountType || "N/A"}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="font-semibold">{discount.discountTargetType || 'N/A'}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="font-semibold">{discount.discountGivenBy || 'N/A'}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="font-semibold">{discount.title || 'N/A'}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="font-semibold">{discount.duration || 'N/A'}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="font-semibold">{discount.permission || 'N/A'}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-md transition-colors duration-200 flex items-center"
                    onClick={() => handleDeleteDiscount(discount._id)}
                >
                    <MdDeleteForever className="mr-1" /> Delete
                </button>
            </td>
        </tr>
    );
}
