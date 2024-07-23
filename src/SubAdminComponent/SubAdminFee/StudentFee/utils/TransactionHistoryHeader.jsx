export default function TransactionHistoryHeader() {
    return (
        <div className="bg-aquamarine mobile:max-tablet:w-fit  flex rounded-t-lg ">
            <h4 className="w-20 text-center border-r border-gray-300 h-full py-2">Sr. No.</h4>
            <h4 className="w-96 text-center border-r border-gray-300 h-full py-2">Installment Id</h4>
            <h4 className="w-36 text-center border-r border-gray-300 h-full py-2">Date</h4>
            <h4 className="w-44 text-center border-r whitespace-nowrap border-gray-300 h-full py-2">Academic Year</h4>
            <h4 className="w-24 text-center border-r border-gray-300 h-full py-2">Amount</h4>
            <h4 className="w-28 text-center border-r border-gray-300 h-full py-2">Status</h4>
            <h4 className="w-36 text-center whitespace-nowrap  h-full py-2">Print Receipt</h4>
        </div>
    );
}
