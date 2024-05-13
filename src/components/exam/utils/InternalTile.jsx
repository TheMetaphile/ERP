import LinearProgressBar from './../../Home/utils/SubjectProgress/LinearProgressBar/LinearProgressBar.jsx'
import book from './../../../assets/subject.png'
import { Link } from "react-router-dom";

export default function InternalTile(props) {
    return (
        <div className=" p-3 tablet:mr-2 mobile:max-tablet:mb-3 rounded-lg shadow-md mt-2">
            <h1 className='text-xs text-gray-400 font-medium'>{props.completed} completed</h1>
            <div className='mt-2'>
                <LinearProgressBar/>
            </div>
            <img src={book} alt="" className='m-auto mt-3'></img>
            <div className="w-fit  m-auto mt-3 font-semibold text-lg">{props.subject}</div>
            <Link to={`${props.subject}`}><div className="w-fit px-3 py-1 m-auto mt-3 bg-bg_blue rounded-full shadow-xl">Take Test</div></Link>

        </div>
    )
}


