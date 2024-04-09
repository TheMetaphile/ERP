import React from 'react'
import './profile.css';
import Sectionpart from './sectionpart';
import Group from './../../assets/Group 20675.png';



export default function Profile() {
  return (
    <div className='profile'>
      <h2>Profile</h2>
      <div className='profile-section'>
        <img src={Group} alt={Group} />
        <p>Abhishek  Kumar</p><br />
        <p className='class'>Class - VI ‘A’</p>
        <p className='roll'> Roll No - 08 </p>
      </div>
      <div className='meter-section'>
        <p className='skill'>Reading skill</p>
        <p className='skill'>writen skill</p>
        <p className='skill'>speaking skill</p>
      </div>




      <div className='information'>
        <h3>   profile    <span>family</span></h3>
        <div class className="content"></div>

        <Sectionpart tittle='Birth Date' data='12/08/2013  (13 years old)' />
        <Sectionpart tittle='Admission Date' data='04/04/2020 ' />
        <Sectionpart tittle='Registration Number' data='123498487  ' />
        <Sectionpart tittle='Permanent Address' data='O, Block Noida Sector 23 ' />
        <Sectionpart tittle='Academic Year' data='2020 - 2025' />
        <Sectionpart tittle='Addhar Number' data='2345 - 5323 - 4234' />
        <Sectionpart tittle='Personal Email' data='smillingabhi203@gmail.com  ' />
        <Sectionpart tittle='BiEmergency Contact ' data='(+91) 9847389348 (Mother)  ' />


      </div>
    </div>
  )
}
