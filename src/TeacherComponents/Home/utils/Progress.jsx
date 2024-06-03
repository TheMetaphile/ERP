import React from 'react';
import ProgressCard from './ProgressCard'
function Progress() {
    const details = [
        { class: '2nd', subject: ' Hindi', progress: '32%' },
        { class: '3rd', subject: ' English', progress: '32%' },
        { class: '2nd', subject: ' Hindi', progress: '32%' },
        { class: '2nd', subject: ' Hindi', progress: '32%' },
        { class: '2nd', subject: ' Hindi', progress: '32%' },
        { class: '2nd', subject: ' Hindi', progress: '32%' },
        { class: '2nd', subject: ' Hindi', progress: '32%' },

    ]

    return (
        <div className="container mx-auto px-4  w-full h-96 border shadow-md rounded-lg"  >
            <h1 className="text-2xl font-medium mb-3 mt-2">Class Progress</h1>

            <div className='  overflow-auto  h-5/6'>

                {details.map((detail, index) => (

                    <div key={index} className='mx-3 rounded-lg bg-blue-100 mt-1 flex justify-between items-center mb-2  '>
                        <div className='px-6  '>
                            <div className='font-medium text-xl'>Class : {detail.class}</div>
                            <div className='font-medium text-xl text-gray-400'>{detail.subject}</div>
                        </div>

                        <div className=''>
                            <ProgressCard
                                percent='40'
                                centerText='05'
                                trailColor='#c8ccc9'
                                strokeColor='#7dc5f5'
                            />
                        </div>
                    </div>
                ))}


            </div>
        </div>

    );
}

export default Progress;