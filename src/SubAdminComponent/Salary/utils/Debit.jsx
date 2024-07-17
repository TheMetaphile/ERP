import React from "react";

const Debit = ({ Debit }) => {
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
                            <th className=" border-y p-2">S.No.</th>
                            <th className=" border-y p-2">Name</th>
                            <th className=" border-y p-2">Date & Time</th>
                            <th className=" border-y p-2">Transaction ID</th>
                            <th className=" border-y p-2">Amount</th>
                            <th className=" border-y p-2">Phone Number</th>
                            <th className=" border-y p-2">Payment Method</th>
                            <th className=" border-y p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {Debit.map((Debit, index) => (
                            <tr key={Debit.id}>
                                <td className=" border-y p-2">{index + 1}</td>
                                <td className=" border-y p-2">{Debit.name}</td>
                                <td className=" border-y p-2">{Debit.date}</td>
                                <td className=" border-y p-2">{Debit.DebitId}</td>
                                <td className={` border-y p-2 ${Debit.amount.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{Debit.amount}</td>
                                <td className=" border-y p-2">{Debit.phoneNumber}</td>
                                <td className=" border-y p-2">{Debit.paymentMethod}</td>
                                <td className={` border-y p-2 ${Debit.status === 'Success' ? 'text-green-500' : 'text-red-500'}`}>{Debit.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Debit;
