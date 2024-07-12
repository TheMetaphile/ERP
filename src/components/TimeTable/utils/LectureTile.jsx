import React from "react";


export default function LeactureTile({ index, numberOfLeacturesBeforeLunch, Time, data, day }) {
    const lectures = data && data[day] ? data[day] : [];

    return (
        <div className=" flex-1 w-full justify-between " key={index}>
            {numberOfLeacturesBeforeLunch === index ? (
                <div className="w-full h-8 bg-secondary text-xl text-center border-t border-gray-400">LUNCH</div>
            ) : (
                <>
                </>
            )}
            <div className="w-full  border-t border-gray-400">
                {lectures.map((lecture) => (
                    lecture.lectureNo === index + 1 ? (
                        <div key={lecture._id} className="w-full flex">
                            <h1 className="w-full px-4 py-2 text-center border-r border-gray-400 bg-green-200">{lecture.lectureNo}</h1>
                            <h1 className="w-full px-4 py-2 text-center border-r border-gray-400 bg-green-200">{lecture.subject}</h1>


                            <div className="w-full px-4 py-2 text-center border-r flex items-center border-gray-400 bg-blue-200">
                                <img src={lecture.teacher.profileLink} alt={lecture.teacher.name} className="w-8 h-8 rounded-full" />
                                <p className="text-sm px-2">{lecture.teacher.name}</p>
                            </div>

                            <h1 className="w-full  px-4 py-2 text-center border-r border-gray-400 bg-blue-200">{Time}</h1>

                        </div>
                    ) : null
                ))}


            </div>
        </div>
    )
}

