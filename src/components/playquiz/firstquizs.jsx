import React from 'react'
import Secondquiz from './secondquiz.jsx';
import Image from './../../assets/Profile1.png';
import Fivequiz from './fivequiz.jsx'; 
export default function firstquizs() {
  return (
    <div className='flex w-full mr-12 flex-col  h-screen items-start mt-2 ml-1 '>
   
        <h1 className='ml-8 text-xl'>Quiz</h1>
        <Secondquiz img={Image} name="Tushar" lastname="tyagi"pre="Level"  answer="300/500 Question"/>
        <div>
        <h1 className='ml-8  mt-7 text-2xl'>Put your Knowledge to the Test</h1>
        <Fivequiz/>
        </div>
    </div>
  )
}
