import React from 'react'

export default function Amount2(props) {
  return (
    <div className=' flex justify-evenly  mt-6 text-start'>  
    <h5 className='text-black-400 w-28 text-center  text-sm'>{props.sno}</h5>
    <h5 className='text-black-400 w-28 text-center text-sm'>{props.info} </h5>
    <span className='text-center  text-sm text-gray-500 w-28'>{props.amount}</span>
  
   
  </div>
  )
}
