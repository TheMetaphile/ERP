import React from "react";
import WeeklySpend from "./utils/WeeklySpend";
import QuickActions from "./utils/QuickActions";
import InvoiceSection from "./utils/Invoice";

export default function Expenses(){
    return(
        <div className="flex">
        <div className="w-1/2 mx-2 shadow-lg rounded-lg border h-fit">
           <WeeklySpend/>
        </div>
        <div className="w-1/2 mx-2 shadow-lg rounded-lg">
            <QuickActions/>
        </div>
        </div>
       
    )
}