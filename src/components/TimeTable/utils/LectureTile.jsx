
export default function LeactureTile(props) {
    return (
        <div className="bg-green-200 mb-3  p-2 rounded-lg shadow-md mt-3 flex items-center justify-between overflow-auto ">
        <div className="mr-3 w-fit whitespace-nowrap ">{props.subject}</div>
        <div className="mr-3 w-fit whitespace-nowrap">{props.lecture}</div>
        <div className="mr-3 w-fit whitespace-nowrap">{props.time}</div>
    </div>
    )
}

