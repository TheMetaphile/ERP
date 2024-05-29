import React from 'react';

export default function Classwork(props) {
    return (
        <div className="w-88 h-17  text-left  mt-2  p-1 ml-2">

            <div className='flex whitespace-nowrap  items-center'>
                <p className="font-medium text-sm ">Class : {props.classs}</p>
                <span className="  text-xs  ml-2 text-gray-500">{props.date}</span>
            </div>

            <div className="flex justify-between mt-1 text-xs">

                    <span className="font-medium  text-sm ">{props.description}</span>

            </div>

        </div>
    );
}
