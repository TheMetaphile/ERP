import React from 'react'
import  Present from './../../assets/present.png';
export default function Attendancethree(props) {
  return (
    <div className='flex w-52 h-32 mt-10   border-2  text-green-400 border-gray-200 rounded-2xl bg-white-100'>
     
     <div className='  flex-1 w-48 items-center justify-center mt-2 text-green-400 ml-3 word-2'>
          <h3 className='ml-1 mt-2 whitespace-nowrap text-3xl'>{props.name}</h3>
         <p className='text-xl mt-2 ml-1  text-green-400'> {props.Present}</p>
        </div>
    <img src={Present} className='w-8 h-8 mt-4 mr-4'/>
     </div>
  )
}
