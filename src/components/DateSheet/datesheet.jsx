import React from 'react'
import './datesheet.css';
import  logo from './../../assets/metaphile_logo.png';
import School from './school.jsx';



export default function datesheet() {
  return (
    <div className='flex-1 w-full '> 
       <h1 className='ml-4 text-xl'>Datesheet </h1>
       <School img={logo} schoolname="Metaphile Public School" address="Noida sector 62, Block A23"/>
       <button className="bg-blue-300 mt-10 ml-80  border border-transparent rounded-xl px-4 py-2 flex items-center shadow-md">
          <span className="text-black">Download</span>

        </button>
    </div>
  )
}
