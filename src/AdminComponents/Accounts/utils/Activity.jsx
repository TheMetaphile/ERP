import React from "react";
import { bus, insurance, internet } from "../images";

export default function Activity() {
  const activities = [
    { category: 'Transport', icon:bus, status: 'Successful', date: '27/10/2021', amount: 9000 },
    { category: 'Insurance', icon:insurance, status: 'Successful', date: '27/10/2021', amount: 11000 },
    { category: 'Internet', icon:internet, status: 'Successful', date: '27/10/2021', amount: 23000 },
  ];

  return (
    <div className="flex flex-col mb-2 mt-4 ">
      <div className="flex flex-col mx-4 px-2">
        <h1 className="text-2xl">Last Month Activities</h1>
        <p className="text-gray-600 text-base">Monthly Activites</p>
      </div>
      
      <div className=" mx-2 rounded-lg shadow-md border-2 border-black mt-2 overflow-auto">
        <table className="w-full text-center   ">
          <thead>
            <tr className="rounded-t-lg border-b-2 border-gray-300">
              <th className="py-2 px-4 font-normal text-xl">Category</th>
              <th className="py-2 px-4 font-normal text-xl">Transcations</th>
              <th className="py-2 px-4 font-normal text-xl">Date</th>
              <th className="py-2 px-4 font-normal text-xl">Amount</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="items-center">
                <td className="py-2 px-4 flex justify-center">
                  <span className="flex items-center justify-center"><img src={activity.icon} alt="" /></span>
                  <h1 className="px-2 text-base py-2">{activity.category}</h1>
                </td>
                <td
                  className={`py-2 px-4 text-center text-base ${
                    activity.status === 'Successful' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {activity.status}
                </td>
                <td className="py-2 px-4 text-center text-base ">{activity.date}</td>
                <td className="py-2 px-4 text-center text-base">{activity.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}