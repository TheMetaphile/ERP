import React from 'react';
import HomeWorkTile from './HomeWorkTile';
import { MdEdit } from "react-icons/md";
import Upload from "../../assets/upload.png"
function HomeWork() {

    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl'>All HomeWork</h1>
                <h1 className='flex items-center text-sm bg-secondary p-2 rounded-lg shadow-md self-end'>Edit <MdEdit className='ml-2'/></h1>
            </div>

            <div className='w-full mt-4 rounded-lg mb'>
                <HomeWorkTile classs='6th' description='Question answer of Chapter 3.' subject='English' day='Today' />
                <HomeWorkTile classs='6th' description='Question answer of Chapter 3.' subject='English' day='Today' />
                <HomeWorkTile classs='6th' description='Question answer of Chapter 3.' subject='English' day='Today' />
                <HomeWorkTile classs='6th' description='Question answer of Chapter 3.' subject='English' day='Yesterday' />
                <HomeWorkTile classs='6th' description='Question answer of Chapter 3.' subject='English' day='Yesterday' />

            </div>

            <div className='flex items-center cursor-pointer self-end'>
                <h1>(Upload)</h1>
                <img src={Upload} alt="Upload icon"></img>
            </div>

        </div>

    )
}

export default HomeWork