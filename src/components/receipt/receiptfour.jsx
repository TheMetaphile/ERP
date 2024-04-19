import React from 'react'
import Receiptamount from './receiptamount.jsx';
export default function receiptfour(props) {
  return (
    
    <div className=' flex justify-evenly  mt-6 text-start'>  
    <h5 className='text-black-400 w-28  text-sm'>{props.info} </h5>
    <span className='  text-xs text-gray-500 w-28'>{props.data}</span>
  
   
  </div>
  )
}
