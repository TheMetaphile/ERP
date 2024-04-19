import React from 'react'

export default function Attendanceseven(props) {
  return (
    <div className='flex justify-evenly text-sm text-gray-500 mt-3'>
       
    <h4 className='w-28 text-center '> {props.date}</h4>
    <img src={props.img1}className='w-28 text-center  w-9 h-7'/>
    <img src={props.img2}className='w-28 text-center w-9 h-7'/>
    <img src={props.img3}className='w-28 text-center w-9 h-7 '/>
</div>  )
}
