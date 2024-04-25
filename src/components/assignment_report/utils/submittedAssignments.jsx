export default function SubmittedAssignment(props) {
    return (
        <div className="flex flex-col justify-between p-4 bg-wheat rounded-lg mb-4 shadow-lg">
            <div className="w-fit px-4 py-2 bg-white rounded-lg shadow-lg">
                {props.subject}
            </div>
            <p className="flex justify-between mt-3">
                {props.topic} <span className={`${props.color}`}>{props.status}</span>
            </p>
        </div>
    );
}
