import jsPDF from 'jspdf';
import { useState } from 'react';

export default function TransactionField({ data }) {
  const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setClickedIndex(index);
    };

  const generateReceipt = (data) => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text('Transaction Details:', 10, 10);
    doc.setFontSize(10);
    doc.text(`Installment ID: ${data.installment_id}`, 10, 20);
    doc.text(`Date: ${data.date}`, 10, 30);
    doc.text(`Session: ${data.session}`, 10, 40);
    doc.text(`Amount: ${data.amount}`, 10, 50);
    doc.text(`Payment Status: ${data.payment_status}`, 10, 60);

    const pdfBlob = doc.output('blob');

    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction_receipt.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center mobile:max-tablet:w-fit border-b border-gray-200 ">
      {data.map((value, index) => (
        <div key={index} className={`whitespace-nowrap flex items-center w-full border-b border-gray-300 ${clickedIndex === index ? 'bg-purple-200' : ''}`} onClick={() => handleClick(index)}>
          <h5 className="text-gray-500 font-normal w-20 text-center border-r border-gray-300 h-full py-2">{index + 1}</h5>
          <h5 className="text-gray-500 font-normal w-96 text-center border-r border-gray-300 h-full py-2">{value.installment_id}</h5>
          <h5 className="text-gray-500 font-normal w-96 text-center border-r border-gray-300 h-full py-2">{value.payment_id}</h5>
          <h5 className="text-gray-500 font-normal w-36 text-center border-r border-gray-300 h-full py-2">{value.date}</h5>
          <h5 className="text-gray-500 font-normal w-44 text-center border-r border-gray-300 h-full py-2">{value.session}</h5>
          <h5 className="text-gray-500 font-normal w-24 text-center border-r border-gray-300 h-full py-2">{value.amount}</h5>
          <h5 className="text-gray-500 font-normal w-28 text-center border-r border-gray-300 h-full py-2">{value.payment_status}</h5>
          <h5 className="text-gray-500 font-normal w-28 text-center border-r border-gray-300 h-full py-2">{value.signature}</h5>
          <button className="text-gray-500 font-normal w-36 text-center h-full py-2" onClick={() => generateReceipt(value)}>
            Download <i className="bi bi-download"></i>
          </button>
        </div>
      ))}
    </div>
  );
}