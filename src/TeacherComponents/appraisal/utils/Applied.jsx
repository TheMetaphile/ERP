import React from 'react'
import AppliedTile from './AppliedTile'

function Applied() {
  return (
    <div className=" border border-gray-300 shadow-md rounded-lg py-2 mt-4 mr-3 ml-3">
            
            <AppliedTile submission='March 1,2024' salary='Rs 35,000' name='Abhishek' increment='Rs 3000' id='12345' by='Director' status='Pending'/>

        </div>
  )
}

export default Applied