import React from 'react'
import Test from './utils/Test'

function Panel() {
  return (
    <div className=" flex flex-col px-3 h-screen overflow-y-auto items-start mt-2 py-3 mb-3 no-scrollbar">
      <h1 className="text-2xl font-medium">Quiz</h1>
      
      <Test/>

    </div>
  )
}

export default Panel