import React, { useState, useEffect, useContext } from "react";


export default function LeactureTile({ index, numberOfLeacturesBeforeLunch, Time, data, day }) {
    return (
        <div className=" flex-1 w-full justify-between px-4 py-2 mb-2 mt-2" key={index}>
            {numberOfLeacturesBeforeLunch === index ? (
                <div className="w-full h-8 bg-secondary text-xl text-center">LUNCH</div>
            ) : (
                <>
                </>
            )}
            <div className="flex w-full justify-between px-4 py-2">
                {data && data[day] && data[day].map((lecture, i) => (
                    <div key={i} className="flex">
                        <p> {lecture.lectureNo}</p>
                        <p> {lecture.subject}</p>
                        <p> {lecture.teacher.name}</p>

                    </div>
                ))}

                <h1 className="w-36">{Time}</h1>


            </div>
        </div>
    )
}

