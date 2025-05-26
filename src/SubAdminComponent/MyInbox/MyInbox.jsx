import React, { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
function MyInbox() {
    const { authState, darkMode } = useContext(AuthContext);
    console.log(authState)
    return (
        <div>MyInbox</div>
    )
}

export default MyInbox