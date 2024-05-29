import React, { useEffect, useState } from 'react';

const DigitalClock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString();
    };

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="text-black text-center">
            <div className="font-medium text-2xl">
                {formatTime(currentTime)}
            </div>
            <div className="font-medium text-base">
                {formatDate(currentTime)}
            </div>
        </div>
    );
};

export default DigitalClock;
