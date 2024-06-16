import React from "react";
import ClassList from "./utils/ClassList";

export default function Class() {
    return (
        
            <div className="mx-2 flex flex-col w-full mt-4 rounded-lg shadow-lg">
                <div className="flex justify-between w-full">
                    <h1 className="text-3xl mx-2 mt-2 px-4">All Classes</h1>
                    <button className="text-2xl mx-2 border shadow-lg px-4 rounded-lg border-gray-100 bg-blue-400 hover:bg-blue-200">Edit</button>
                </div>
                <div className="mt-4 flex mx-auto rounded-md shadow-md mb-2">
                    <ClassList />
                </div>
            </div>
    )
}