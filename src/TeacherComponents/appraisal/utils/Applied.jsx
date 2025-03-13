import React, { useContext } from 'react'
import AppliedTile from './AppliedTile'
import AuthContext from '../../../Context/AuthContext';

function Applied() {
  const { darkMode } = useContext(AuthContext);

  return (
    <div className={`py-2 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <AppliedTile
        submission='March 1,2024'
        salary='Rs 35,000'
        name='Abhishek'
        increment='Rs 3000'
        id='12345'
        by='Director'
        status='Pending'
      />
    </div>
  )
}

export default Applied