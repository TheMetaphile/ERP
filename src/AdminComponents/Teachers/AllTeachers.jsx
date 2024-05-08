import React from "react";
import TeacherStats from "./utils/TeacherStats";
import SearchBar from "./utils/SearchBar";
import TeacherCard from "./utils/TeacherCard";


export default function AllTeachers(){
    return(
        <div className="flex flex-col">
        <div className="mt-4 mobile:max-tablet:w-full mobile:max-tablet:mx-2 mobile:max-tablet:my-8">
            <TeacherStats/>
        </div>
        <div className="mt-8 text-xl font-semibold mx-4">
            All Teachers Data
        </div>
        <div className="mt-4 mx-4">
            <SearchBar/>
        </div>
        <div className="mt-4 flex items-center">
           <TeacherCard/>
        </div>
        </div>
    )
} 