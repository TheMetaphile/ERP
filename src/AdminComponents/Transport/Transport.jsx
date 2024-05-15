import React from "react";
import AddNewTransport from "./utils/AddNewTransport";
import TransportList from "./utils/TransportList";


export default function Transport(){
    return(
        <div className="flex flex-col w-full">
            <div className="mx-2"><AddNewTransport/></div>
            <div className="mt-4"><TransportList/></div>
        </div>
    )
}