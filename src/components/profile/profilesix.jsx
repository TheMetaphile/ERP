import React from 'react'

export default function profilesix(props) {
  return (
    <div className=' flex w-full justify-evenly  mt-6 text-start'>  
      <h5 className='text-blue-400 w-48'>{props.info} </h5>
      <span className='  text-sm text-gray-500 w-48'>{props.data}</span>
    </div>
  )
}
 