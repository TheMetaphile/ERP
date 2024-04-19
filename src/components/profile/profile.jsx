import React from 'react'
import Profiletwo from './profiletwo.jsx';
import ProfileThree from './ProfileThree';
import Image from './../../assets/Profile1.png';
import Profilefour from './profilefour.jsx';


export default function Profile() {
  return (
    <div className='flex-1 w-full  '>
      <h2 className='ml-5 mt-2 text-sx'>Profile</h2>
      <div className=' flex justify-between w-full pr-4'>
      <Profiletwo img={Image} name="Yash Tyagi"  class="4" Section="`A`" rollno="07"/>
      <ProfileThree text="Reading books" text1="WRITING SKILL" text2="speaking Skills"/>
     </div>
     <Profilefour />
     
      </div>




      
      
    
  )
}
