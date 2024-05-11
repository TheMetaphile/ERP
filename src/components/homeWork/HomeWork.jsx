import React from 'react'
import ProgressCard from "../assignment_report/utils/progressCard"
import TodayHomeWork from './TodayHomeWork'

function HomeWork() {
  return (
    <div className=" flex flex-col px-3 h-screen overflow-y-auto items-start mt-2 py-3 mb-3 no-scrollbar">
      <h1 className="text-xl font-medium">Your HomeWork</h1>
      <div className=" flex flex-col tablet:flex-row items-center gap-3 w-full py-2 px-2">
        <ProgressCard
          title={`English`}
          percent='100'
          centerText='2'
          trailColor='#f26b7f'
          strokeColor='#FF0000'
        />
        <ProgressCard
          title={`Hindi`}
          percent='100'
          centerText='1'
          trailColor='#f26b7f'
          strokeColor='#FF0000'
        />
        <ProgressCard
          title={`Maths`}
          percent='100'
          centerText='1'
          trailColor='#f26b7f'
          strokeColor='#FF0000'
        />
        <ProgressCard
          title={`Science`}
          percent='100'
          centerText='3'
          trailColor='#f26b7f'
          strokeColor='#FF0000'
        />
      </div>
      <TodayHomeWork />

    </div>
  )
}

export default HomeWork