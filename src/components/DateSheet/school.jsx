import React from 'react'

import Term from './Term.jsx';
export default function school(props) {
  return (
    <div className='flex-1 w-full h-full bg-slate-100 rounded-lg  mt-6 shadow-md border 2 border-solid  border-gray-200 ml-2   relative '>
    
      <img src={props.img} alt={props.img}  className='w-14 h-16 mt-4 ml-20  py-1'/>
       <span className=' text-xl  absolute top-0 py-4 ml-64 '  >{props.schoolname}</span> 
        <p className='absolute top-12 text-xs ml-72'>{props.address}</p>
         
         <div className='border-2 border-solid border-gray-500 mt-4'></div>
    <Term />
 
  </div>
  )
}
