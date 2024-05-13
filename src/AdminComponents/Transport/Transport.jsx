import React from "react";
import AddNewTransport from "./utils/AddNewTransport";
import TransportList from "./utils/TransportList";


export default function Transport(){
    return(
        <div className="flex flex-col">
            <div><AddNewTransport/></div>
            <div><TransportList/></div>
        </div>
    )
}