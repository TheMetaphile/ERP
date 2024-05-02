export default function PerformanceBottonTile(props){
    return (
        <div className="w-full flex rounded-b-lg border-b-2 border-gray-400">
            <div className="w-1/3 text-lg font-medium text-center py-2 rounded-b-lg">
                {props.value[0]}
            </div>
            <div className="w-1/3 text-lg font-medium bg-blue-200 text-center py-2">
                {props.value[1]}
            </div>
            <div className="w-1/3 text-lg font-medium bg-green-200 text-center py-2 rounded-b-lg">
                {props.value[2]}
            </div>
        </div>
    )
}