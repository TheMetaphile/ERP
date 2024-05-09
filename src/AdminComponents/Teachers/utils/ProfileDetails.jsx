import React from "react";
import { callIcon, location, userimg, } from "./images";
import { MdEmail } from 'react-icons/md';
export default function ProfileDetails() {
    return (
        <div className="flex justify-center mobile:max-tablet:flex-col bg-white shadow-lg w-full rounded-xl p-4 ">
            <div className="flex flex-col items-center gap-4 mx-4">
                <div className="mx-4">
                    <img src={userimg} alt="" className="h-16 w-16" />
                </div>
                <div>
                    <h1 className="font-semibold text-2xl">Abhishek</h1>
                    <p className="text-gray-600">Maths & Science Teacher</p>
                </div>
                <div className="flex mt-4 tablet:gap-24 mobile:max-tablet:gap-2 mobile:max-tablet:flex-col">
                    <div className="flex items-center">
                        <div>
                            <img src={callIcon} alt="" className="w-5 h-5" />
                        </div>
                        <div className="ml-2 flex gap-2">
                            <h1 className="font-semibold text-gray-600">Phone&nbsp;:</h1>
                            <h1 className="">(+91)9999343593</h1>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="ml-2 flex gap-2">
                            <h1 className="flex font-semibold text-gray-600"><MdEmail className="w-6 h-6"/>&nbsp;Email&nbsp;:</h1>
                            <h1 className="">abhishek@gamil.com</h1>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div>
                            <img src={location} alt="" className="w-5 h-5" />
                        </div>
                        <div className="ml-2 flex gap-2">
                            <h1 className="font-semibold text-gray-600">Address&nbsp;:</h1>
                            <h1 className="">Sector 62,Noida</h1>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 mt-4">
                     <div><h1 className="text-xl">Education&nbsp;:</h1></div>
                     <div className=" text-lg text-gray-400">B.Tech IIT, Kanpur (2013-2017)</div>
                     <div className=" text-lg text-gray-400">M.Tech IIT, Kanpur (2018-2020)</div>
                </div>
            </div>
        </div>

    )
}