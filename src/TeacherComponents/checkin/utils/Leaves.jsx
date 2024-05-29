import React from 'react'
import LeavesTile from './LeavesTile'
function Leaves() {
    return (
        <div>
        <h1 className="px-3 py-2">Mid leaves</h1>
        <div className='bg-slate-300 h-1 mx-3'></div>
        <div className='ml-3 mr-3'>
            <LeavesTile leaves="05" description='Early Leaves' />
            <LeavesTile leaves="05" description='Absent' />
            <LeavesTile leaves="05" description='Early Leaves' />
            <LeavesTile leaves="05" description='Early Leaves' />
        </div>
        </div>
    )
}

export default Leaves