import React from "react";

export default function TeacherSalary({details}){
 
    return(
        <div className="rounded-xl shadow-lg mb-4">
        <div className="overflow-x-auto w-full mt-4 rounded-lg border-2 border-black ">
          <table className="min-w-full divide-y divide-gray-600 ">
            <thead>
              <tr>
                <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Id</th>
                <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Name</th>
                <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Subjects</th>
                <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Working Days</th>
                <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Bonus</th>
                <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Deduction</th>
                <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Salary</th>
                <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Total Amount</th>
                <th className="px-6 py-3 text-center text-xl font-medium border-r bg-secondary">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {details.map((detail, index) => (
                <tr key={index}>
                  <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{detail.id}</td>
                  <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{detail.name}</td>
                  <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{detail.subjects}</td>
                  <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center">{detail.workingDays}</td>
                  <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center text-green-500">{detail.bonus}</td>
                  <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center text-red-500">{detail.deduction}</td>
                  <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center text-red-500">{detail.salary}</td>
                  <td className="px-6 py-2 whitespace-nowrap text-lg border-r text-center text-green-500">{detail.TotalAmt}</td>
                  <td className={`px-6 py-2 whitespace-nowrap text-lg border-r text-center ${detail.status === "paid" ? "text-green-500" : "text-red-500"}`}>
                  {detail.status}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}