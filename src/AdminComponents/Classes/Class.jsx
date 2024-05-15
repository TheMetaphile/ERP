import React from "react";
import ClassList from "./utils/ClassList";

export default function Class(){
    return(
        <div className="flex flex-col w-full mx-auto mt-4">
           <div className="flex justify-between w-full">
            <h1 className="text-2xl mx-2">All Classes</h1>
            <button className="text-2xl mx-2">Edit</button>
           </div>
           <div className="mt-4 flex mx-auto rounded-md shadow-md mb-2">
            <ClassList/>
           </div>
        </div>
    )
}