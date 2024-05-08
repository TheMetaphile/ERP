import React from 'react'
import './datesheet.css';
import logo from './../../assets/metaphile_logo.png';
import School from './school.jsx';
import download from './../../assets/Download.png';



export default function datesheet() {
  return (
    <>
      <h1 className='ml-4 text-xl'>Datesheet</h1>
      <div className='flex flex-col px-3 h-screen overflow-y-auto items-center justify-center mt-2 ml-2 mr-2 mb-3 no-scrollbar'>

        <School img={logo} schoolname="Metaphile Public School" address="Noida sector 62, Block A23" />
        <button className="bg-secondary mt-10 border border-transparent rounded-xl px-2 py-2 flex shadow-md">
          <span className="text-black flex items-center">Download<img src={download} alt="" className='h-6  ml-1'></img></span>
        </button>
      </div>
    </>
  )
}
