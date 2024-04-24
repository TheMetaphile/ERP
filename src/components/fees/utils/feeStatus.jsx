export default function FeeStatus(props) {
    return (
        <div className={`feeStatus ${props.color} w-48 h-fit p-4 shadow-md rounded-lg mr-3 flex flex-col items-center justify-center`}>
            <h1 className="text-2xl font-semibold">Rs. {props.amount}</h1>
            <p className="text-lg font-medium text-gray-500">{props.descp}</p>
        </div>
    );
}
