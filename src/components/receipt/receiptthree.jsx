import React from 'react'
import Receiptfour from './receiptfour.jsx';
export default function receiptthree(props) {
  return (
    <div className='flex-1  justify-center text-center mt-3 outline-2 outline-slate-200	 '>
    <h5 className='mr-3 ml-3 flex justify-center outline-double   font-normal text-center mt-8'>{props.receipt}</h5>
    <Receiptfour info="Receipt No" data="41507"/>
    <Receiptfour info="Student Name" data="Abhishek Kumar"/>
    <Receiptfour info="Class" data="IV ‘A’"/>
    <Receiptfour info="Father Name" data="Mr. Tarun Kumar"/>
    <Receiptfour info="Mother Name" data="Mrs Rani"/>
    <Receiptfour info="Receipt Date" data="12-04-2024"/>
    <Receiptfour info="Academic Year" data="2023 - 24"/>
   
   
</div>
  )
}
