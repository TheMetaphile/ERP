export default function SubmittedAssignment(props) {
    return (
        <div className="flex flex-col justify-between p-4 border border-gray-300 bg-wheat rounded-lg mb-4 shadow-md">
            <div className="w-fit px-4 border border-gray-300 py-2 bg-white rounded-lg shadow-md">
                {props.subject}
            </div>
            <p className="flex justify-between mt-3">
                {props.topic} <span className={`${props.color}`}>{props.status}</span>
            </p>
        </div>
    );
}
