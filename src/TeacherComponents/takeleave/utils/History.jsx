import React from 'react'
import HistoryTile from './HistoryTile'
function History() {
    return (
        <div className=''>
        <h1 className='text-2xl'>Leave History</h1>
            <HistoryTile date='April 11,2024' description='I am feeling unwell and believe its best to take a day off to rest and recover.' reason='Casual Leave' status='Pending'/>
            <HistoryTile date='April 11,2024' description='I am feeling unwell and believe its best to take a day off to rest and recover.' reason='Medical Leave' status='Approved'/>
            <HistoryTile date='April 11,2024' description='I am feeling unwell and believe its best to take a day off to rest and recover.' reason='Annual Leave' status='Pending'/>
            <HistoryTile date='April 11,2024' description='I am feeling unwell and believe its best to take a day off to rest and recover.' reason='Unpaid Leave' status='Rejected'/>
       
        </div>
    )
}

export default History