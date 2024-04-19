import React from 'react'
import Youtube from './../../assets/Youtube Live.png';
export default function Attendancefive(props) {
  return (
    <div className='flex-1 w-11/12 h-96 ml-5 rounded-lg bg-slate-400  mt-7'>
      <div className='flex '>
      <h6 className=' flex text-xs ml-4 mt-3'>Live Location</h6>
      <img src={Youtube} className='w-5 h-5 mt-3'/>
      </div>
      <div className='flex mt-3'>
      <img src={props.img} className='rounded-md'/>

      </div>
    </div>
  )
}
