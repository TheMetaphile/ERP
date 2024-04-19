import React from 'react'
import LinearProgressBar from '../Home/utils/SubjectProgress/LinearProgressBar/LinearProgressBar.jsx';
//import Thirdquiz from './thirdquiz.jsx';
//import Correct from './../../assets/Checkmark.png';


export default function secondquiz(props) {
  return (
    < div className=' flex w-full h-auto rounded-lg bg-slate-50-300 border 2  border-solid border-gray  ml-2 mt-12 mr-16'>
        <img src={props.img} alt={props.img} className='w-32 h-24 mt-3 ml-3' />
       
        <div className='ml-3  flex-1 w-full items-center'>
          <h3 className='ml-2 mt-2 whitespace-nowrap'>{props.name} {props.lastname}</h3>
         <p className='text-sm text-slate-400 ml-2 mt-2'>{props.pre}</p>
         <div className=' w-96'>
          <h1 className='text-right text-xs'>{props.answer}</h1>
          <LinearProgressBar value={40} max={100}/>
          {/* <Thirdquiz /> */}
          </div>
          
          </div>
        </div>
  )
}
