import React from "react";
import NewExam from "./utils/NewExam";
import AllExam from "./utils/AllExam";

export default function Exam() {
    return (
        <div className="flex flex-col mt-8 mx-2 mobile:max-tablet:mt-1">

            <AllExam />

        </div>
    )
}