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
    <div className=' flex justify-evenly  w-full'>
      <table className=' mt-7  w-full justify-evenly items-center ml-5 mr-5'>

        <tr className='outline  outline-slate-500 mt-3  no-underline text-xl'>
          <th className='no-underline text-xl'>Leave Type </th>
          <th className='no-underline text-xl'>Start Date </th>
          <th className='no-underline text-xl'>End Date </th>
          <th className='no-underline text-xl'>Status </th>

        </tr>
        
        {content.map((con, index) => (
          <tr>

            <React.Fragment key={index}>
              <th className='font-normal'>{con.type}</th>
              <th className='font-normal'>{con.start}</th>
              <th className='font-normal'>{con.end}</th>
              <th className={`${con.status==="Pending"? "text-orange-300": con.status==="Rejected" ?"text-red-400":"text-green-400"}`}>{con.status}</th>
            </React.Fragment>

          </tr>
        ))}

      </table>




    </div>


  )
}
