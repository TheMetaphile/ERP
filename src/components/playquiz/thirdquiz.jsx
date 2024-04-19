import React from 'react'

export default function thirdquiz() {
  return (
    <div className='flex-1 w-full '>
          
       <img src={props.img} className='w-6 h-6   '/>
       <span className='mt-32 '>{props.number}</span>
      <p className='text-xs flex-1 mr-20' >{props.heading}</p>

      

</div>
  
   
  )
}
