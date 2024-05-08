import React from 'react'
import InboxTile from './InboxTile'
export default  function Inbox() {
    return (
        <div className='ml-3 mr-3'>
            <InboxTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' />
            <InboxTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' />
            <InboxTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' />
            <InboxTile date='March 1,2024' description='Please confirm your email address by clicking on the link we just emailed you. If you cannnot find the email, you can request a new confirmation email or change your email adddress.' />
        </div>
    )
}

