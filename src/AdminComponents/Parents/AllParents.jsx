import React from "react";
import ParentsList from "./utils/ParentsList";
import SearchBar from "./utils/SearchBar";

export default function AllParents(){

    return(
        <>
         <div className="flex flex-col w-full mt-4">
           <div><h1 className="text-xl mx-4">Parents Data</h1></div>
           <div className="mt-2">
            <SearchBar/>
           </div>
           <ParentsList/>
        </div>
        </>
    )
}