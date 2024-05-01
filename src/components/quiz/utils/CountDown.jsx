import React, { useEffect, useState } from 'react';
import clock from './../../../assets/clock.png';

export default function CountDown({ seconds, next, updateRemainingTime }) {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    var timer;
    setCount(seconds);
     timer = setInterval(() => {
        if (count === 0) {
          clearInterval(timer);
          if (next) {
            next();
          }
        }else{

        updateRemainingTime(count);
        setCount(count-1);
        }
          
        
    }, 1000);
  
    return () => clearInterval(timer);
  }, [next]); // Ensure only 'next' is included as a dependency
  
 // Specify 'count' and 'updateRemainingTime' as dependencies
  

  return (
    <div className="flex w-full justify-between">
      <h1>Time Left</h1>
      <div className='flex w-fit bg-secondary rounded-full shadow-md px-3 py-1 items-center'>
        <img src={clock} alt="clock" className='w-5 h-5 mr-2' />
        <h2 className='text-sm text-gray-500'>{count} sec</h2>
      </div>
    </div>
  );
}
