import React from "react";
import Result from "../../../../components/Result/Result";

export default function ResultLayout(){
    return(
        <div className="flex mobile:max-tablet:flex-col mt-4">
            <div className="w-full mobile:max-tablet:w-full"><Result/></div>
        </div>
       
    )
}