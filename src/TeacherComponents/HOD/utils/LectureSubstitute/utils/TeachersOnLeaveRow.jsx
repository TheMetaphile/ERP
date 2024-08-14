import React from "react";
import LectureRow from "./LectureRows";


export default function ClassTeacherOnLeaveRow({ Teacher,  date, session }) {


    return (
        <>
            {Teacher.lecturesForTheDay.map((data, indexx) => {
                const substitutionDetail = Teacher.substitutionDetails.find(
                    sub => sub.lecture === data.lectureNo.toString()
                );

                return (
                    <LectureRow Teacher={Teacher} data={data} date={date} index={indexx} session={session} substitutionDetail={substitutionDetail} />
                );
            })}

        </>


    )
}