import React from "react";

const Transactions = ({ transactions }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center mobile:max-tablet:flex-col mobile:max-tablet:items-baseline">
                    <label className="mr-2">From</label>
                    <input type="date" className="mr-2 p-1 border rounded" />
                    <label className="mr-2">To</label>
                    <input type="date" className="p-1 border rounded" />
                </div>
            </div>
            <div className=" overflow-x-auto">
                <table className="w-full border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="">
                            <th className=" border-y p-2 text-start">S.No.</th>
                            <th className=" border-y p-2 text-start">Name</th>
                            <th className=" border-y p-2">Date & Time</th>
                            <th className=" border-y p-2">Transaction ID</th>
                            <th className=" border-y p-2">Amount</th>
                            <th className=" border-y p-2">Phone Number</th>
                            <th className=" border-y p-2">Payment Method</th>
                            <th className=" border-y p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {transactions.map((transaction, index) => (
                            <tr key={transaction.id}>
                                <td className=" border-y p-2 text-start">{index + 1}</td>
                                <td className=" border-y p-2 text-start">{transaction.name}</td>
                                <td className=" border-y p-2">{transaction.date}</td>
                                <td className=" border-y p-2">{transaction.transactionId}</td>
                                <td className="border-y p-2 text-red-500 ">{transaction.amount}</td>
                                <td className=" border-y p-2">{transaction.phoneNumber}</td>
                                <td className=" border-y p-2 ">{transaction.paymentMethod}</td>
                                <td className="border-y p-2 text-green-500" >{transaction.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;
