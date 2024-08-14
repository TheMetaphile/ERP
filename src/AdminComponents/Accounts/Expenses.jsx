import React from "react";
import WeeklySpend from "./utils/WeeklySpend";
import QuickActions from "./utils/QuickActions";
import InvoiceSection from "./utils/Invoice";
import Card from "./utils/Cards";
import Budget from "./utils/Budget";
import Activity from "./utils/Activity";

export default function Expenses() {
    return (
        <div className="flex flex-col mobile:max-tablet:mt-6">
            <div className="flex gap-2 mobile:max-tablet:flex-col ">
                <div className="flex flex-col mx-2  w-1/2 mobile:max-tablet:w-full mobile:max-tablet:mx-0 mobile:max-tablet:px-2.5 ">
                    <div className="flex-1  shadow-lg rounded-lg border">
                        <WeeklySpend />
                    </div>
                    <div className="flex-1  shadow-lg rounded-lg mt-4 border">
                        <InvoiceSection />
                    </div>
                </div>
                <div className="w-1/2 mx-2 shadow-lg rounded-lg border mobile:max-tablet:w-full mobile:max-tablet:mx-0 mobile:max-tablet:px-2.5">
                    <QuickActions />
                </div>
            </div>
            <div className="flex gap-2 mobile:max-tablet:flex-col ">
                <div className="w-1/2 mt-4  mx-2 mobile:max-tablet:w-full border shadow-md rounded-lg mobile:max-tablet:mx-0  ">
                    <Card />
                </div>
                <div className="w-1/2 mt-4 mx-2  mobile:max-tablet:w-full border rounded-lg shadow-md mobile:max-tablet:mx-0">
                    <Budget />
                </div>
            </div>
            <div className="w-full mb-4 ">
                <Activity />
            </div>

        </div>

    );
}
