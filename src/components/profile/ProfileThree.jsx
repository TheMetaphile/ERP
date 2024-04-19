import React from 'react'
import LinearProgressBar from '../Home/utils/SubjectProgress/LinearProgressBar/LinearProgressBar.jsx';
export default function ProfileThree(props) {
  return (
    <div className='flex   w-96 h-32 ml-2 mt-10  border-2   border-gray-200 rounded-2xl bg-white-100'>
        <div className=' flex-1 w-48 h-12 ml-2 mt-2 pr-3'>
        <h1 className='text-sm text-gray-500 ml-2'>{props.text}</h1>
        <LinearProgressBar value={40} max={100}/>
        <h1 className='text-sm text-gray-500 ml-2' >{props.text1}</h1>
        <LinearProgressBar value={50} max={100}/>
        <h1 className='text-sm text-gray-500 ml-2'>{props.text2}</h1> 
        <LinearProgressBar value={70} max={100}/>
        </div>
    </div>
  )
}
