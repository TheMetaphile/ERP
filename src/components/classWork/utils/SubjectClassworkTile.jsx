export default function SubjectClassWorkTile(props){
    return (
        <div className=" w-full p-3  rounded-lg shadow-md">
            <div className="flex justify-between mobile:max-tablet:flex-col ">
                <div className=" px-3 py-1 bg-bg_blue rounded-full w-fit">{props.subject}</div>
                <h1 className="text-gray-400 px-3">Assigned on: {props.assignedDate}</h1>
            </div>
            <div className="pl-2 mt-3 font-medium">{props.classwork}</div>
        </div>
    )
}