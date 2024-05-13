import React from 'react'
import CategoryGrid from './utils/CategoryGrid'
import PeopleGrid from './utils/PeopleGrid'
import PlaceGrid from './utils/PlaceGrid'
import RecentGrid from './utils/RecentGrid'

export default function Gallery() {
  return (
    <div className=" flex flex-col w-full overflow-y-auto items-start px-2 mb-1 pb-4 no-scrollbar">
      <h1 className="text-2xl font-medium px-2">Categories</h1>
      <div className=' w-full'>
        <CategoryGrid />
      </div>

      <h1 className="text-2xl font-medium px-2">People</h1>
      <div className=' w-full'>
        <PeopleGrid />
      </div>

      <h1 className="text-2xl font-medium px-2">Place</h1>
      <div className=' w-full'>
        <PlaceGrid />
      </div>

      <h1 className="text-2xl font-medium px-2">Recent</h1>
      <div className=' w-full'>
        <RecentGrid />
      </div>
    </div>
  )
}
