import React from "react";
import WeeklySpend from "./utils/WeeklySpend";
import QuickActions from "./utils/QuickActions";
import InvoiceSection from "./utils/Invoice";

export default function Expenses() {
    return (
        <div className="flex gap-2">
            <div className="flex flex-col w-1/2">
                <div className="flex-1 mx-2 shadow-lg rounded-lg border">
                    <WeeklySpend />
                </div>
                <div className="flex-1 mx-2 shadow-lg rounded-lg mt-4 border">
                    <InvoiceSection />
                </div>
            </div>
            <div className="w-1/2 mx-2 shadow-lg rounded-lg">
                <QuickActions />
            </div>
        </div>
    );
}
