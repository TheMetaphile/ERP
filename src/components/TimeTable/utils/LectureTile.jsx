import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../Context/AuthContext";


export default function LeactureTile({ index, numberOfLeacturesBeforeLunch, Time, data, day }) {
    const { authState } = useContext(AuthContext);
    const [lectures, setLectures] = useState({});

    useEffect(() => {
        setLectures(data && data[day] ? data[day][index] : {})
    }, [day,data]);



    return (
        <div className="flex-1 w-full justify-between" key={index}>
            {numberOfLeacturesBeforeLunch === index ? (
                <div className="w-full h-8 bg-secondary text-xl text-center border-t border-gray-400">LUNCH</div>
            ) : null}
            <div className="w-full border-t border-gray-400">

                <div key={lectures._id}>
                    {lectures.optional ? (
                        lectures.optionalSubjects.map((optSub, optSubIndex) => (

                            authState.subjects.includes(optSub.optionalSubject) && (
                                <div key={optSubIndex} className="w-full flex">
                                    <h1 className="w-96 px-4 py-2 text-center border-r border-gray-400 bg-green-200">{lectures.lectureNo}</h1>
                                    <h1 className="w-full px-4 py-2 text-center border-r border-gray-400 bg-green-200">{optSub.optionalSubject}</h1>
                                    <div className="w-full px-4 py-2 text-center border-r flex items-center border-gray-400 bg-blue-200">
                                        <img src={optSub.teacher.profileLink} alt={optSub.teacher.name} className="w-8 h-8 rounded-full" />
                                        <p className="text-sm px-2 whitespace-nowrap">{optSub.teacher.name}</p>
                                    </div>
                                    <h1 className="w-full whitespace-nowrap px-4 py-2 text-center border-r border-gray-400 bg-blue-200">{Time}</h1>
                                </div>
                            )

                        ))
                    ) : (
                        Object.keys(lectures).length >0 && <div className="w-full flex">
                            <h1 className="w-96 px-4 py-2 text-center border-r border-gray-400 bg-green-200">{lectures.lectureNo}</h1>
                            <h1 className="w-full px-4 py-2 text-center border-r border-gray-400 bg-green-200">{lectures.subject}</h1>
                            <div className="w-full px-4 py-2 text-center border-r flex items-center border-gray-400 bg-blue-200">
                                <img src={lectures.teacher.profileLink} alt={lectures.teacher.name} className="w-8 h-8 rounded-full" />
                                <p className="text-sm px-2 whitespace-nowrap">{lectures.teacher.name}</p>
                            </div>
                            <h1 className="w-full whitespace-nowrap px-4 py-2 text-center border-r border-gray-400 bg-blue-200">{Time}</h1>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

