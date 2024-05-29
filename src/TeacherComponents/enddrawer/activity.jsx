import React from 'react';
import Clock from './../../assets/clock-blue.png';

export default function Activity(props) {
  return (
    <div className="w-88 h-17  text-left  mt-1  p-1 ml-1">


      <p className="font-medium text-sm whitespace-nowrap">{props.title}</p>

      <span className="font-medium  text-xs whitespace-nowrap text-blue-500">{props.link}</span>

      <div className="flex justify-between mt-1 text-xs  text-gray-500 ">


        <p className="font-normal  text-justify text-red-500">{props.status}</p>

        <div className="flex items-center  ">
          <img src={Clock} alt="Clock" className="w-2 h-2" />
          <span className="  text-xs  ">{props.time}</span>
        </div>
      </div>

    </div>
  );
}
