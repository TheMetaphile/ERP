import React, { useState } from 'react';
import Logo from '../../../assets/Test Account.png'
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";

export default function NewTile(props) {
    const [expanded, setExpanded] = useState(false);

    const hanleClick = () => {
        setExpanded(!expanded);
    }
    return (
        <div className=" w-full border p-2 justify-between rounded-lg shadow-md mt-3 flex items-center">
            <div className='flex '>
                <img src={Logo} alt="" className='h-12'></img>
                <div>
                    <div className='flex gap-2 font-medium text-base ml-2'>
                        <span className='text-red-500'>{props.name}</span>from class
                        <span className='text-red-500'>{props.class}</span>want a Leave Request to you
                    </div>
                    {expanded && (
                        <div className='font-medium text-base ml-2 mt-2'>
                            <span className='text-gray-400 text-xl'>Reason</span>
                            <div className=' border rounded-lg shadow-md p-3'>
                                <span className='text-gray-700 '>{props.reason}</span>
                            </div>
                        </div>
                    )}
                    <div className='flex gap-2 font-medium text-base ml-2 mt-2'>
                        <span className='text-green-500 bg-green-300 p-1 rounded-lg'>Approved</span>
                        <span className='text-red-500 bg-red-300 p-1 rounded-lg'>Rejected</span>
                    </div>

                </div>
            </div>
            <div className=' items-center px-3 cursor-pointer' onClick={hanleClick}>
            {expanded ?   <FaChevronUp />: <FaChevronDown />}
            </div>


        </div>
    )
}

