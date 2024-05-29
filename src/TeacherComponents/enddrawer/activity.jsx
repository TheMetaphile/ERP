import React from 'react';
import Clock from './../../assets/clock-blue.png';

export default function Activity(props) {
  return (
    <div className="w-88 h-17 bg-red-600 rounded-xl text-left mt-2 mb-3 shadow-md pl-1 pr-2 pb-1 pt-1">

      <div className='flex items-center'>
        <p className="font-medium text-sm whitespace-nowrap">{props.title}</p>
        <div className="flex items-center bg-yellow-300 whitespace-nowrap ml-2">
          <img src={Clock} alt="Clock" className="w-2 h-2" />
          <span className="  text-xs  ">{props.time}</span>
        </div>
      </div>
      <div className="flex items-start mt-2">

        <div className="felx text-xs font-normal text-gray-500 ">

            <span className="font-medium ml-2 text-xs whitespace-nowrap ">{props.link}</span>
       
          <p className="font-normal mt-1 ml-1 text-justify">{props.status}</p>
        </div>
      </div>
    </div>
  );
}
