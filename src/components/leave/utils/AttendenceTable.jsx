import React from 'react'


export default function AttendenceTable(props) {
  return (
    <div className=' flex justify-evenly bg-red-300 w-full'>
      <table className=' mt-7  w-full justify-evenly items-center ml-5 mr-5'>

        <tr className='outline  outline-slate-500 mt-3  no-underline text-xl'>
          <th className='no-underline text-xl'>Leave Type </th>
          <th className='no-underline text-xl'>Start Date </th>
          <th className='no-underline text-xl'>End Date </th>
          <th className='no-underline text-xl'>Status </th>

        </tr>
       
      
      </table>




    </div>


  )
}
