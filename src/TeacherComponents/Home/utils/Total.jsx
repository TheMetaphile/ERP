import React from 'react'
import { FaBook } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentBold } from "react-icons/pi";
function Total() {
    return (
        <div className="flex  mt-3 w-full gap-4 mobile:max-tablet:flex-col">
            <div className="border w-full flex items-center justify-center py-3 rounded-lg shadow-md ">
                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <FaBook className="text-blue-500 mr-2" />
                        <span className='text-xl font-medium'>Total Subjects</span>
                    </div>
                    <div className="relative inline-block">
                        <span className="text-3xl font-medium">3</span>
                        <div className="absolute bottom-0 left-0 w-full border-t-4 border-blue-500"></div>
                    </div>
                </div>
            </div>

            <div className="border w-full flex items-center justify-center py-3 rounded-lg shadow-md ">
                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <SiGoogleclassroom  className="text-green-500 mr-2" />
                        <span className='text-xl font-medium'>Total Classes</span>
                    </div>
                    <div className="relative inline-block">
                        <span className="text-3xl font-medium">3</span>
                        <div className="absolute bottom-0 left-0 w-full border-t-4 border-green-500"></div>
                    </div>
                </div>
            </div>
            <div className="border w-full flex items-center justify-center py-3 rounded-lg shadow-md ">
                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <PiStudentBold className="text-blue-700 mr-2" />
                        <span className='text-xl font-medium'>Total Students</span>
                    </div>
                    <div className="relative inline-block">
                        <span className="text-3xl font-medium">120</span>
                        <div className="absolute bottom-0 left-0 w-full border-t-4 border-blue-700"></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Total