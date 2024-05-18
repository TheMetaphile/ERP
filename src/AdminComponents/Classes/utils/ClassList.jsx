import React from "react";
import ClassDetailsModal from "./ClassDetails";

export default function ClassList() {
    const classes = [
        "Pre-Nursery", "Nursery", "L.K.G", "U.K.G", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"
    ]
    const colors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200'];
    return (
        <div className="class-cards-container flex flex-wrap gap-16 justify-center mt-4 mb-2">
            {classes.map((className, index) => (
                <div key={index} className={`border rounded-md flex flex-col w-1/4 px-2 py-2 items-center ${colors[index % colors.length]}`}>
                    <div className="class-card">
                        <h3 className="text-2xl">{className}</h3>
                        <ClassDetailsModal className={className} />
                    </div>
                </div>
            ))}
        </div>
    )
}
