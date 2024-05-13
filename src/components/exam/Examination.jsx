import React, { useState } from 'react';

import MockGrid from './utils/MockGrid'
import PracticeGrid from './utils/PracticeGrid';
import InternalGrid from './utils/InternalGrid'
export default function Examination() {
  const [mockAllTiles, setMockAllTiles] = useState(false);
  const [practiceAllTiles, setPracticeAllTiles] = useState(false);
  const [internalAllTiles, setInternalAllTiles] = useState(false);

  const handleViewToggle = () => {
    setMockAllTiles(!mockAllTiles);
  };
  const handleViewToggle2 = () => {
    setPracticeAllTiles(!practiceAllTiles);
  };
  const handleViewToggle3 = () => {
    setInternalAllTiles(!internalAllTiles);
  };
  return (
    <div className=" flex flex-col w-full overflow-y-auto items-start px-2 mb-1 pb-4 no-scrollbar">
      <h1 className="text-2xl font-medium px-2">Mock Tests</h1>
      <div className=' w-full'>
      <MockGrid showAll={mockAllTiles} />
        <h1
          className="float-right px-6 mb-2 font-medium cursor-pointer "
          onClick={handleViewToggle}
        >
          {mockAllTiles ? 'View Less' : 'View More'}
        </h1>
      </div>

      <h1 className="text-2xl font-medium px-2">Practice Question</h1>
      <div className=' w-full'>
      <PracticeGrid showAll={practiceAllTiles} />
        <h1
          className="float-right px-6 mb-2 font-medium cursor-pointer "
          onClick={handleViewToggle2}
        >
          {practiceAllTiles ? 'View Less' : 'View More'}
        </h1>
      </div>

      <h1 className="text-2xl font-medium px-2">Internal main Exam</h1>
      <div className=' w-full'>
      <InternalGrid showAll={internalAllTiles} />
        <h1
          className="float-right px-6 mb-2 font-medium cursor-pointer "
          onClick={handleViewToggle3}
        >
          {internalAllTiles ? 'View Less' : 'View More'}
        </h1>
      </div>

     
    </div>
  )
}

