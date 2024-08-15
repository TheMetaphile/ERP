import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFileAlt, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle, FaSignature } from 'react-icons/fa';
import jsPDF from 'jspdf';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function TransactionField({ data }) {
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleClick = (index) => {
    setClickedIndex(index);
  };

  const generateReceipt = (data) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 255);
    doc.text('Transaction Receipt', 105, 20, null, null, 'center');
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Transaction Details:', 20, 40);
    
    doc.setFontSize(10);
    doc.text(`Installment ID: ${data.installment_id}`, 20, 55);
    doc.text(`Order ID: ${data.order_id}`, 20, 65);
    doc.text(`Payment ID: ${data.payment_id}`, 20, 75);
    doc.text(`Date: ${formatDate(data.date)}`, 20, 85);
    doc.text(`Amount: $${data.amount}`, 20, 95);
    doc.text(`Payment Status: ${data.payment_status}`, 20, 105);
    doc.text(`Signature: ${data.signature}`, 20, 115);

    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transaction_receipt_${data.installment_id}.pdf`;
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full overflow-x-auto"
    >
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-purple-200 text-black">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">#</th>
            <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">Installment ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">Order ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">Payment ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">Amount</th>
            <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">Signature</th>
            <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium  uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {data ? data.map((value, index) => (
            <motion.tr
              key={index}
              variants={rowVariants}
              whileHover={{ backgroundColor: "#f3f4f6" }}
              className={`border-b border-gray-200 ${clickedIndex === index ? 'bg-blue-50' : ''}`}
              onClick={() => handleClick(index)}
            >
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500"><FaFileAlt className="inline mr-2" />{value.installment_id}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{value.order_id}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{value.payment_id}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 "><FaCalendarAlt className="inline mr-2" />{formatDate(value.date)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500"><FaMoneyBillWave className="inline mr-2" />₹ {value.amount}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500"><FaSignature className="inline mr-2" />{value.signature}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold items-center rounded-full ${value.payment_status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <FaCheckCircle className="inline mr-1" />{value.payment_status}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-600 hover:text-blue-900"
                  onClick={() => generateReceipt(value)}
                >
                  <FaDownload className="inline mr-2" />Download
                </motion.button>
              </td>
            </motion.tr>
          )) : null}
        </tbody>
      </table>
    </motion.div>
  );
}