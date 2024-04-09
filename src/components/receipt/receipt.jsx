import React from 'react'
import './receipt.css';
import logo from './../../assets/metaphile_logo.png';
import  Fee from './fee.jsx';
import Bill from './bill.jsx';
import Pay from './pay.jsx';
export default function Receipt() {
  return (
    <div className='receipt'>
        <h4>Receipt</h4>
         <div className='pay-section'>
            <img src={logo} alt={logo} />
            <span >Metaphile Public School</span>
                 <p  className='address'>Noida sector 62, Block A23</p>

<div className='receipt-info'>
        <h1 className='divided'>Receipt</h1>
                 <Fee info="Receipt"   number="837492833" />
                 <Fee info="Admission" number="20095" />
                 <Fee info="Student Name" number="Abhishek Kumar" />
                 <Fee info="Class"      number="7IV ‘A’" />
                 <Fee info="Father Name" number="Mr. Tarun Kumar" />
                 <Fee info="Mother Name" number="Mrs Rani" />
                 <Fee info="Receipt Date" number="12-04-2024" />
                 <Fee info="Receipt Date" number="12-04-2024" />
                 <Fee info="Academic Year" number="2023 - 20249"/>
     </div>
            
        <div class="student-info">
                     <p>s.no</p>
                       <p>Particulars</p>
                         <p>Amount</p>
                       
    </div >
        <Bill no='1' text='tutionfee' ammount='3500'/>
      <Bill no='2' text='tutionfee' ammount='3500'/>
        <Bill no='3' text='tutionfee' ammount='3500'/>
         <h6 className='total'>Total <span>100569</span></h6>
         <h6 className='payment'>Payment Details</h6>
<div>
    <Pay />
    
</div>


</div>

    
    </div>
  )
}
 