export default function PerformanceBottonTile(props) {
    return (
        <div className="w-full flex ">
            <div className="w-1/3 text-lg font-medium text-center py-2 ">
                {props.value[0]}
            </div>
            <div className="w-1/3 text-lg font-medium text-center py-2">
                {props.value[1]}
            </div>
            <div className="w-1/3 text-lg font-medium text-center py-2 ">
                {props.value[2]}
            </div>
        </div>
    )
}