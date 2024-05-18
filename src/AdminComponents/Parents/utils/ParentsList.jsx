import React from "react";
import { Link } from "react-router-dom";

export default function ParentsList({details}){
    return(
        <div className="rounded-xl shadow-lg mb-4">
    <div className="overflow-x-auto w-full mt-8 rounded-lg">
    <table className="min-w-full divide-y divide-gray-600">
        <thead>
            <tr>
                <th className="px-6 py-3 text-center text-2xl font-normal border-r bg-secondary">Child</th>
                <th className="px-6 py-3 text-center text-2xl font-normal border-r bg-secondary">Father</th>
                <th className="px-6 py-3 text-center text-2xl font-normal border-r bg-secondary">Mother</th>
                <th className="px-6 py-3 text-center text-2xl font-normal border-r bg-secondary">Contact No</th>
                <th className="px-6 py-3 text-center text-2xl font-normal border-r bg-secondary">Email</th>
            </tr>
        </thead>
        <tbody className="bg-white">
            {details.map((detail, index) => (
                <tr key={index}>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={`/Admin-Dashboard/Parents/AllParents/Details`} className="block">{detail.child}</Link>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={`/Admin-Dashboard/Parents/AllParents/Details`} className="block">{detail.father}</Link>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={`/Admin-Dashboard/Parents/AllParents/Details`} className="block">{detail.mother}</Link>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={`/Admin-Dashboard/Parents/AllParents/Details`} className="block">{detail.contact}</Link>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">
                        <Link to={`/Admin-Dashboard/Parents/AllParents/Details`} className="block">{detail.email}</Link>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
</div>


    )
}