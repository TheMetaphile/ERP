import { useEffect, useState } from 'react';
import clock from './../../../assets/clock.png'

export default function CountDown({ seconds, next }) {
    const [count, setCount] = useState(seconds);

    useEffect(() => {
      const timer = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);
  
      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(timer);
    }, []);
  
    useEffect(() => {
      if (count === 0) {
        clearInterval();
        if (next) {
            setCount(seconds);
            next();
        }
      }
    }, [count, next]);
    return (
        <div className="flex w-full justify-between ">
            <h1>Time Left</h1>
            <div className='flex w-fit bg-secondary rounded-full shadow-md px-3 py-1 items-center'>
                <img src={clock} alt="clock" className='w-5 h-5 mr-2' />
                <h2 className='text-sm text-gray-500'>{count} sec</h2>
            </div>

        </div>
    )
}