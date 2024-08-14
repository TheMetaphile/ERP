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
        <div className="text-black text-center mobile:max-tablet:flex gap-2 items-center">
            <div className="font-medium text-2xl mobile:max-tablet:text-xl">
                {formatTime(currentTime)}
            </div>
            <div className="font-medium text-base mobile:max-tablet:flex mobile:max-tablet:flex-col">
                {formatDate(currentTime)}
            </div>
        </div>
    );
};

export default DigitalClock;
