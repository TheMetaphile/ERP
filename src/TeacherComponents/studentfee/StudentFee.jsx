import React,{useState} from 'react'
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header'

function StudentFee() {

    const [filter,setFilter]=useState();
    const details = [

        { serial: '01', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'Paid' },
        { serial: '02', name: 'Abhishek', record: 'Term 1,2', amount: 'Rs 4000', status: 'Paid' },
        { serial: '03', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'UnPaid' },
        { serial: '04', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'Paid' },
        { serial: '05', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'UnPaid' },
        { serial: '06', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'Paid' },
        { serial: '07', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'Paid' },
        { serial: '08', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'Paid' },
        { serial: '09', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'UnPaid' },
        { serial: '10', name: 'Shailesh', record: 'Term 1,2', amount: 'Rs 4000', status: 'Paid' },

    ];

    const filterDetails= filter ?details.filter(detail=>detail.status === filter): details;
    return (
        <div className="overflow-y-auto w-full items-start  px-2 no-scrollbar">

            <h1 className="text-2xl font-medium mb-2">Student Fee</h1>

            <div className=' mt-4   w-full'>
                <Selection setFilter={setFilter}/>
            </div>

            <div className='  rounded-lg border shadow-md  w-full mb-2'>
                <Header headings={['Sr. No.', 'Name', 'Record Name', 'Amount']} />
                {filterDetails.map((detail, index) => (

                    <div key={index} className='border flex justify-between items-center py-2 pl-2  w-full font-normal text-base ' >
                        <div className=' w-40'>{detail.serial}</div>
                        <div className=' w-40'>{detail.name}</div>
                        <div className=' w-40'>{detail.record}</div>
                        <div className={`w-40 ${detail.status === 'Paid' ? 'text-green-400' : 'text-red-400'}`}>{detail.amount}</div>
                    </div>

                ))}
            </div>

        </div>
    )
}

export default StudentFee











