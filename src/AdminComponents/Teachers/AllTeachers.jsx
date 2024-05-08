import React from "react";
import TeacherStats from "./utils/TeacherStats";
import SearchBar from "./utils/SearchBar";
import TeacherCard from "./utils/TeacherCard";


export default function AllTeachers(){
    return(
        <div className="flex flex-col mx-4">
        <div className="mt-4 mobile:max-tablet:w-full mobile:max-tablet:mx-2 mobile:max-tablet:my-8">
            <TeacherStats/>
        </div>
        <div className="mt-8 text-xl font-semibold">
            All Teachers Data
        </div>
        <div className="mt-4 ">
            <SearchBar/>
        </div>
        <div className="mt-4 ">
           <TeacherCard/>
        </div>
        </div>
    )
} 