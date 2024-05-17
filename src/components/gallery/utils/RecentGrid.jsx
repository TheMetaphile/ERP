import React from 'react'

function RecentGrid() {
  return (
    <div className="grid grid-cols-4 gap-4">

      <div className="col-span-1">
        <div className="border border-gray-400 p-4">First Column</div>
        <div className="border border-gray-400 p-4">Inner Column 1</div>
        <div className="border border-gray-400 p-4">Inner Column 2</div>
      </div>


      <div className="col-span-2 grid grid-rows-3 border border-gray-400">
        
          <div className="row-span-3 text-center self-center">
            
              Center container
          </div>

          <div className='grid grid-cols-3'>
          <div className="border border-gray-400 p-4 col-span-1">Inner Column 3</div>
          <div className="border border-gray-400 p-4 col-span-1">Inner Column 4</div>
          <div className="border border-gray-400 p-4 col-span-1">Inner Column 5</div>
          </div>
      </div>



      <div className="col-span-1">
        <div className="border border-gray-400 p-4">Last Column</div>
        <div className="border border-gray-400 p-4">Inner Column 6</div>
        <div className="border border-gray-400 p-4">Inner Column 7</div>
      </div>
    </div>
  )
}

export default RecentGrid