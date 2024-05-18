import React from 'react'
import signature from './../../assets/signature.jpg';

export default function Table() {
  const schedule = [
    { date: '11 Jan 2024', subject: 'Maths', time: '10:00 am to 12:00 pm' },
    { date: '12 Jan 2024', subject: 'English', time: '10:00 am to 12:00 pm' },
    { date: '13 Jan 2024', subject: 'Hindi', time: '10:00 am to 12:00 pm' },
    { date: '14 Jan 2024', subject: 'S.S.T', time: '10:00 am to 12:00 pm' },
    { date: '15 Jan 2024', subject: 'Moral-value', time: '10:00 am to 12:00 pm' },
    { date: '18 Jan 2024', subject: 'Science', time: '10:00 am to 12:00 pm' },
    { date: '19 Jan 2024', subject: 'Drawing', time: '10:00 am to 12:00 pm' },
    { date: '20 Jan 2024', subject: 'G.k', time: '10:00 am to 12:00 pm' }

  ];

  return (
    <div className=' flex justify-evenly '>
      <table className=' mt-7  w-full justify-evenly items-center ml-5 mr-5 shadow-lg my-2 px-2 outline  outline-gray-400 rounded-lg mb-3'>
        <thead>
          <tr className='rounded-t-lg border-b-2 border-gray-400 mt-3  no-underline text-xl'>
            <th className='no-underline text-xl py-3'>Date </th>
            <th className='no-underline text-xl bg-blue-200 py-3'>Subject </th>
            <th className='no-underline text-xl bg-green-200 py-3'>Time </th>
          </tr>
        </thead>


        <tbody >
          {schedule.map((sch, index) => (
            <tr key={index} >
              <td className="font-normal text-gray-700 text-center py-3 ">{sch.date}</td>
              <td className="font-normal bg-blue-200 text-gray-700 text-center py-3">{sch.subject}</td>
              <td className="font-normal bg-green-200 text-gray-700 text-center py-3">{sch.time}</td>
            </tr>          
          ))}        
        </tbody>

        
        <tr>
          <td></td>
          <td></td>
          <td className='flex items-center justify-center font-medium'>
            <h1>
              <img src={signature} alt="" />
              Principal
            </h1>
          </td>

        </tr>
      </table>




    </div>


  )
}
