import React from 'react'
import AppliedTile from './AppliedTile'

function Applied() {
  return (
    <div className=" py-2 ">
      <AppliedTile submission='March 1,2024' salary='Rs 35,000' name='Abhishek' increment='Rs 3000' id='12345' by='Director' status='Pending' />
    </div>
  )
}

export default Applied