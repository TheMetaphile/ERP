import React from 'react'

export default function   Total(props) {
  return (
    <div className='flex justify-evenly   outline-double mr-2 ml-2   mt-6 text-start'> 
    <p className='w-28 text-center'> </p>
    <p className='w-28 text-center'>Total</p>
    <p className='w-28 text-center'>{props.total}</p>
    </div>
  )
}
