import React, { useState } from 'react';
import DigitalClock from './DigitalClock';
import BreakTimer from './BreakTimer';
import VideoStream from './VideoStream';

function Mark() {

    const [checkIn, setCheckIn] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const [Stream, setStream] = useState(false);


    const handleCheckIn = () => {
        setCheckIn(true);
        setStream(true);
        setOnBreak(false);
    }

    const handleCheckOut = () => {
        setCheckIn(false);
        setOnBreak(false);
    }

    const handleTakeBreak = () => {
        setOnBreak(!onBreak);
    }

    const handleClose = ()=>{
        setStream(false);
    }

    return (
        <div className=''>
            <h1 className='px-3 py-2'>Mark your Attendance</h1>
            <div className='flex flex-col items-center'>
                <div className=' w-full flex gap-3 p-5  mt-3 items-center'>
                    <div className=' w-full flex justify-center items-center flex-col'>
                        <DigitalClock />

                    </div>
                    <div className=' w-full flex justify-center items-center'>
                        {!checkIn ? (
                            <button
                                onClick={handleCheckIn}
                                className="flex w-64 shadow-md rounded-2xl py-2 mb-2 mt-2 justify-center bg-purple-300"
                            >
                                <h1 className="font-medium text-2xl text-white">Check In</h1>
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleCheckOut}
                                    className="flex w-64 shadow-md rounded-2xl py-2 mb-2 mt-2 justify-center bg-purple-300 mr-2"
                                >
                                    <h1 className="font-medium text-2xl text-white">Check Out</h1>
                                </button>
                                <button
                                    onClick={handleTakeBreak}
                                    className="flex w-64 shadow-md rounded-2xl py-2 mb-2 mt-2 justify-center bg-purple-300"
                                >
                                    <h1 className="font-medium text-2xl text-white">{onBreak ? "Resume work" : "Take Break"}</h1>
                                </button></>
                        )
                        }
                        {onBreak && <BreakTimer />}

                    </div>
                </div>
                <div className="pl-2 mt-1 font-light text-sm text-gray-500 mb-3 text-center">
                    Check In and get started on your successful day.
                </div>
            </div>
            {Stream && <VideoStream onClose={handleClose}/>}
        </div>


    )
}

export default Mark