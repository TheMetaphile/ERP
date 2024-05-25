import React from "react";

export default function StudentsFees({details}){
   
    return(
        <div className="rounded-xl shadow-lg mb-4">
        <div className="overflow-x-auto w-full mt-4 rounded-lg border-2 border-black">
            <table className="min-w-full divide-y divide-gray-600">
                <thead className="">
                    <tr>
                        <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Student Id</th>
                        <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Name</th>
                        <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Miscellaneous</th>
                        <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Total</th>
                        <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Payed</th>
                        <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Pending</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {details.map((detail, index) => (
                        <tr key={index}>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{detail.id}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{detail.name}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center text-red-500">{detail.misc}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{detail.total}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center text-green-500">{detail.payed}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center text-red-500">{detail.pending}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
       </div>
    )
}