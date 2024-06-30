export default function PerformanceTopTile(props) {
    return (
        <div className="mobile:max-tablet:w-fit w-full flex rounded-t-lg border-b-2 border-gray-400 justify-between">
            <div className="w-52 text-lg font-medium text-center py-2 whitespace-nowrap rounded-t-lg ">
                {props.heading[0]}
            </div>
            <div className="w-60 text-lg font-medium bg-blue-200 text-center py-2 whitespace-nowrap">
                {props.heading[1]}
            </div>
            <div className="w-60 text-lg font-medium bg-green-200 text-center py-2 whitespace-nowrap">
                {props.heading[2]}
            </div>
            <div className="w-60 text-lg font-medium bg-blue-200 text-center py-2 whitespace-nowrap">
                {props.heading[3]}
            </div>
            <div className="w-60 text-lg font-medium bg-green-200 text-center py-2 whitespace-nowrap rounded-tr-lg">
                {props.heading[4]}
            </div>
        </div>
    )
}