import React from "react";
import NewExam from "./utils/NewExam";
import AllExam from "./utils/AllExam";

export default function Exam(){
    return(
        <div className="flex flex-col">
            <div className="mx-4">
            <NewExam/>
            </div>
           <div className="mt-8 mx-2 rounded-lg shadow-lg">
            <AllExam/>
           </div>
        </div>
    )
}