import React from 'react'
import AllActivityTile  from './AllActivityTile';
export default function AllActivity() {
    return (
        <div className='ml-3 mr-3 flex gap-5 flex-row mobile:max-laptop:flex-col '>
            <div className=' w-full'>
            <AllActivityTile bg='bg-blue-200' topic='Drawing Competition' description='School is Organizing a Drawing Competition on 11 March.' date='10 March 2024, 10:00 am' />
            <AllActivityTile bg='bg-green-200' topic='Drawing Competition' description='School is Organizing a Drawing Competition on 11 March.' date='10 March 2024, 10:00 am' />
            <AllActivityTile bg='bg-purple-200' topic='Drawing Competition' description='School is Organizing a Drawing Competition on 11 March.' date='10 March 2024, 10:00 am' />
            <AllActivityTile bg='bg-orange-200' topic='Drawing Competition' description='School is Organizing a Drawing Competition on 11 March.' date='10 March 2024, 10:00 am' />
            </div>
            <div className=' w-full'>
            <AllActivityTile bg='bg-red-200' topic='Drawing Competition' description='School is Organizing a Drawing Competition on 11 March.' date='10 March 2024, 10:00 am' />
            <AllActivityTile bg='bg-green-200' topic='Drawing Competition' description='School is Organizing a Drawing Competition on 11 March.' date='10 March 2024, 10:00 am' />
            <AllActivityTile bg='bg-blue-200' topic='Drawing Competition' description='School is Organizing a Drawing Competition on 11 March.' date='10 March 2024, 10:00 am' />
            <AllActivityTile bg='bg-pink-200' topic='Drawing Competition' description='School is Organizing a Drawing Competition on 11 March.' date='10 March 2024, 10:00 am' />
            </div>
        </div>
    )
}
