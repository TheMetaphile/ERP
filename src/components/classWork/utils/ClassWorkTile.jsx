export default function ClassWorkTile(props){
    return (
        <div className="p-3 tablet:mr-2  mobile:mb-3 rounded-lg shadow-md border border-gray-300">
            <div className="w-fit px-3 py-1 bg-bg_blue border border-gray-300 rounded-full">{props.subject}</div>
            <div className="pl-2 mt-3 font-medium">{props.classwork}</div>
        </div>
    )
}