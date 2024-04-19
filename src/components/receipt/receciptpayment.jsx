import React from 'react'
import Payment from './payment'

export default function Receciptpayment() {
    return (
        <div className='flex-1 justify-evenly ml-2 mr-2  border-solid border 3  border-black h-24    mt-6 text-start'>
            <div className='flex justify-evenly'>
            <p className='w-28 text-center hover:underline '>Mode</p>
            <p className='w-28 text-center hover:underline'> Id</p>
            <p className='w-28 text-center hover:underline'>Date /Time</p>
            <p className='w-28 text-center hover:underline'>Amount</p>
            </div>
            <div className=''>
                <Payment mode="online " id="12345678" date="02/04/2024" amount="5,000" />
                <Payment mode="online " id="12345678" date="02/04/2024" amount="5,000" />
            </div>
        </div>
    )
}
