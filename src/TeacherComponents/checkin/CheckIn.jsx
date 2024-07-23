import React from 'react';
import Mark from './utils/Mark';
import Summary from './utils/Summary';
import Leaves from './utils/Leaves';
import TeacherCalendar from './utils/TeacherCalendar';

function CheckIn() {
    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar mobile:max-laptop:mt-4">
            <h1 className='text-3xl mobile:max-tablet:text-lg'>Check In</h1>
            <div className=' border shadow-md mt-2 rounded-lg  w-full'>
                <Mark />
            </div>
            {/* <div className=' border shadow-md mt-4 rounded-lg  w-full'>
                <Summary />
            </div> */}

            <div className='mt-2 w-full flex items-center mobile:max-laptop:flex-col'>

                <div className='w-full'>
                    <TeacherCalendar />
                </div>
                <div className='w-full h-full'>
                    <Leaves />
                </div>
            </div>

        </div>

    )
}

export default CheckIn;