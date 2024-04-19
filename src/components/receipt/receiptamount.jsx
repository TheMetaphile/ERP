import React from 'react'
import Amount from './amount.jsx';
export default function Receiptamount() {
  return (
    <div className=' justify-center text-center'>
    <div className='flex justify-evenly   outline-double  ml-2 mr-2  mt-6 text-start'>
    <p className='w-28 text-center'>S.no</p>
    <p className='w-28 text-center'>Particular</p>
    <p className='w-28 text-center'>Amount</p>

 
      </div>
      <Amount sno="01" info="Tution fee" amount="5000"/>
      <Amount sno="02" info="Tution fee" amount="10000"/>
      <Amount sno="03" info="Tution fee" amount="15000"/>
</div>
  )
}
