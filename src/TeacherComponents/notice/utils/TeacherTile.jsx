import { useState } from 'react';
import Logo from '../../../assets/metaphile_logo.png';

export default function TeacherTile({ details }) {
    const [expanded, setExpanded] = useState(null);

    const handleClick = (index) => {
        setExpanded(expanded === index ? null : index);
    }
    return (
        <div className="w-full">
            {details.map((detail, index) => (
                <div key={index} className='p-2 border justify-between rounded-lg shadow-md mt-3 flex items-center'>
                    <div className='flex items-center w-full'>
                        <img src={Logo} alt="" className='h-12'></img>
                        <div className='px-2 w-full ' >
                            <div className="pl-2 mt-1 font-normal text-sm cursor-pointer" onClick={() => handleClick(index)}><span className='font-medium'>Title :</span> {detail.title}</div>
                            {expanded === index && (
                                <div className="pl-2 mt-1 font-normal text-sm"><span className='font-medium'>Description :</span> {detail.description}</div>
                            )}

                            <div className='flex items-center justify-between w-full'>
                                <div className="pl-2 mt-1 font-light text-xs text-gray-600 flex gap-1 items-center">
                                    <span className='font-medium'>By:</span> &nbsp;<img src={detail.from.profileLink} alt="img" className='w-8 h-8 rounded-full'></img>{detail.from.name}
                                </div>
                                <div className="pl-2 mt-1 font-light text-xs text-gray-600">{detail.date}</div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="w-5 h-5 bg-red-800 rounded-full"></div> */}
                </div>
            ))}

        </div>
    )
}


