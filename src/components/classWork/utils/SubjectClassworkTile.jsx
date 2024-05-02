export default function SubjectClassWorkTile(props){
    return (
        <div className="w-full p-3  rounded-lg shadow-md">
            <div className="flex justify-between">
                <div className="w-fit px-4 py-1 bg-bg_blue rounded-full">{props.subject}</div>
                <h1 className="text-gray-400">Assigned on: {props.assignedDate}</h1>
            </div>
            <div className="pl-2 mt-3 font-medium">{props.classwork}</div>
        </div>
    )
}