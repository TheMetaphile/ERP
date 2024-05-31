import React from 'react';
import ProgressCard from '../../../components/assignment_report/utils/progressCard'
function Progress() {
    const details = [
        { class: '2nd', subject: ' Hindi', progress: '32%' },
        { class: '3rd', subject: ' English', progress: '32%' },
        { class: '2nd', subject: ' Hindi', progress: '32%' },

    ]

    return (
        <div className="container mx-auto px-4 bg-red-400 w-full" >
            <h1 className="text-2xl font-medium mb-6">Class Progress</h1>

            <div className=' bg-gray-500'>

                {details.map((detail, index) => (

                    <div key={index} className='bg-pink-400 mt-2 flex justify-between items-center'>
                        <div >
                            <div>Class : {detail.class}</div>
                            <div>{detail.subject}</div>
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