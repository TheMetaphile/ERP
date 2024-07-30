import React from "react";
import Assign from "./utils/Assign";
import { ToastContainer } from "react-toastify";

export default function Assigncoordinator() {
    return (

        <div className=" flex flex-col w-full mt-4 rounded-lg shadow-lg">
            <ToastContainer />
            <div className="flex justify-between w-full">
                <h1 className="text-3xl mobile:max-tablet:text-xl px-4">Assign Coordinator</h1>
            </div>
            <div className=" flex w-full rounded-md shadow-md">
                <Assign />
            </div>
        </div>
    )
}