import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { usePaymentContext } from './PaymentContext';
import { motion } from "framer-motion";

export default function TransactionField() {
  const paymentDetail = usePaymentContext();
  const {paymentDetails} = paymentDetail;
  const [data,setData] = useState(paymentDetails);

  useEffect(()=>{
    setData(paymentDetails);
  },[paymentDetail])
  const generateReceipt = (data) => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text('Transaction Details:', 10, 10);
    doc.setFontSize(10);
    doc.text(`Installment ID: ${data.installment_id}`, 10, 20);
    doc.text(`Date: ${formatDate(data.date)}`, 10, 30);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md overflow-x-auto">
      <motion.table
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="w-full bg-white rounded-xl overflow-hidden"
      >
        <thead className="bg-gradient-to-r from-blue-200 to-blue-100 text-black">
          <tr>
            {["No.", "Installment ID", "Order ID", "Payment ID", "Date", "Amount", "Status", "Action"].map((header, index) => (
              <motion.th
                key={header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 text-center mobile:text-xs sm:text-sm tablet:text-base"
              >
                {header}
              </motion.th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data ? data.map((value, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.02, 
                transition: { duration: 0.2 } 
              }}
              className="border-b border-gray-200 hover:bg-gray-200 transition-all duration-300 ease-in-out"
            >
              <td className="p-3 text-center text-gray-600">{index + 1}</td>
              <td className="p-3 text-center text-gray-600">{value.installment_id}</td>
              <td className="p-3 text-center text-gray-600">{value.order_id}</td>
              <td className="p-3 text-center text-gray-600">{value.payment_id}</td>
              <td className="p-3 text-center text-gray-600">{formatDate(value.date)}</td>
              <td className="p-3 text-center text-gray-600">{value.amount}</td>
              <td className="p-3 text-center">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  value.payment_status === 'Success' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {value.payment_status}
                </span>
              </td>
              <td className="p-3 text-center">
                <button
                  onClick={() => generateReceipt(value)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-full transition-colors duration-300 text-sm"
                >
                  Download <i className="bi bi-download ml-1"></i>
                </button>
              </td>
            </motion.tr>
          )) : null}
        </tbody>
      </motion.table>
    </div>
  );
}