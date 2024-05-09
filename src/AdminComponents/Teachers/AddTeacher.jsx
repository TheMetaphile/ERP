import React from "react";
import TeacherForm from "./utils/TeacherForm";

export default function AddTeacher(){
    return(
        <div className="flex flex-col mt-8">
            <div className="mx-auto">
                <h1 className="text-3xl font-semibold">Personal Details</h1>
            </div>
            <div className="mt-8">
               <TeacherForm/>
            </div>
        </div>
    )
}