import React from 'react'
import Biodata from './Biodata.jsx'
export default function Info(props) {
  return (
    <div className='mt-3'>
       <h1 className='text-center text-blue-400 text-xl '>PERFORMANCE PROFILE</h1>
       <div className="border-2 border-red-200 mt-4 mb-5"></div>
{/* <div className=' '>
        <img src={props .img} className='w-4 h-4 ml-4 mt-3'/>
        <span className='ml-5 mt-2 '>Mehika Tegwal</span>
        <p className='ml-8  text-grey-200 text-xs'>Class 2nd A</p>
        </div> */}

        <Biodata data="Roll Number"     rollno="12" />
        <Biodata data="Date of Birth"   rollno="31Aug 2006" />
        <Biodata data="Blood Group"     rollno="B+" />
        <Biodata data="Contact No"       rollno="+91 6843924943" />
        <Biodata data=   "Class"         rollno=        "2nd" />
        <Biodata data="Father’s Name"    rollno="Mr. Kapil Tegwal" />
        

    </div>
  )
}
