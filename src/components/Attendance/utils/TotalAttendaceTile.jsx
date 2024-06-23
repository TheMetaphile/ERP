export default function TotalAttendanceTile(props){
    return (
        <div className="w-fit h-fit p-4 rounded-lg shadow-md mr-5 border border-gray-300">
            <h1 className="text-4xl font-normal mb-2">{props.TotalAttendance}</h1>
            <h1 className="text-xl font-normal">Total Attendance</h1>
        </div>
    )
}