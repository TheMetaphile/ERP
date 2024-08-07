import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import Selection from './utils/Selection';
import Header from './utils/Header'
import { Link } from "react-router-dom";
import NewTransfer from './utils/NewTransfer';

function TC() {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpen = () => {
        setIsDialogOpen(true);
    }
    const handleClose = () => {
        setIsDialogOpen(false);
    }
    const details = [

        { serial: '01', tc: '05', name: 'Shailesh', admission: '2516', Class: '12th' },
        { serial: '02', tc: '05', name: 'Abhishek', admission: '2516', Class: '12th' },
        { serial: '03', tc: '05', name: 'Shailesh', admission: '2516', Class: '12th' },
        { serial: '04', tc: '05', name: 'Shailesh', admission: '2516', Class: '12th' },
        { serial: '05', tc: '05', name: 'Shailesh', admission: '2516', Class: '12th' },
        { serial: '06', tc: '05', name: 'Shailesh', admission: '2516', Class: '12th' },
        { serial: '07', tc: '05', name: 'Shailesh', admission: '2516', Class: '12th' },
        { serial: '08', tc: '05', name: 'Shailesh', admission: '2516', Class: '12th' },
        { serial: '09', tc: '05', name: 'Shailesh', admission: '2516', Class: '12th' },
        { serial: '10', tc: '05', name: 'Shailesh', admission: '2516', Class: '12th' },

    ];
    return (
        <div className="overflow-y-auto w-full items-start px-2 mobile:max-tablet:my-2">
            <div className='w-full flex items-center justify-between px-4 my-4 mobile:max-tablet:my-4'>
                <h1 className="text-2xl font-medium mb-2 mobile:max-tablet:text-xl">Transfer Certificate</h1>
                <h1 className='f text-sm bg-purple-200 p-2 rounded-lg shadow-md self-end cursor-pointer' onClick={handleOpen}>Add New </h1>

            </div>

            <Selection />

            <div className=' overflow-auto'>
                <div className='  rounded-lg border border-black shadow-md mobile:max-tablet:w-fit w-full mb-2 overflow-auto'>
                    <Header headings={['Sr. No.', 'TC No.', 'Admission No.', 'Name', 'Class', 'Action']} />
                    {details.map((detail, index) => (
                        <Link to={`/Admin-Dashboard/transfercertificate/${detail.name}`} key={index} className='text-center '>
                            <div key={index} className='flex justify-between border border-gray-300 text-center rounded-lg shadow-md  items-center p-2   w-full' >
                                <div className=' w-40'>{detail.serial}</div>
                                <div className=' w-40'>{detail.tc}</div>
                                <div className=' w-40'>{detail.admission}</div>
                                <div className=' w-40'>{detail.name}</div>
                                <div className=' w-40'>{detail.Class}</div>
                                <div className=' w-40 text-red-600'>Delete</div>

                            </div>
                        </Link>
                    ))}
                </div>

                {isDialogOpen && <NewTransfer onClose={handleClose} />}

            </div>
        </div>
    )
}

export default TC

