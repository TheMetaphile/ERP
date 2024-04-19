import React from 'react'
import { Link } from 'react-router-dom';
import Attendancetwo from './Attendancetwo';
import Attendancethree from './Attendancethree';
import Attendancefour from './Attendancefour';
import Attendancefive from './Attendancefive';
import Map from './../../assets/location.png';
import Attendancesix from './Attendancesix';
export default function Attendance() {
  return (
    <div className='flex-1 w-full  items-center justify-evenly  '>
        <div className='flex w-full justify-evenly items-center '>
              {/* <div className=' flex-1 w-72 h-10 bg-teal-300  ml-20 border text-center  justify-evenly rounded-2xl px-4 py-2  shadow-m  mt-12 text-sm font-semibold ' >
             
             <Link className='hover:bg-slate-300  py-2 px-2  rounded-xl border-transparent'>Attendance</Link>
             <Link className='hover:bg-slate-300  py-2 px-2  rounded-xl border-transparent'>Attendance</Link>
             <Link className='hover:bg-slate-300  py-2 px-2  rounded-xl border-transparent'>Attendance</Link>
            
        </div> */}
       '
             <Attendancetwo number="260" text="No of Days Bus come to stop." />
             <Attendancethree name="230" Present="Present"/>
             <Attendancefour number="20" absent="Absent"/>
             </div> 
             <Attendancefive img={Map}/>   
             <Attendancesix/>
    </div>
  )
}
