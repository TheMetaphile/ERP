import profile from '../../../assets/Profile1.png'
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import { BsExclamationCircle } from "react-icons/bs";
import LinearProgressBar from './../../Home/utils/SubjectProgress/LinearProgressBar/LinearProgressBar.jsx'

export default function PanelTile(props) {

    return (
        <div className=" w-full p-2  mt-3 flex flex-col laptop:flex-row items-center  justify-center">

            <img src={profile} alt="" className='  '></img>
            <div className='px-2 laptop:ml-10 w-full'>
                <h1 className='font-normal text-2xl'>{props.name}</h1>
                <div className='flex items-center justify-between'>
                <h1 className='text-sm text-gray-500'>Level {props.level}</h1>
                <h1 className='text-xs text-gray-400'> {props.question} Question</h1>
                </div>
                <div className='mt-2'>
                <LinearProgressBar />
                </div>
                <div className=' flex mt-2 mb-2 flex-col laptop:flex-row'>
                    <div className='flex  flex-1'>
                        <FaRegCircleCheck className='w-9 h-9 text-green-400'/>
                        <span className='px-2'>
                            <h1 className='font-normal'>{props.correct}</h1>
                            <h1 className='text-gray-400 text-xs'>Correct Answers</h1>
                        </span>
                    </div>
                    <div className='flex flex-1'>
                        <FaRegCircleXmark className='w-9 h-9 text-red-400'/>
                        <span  className='px-2'>
                            <h1 className='font-normal'>{props.wrong}</h1>
                            <h1 className='text-gray-400 text-xs'>Wrong Answers</h1>
                        </span>
                    </div>
                    <div className='flex  flex-1'>
                    <BsExclamationCircle className='w-9 h-9 text-purple-400'/>
                        <span className='px-2'>
                            <h1 className='font-normal'>{props.skipped}</h1>
                            <h1 className='text-xs text-gray-400'>Question Skipped</h1>
                        </span>
                    </div>
                </div>


            </div>


        </div>
    )
}

