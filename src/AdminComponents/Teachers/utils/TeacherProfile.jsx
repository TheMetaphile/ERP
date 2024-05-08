import React from "react";
import TeacherHeadersCard from "./TeachersHeadersCard.jsx"
import ProfileDetails from "./ProfileDetails.jsx";
import ClassesActivityChart from "./ClassesActivity.jsx";


export default function TeacherProfile(){
    return(
        <div className="flex flex-col items-center">
         <div className="w-3/4">
            <TeacherHeadersCard/>
         </div>
         <div className="mt-4 w-3/4">
            <ProfileDetails/>
         </div>
         <div className="mt-8 flex flex-col items-start rounded-lg shadow-lg mb-8 w-3/4">
            <div className="flex">
            <div>
               <h1 className="text-2xl font-semibold mx-4">Classes Activity</h1>
            </div>
            <div>
            </div>
            </div>
            <div className="mt-4 mb-4 mx-auto">
            <ClassesActivityChart/>
            </div>
         </div>
        </div>
    )
}