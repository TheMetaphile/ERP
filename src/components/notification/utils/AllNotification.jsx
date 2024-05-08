import React from 'react'
import AllNotificationTile from './AllNotificationTile'
function AllNotification() {
    return (
        <div className='ml-3 mr-3'>
            <AllNotificationTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' />
            <AllNotificationTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' />
            <AllNotificationTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' />
            <AllNotificationTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' />
        </div>
    )
}

export default AllNotification