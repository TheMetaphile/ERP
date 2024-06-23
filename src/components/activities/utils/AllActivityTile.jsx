import medal from '../../../assets/medal.png'
export default function AllActivityTile(props) {
    const backgroundColor = props.bg;
    return (
        <div className='w-11/12  border border-gray-300 rounded-lg shadow-md mt-2 pt-2 items-center mb-2'>
            <h1 className="font-medium text-sm px-3">{props.topic}</h1>
            <div className="flex  px-3 py-3 items-center">
                <img src={medal} alt="" className={`w-fit p-4 border border-gray-300 rounded-lg ${backgroundColor} `} />
                <span className='px-3'>
                    <h1 className="font-normal text-base  text-blue-400">{props.date}</h1>
                    <h1 className="font-normal text-sm">{props.description}</h1>
                </span>
            </div>

        </div>
    )
}

