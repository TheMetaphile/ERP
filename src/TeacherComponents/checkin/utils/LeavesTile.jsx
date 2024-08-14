import Logo from '../../../assets/metaphile_logo.png'
export default function LeavesTile(props) {
    return (
        <div className={` ${props.description === 'Absent' ? 'bg-red-300' : 'bg-blue-200'} w-full p-2  rounded-lg shadow-md mt-3  flex items-center`}>
            <h1 className="pl-2 mobile:max-laptop:text-lg font-semibold text-xl">{props.leaves}</h1>

            <div className="w-2 h-2 bg-black rounded-full ml-3"></div>

            <div className="pl-2 mobile:max-laptop:text-lg  font-normal text-xl ml-3">{props.description}</div>
        </div>
    )
}

