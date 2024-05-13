import React from "react";
import SearchBar from "./SearchBar";
import TransportDetails from "./TransportDetails";

export default function TransportList(){
    return(
        <>
        <div className="flex flex-col">
           <div className="flex justify-between mt-4">
              <div><h1 className="text-xl mx-8">All Transport List</h1></div>
              <div><button className="text-xl mx-8">Edit</button></div>
           </div>
           <div className="mt-4">
            <SearchBar/>
           </div>
           <div>
            <TransportDetails/>
           </div>
        </div>
        </>
    )
}