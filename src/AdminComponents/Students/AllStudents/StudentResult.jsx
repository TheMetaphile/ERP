import React from "react";
import SearchBar from "./utils/SearchBar";
import ResultList from "./utils/ResultList";



export default function StudentResult(){
    return(
        <>
        <div className="flex flex-col w-full mt-4">
           <div><h1 className="text-xl mx-4">All Students Results</h1></div>
           <div className="mt-2">
            <SearchBar/>
           </div>
           <div className="mx-2">
            <ResultList/>
           </div>
           
        </div>
        </>
    )
}