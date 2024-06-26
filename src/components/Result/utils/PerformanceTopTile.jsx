export default function PerformanceTopTile(props){
    return (
        <div className="w-full flex rounded-t-lg border-b-2 border-gray-400">
            <div className="w-1/3 text-lg font-medium text-center py-2 rounded-t-lg">
                {props.heading[0]}
            </div>
            <div className="w-1/3 text-lg font-medium bg-blue-200 text-center py-2">
                {props.heading[1]}
            </div>
            <div className="w-1/3 text-lg font-medium bg-green-200 text-center py-2 ">
                {props.heading[2]}
            </div>
            <div className="w-1/3 text-lg font-medium bg-blue-200 text-center py-2 ">
                {props.heading[3]}
            </div>
            <div className="w-1/3 text-lg font-medium bg-green-200 text-center py-2 ">
                {props.heading[4]}
            </div>
        </div>
    )
}