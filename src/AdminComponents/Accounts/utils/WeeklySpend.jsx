import React from "react";
import WeeklySpendChart from "./WeeklySpendChart";
import { bus, internet, paper } from "../images";


export default function WeeklySpend() {
    return (
        <div className="w-full flex flex-col px-2 ">
            <div className="flex justify-between mobile:max-tablet:flex-col">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl mt-2 mobile:max-tablet:text-xl">This Week Spends</h1>
                    <div className="flex gap-2">
                        <div className="flex flex-col items-center">
                            <img src={internet} alt="" className="w-10 h-10" />
                            <div className="w-10 h-1 mt-1 bg-[#d18b4a]"></div>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={paper} alt="" className="w-10 h-10" />
                            <div className="w-10 h-1 mt-1 bg-[#6a8cff]"></div>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={bus} alt="" className="w-10 h-10" />
                            <div className="w-10 h-1 mt-1 bg-[#ff5959]"></div>
                        </div>

                    </div>
                </div>
                <div className="">
                    <div className="mt-4">
                        <select id="months" className="block w-full bg-white border text-xl border-gray-400 hover:border-gray-500 px-4 py-2 mobile:max-laptop:text-sm rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option value="01">January</option>
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
                    <h1 className="text-2xl px-2 font-semibold mt-4 mobile:max-laptop:text-lg">Rs.54000</h1>
                    <span className="text-base text-gray-600 px-2 mt-8 whitespace-nowrap">Total Spend</span>
                </div>
            </div>
            <div className="w-full px-2 h-1 mx-auto border-b-2 border-gray-300 mt-4 mb-4"></div>
            <div><WeeklySpendChart /></div>
        </div>
    )
} 