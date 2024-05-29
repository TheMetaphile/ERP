import Logo from '../../../assets/metaphile_logo.png'
import Cross from '../../../assets/Circled X.png'

export default function StudentTile(props) {
    return (
        <div className=" w-full p-2  rounded-lg shadow-md mt-3 flex items-center">
            <img src={Logo} alt="" className='h-12'></img>
            <div className='px-2 w-11/12'>
                <div className="pl-2 mt-1 font-normal text-sm">{props.description}</div>
                <div className='flex items-center justify-between'>
                    <div className="pl-2 mt-1 font-light text-xs text-gray-500">By: {props.by}</div>
                    <div className="pl-2 mt-1 font-light text-xs text-gray-500">{props.date}</div>
                </div>
            </div>

            <div className="w-7 h-7  rounded-full"><img src={Cross}alt=""></img></div>
        </div>
    )
}

