import FeeStatus from "./feeStatus.jsx";

export default function FeeStatusRow() {
    return (
        <div className="flex overflow-auto pb-4">
            <FeeStatus amount='80,000' descp='Total Fees' color='bg-yellow-300'/>
            <FeeStatus amount='60,000' descp='Paid Fees' color='bg-green-300'/>
            <FeeStatus amount='20,000' descp='Pending Fees' color='bg-red-300'/>
        </div>
    );
}
