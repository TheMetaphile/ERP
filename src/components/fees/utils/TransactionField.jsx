export default function TransactionField({ data }) {
    return (
        <div className="flex flex-col items-center mobile:max-tablet:w-fit border-b border-gray-200 ">
            {data.map((value, index) => (
                <div key={index} className="whitespace-nowrap flex items-center w-full border-b border-gray-300 ">
                    <h5 className="text-gray-500 font-normal w-20 text-center border-r border-gray-300 h-full py-2">{index + 1}</h5>
                    <h5 className="text-gray-500 font-normal w-96 text-center border-r border-gray-300 h-full py-2">{value.installment_id}</h5>
                    <h5 className="text-gray-500 font-normal w-36 text-center border-r border-gray-300 h-full py-2">{value.date}</h5>
                    <h5 className="text-gray-500 font-normal w-44 text-center border-r border-gray-300 h-full py-2">{value.session}</h5>
                    <h5 className="text-gray-500 font-normal w-24 text-center border-r border-gray-300 h-full py-2">{value.amount}</h5>
                    <h5 className="text-gray-500 font-normal w-28 text-center border-r border-gray-300 h-full py-2">{value.payment_status}</h5>
                    <h5 className="text-gray-500 font-normal w-36 text-center  h-full py-2">Download <i className="bi bi-download"></i></h5>

                </div>
            ))}

        </div>
    );
}
