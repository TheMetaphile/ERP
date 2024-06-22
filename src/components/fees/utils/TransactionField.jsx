export default function TransactionField({ data }) {
    return (
        <div className="flex flex-col items-center mobile:max-tablet:w-fit justify-between px-4 py-2 border-b border-gray-200 ">
            {data.map((value, index) => (
                <div key={index} className="whitespace-nowrap flex items-center justify-between w-full py-2">
                    <h5 className="text-gray-500 font-normal w-28 text-center">{index + 1}</h5>
                    <h5 className="text-gray-500 font-normal w-28 text-center">{value.installment_id}</h5>
                    <h5 className="text-gray-500 font-normal w-28 text-center">{value.date}</h5>
                    <h5 className="text-gray-500 font-normal w-28 text-center">{value.session}</h5>
                    <h5 className="text-gray-500 font-normal w-28 text-center">{value.amount}</h5>
                    <h5 className="text-gray-500 font-normal w-28 text-center">{value.payment_status}</h5>
                    <h5 className="text-gray-500 font-normal w-28 text-center ">Download <i className="bi bi-download"></i></h5>

                </div>
            ))}

        </div>
    );
}
