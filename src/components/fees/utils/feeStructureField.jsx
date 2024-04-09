export default function FeeStructureField(props) {
    return (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
            <h5 className="text-gray-500 font-normal  w-28 text-center">{props.sn}</h5>
            <h5 className="text-gray-500 font-normal w-28 text-center">{props.particular}</h5>
            <h5 className="text-gray-500 font-normal  w-28 text-center">{props.amount}</h5>
        </div>
    );
}
