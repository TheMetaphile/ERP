export default function TotalAttendanceTile(props) {
    return (
        <div className="w-full h-fit mobile:max-tablet:p-2 p-4 rounded-lg shadow-md border border-gray-300 flex-1">
            <h1 className="text-3xl mobile:max-tablet:text-xl font-normal mobile:max-tablet:mb-0 mb-2">{props.TotalAttendance}</h1>
            <h1 className="text-xl font-normal whitespace-nowrap">Total Attendance</h1>
        </div>
    )
}