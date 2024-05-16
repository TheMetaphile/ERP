import React from "react";
import WeeklySpendChart from "./WeeklySpendChart";
import { bus,internet, paper } from "../images";


export default function WeeklySpend() {
    return (
        <div className="w-full flex flex-col px-2">
            <div className="flex justify-between">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl mt-2">This Week Spends</h1>
                    <div className="flex">
                        <img src={internet} alt="" className="w-12 h-12" />
                        <img src={paper} alt="" className="w-12 h-12" />
                        <img src={bus} alt="" className="w-12 h-12 mt-1" />
                    </div>
                </div>
                <div className="">
                    <div className="mt-2">
                        <select id="months" className="block w-full bg-white border text-lg border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option value="01">January 2024</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                    <h1 className="text-2xl px-2">Rs.54000</h1>
                    <span className="text-xl text-gray-600 px-2">Total Spend</span>
                </div>
            </div>
            <div className="w-full px-2 h-1 mx-auto border-b-2 border-gray-300 mt-4 mb-4"></div>
            <div><WeeklySpendChart /></div>
        </div>
    )
} 