

export default function VideoTile(props) {
    return (
        <div className=" w-full p-2  flex items-center ">
            <div className='flex flex-col items-center  w-full rounded-lg shadow-md'>
            <img src={props.img} alt="" className='rounded-xl w-full h-16'></img>
           <h1 className='font-medium text-base'>{props.description}</h1>
            <h2 className='font-normal text-gray-400 mb-2 text-sm'>{props.text}</h2>
            </div>
        </div>
    )
}

