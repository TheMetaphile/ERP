import React from 'react'

export default function AppliedTilehod(props) {
    return (
        <div className=" w-full p-2 mt-3 mobile:max-tablet:mt-1 flex items-center ">
            <div className='px-2 w-11/12 '>
                <div className='flex items-center justify-between mobile:max-tablet:flex-col mobile:max-tablet:items-start'>
                    <div className="pl-2 mt-1 font-normal text-base whitespace-nowrap">Submission Date : {props.submission}</div>
                    <div className="pl-2 mt-1 font-normal text-base">Current Salary : {props.salary}</div>
                </div>
                <div className='flex items-center justify-between mobile:max-tablet:flex-col mobile:max-tablet:items-start'>
                    <div className="pl-2 mt-1 font-normal text-base">Name : {props.name}</div>
                    <div className="pl-2 mt-1 font-normal text-base">Increment : {props.increment}</div>
                </div>
                <div className="pl-2 mt-1 font-normal text-base">Employee ID : {props.id}</div>

                <div className='flex items-center justify-between mobile:max-tablet:flex-col mobile:max-tablet:items-start'>
                    <div className="pl-2 mt-1 font-normal text-base">Status : {props.status}</div>
                    <div className="pl-2 mt-1 font-normal text-base">Checked By : {props.by}</div>
                </div>
            </div>
        </div>
    )
}

