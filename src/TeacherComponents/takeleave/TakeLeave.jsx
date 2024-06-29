import React,{useState} from 'react'
import Progress from './utils/Progress'
import History from './utils/History'
import NewLeave from './utils/NewLeave'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TakeLeave() {
    const [isDialogOpen, setIsDialogOpen]=useState(false);

    const handleOpen=()=>{
        setIsDialogOpen(true);
    }
    const handleClose=()=>{
        setIsDialogOpen(false);
    }
    return (
        <div className=" flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 ml-2 mr-3 mb-3 no-scrollbar">
            <ToastContainer />
            <div className='w-full flex items-center justify-between'>
            <h1 className='text-2xl'>Your Leave</h1>
                <h1 className='flex items-center text-sm bg-purple-200 p-2 rounded-lg shadow-md self-end cursor-pointer' onClick={handleOpen}>Take New Leave</h1>
            </div>
            <div className=' border shadow-md mt-4 rounded-lg  w-full'>
                <Progress />
            </div>
            <div className='mt-4  w-full'>
                <History />
            </div>
            {isDialogOpen && <NewLeave onClose={handleClose}/>}
        </div>

    )
}

export default TakeLeave