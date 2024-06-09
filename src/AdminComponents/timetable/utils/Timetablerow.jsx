import React from "react";
export default function TimetableRow({ index, lectureNo, Time, Subject, Teacher, handleSubjectChange, subjects, lunch }) {
    const handleChange = (event) => {
        handleSubjectChange(index, event.target.value);
    };
    return (
        <div className="bg-white flex w-full justify-between px-4 py-2 " key={index}>
            {lunch ? (
                <div className="w-36 bg-red-300"></div>
            ) : (
                <>
                    <h1 className="w-36">{lectureNo}</h1>
                    <h1 className="w-36">{Time}</h1>
                    <select className="w-36" value={Subject} onChange={handleChange}>
                        {subjects.map((subject, idx) => (
                            <option key={idx} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </select>
                    <h1 className="w-36">{Teacher}</h1>
                </>
            )}
        </div>
    )
}