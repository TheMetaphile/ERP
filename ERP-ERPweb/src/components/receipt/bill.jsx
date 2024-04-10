import React from 'react'
import './bill.css';
export default function bill(props) {
  return (
    <div className='bill'>
        <p>{props.no}</p>
        <p>{props.text}</p>
        <p>{props.ammount}</p>
    </div>
  )
}
