import React from 'react'
import Selection from './utils/Selection'
import Table from './utils/Table'
function TimeTable() {
    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <h1 className='text-2xl'>Time Table</h1>
            <div className=' mt-4  w-full'>
                <Selection />
            </div>

            <div className=' mt-4  w-full rounded-lg border shadow-md'>
                <Table />
            </div>

        </div>

    )
}

export default TimeTable