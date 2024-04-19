import React from 'react'

export default function Payment(props) {
  return (
    <div className='flex justify-evenly text-sm text-gray-500 mt-3'>
        <h4 className='w-28 text-center '>{props.mode}</h4>
        <h4 className='w-28 text-center'>{props.id}</h4>
        <h4 className='w-28 text-center'>{props. date}</h4>
        <h4 className='w-28 text-center' >{props. amount}</h4>
    </div>
  )
}
