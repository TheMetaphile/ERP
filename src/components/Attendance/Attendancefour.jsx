import React from 'react'
import Absent from './../../assets/absent.png';
export default function Attendancefour(props) {
  return (
    <div className='flex w-52 h-32 mt-10  border-2  border-gray-200 rounded-2xl bg-white-100'>
     
    <div className='  flex-1 w-full items-center justify-center mt-2 text-red-600 space-x-1 ml-3 word-2'>
         <h3 className='ml-1 mt-2 whitespace-nowrap text-3xl'>{props.number}</h3>
        <p className='text-xl text-red-600 mt-2 ml-1'> {props.absent} {props.Section}</p>
       </div>
       <img src={Absent}alt='Absent' className='w-8 h-8 mt-4 mr-4'/>
    </div>
  )
}
