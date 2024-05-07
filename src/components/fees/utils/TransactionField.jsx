export default function TransactionField(props) {
    return (
        <div className="flex items-center mobile:max-tablet:w-fit justify-between px-4 py-2 border-b border-gray-200 ">
            <h5 className="text-gray-500 font-normal w-28 text-center">{props.sn}</h5>
            <h5 className="text-gray-500 font-normal w-28 text-center">{props.transactionID}</h5>
            <h5 className="text-gray-500 font-normal w-28 text-center">{props.academicYear}</h5>
            <h5 className="text-gray-500 font-normal w-28 text-center">{props.amount}</h5>
            <h5 className="text-gray-500 font-normal w-28 text-center">{props.type}</h5>
         <h5 className="text-gray-500 font-normal w-28 text-center ">Download <i className="bi bi-download"></i></h5>
        </div>
    );
}
