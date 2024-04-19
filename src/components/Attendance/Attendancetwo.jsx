import React from 'react'
import School from './../../assets/School Bus.png';
export default function Attendancetwo(props) {
  return (
    
    <div className='flex w-52 h-32   mt-9 border-2  border-gray-200 rounded-2xl bg-white-100'>
   
   <div className='  flex-1 w-full items-center justify-center mt-4 space-x-1 ml-3 word-2'>
          <h3 className='ml-1 mt-2 whitespace-nowrap text-3xl'>{props.number}</h3>
         <p className='text-sm text-black mt-4  pr-2 ml-1'>{props.text} {props.Section}</p>
   </div>
   <img src={School }alt='bus' className='w-10 h-10 mt-4 mr-6'/>
    
   
      


   </div>
  )
}
