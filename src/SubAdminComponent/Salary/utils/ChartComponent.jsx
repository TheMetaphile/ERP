import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdCreditScore } from "react-icons/md";

const ChartComponent = ({ chartData, collectionReport }) => {
    return (
        <>
            <div className="flex justify-between items-center mb-4 ">
                <div className="flex items-center mobile:max-laptop:flex-col mobile:max-tablet:items-baseline">
                    <label className="mr-2">From</label>
                    <input type="date" className="mr-2 p-1 border rounded" />
                    <label className="mr-2">To</label>
                    <input type="date" className="p-1 border rounded" />
                </div>
            </div>
            <div className=' flex gap-6 mobile:max-tablet:flex-col'>
                <div className=' laptop:w-4/5'>
                    <div className="buttons flex justify-center py-4 shadow-md mb-2 rounded">
                        <div className=' border-r flex-1 justify-center flex'>
                            <button className=' text-green-500 flex gap-4 items-center mobile:max-tablet:text-sm'><span><MdCreditScore className='h-8 w-8 cursor-pointer mobile:max-tablet:hidden' /></span> Credit  <span><FaExternalLinkAlt className=' text-green-500 h-4 w-4 cursor-pointer' /></span></button>
                        </div>
                        <div className=' border-r flex-1 justify-center flex'>
                            <button className=' text-red-500 flex gap-4 items-center mobile:max-tablet:text-sm'><span><MdCreditScore className='h-8 w-8 cursor-pointer mobile:max-tablet:hidden' /></span> Debit <span><FaExternalLinkAlt className=' text-red-500 h-4 w-4 cursor-pointer' /></span></button>
                        </div>
                        <div className='  flex-1 justify-center flex mobile:max-tablet:mr-2' >
                            <button className=' text-yellow-500 flex gap-4 items-center mobile:max-tablet:text-sm'><span><MdCreditScore className='h-8 w-8 cursor-pointer mobile:max-tablet:hidden' /></span>Pending  <span><FaExternalLinkAlt className=' text-yellow-500 h-4 w-4 cursor-pointer' /></span></button>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded shadow">

                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="mb-4 laptop:w-1/5">
                    <div className=' shadow-md w-full p-4 gap-5 flex flex-col'>
                        <h2 className="text-xl font-semibold">Collection Report</h2>
                        <div className=' border-b'>
                            <p className=' flex justify-between items-center' >Total Expected Amount <span><FaExternalLinkAlt className=' text-purple-400 h-5 w-5 cursor-pointer' /></span></p>
                            <p className=' text-2xl text-yellow-400'>₹ 5,20,200</p>
                        </div>
                        <div className=' border-b'>
                            <p className=' flex justify-between items-center'>Total Collected Amount <span><FaExternalLinkAlt className=' text-purple-400 h-5 w-5 cursor-pointer' /></span></p>
                            <p className=' text-2xl text-green-400'>₹ 5,20,200</p>
                        </div>
                        <div className=' border-b'>
                            <p className=' flex justify-between items-center'>Total Remaining Amount <span><FaExternalLinkAlt className=' text-purple-400 h-5 w-5 cursor-pointer' /></span></p>
                            <p className=' text-2xl text-red-400'>₹ 5,20,200</p>
                        </div>
                        <div className=' border-b mb-14'>
                            <p>Growth Performance </p>
                            <p className=' text-2xl text-green-400'> + 8.9%</p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChartComponent;
