import React from 'react'
import Switch from './switch'

function PromotionRow({ detail, index, authState, selectedStudents, handleSwitchChange }) {
    return (
        <div key={index} className='flex justify-between items-center py-2 pl-2 h-fit border border-gray-300 text-center w-fit mobilemedium:w-full laptop:w-full gap-2'>
            <div className='w-40 mobile:max-tablet:w-20 text-center'>{detail.rollNumber}</div>
            <div className='w-48 mobile:max-tablet:w-40 text-center flex justify-center'>
                <img src={detail.profileLink} alt="img" className='w-8 h-8 rounded-full mr-2' />
                <div className='w-52 text-center'>{detail.name}</div>
            </div>
            <div className='w-40 mobile:max-tablet:w-20 text-center'>{authState.ClassDetails.class}</div>
            <div className='w-40 mobile:max-tablet:w-20 text-center'>{authState.ClassDetails.section}</div>
            <div className='w-40 mobile:max-tablet:w-20 text-center'>
                <Switch
                    checked={selectedStudents.includes(detail.email)}
                    onChange={(checked) => handleSwitchChange(detail.email, checked)}
                />
            </div>
        </div>
    )
}

export default PromotionRow