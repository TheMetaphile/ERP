
export default function HistoryTile(props) {
    return (
        <div className="relative w-full p-2 border rounded-lg shadow-md mt-3 items-center">

            <div className='w-full flex items-center justify-between'>
                <div className="pl-2 mt-1 font-light text-xs text-gray-500">{props.date}</div>
                <div className={` pl-2 mt-1 font-normal text-xs  p-2 rounded-lg ${props.status === 'Pending' ? 'bg-orange-300 text-orange-700' : props.status === 'Approved' ? 'bg-green-300 text-green-700' : 'bg-red-300 text-red-700'}`}>{props.status}</div>
            </div>

            <div className="pl-2 mt-1 font-normal text-lg">{props.description}</div>



            <div className={`absolute bottom-0 right-0 pl-2 font-normal text-xs mb-2 mr-2 ${props.reason === 'Casual Leave' ? ' text-purple-400' : props.reason === 'Medical Leave' ? ' text-pink-400' : props.reason === 'Annual Leave'? 'text-orange-400' :' text-purple-700'}`}>
                {props.reason}
            </div>


        </div>
    )
}

