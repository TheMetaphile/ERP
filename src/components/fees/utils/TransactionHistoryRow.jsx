import TransactionHistoryHeader from "./TransactionHistoryHeader";
import TransactionField from "./TransactionField.jsx";

export default function TransactionRow() {
    return (
        <div className="w-full mb-4">
            <TransactionHistoryHeader />
            <TransactionField sn='01' transactionID="873592" type='Online' amount='Rs. 3499' academicYear='2023-24' />
            <TransactionField sn='02' transactionID="892654" type='Online' amount='Rs. 3499' academicYear='2023-24' />
            <TransactionField sn='03' transactionID="968746" type='Online' amount='Rs. 3499' academicYear='2023-24' />
            <TransactionField sn='04' transactionID="368469" type='Online' amount='Rs. 3499' academicYear='2023-24' />
            <TransactionField sn='05' transactionID="198468" type='Online' amount='Rs. 3499' academicYear='2023-24' />
        </div>
    );
}
