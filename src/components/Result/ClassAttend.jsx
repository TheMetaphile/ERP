import React from 'react'
import Boxcard from './boxcard.jsx';
export default function ClassAttend(props) {
  return (
    <div className=' flex-1  border-2 border-solide border-grey-300 mt  w-5/6  h-2/4  mt-10 rounded-lg shadow-md ml-3  '>
  <div className=' flex-1   '>
      
       <h1 className='text-blue-500 text-center p-4 text-xl'>{props.heading}</h1> 
 
          <div className=" border-2 border-red-200 mt-3"></div> 
          <p className='flex-1 mt-5'>Term I <span className='ml-28 mt-5'>TERM II</span></p>
          
<Boxcard box="235/ 249 Days" pre="Total attendance of the student  " color="bg-green-300"/>
<Boxcard box="235/ 249 Days" pre="Total attendance of the student" color="bg-green-300"/>
    </div>

    </div>
  )

}
