import React, { useContext } from 'react';
import bg from '../../assets/background.png'
import Progress from './utils/Progress'
import Attendence from './utils/Attendence'
import Total from './utils/Total'
import Summary from '../checkin/utils/Summary'
import AuthContext from '../../Context/AuthContext'

function TeacherHome() {
    const { authState } = useContext(AuthContext)
    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar mobile:max-laptop:mt-0">
            <h1 className='text-3xl mobile:max-tablet:text-xl'>Dashboard</h1>
            <div className='flex items-center justify-between border shadow-md mt-4 rounded-lg  w-full bg-blue-200'>
                <h1 className='ml-3 font-medium text-2xl mobile:max-tablet:text-lg'>Welcome back, <span className='font-semibold text-3xl mobile:max-tablet:text-xl'>{authState.userDetails.name}</span></h1>
                <img src={bg} alt="teacher-student" className='h-16'></img>
            </div>

            <div className=' h-fit flex items-center justify-between gap-3  mt-4  w-full mobile:max-laptop:flex-col'>
                <Progress />
                <Attendence />
            </div>

            <div className='w-full'>
                <Total />
            </div>

            <div className='w-full  mt-3 rounded-lg border shadow-md'>
                <Summary />
            </div>

        </div>

    )
}

export default TeacherHome