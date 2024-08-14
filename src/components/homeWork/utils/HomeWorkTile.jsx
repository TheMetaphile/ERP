export default function HomeWorkTile(props){
    return (
        <div className="p-3 tablet:mr-2 border border-gray-300 mobile:max-tablet:mb-3 rounded-lg shadow-md">
            <div className="w-fit px-3 py-1 bg-bg_blue rounded-full border border-gray-300">{props.subject}</div>
            <div className="pl-2 mt-3 font-medium">{props.classwork}</div>
        </div>
    )
}