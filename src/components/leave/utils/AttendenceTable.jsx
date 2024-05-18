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
    <div className='rounded-lg shadow-lg   w-full'>
      <table className='mt-7 mb-3 w-full justify-evenly items-center  outline  outline-gray-400 rounded-lg '>
        <thead>
          <tr className='rounded-t-lg border-b-2 border-gray-400 mt-3  text-lg font-medium '>
            <th className=' '>Leave Type </th>
            <th className='bg-blue-200 '>Start Date </th>
            <th className='bg-green-200 '>End Date </th>
            <th className=''>Status </th>

          </tr>
        </thead>
        <tbody >
          {content.map((con, index) => (
            <tr key={index} >
              <td className="font-normal ">{con.type}</td>
              <td className="font-normal bg-blue-200">{con.start}</td>
              <td className="font-normal bg-green-200">{con.end}</td>
              <td className={`${con.status === "Pending" ? "text-orange-300" : con.status === "Rejected" ? "text-red-400" : "text-green-400"}`}>{con.status}</td>

            </tr>
          ))}
        </tbody>
      </table>




    </div>


  )
}
