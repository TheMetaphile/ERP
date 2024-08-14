export default function AcademicBottonTile(props){
    return (
        <div className="w-full flex rounded-b-lg border-b-2 border-l-2 border-r-2  text-green-500">
            <div className="w-1/3 text-lg font-medium text-center py-2 rounded-b-lg">
                {props.value[0]}
            </div>
            <div className="w-1/3 text-lg font-medium  text-center py-2">
                {props.value[1]}
            </div>
            <div className="w-1/3 text-lg font-medium  text-center py-2 rounded-b-lg">
                {props.value[2]}
            </div>
        </div>
    )
}