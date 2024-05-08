import React from "react";

export default function HeadersCard() {
    const data = [
        {
            heading: "Rs.18000", description: "Monthly Salary"
        },
        {
            heading: "7.9/10", description: "Average Rating"
        },
        {
            heading: "4 Years", description: "Experience"
        }
    ];
    return (
        <div className="flex flex-wrap justify-center w-full mt-8">
        <div className="flex w-full justify-center mobile:max-tablet:flex-col mobile:max-tablet:gap-4">
            {data.map((item, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 w-64 mx-auto flex flex-col items-center hover:cursor-pointer">
                    <h1 className="text-xl font-bold">{item.heading}</h1>
                    <p className="text-gray-400 font-semibold">{item.description}</p>
                </div>
            ))}
        </div>
    </div>
    );
}