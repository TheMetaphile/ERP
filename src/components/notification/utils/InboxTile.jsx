import Logo from '../../../assets/metaphile_logo.png'
export default function InboxTile(props) {
    return (
        <div className=" w-full p-2 border border-gray-300 rounded-lg shadow-md mt-3 flex items-center">
            <img src={Logo} alt="" className='h-12'></img>
            <div className='px-2 w-11/12'>
                <div className="pl-2 mt-1 font-normal text-sm">{props.description}</div>
                <div className="pl-2 mt-1 font-light text-xs text-gray-500">{props.date}</div>
            </div>

            <div className="w-5 h-5 bg-red-800 rounded-full"></div>
        </div>
    )
}

