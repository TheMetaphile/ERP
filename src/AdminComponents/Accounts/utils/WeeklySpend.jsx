import React from "react";
import WeeklySpendChart from "./WeeklySpendChart";
import { bus, globe, paper } from "../images";


export default function WeeklySpend(){
    return(
        <div className="w-full flex flex-col">
        <div className="flex justify-between">
            <div className="flex flex-col gap-4">
            <h1 className="text-2xl mt-2">This Week Spends</h1>
            <div className="flex">
                <img src={globe} alt="" className="w-12 h-12"/>
                <img src={paper} alt="" className="w-12 h-12"/>
                <img src={bus} alt="" className="w-12 h-12 mt-1"/>
            </div>
            </div>
            <div className="mt-2">
                <h1 className="text-2xl px-2">Rs.54000</h1>
                <span className="text-xl text-gray-600 px-2">Total Spend</span>
            </div>
        </div>
        <div><WeeklySpendChart/></div>
        </div>
    )
}