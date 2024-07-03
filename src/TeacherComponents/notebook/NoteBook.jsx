import React,{useState} from 'react'
import { MdEdit } from "react-icons/md";
import Selection from './utils/Selection';
import Header from '../../AdminComponents/Home/utils/TeachersDetails/LeftCard/Header'
import { Link } from "react-router-dom";
import { FaRegCircleCheck, FaRegCircleXmark  } from "react-icons/fa6";
import NewRecord from './utils/NewRecord';

function NoteBook() {

    const [isDialogOpen, setIsDialogOpen]=useState(false);

    const handleOpen=()=>{
        setIsDialogOpen(true);
    }
    const handleClose=()=>{
        setIsDialogOpen(false);
    }
   
        const details = [
          
            { serial: '01', name:'Shailesh', checked:'true' },
            { serial: '02', name:'Abhishek', checked:'true' },
            { serial: '03', name:'Shailesh', checked:'false' },
            { serial: '04', name:'Shailesh', checked:'true' },
            { serial: '05', name:'Shailesh', checked:'true' },
            { serial: '06', name:'Shailesh', checked:'false' },   
            { serial: '07', name:'Shailesh', checked:'true' },   
            { serial: '08', name:'Shailesh', checked:'true' },   
            { serial: '09', name:'Shailesh', checked:'false' },   
            { serial: '10', name:'Shailesh', checked:'true' },   

        ];
    return (
        <div className="overflow-y-auto w-full items-start  px-2 no-scrollbar">
            <div className='w-full flex items-center justify-between px-4 mt-2'>
                <h1 className="text-2xl font-medium mb-2">Note Book Record</h1>
                <span className='flex gap-1'>
                    <h1 className='flex items-center text-sm bg-secondary p-2 rounded-lg shadow-md self-end'>Edit <MdEdit className='ml-1' /></h1>
                    <h1 className='f text-sm bg-purple-200 p-2 rounded-lg shadow-md self-end cursor-pointer' onClick={handleOpen}>Add New Record</h1>
                </span>
            </div>

            <div className=' mt-4   w-full'>
                <Selection />
            </div>

            <div className='  rounded-lg border shadow-md  w-full mb-2'>
            <Header headings={['Sr. No.', 'Name', 'Checked', 'UnChecked']} />
            <div className='flex-1 justify-evenly items-center    h-fit  border-black w-auto text-center'>
            {details.map((detail, index) => (
               
               <div key={index} className='border flex justify-evenly items-center py-2 pl-1 w-full' >
                   <div className=' w-48 '>{detail.serial}</div>
                   <div className=' w-48'>{detail.name}</div>
                   <div className=' w-48'>{detail.checked === 'true' ? <FaRegCircleCheck className="text-green-500 inline-block" /> : null}</div>
                   <div className=' w-48'>{detail.checked === 'false' ? <FaRegCircleXmark className="text-red-500 inline-block" /> : null}</div>
               </div>
                
           ))}
            </div>
            </div>

                {isDialogOpen && <NewRecord onClose={handleClose}/>}
            

        </div>

    )
}

export default NoteBook











