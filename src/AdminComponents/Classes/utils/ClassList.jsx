import React from "react";
import ClassDetailsModal from "./ClassDetails";

export default function ClassList() {
    const classes = [
        "Pre-Nursery", "Nursery", "L.K.G", "U.K.G", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"
    ]
    return (
        <div className="class-cards-container flex flex-wrap gap-16 justify-center mt-4">
            {classes.map((className, index) => (
                <div key={index} className="border rounded-md flex flex-col w-1/4 px-2 py-2 items-center bg-secondary">
                    <div className="class-card">
                        <h3>{className}</h3>
                        <ClassDetailsModal className={className} />
                    </div>
                </div>
            ))}
        </div>
    )
}
