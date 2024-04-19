import React from 'react'


export default function Biodata(props) {
  return (
    <div>
    <div className=' justify-between  mb-2 py-2 px-3 text-justify'>
    <h5 className=' text-justify  ml-72'>{props.data}<span className='ml-20 '>{props.rollno}</span></h5>
  
  </div>
 
  </div>
  )
}
