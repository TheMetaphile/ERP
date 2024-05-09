import React from 'react'


export default function AttendenceTable() {
  const content = [
    { type: 'Permission', start: '07-04-2024', end: '09-04-2024', status: 'Pending' },
    { type: 'Leave', start: '07-04-2024', end: '09-04-2024', status: 'Pending' },
    { type: 'Leave', start: '07-04-2024', end: '09-04-2024', status: 'Approved' },
    { type: 'Leave', start: '07-04-2024', end: '09-04-2024', status: 'Pending' },
    { type: 'Permission', start: '07-04-2024', end: '09-04-2024', status: 'Pending' },
    { type: 'Leave', start: '07-04-2024', end: '09-04-2024', status: 'Rejected' },
    { type: 'Leave', start: '07-04-2024', end: '09-04-2024', status: 'Pending' },
  ];
  return (
    <div className='bg-yellow-400 flex justify-evenly  w-full'>
      <table className=' mt-7  w-full justify-evenly items-center ml-5 mr-5'>
        <thead>
          <tr className='outline  outline-slate-500 mt-3   text-xl'>
            <th className=' text-xl'>Leave Type </th>
            <th className=' text-xl'>Start Date </th>
            <th className=' text-xl'>End Date </th>
            <th className=' text-xl'>Status </th>

          </tr>
        </thead>
        <tbody>
          {content.map((con, index) => (
            <tr key={index}>


              <th className='font-normal'>{con.type}</th>
              <th className='font-normal'>{con.start}</th>
              <th className='font-normal'>{con.end}</th>
              <th className={`${con.status === "Pending" ? "text-orange-300" : con.status === "Rejected" ? "text-red-400" : "text-green-400"}`}>{con.status}</th>


            </tr>
          ))}
        </tbody>
      </table>




    </div>


  )
}
