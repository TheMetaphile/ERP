

export default function PresentAttendanceTile(props) {
    return (
        <div className="w-full h-fit p-4 mobile:max-tablet:p-2 rounded-lg shadow-md border border-gray-300 flex-1">
            <div className="flex mb-2 mobile:max-tablet:mb-0 justify-between">
                <h1 className="text-3xl mobile:max-tablet:text-xl font-normal">{props.Present}</h1>
                <img src={props.image} alt="img" className='h-10 w-10 mobile:max-laptop:w-5 mobile:max-laptop:h-5 mobile:max-laptop:mt-1.5 ' />
            </div>
            <h1 className="text-xl font-normal">{props.text}</h1>
        </div>
    )
}