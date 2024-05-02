export default function ClassWorkTile(props){
    return (
        <div className="w-full p-3 mr-2 rounded-lg shadow-md">
            <div className="w-fit px-4 py-1 bg-bg_blue rounded-full">{props.subject}</div>
            <div className="pl-2 mt-3 font-medium">{props.classwork}</div>
        </div>
    )
}