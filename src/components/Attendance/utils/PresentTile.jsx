

export default function PresentAttendanceTile(props){
    return (
        <div className="w-fit h-fit p-4 rounded-lg shadow-md border border-gray-300 mr-5">
            <div className="flex mb-2 justify-between">
                <h1 className="text-4xl font-normal mr-4">{props.Present}</h1>
                <img src={props.image} alt="img" className='h-10 w-10' />
            </div>
            <h1 className="text-xl font-normal">{props.text}</h1>
        </div>
    )
}