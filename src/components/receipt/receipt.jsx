import React from 'react'
import Receipttwo from './receipttwo.jsx';
import School from './../../assets/school logo.png';
export default function receipt() {
  return (
    <div className='flex-1 w-full'>
   
        <h3 className='mt-3 ml-4 font-bold'>Receipt</h3>
             <Receipttwo img={School} schoolname="Metaphile Public School" address="Noida sector 62, Block A23"  />
             
    </div>
  )
}
