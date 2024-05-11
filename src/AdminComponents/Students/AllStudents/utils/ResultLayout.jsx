import React from "react";
import Result from "../../../../components/Result/Result";

export default function ResultLayout(){
    return(
        <div className="flex mobile:max-tablet:flex-col mt-4">
            <div className="w-3/4 mobile:max-tablet:w-full"><Result/></div>
            <div className="flex flex-col w-1/4 mobile:max-tablet:w-full overflow-y-auto">
                <div className="mt-6">
                    <h1 className="text-center text-3xl">Leader Board</h1>
                </div>
                <div className="rounded-md shadow-lg mt-4">
                <div className="text-center">
                    <h1 className="mx-4 text-xl underline mt-4">Top 3 Students</h1>
                   <div className="flex flex-col mt-4">
                     <h1 className="text-lg">Abhishek 98%</h1>
                     <h1 className="text-lg">Bhanu 95%</h1>
                     <h1 className="text-lg">Yash 90%</h1>
                   </div>
                </div>
                <div className="text-center mt-4 mb-4">
                    <h1 className="mx-4 text-xl underline">Top 15 Students</h1>
                   <div className="flex flex-col mt-4">
                     <h1 className="text-lg rounded-md shadow-sm">Abhishek 98%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Bhanu 95%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Yash 90%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Yash 90%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Yash 90%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Yash 90%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Yash 90%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Yash 90%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Yash 90%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Yash 90%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Yash 90%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Yash 90%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Yash 90%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Yash 90%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Yash 90%</h1>
                     <h1 className="text-lg  rounded-md shadow-sm">Yash 90%</h1>
                   </div>
                </div>
              </div>
        </div>
        </div>
    )
}