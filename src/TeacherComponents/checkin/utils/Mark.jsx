import React, { useState } from 'react';
import DigitalClock from './DigitalClock';
import BreakTimer from './BreakTimer';
import VideoStream from './VideoStream';

function Mark() {
    const [checkIn, setCheckIn] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const [showStream, setShowStream] = useState(false);

    const handleCheckIn = () => {
        setCheckIn(true);
        setShowStream(true);
        setOnBreak(false);
    };

    const handleCheckOut = () => {
        setCheckIn(false);
        setOnBreak(false);
    };

    const handleTakeBreak = () => {
        setOnBreak(!onBreak);
    };

    const handleClose = () => {
        setShowStream(false);
    };

    const handleCapture = () => {
        setShowStream(false);
    };

    return (
        <div className=''>
            <h1 className='px-3 py-2'>Mark your Attendance</h1>
            <div className='flex flex-col items-center '>
                <div className='w-full flex gap-3 p-5 mt-3 mobile:max-tablet:mt-0 items-center mobile:max-tablet:flex-col'>
                    <div className='w-full flex justify-center items-center flex-col '>
                        <DigitalClock />
                    </div>
                    <div className='w-full flex justify-center items-center tablet:flex-col'>
                        {!checkIn ? (
                            <button
                                onClick={handleCheckIn}
                                className="flex w-64 shadow-md rounded-2xl py-2 mb-2 mt-2 justify-center bg-purple-300"
                            >
                                <h1 className="font-medium text-2xl mobile:max-laptop:text-lg text-white">Check In</h1>
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleCheckOut}
                                    className=" flex w-64 shadow-md rounded-2xl py-2 mb-2 mt-2 justify-center bg-purple-300 mr-2"
                                >
                                    <h1 className="font-medium text-2xl mobile:max-laptop:text-lg text-white">Check Out</h1>
                                </button>
                                <button
                                    onClick={handleTakeBreak}
                                    className="flex w-64 shadow-md rounded-2xl py-2 mb-2 mt-2 justify-center bg-purple-300"
                                >
                                    <h1 className="font-medium text-2xl mobile:max-laptop:text-lg text-white">{onBreak ? "Resume work" : "Take Break"}</h1>
                                </button>
                            </>
                        )}
                        {onBreak && <BreakTimer />}
                    </div>
                </div>
                <div className="pl-2 mt-1 font-light text-sm text-gray-500 mb-3 text-center">
                    Check In and get started on your successful day.
                </div>
            </div>
            {showStream && <VideoStream onClose={handleClose} onCapture={handleCapture} />}
        </div>
    );
}

export default Mark;
