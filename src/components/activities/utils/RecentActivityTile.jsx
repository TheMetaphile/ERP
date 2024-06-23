
export default function RecentActivityTile(props) {
    const backgroundColor = props.bg;
    return (
        <div className={`px-4 py-2 rounded-lg border border-gray-300 shadow-md  flex flex-col items-center ${backgroundColor} `}>
            <img src={props.img} alt="" />
            <h1 className="font-medium text-sm ">{props.description}</h1>
            <h1 className="font-normal text-base text-gray-600  mt-auto">{props.date}</h1>
        </div>
    )
}

