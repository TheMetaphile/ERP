import React from 'react'
import Attendanceseven from './Attendanceseven'
import Bottom from './../../assets/bottom.png';
import Left from './../../assets/Rectangle 1124.png';
import Right from './../../assets/Rectangle 1124.png';
export default function Attendancesix() {
  return (
    <div className='flex-1   w-11/12 justify-evenly ml-5 mr-2 rounded-md  bg-slate-200   h-24    mt-6 text-start'>
            <div className='flex justify-evenly'>
            <p className='w-24 text-center text-sm'>Today</p>
            <p className='w-24 text-center text-sm text-green-500'> Present</p>
            <p className='w-24 text-center text-sm text-red-500'>Absent</p>
            <p className='w-24 text-center text-sm text-blue-200'>wentwithparents</p>
            </div>
        <Attendanceseven date="12/02/2003" img1={Right} img2={Bottom} img3={Left}/>
            </div>
  )
}
