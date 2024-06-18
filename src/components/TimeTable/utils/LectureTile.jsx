import React from "react";


export default function LeactureTile({ index, numberOfLeacturesBeforeLunch, Time, data, day }) {
    const lectures = data && data[day] ? data[day] : [];
   
    return (
        <div className=" flex-1 w-full justify-between px-4 py-2 mb-2 mt-2" key={index}>
            {numberOfLeacturesBeforeLunch === index ? (
                <div className="w-full h-8 bg-secondary text-xl text-center">LUNCH</div>
            ) : (
                <>
                </>
            )}
            <div className="flex w-full justify-between px-4 py-2">
                {lectures.map((lecture) => (
                    lecture.lectureNo === index + 1 ? (
                        <div key={lecture._id} className="w-full flex items-center justify-between">
                            <h1 className="w-36">{lecture.lectureNo}</h1>
                            <h1 className="w-36">{lecture.subject}</h1>


                            <div className="w-36 flex items-center">
                                <img src={lecture.teacher.profileLink} alt={lecture.teacher.name} className="w-8 h-8 rounded-full" />
                                <p className="text-sm px-2">{lecture.teacher.name}</p>
                            </div>

                            <h1 className="w-36">{Time}</h1>

                        </div>
                    ) : null
                ))}


            </div>
        </div>
    )
}

