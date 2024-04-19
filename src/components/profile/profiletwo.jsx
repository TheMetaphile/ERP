import React from 'react'


export default function profiletwo(props) {
  return (
   <div className='flex w-80 h-32 mt-10 ml-4 border-2  border-gray-200 rounded-2xl bg-white-100'>
     <img src={props.img} className='w-28 h-28 mt-2 ml-2'/>
     <div className='  flex-1 w-full items-center justify-center mt-4 space-x-1 ml-3 word-2'>
          <h3 className='ml-1 mt-2 whitespace-nowrap text-3xl'>{props.name}</h3>
         <p className='text-sm text-black mt-2 ml-1'> Class-{props.class} {props.Section}</p>
         <p className='text-sm text-black mt-2 '> Roll-{props.rollno} </p>




     </div>
     
    
       

 
    </div>
  )
}
