export default function FeeStructureField({ fees }) {
    return (
        <div className="flex flex-col items-center justify-between px-4 py-2 border-b border-gray-200">
            {fees.map((data, index) => (
                <div key={index} className="whitespace-nowrap flex items-center justify-between w-full py-2">
                    <h5 className="text-gray-500 font-normal  w-28 text-center">{index+1}</h5>
                    <h5 className="text-gray-500 font-normal w-28 text-center">{data.title}</h5>
                    <h5 className="text-gray-500 font-normal w-28 text-center">{data.amount}</h5>
                    <h5 className="text-gray-500 font-normal w-28 text-center">{data.discount}</h5>
                    <h5 className="text-gray-500 font-normal w-28 text-center">{data.payableAmount}</h5>
                    <h5 className="text-gray-500 font-normal w-28 text-center">{data.deadline}</h5>
                    <h5 className="text-gray-500 font-normal w-28 text-center">{data.status}</h5>
                    <h5 className="text-gray-500 font-normal w-28 text-center">Pay</h5>

                </div>
            ))}
        </div>
    );
}
