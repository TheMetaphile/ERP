import React from 'react'
import { MdEdit } from "react-icons/md";
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header'
import { Link } from "react-router-dom";

function ReportCard() {
   
        const details = [
          
            { serial: '01', name:'Shailesh', marks: '90/100',gpa: '5' },
            { serial: '02', name:'Abhishek', marks: '90/100',gpa: '5' },
            { serial: '03', name:'Shailesh', marks: '90/100',gpa: '5' },
            { serial: '04', name:'Shailesh', marks: '90/100',gpa: '5' },
            { serial: '05', name:'Shailesh', marks: '90/100',gpa: '5' },
            { serial: '06', name:'Shailesh', marks: '90/100',gpa: '5' },   
            { serial: '07', name:'Shailesh', marks: '90/100',gpa: '5' },   
            { serial: '08', name:'Shailesh', marks: '90/100',gpa: '5' },   
            { serial: '09', name:'Shailesh', marks: '90/100',gpa: '5' },   
            { serial: '10', name:'Shailesh', marks: '90/100',gpa: '5' },   

        ];
    return (
        <div className="overflow-y-auto w-full items-start  px-2 no-scrollbar">
            <div className='w-full flex items-center justify-between px-4 mt-2'>
                <h1 className="text-2xl font-medium mb-2">Search Report Card</h1>
                <span className='flex gap-1'>
                    <h1 className='flex items-center text-sm bg-secondary p-2 rounded-lg shadow-md self-end'>Edit <MdEdit className='ml-1' /></h1>
                    <h1 className='f text-sm bg-purple-200 p-2 rounded-lg shadow-md self-end'>Add New Report Card</h1>
                </span>
            </div>

            <div className=' mt-4   w-full'>
                <Selection />
            </div>

            <div className='  rounded-lg border shadow-md p-2 w-full mb-2'>
            <Header headings={['Sr. No.', 'Name', 'Total Marks', 'GPA']} />
            {details.map((detail, index) => (
                <Link to={`/Teacher-Dashboard/reportcard/${detail.name}`} key={index}>
                    <div key={index} className='flex justify-between items-center py-2 px-3  w-full' >
                        <span>{detail.serial}</span>
                        <span>{detail.name}</span>
                        <span>{detail.marks}</span>
                        <span>{detail.gpa}</span>
                    </div>
                     </Link>
                ))}
            </div>

                
            

        </div>

    )
}

export default ReportCard











