import React from 'react'
import StudentTile from './StudentTile'
export default  function Student() {
    return (
        <div className=''>
            <span className='font-medium '>Today</span>
            <StudentTile name='Yash' class='9th' birthday='9th of May' message='Send a BirthDay wish to'/>
            <div className='font-medium px-2 mt-3'>Day's To go</div>
            <StudentTile name='Raju' class='9th' birthday='9th of May' message='9 Days to go.. Set Reminder to Wish happy BirthDay.'/>
            <StudentTile name='Raju' class='9th' birthday='9th of May' message='9 Days to go.. Set Reminder to Wish happy BirthDay.'/>
            <StudentTile name='Raju' class='9th' birthday='9th of May' message='9 Days to go.. Set Reminder to Wish happy BirthDay.'/>
        </div>
    )
}

