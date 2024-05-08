import React from "react";
import { callIcon, location, userimg, } from "./images";

export default function ProfileDetails() {
    return (
        <div className="bg-white shadow-lg rounded-xl p-4 mt-8 mx-8">
            <div className="flex flex-col gap-4 mx-4">
                <div className="mx-4">
                    <img src={userimg} alt="" className="h-16 w-16" />
                </div>
                <div>
                    <h1 className="font-semibold text-2xl">Abhishek</h1>
                    <p className="text-gray-600">Maths & Science Teacher</p>
                </div>
                <div className="flex mt-4 gap-24">
                    <div className="flex items-center">
                        <div>
                            <img src={callIcon} alt="" className="w-8 h-8" />
                        </div>
                        <div className="ml-2 flex gap-2">
                            <h1 className="font-semibold text-gray-600">Phone&nbsp;:</h1>
                            <h1 className="">(+91)9999343593</h1>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="ml-2 flex gap-2">
                            <h1 className="font-semibold text-gray-600">Email&nbsp;:</h1>
                            <h1 className="">abhishek@gamil.com</h1>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div>
                            <img src={location} alt="" className="w-8 h-8" />
                        </div>
                        <div className="ml-2 flex gap-2">
                            <h1 className="font-semibold text-gray-600">Address&nbsp;:</h1>
                            <h1 className="">Sector 62,Noida</h1>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 mt-4">
                     <div><h1 className="text-3xl">Education&nbsp;:</h1></div>
                     <div className="flex gap-2">
                     <div className="mt-1 text-2xl">B.Tech IIT, Kanpur&nbsp;:</div>
                     <div className="mt-1 text-2xl text-gray-600"><h1>(2013-2017)</h1></div>
                     </div>
                     <div className="flex gap-2">
                     <div className="mt-1 text-2xl">M.Tech IIT, Kanpur&nbsp;:</div>
                     <div className="mt-1 text-2xl text-gray-600"><h1>(2018-2020)</h1></div>
                     </div>
                </div>
            </div>
        </div>

    )
}