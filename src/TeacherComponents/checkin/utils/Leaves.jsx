import React from 'react'
import LeavesTile from './LeavesTile'
function Leaves() {
    return (
        <div className=' h-full'>
        <h1 className="px-3 text-2xl font-medium">Mid leaves</h1>
        <div className='bg-slate-300 h-1 mx-3 mt-4'></div>
        <div className='ml-3 mr-3'>
            <LeavesTile leaves="05" description='Early Leaves' />
            <LeavesTile leaves="05" description='Absent' />
            <LeavesTile leaves="05" description='Early Leaves' />
            <LeavesTile leaves="05" description='Early Leaves' />
            <LeavesTile leaves="05" description='Early Leaves' />
            <LeavesTile leaves="05" description='Early Leaves' />

        </div>
        </div>
    )
}

export default Leaves