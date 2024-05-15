import React from "react";
import SearchBar from "./SearchBar";
import TransportDetails from "./TransportDetails";

export default function TransportList(){
    return(
        <>
        <div className="flex flex-col">
           <div className="flex justify-between mt-4">
              <div><h1 className="text-3xl mx-8 mt-4 mobile:max-tablet:text-xl">All Transport List</h1></div>
              <div><button className="text-3xl mx-8 mt-4 mobile:max-tablet:text-xl mobile:max-tablet:px-2">Edit</button></div>
           </div>
           <div className="mt-4 mx-2">
            <SearchBar/>
           </div>
           <div className="mx-2 mobile:max-tablet:mt-0">
            <TransportDetails/>
           </div>
        </div>
        </>
    )
}