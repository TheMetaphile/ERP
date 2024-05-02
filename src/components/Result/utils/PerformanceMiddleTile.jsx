export default function PerformanceMiddleTile(props){
    return (
        <div className="w-full flex border-b-2 ">
            <div className="w-1/3 text-lg text-center py-2">
                {props.value[0]}
            </div>
            <div className="w-1/3 text-lg  bg-blue-200 text-center py-2">
                {props.value[1]}
            </div>
            <div className="w-1/3 text-lg  bg-green-200 text-center py-2">
                {props.value[2]}
            </div>
        </div>
    )
}