import React from 'react'
import logo from './../../assets/metaphile_logo.png';
import School from './school.jsx';
import download from './../../assets/Download.png';

export default function datesheet() {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className=''>
      <h1 className='ml-4 text-xl font-medium'>Datesheet</h1>
      <div className='flex flex-col px-3 overflow-y-auto items-center justify-center ml-2 mr-2 mb-3 no-scrollbar'>

        <School img={logo} schoolname="Metaphile Public School" address="Noida sector 62, Block A23" />
        <button className="bg-secondary mt-10 border border-transparent rounded-xl px-2 py-2 flex shadow-md mb-2" onClick={handlePrint}>
          <span className="text-black flex items-center">Download<img src={download} alt="" className='h-6  ml-1'></img></span>
        </button>
      </div>
    </div>
  )
}
