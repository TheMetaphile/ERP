export default function TransactionHistoryHeader() {
    return (
        <div className="bg-aquamarine mobile:max-tablet:w-fit px-4 py-2 flex justify-between rounded-t-lg ">
            <h4 className="w-28 text-center">Sr. No.</h4>
            <h4 className="w-28 text-center">Installment Id</h4>
            <h4 className="w-28 text-center">Date</h4>
            <h4 className="w-28 text-center">Academic Year</h4>
            <h4 className="w-28 text-center">Amount</h4>
            <h4 className="w-28 text-center">Status</h4>
            <h4 className="w-28 text-center">Print Receipt</h4>
        </div>
    );
}
