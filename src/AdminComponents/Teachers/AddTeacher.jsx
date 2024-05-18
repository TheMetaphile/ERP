import React from "react";
import TeacherForm from "./utils/TeacherForm";

export default function AddTeacher(){
    return(
        <div className="flex flex-col mt-2 mx-4 rounded-lg shadow-lg mb-4">
            <div className="mx-auto">
                <h1 className="text-3xl font-semibold mt-4">Personal Details</h1>
            </div>
            <div className="mt-4">
               <TeacherForm/>
            </div>
        </div>
    )
}