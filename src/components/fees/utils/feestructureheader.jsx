export default function FeeStructureHeader() {
    return (
        <div className="bg-aquamarine w-full   flex justify-between rounded-t-lg border-b border-gray-300   whitespace-nowrap">
            <h4 className="w-28 text-center border-r border-gray-300 h-full py-2">Sr. No.</h4>
            <h4 className="w-32 text-center border-r border-gray-300 h-full py-2">Particular</h4>
            <h4 className="w-28 text-center border-r border-gray-300 h-full py-2">Amount</h4>
            <h4 className="w-28 text-center border-r border-gray-300 h-full py-2">Discount</h4>
            <h4 className="w-32 text-center border-r border-gray-300 h-full py-2">Payable Amount</h4>
            <h4 className="w-28 text-center border-r border-gray-300 h-full py-2">Deadline</h4>
            <h4 className="w-28 text-center border-r border-gray-300 h-full py-2">Status</h4>
            <h4 className="w-28 text-center  h-full py-2">Action</h4>

        </div>
    );
}
