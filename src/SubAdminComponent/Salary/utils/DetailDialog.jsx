import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";


const DetailDialog = ({ Credit, onClose }) => {
    if (!Credit) return null;

    const handleDownloadReceipt = () => {
        const receiptContent = `
          Invoice no.: ${Credit.CreditId}
          Name of Student: ${Credit.name}
          Class: 2nd 'A'
          Date Of Payment: ${Credit.date}
          Mode Of Payment: ${Credit.paymentMethod}
          Amount: ${Credit.amount}
        `;

        const blob = new Blob([receiptContent], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `receipt_${Credit.CreditId}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 " >
            <div className="bg-white p-6 rounded shadow-lg tablet:w-1/2 mobile:max-tablet:mx-4">
                <button onClick={onClose} className=" text-black mb-4 -m-3 h-5 w-2 font-bold">X</button>
                <h2 className="text-xl mb-4">Invoice no.: #{Credit.CreditId}</h2>
                <button onClick={handleDownloadReceipt} className="bg-white-300 border border-black p-2 hover:bg-purple-500 hover:text-white hover:border-white  rounded mb-4 flex items-center gap-1"><span><MdOutlineFileDownload className=" h-6 w-6" />
                </span> Download Receipt</button>
                <div className=" leading-loose">
                    <p><strong>Name of Student:</strong> {Credit.name}</p>
                    <p><strong>Class:</strong> 2nd 'A'</p>
                    <p><strong>Date Of Payment:</strong> {Credit.date}</p>
                    <p><strong>Mode Of Payment:</strong> {Credit.paymentMethod}</p>
                </div>
                <table className="w-full border-collapse mt-4 rounded-sm mobile:max-tablet:overflow-auto">
                    <thead>
                        <tr className=" bg-purple-200 rounded-sm">
                            <th className="border-y p-2 text-start">S.No</th>
                            <th className="border-y p-2 text-start">Particulars</th>
                            <th className="border-y p-2 text-start">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-y p-2 text-start">1.</td>
                            <td className="border-y p-2 text-start whitespace-nowrap">Admission Fees</td>
                            <td className="border-y p-2 text-start whitespace-nowrap">{Credit.amount}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-4 flex items-center justify-between gap-2">
                    <p className=" shadow-md p-4 mobile:max-tablet:p-1 text-center"><strong>Grand Total:</strong> {Credit.amount}</p>
                    <button onClick={onClose} className="bg-white px-10 hover:bg-purple-500 hover:text-white border-black hover:border-white border py-2 rounded mt-4">Back</button>

                </div>
            </div>
        </div>
    );
};

export default DetailDialog;
