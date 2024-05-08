import React from 'react'

import Term from './Term.jsx';
export default function school(props) {
  return (
    <div className='flex-1 w-full h-full  rounded-lg  mt-6 shadow-md border 2 border-solid  border-gray-200 ml-2   relative '>

      <div className='flex justify-center'>

        <img src={props.img} className='w-16 h-16 mt-3' />

        <div className='text-center mt-5 px-3'>
          <h2 className='text-xl'>{props.schoolname}</h2>
          <span className=' text-sm'>{props.address}</span>
        </div>

      </div>

      <div className=' border-2 border-solid border-gray-500 mt-2 ml-3 mr-3'></div>
      <Term />

    </div>
  )
}
