export default function Assignments(props) {
    return (
        <div className={`${props.bg} p-4 shadow-md border border-gray-300 rounded-lg mr-2 flex flex-col items-center whitespace-nowrap`}>
            <div className='text-xl font-semibold mb-2'>{props.subject}</div>
            <p className="text-sm mb-1">Topic: <span className="font-medium">{props.topic}</span></p>
            <p className="text-sm mb-1">Assigned On: <span className="font-medium">{props.assignedOn}</span></p>
            <p className="text-sm mb-1">Deadline: <span className="font-medium">{props.deadline}</span></p>
            <button className="mt-2 px-4 py-2 bg-green-500 border border-gray-300 hover:bg-green-700 text-white font-semibold rounded">Submit</button>
        </div>
    );
}
