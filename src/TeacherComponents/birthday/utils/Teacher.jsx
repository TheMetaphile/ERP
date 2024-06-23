import React from 'react'
import TeacherTile from './TeacherTile'
export default  function Teacher() {
    return (
        <div className=''>
            <span className='font-medium '>Today</span>
            <TeacherTile name='Yash' class='9th' birthday='9th of May' message='Send a BirthDay wish to'/>
            <div className='font-medium px-2 mt-3'>Day's To go</div>
            <TeacherTile name='Yash' class='9th' birthday='9th of May' message='9 Days to go.. Set Reminder to Wish happy BirthDay.'/>
            <TeacherTile name='Raju' class='9th' birthday='9th of May' message='9 Days to go.. Set Reminder to Wish happy BirthDay.'/>
            <TeacherTile name='Yash' class='9th' birthday='9th of May' message='9 Days to go.. Set Reminder to Wish happy BirthDay.'/>
        </div>
    )
}

