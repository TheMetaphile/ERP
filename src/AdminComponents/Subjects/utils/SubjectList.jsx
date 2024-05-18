import React from "react";

export default function SubjectList({subjects}){
    const colors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200'];
    return(
        <div className="class-cards-container flex flex-wrap gap-16 justify-center mt-4 mb-2 rounded-lg">
        {subjects.map((subject, index) => (
            <div key={index} className={`border rounded-md flex flex-col w-1/4 px-2 py-2 items-center ${colors[index % colors.length]} mb-2`}>
                <div className="class-card">
                    <h3 className="text-2xl">{subject.name}</h3>
                    <span>Number of Chapters:{subject.topics}</span>
                </div>
            </div>
        ))}
    </div>
    )
}