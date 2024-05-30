import React from 'react'
import AllTile from './AllTile'
function All() {
    return (
        <div className='ml-3 mr-3'>
            <span className='font-medium px-2'>Today</span>
            <AllTile name='Yash' class='9th' birthday='9th of May' message='Send a BirthDay wish to' />
            <div className='font-medium px-2 mt-3'>Day's To go</div>
            <AllTile name='Raju' class='9th' birthday='9th of May' message='9 Days to go.. Set Reminder to Wish happy BirthDay.'/>
            <AllTile name='Sachin' class='9th' birthday='9th of May' message='9 Days to go.. Set Reminder to Wish happy BirthDay.'/>
            <AllTile name='Kohli' class='9th' birthday='9th of May' message='9 Days to go.. Set Reminder to Wish happy BirthDay.'/>
        </div>
    )
}

export default All