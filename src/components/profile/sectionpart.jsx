import React from 'react'
import './sectionpart.css';


export default function sectionpart(props) {
  return (
    <div className='infomatiom'>
    <h6 className='text'>{props.tittle} <span className='datatype'>{props.data}</span></h6>
   
</div>
  )
}
