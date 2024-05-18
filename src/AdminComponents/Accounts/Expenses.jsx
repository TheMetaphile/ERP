import React from "react";
import WeeklySpend from "./utils/WeeklySpend";
import QuickActions from "./utils/QuickActions";
import InvoiceSection from "./utils/Invoice";
import Card from "./utils/Cards";
import Budget from "./utils/Budget";
import Activity from "./utils/Activity";

export default function Expenses() {
    return (
        <div className="flex flex-col">
        <div className="flex gap-2 mobile:max-tablet:flex-col">
            <div className="flex flex-col w-1/2 mobile:max-tablet:w-full">
                <div className="flex-1 mx-2 shadow-lg rounded-lg border">
                    <WeeklySpend />
                </div>
                <div className="flex-1 mx-2 shadow-lg rounded-lg mt-4 border">
                    <InvoiceSection />
                </div>
            </div>
            <div className="w-1/2 mx-2 shadow-lg rounded-lg mobile:max-tablet:w-full mobile:max-tablet:mx-0">
                <QuickActions />
            </div>
        </div>
        <div className="flex gap-2 mobile:max-tablet:flex-col">
            <div className="w-1/2 mt-2 px-2 my-2 mobile:max-tablet:w-full">
            <Card/>
            </div>
            <div className="w-1/2 mt-2 mb-2 px-2 mobile:max-tablet:w-full">
                <Budget/>
            </div>
        </div>
         <div className="w-full mb-4">
            <Activity/>
         </div>
       
        </div>
      
    );
}
