import React from 'react'
import Profilesix from './profilesix.jsx';
import{Link} from 'react-router-dom';
export default function profilefive(props) {
  return (
    <div className=' flex-1   mt-4  '>
   <Link to="/" className='ml-3 hover:text-blue-700 font-bold  hover:underline'>Profile</Link>
    <Link to="/" className='ml-4  hover:text-blue-700  hover:underline font-bold'>Family</Link>
    <div className='border 2 border-solid border-gray-400 mt-5'></div>
    <Profilesix info="Birth Date" data="03/04/2003"/>
    <Profilesix info="Admission Date" data="04/04/2020"/>
    <Profilesix info="Registration Number" data="123498487"/>
    <Profilesix info="Permanent Address" data="O, Block Noida Sector 23"/>
    <Profilesix info="Academic" data="2020-25"/>
    <Profilesix info="Addhar" data="2345-5323-4234"/>
    <Profilesix info="Personal Email" data="smillingabhi203@gmail.com"/>
    <Profilesix info="Emergency Contact " data="(+91) 9847389348 (Mother)"/>
   
    </div>
  )
}
