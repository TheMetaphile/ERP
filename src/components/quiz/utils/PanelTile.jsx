import profile from '../../../assets/Profile1.png'
import check from './../../../assets/Checkmark.png'
import cross from './../../../assets/Circled X.png'
import excla from './../../../assets/exclamation.png'
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
                        <img src={check} alt="" className='w-10 h-10'/>
                        <span className='px-2'>
                            <h1 className='font-normal'>{props.correct}</h1>
                            <h1 className='text-gray-400 text-xs'>Correct Answers</h1>
                        </span>
                    </div>
                    <div className='flex flex-1'>
                        <img src={cross} alt="" className='w-10 h-10'/>
                        <span  className='px-2'>
                            <h1 className='font-normal'>{props.wrong}</h1>
                            <h1 className='text-gray-400 text-xs'>Wrong Answers</h1>
                        </span>
                    </div>
                    <div className='flex  flex-1'>
                        <img src={excla} alt="" className='w-10 h-10'/>
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

