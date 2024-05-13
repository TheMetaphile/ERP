import React from 'react'
import Test from './utils/Test'
import PanelGrid from './utils/PanelGrid'

function Panel() {
  return (
    <div className=" flex flex-col px-3 h-screen overflow-y-auto items-start mt-2 py-3 mb-3 no-scrollbar">
      <h1 className="text-2xl font-medium">Quiz</h1>
      <div className=' w-full px-2 rounded-lg shadow-md'>
        <PanelGrid />
      </div>
      <Test />

    </div>
  )
}

export default Panel