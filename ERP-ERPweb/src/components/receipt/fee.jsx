import React from 'react'
import './fee.css';
export default function fee( props) {
  return (
    <div className='receipt-info'>
        <p class>{ props.info} <span> {props.number}</span></p>
       </div>
  )
}
