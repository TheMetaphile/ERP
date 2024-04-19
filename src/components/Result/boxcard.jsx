import React from 'react'

export default function boxcard(props) {
  return (
    
    <div className={`flex-1 ${props.color} w-48 h-12 p-4 shadow-md rounded-lg  items-center justify-center`}>
    <h1 className=" text-xs  "> {props.box}</h1>
    <p className=" text-gray-500 text-xs  m-5 " >{props.pre}</p>
    
</div>

  )
}
