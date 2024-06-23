export default function FeeStructureField({ fees }) {
    return (
        <div className=" w-full  justify-between rounded-t-lg  whitespace-nowrap">
            {fees.map((data, index) => (
                <div key={index} className="whitespace-nowrap flex items-center border-b border-gray-300 justify-between w-full ">
                    <h5 className="text-gray-500 font-normal border-r border-gray-300 h-full py-2 w-28 text-center">{index+1}</h5>
                    <h5 className="text-gray-500 font-normal border-r border-gray-300 h-full py-2 w-32 text-center">{data.title}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-28 text-center">{data.amount}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-28 text-center">{data.discount}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-32 text-center">{data.payableAmount}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-28 text-center">{data.deadline}</h5>
                    <h5 className="text-gray-500 border-r border-gray-300 h-full py-2 font-normal w-28 text-center">{data.status}</h5>
                    <h5 className="text-gray-500 py-2 font-normal w-28 text-center">Pay</h5>

                </div>
            ))}
        </div>
    );
}
