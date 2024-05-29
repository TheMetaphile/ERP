import React from 'react';
import ClassWorkTile from './ClassWorkTile';
import { MdEdit } from "react-icons/md";
import Upload from "../../assets/upload.png"
function ClassWork() {

    return (
        <div className="w-full flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2  mb-3 no-scrollbar">
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-2xl'>All Classwork</h1>
                <h1 className='flex items-center text-sm bg-secondary p-2 rounded-lg shadow-md self-end'>Edit <MdEdit className='ml-1'/></h1>
            </div>

            <div className='w-full mt-4 rounded-lg mb'>
                <ClassWorkTile classs='6th' description='Question answer of Chapter 3.' subject='English' day='Today' />
                <ClassWorkTile classs='6th' description='Question answer of Chapter 3.' subject='English' day='Today' />
                <ClassWorkTile classs='6th' description='Question answer of Chapter 3.' subject='English' day='Today' />
                <ClassWorkTile classs='6th' description='Question answer of Chapter 3.' subject='English' day='Yesterday' />

            </div>

            <div className='flex items-center cursor-pointer self-end'>
                <h1>(Upload)</h1>
                <img src={Upload} alt="Upload icon"></img>
            </div>

        </div>

    )
}

export default ClassWork