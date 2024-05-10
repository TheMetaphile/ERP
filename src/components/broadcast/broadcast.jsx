import React from 'react'
import VideoTile from './utils/VideoTile'
import broad from '../../assets/broadcast.png'
import Documents from './utils/Documents'
import Links from './utils/Links'
export default function broadcast() {

    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2  mb-3 no-scrollbar">
            <h1 className='text-2xl ml-3'>Multi Media</h1>

            <div className='w-full mt-3 px-3 '>
                <h2 className='text-xl'>  Videos </h2>
                <div className=' flex'>
                    <VideoTile img={broad} description='All Chapter Revision' text='Live Stream Capture' />
                    <VideoTile img={broad} description='All Chapter Revision' text='Live Stream Capture' />
                    <VideoTile img={broad} description='All Chapter Revision' text='Live Stream Capture' />

                </div>
            </div>

            <div className='flex  w-full px-3 gap-10 mt-5 flex-col laptop:flex-row'>
                <Documents />
                <Links/>
            </div>

        </div>

    )
}

