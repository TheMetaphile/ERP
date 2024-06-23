import React, {useState} from 'react'
import { MdEdit } from "react-icons/md";
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header'
import { Link } from "react-router-dom";
import NewReport from './utils/NewReport';

function ReportCard() {
   
    const[isDialogOpen,setIsDialogOpen]=useState(false);

    const handleOpen=()=>{
        setIsDialogOpen(true);
    }
    const handleClose=()=>{
        setIsDialogOpen(false);
    }
        const details = [
          
            { serial: '01', name:'Shailesh', marks: '70/100',gpa: '7' },
            { serial: '02', name:'Abhishek', marks: '40/100',gpa: '4' },
            { serial: '03', name:'Bhuvneshwar Tyagi', marks: '80/100',gpa: '8' },
            { serial: '04', name:'Umang Arora', marks: '90/100',gpa: '9' },
            { serial: '05', name:'Mukul Mourya', marks: '100/100',gpa: '10' },
            { serial: '06', name:'Olay', marks: '60/100',gpa: '6' },   
            { serial: '07', name:'Ankit Sharma', marks: '50/100',gpa: '5' },   
            { serial: '08', name:'Arun Saini', marks: '80/100',gpa: '8' },   
            { serial: '09', name:'Shailesh', marks: '90/100',gpa: '9' },   
            { serial: '10', name:'Shailesh', marks: '90/100',gpa: '8' },   

        ];
    return (
        <div className="overflow-y-auto w-full items-start  px-2 no-scrollbar">
            <div className='w-full flex items-center justify-between px-4 my-2'>
                <h1 className="text-2xl font-medium mb-2">Search Report Card</h1>
                
                <span className='flex gap-2 w-fit'>
                <Selection />
                    <h1 className='flex items-center text-sm bg-secondary p-2 rounded-lg shadow-md self-end'>Edit <MdEdit className='ml-1' /></h1>
                    <h1 className='f text-sm bg-purple-200 p-2 rounded-lg shadow-md self-end cursor-pointer' onClick={handleOpen}>Add New Report Card</h1>
                </span>
            </div>

            

            <div className='  rounded-lg shadow-md border border-gray-300 w-full mb-2'>
            <Header headings={['Sr. No.', 'Name', 'Total Marks', 'GPA']} />
            {details.map((detail, index) => (
                <Link to={`/Teacher-Dashboard/reportcard/${detail.name}`} key={index}>
                    <div key={index} className='flex justify-between border border-gray-300 shadow-md items-center py-2 pl-2  w-full' >
                        <div className=' w-40 text-center'>{detail.serial}</div>
                        <div className=' w-40 text-center'>{detail.name}</div>
                        <div className=' w-40 text-center'>{detail.marks}</div>
                        <div className=' w-40 text-center'>{detail.gpa}</div>
                    </div>
                     </Link>
                ))}
            </div>

                {isDialogOpen && <NewReport onClose={handleClose}/>}
            

        </div>

    )
}

export default ReportCard











