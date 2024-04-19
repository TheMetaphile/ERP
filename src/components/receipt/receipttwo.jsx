import React from 'react'
import Receiptthree from './receiptthree.jsx'
import Receiptamount from './receiptamount.jsx'
import Total from './total.jsx'
import Receciptpayment from './receciptpayment.jsx'
import Download from './../../assets/Download.png';
export default function receipttwo(props) {
    return (
        <div className='flex-1 justify-center border-2 border-solid  mt-4 ml-3 mr-3 rounded-lg  bg-white'>
        <div className='flex justify-center'>

            <img src={props.img} className='w-16 h-16 mt-3' />

            <div className='text-center mt-5'>
                <h2 className='text-xl'>{props.schoolname}</h2>
                <span className=' text-sm'>{props.address}</span>
            </div>

        </div>
        <Receiptthree receipt="Receipt" />
        <Receiptamount />
        <Total total="20,000"/>
        <h1 className='mt-8 font-semibold text-center'>Payment Details</h1>
        <Receciptpayment/>
        <div className="flex justify-center mt-8 mb-3"> {/* Added flex justify-center here */}
        <button className="bg-teal-300 border border-transparent rounded-xl px-4 py-2 flex items-center shadow-md">
          <span className="text-black">Download</span>
          <img src={Download} alt="School" className="w-4 ml-2" /> 
        </button>
      </div>
        </div>
    ) 
}
