import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFileAlt, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle, FaSignature, FaUndo } from 'react-icons/fa';
import jsPDF from 'jspdf';
import logo from '../../../assets/metaphile_logo.png';
import AuthContext from '../../../Context/AuthContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
export default function TransactionField({ data, selectedStudent, darkMode }) {
  const { authState } = useContext(AuthContext);
  const [clickedIndex, setClickedIndex] = useState(null);

  const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-gray-300' : 'text-gray-800';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
  const headerBgClass = darkMode ? 'bg-gray-700' : 'bg-blue-200';
  const headerTextClass = darkMode ? 'text-white' : 'text-black';
  const hoverBgClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const selectedBgClass = darkMode ? 'bg-gray-600' : 'bg-blue-50';

  const handleClick = (index) => {
    setClickedIndex(index);
  };

  function convertToWords(amount) {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const thousands = ["", "Thousand", "Million", "Billion", "Trillion"];

    if (amount === 0) return "Zero";

    function convertGroup(num) {
      if (num === 0) return "";
      if (num < 20) return ones[num];
      if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + ones[num % 10] : "");
      return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " and " + convertGroup(num % 100) : "");
    }

    let result = "";
    let groupIndex = 0;

    while (amount > 0) {
      const group = amount % 1000;
      if (group !== 0) {
        result = convertGroup(group) + (thousands[groupIndex] ? " " + thousands[groupIndex] : "") + " " + result;
      }
      amount = Math.floor(amount / 1000);
      groupIndex++;
    }

    return result.trim().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const parseDate = (dateString) => {
    if (!dateString) return 'Invalid Date';

    const parts = dateString.split(' ');
    if (parts.length < 1) return 'Invalid Date';

    const dateParts = parts[0].split('-');
    if (dateParts.length < 3) return 'Invalid Date';

    const timeParts = parts[1]?.split(':') || ['00', '00', '00'];

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);
    const hours = parseInt(timeParts[0], 10) || 0;
    const minutes = parseInt(timeParts[1], 10) || 0;
    const seconds = parseInt(timeParts[2], 10) || 0;

    if (isNaN(day) || isNaN(month) || isNaN(year)) return 'Invalid Date';

    return new Date(year, month, day, hours, minutes, seconds).getTime();
  };


  const generateReceipt = (data) => {
    const safeValue = (value) => {
      if (!value) return 'N/A';

      if (typeof value === 'string' && value.includes('T')) {
        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }

      if (typeof value === 'string' && value.match(/^\d{2}-\d{2}-\d{4}/)) {
        return value.split(' ')[0];
      }

      return String(value);
    };


    const doc = new jsPDF();

    const colors = {
      primary: '#2980b9',
      secondary: '#3498db',
      accent: '#2ecc71',
      background: '#f4f6f7',
      text: '#2c3e50',
      textLight: '#34495e'
    };

    doc.setFillColor(colors.background);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFillColor(colors.primary);
    doc.rect(0, 0, 210, 40, 'F');

    try {
      if (logo) {
        const centerX = 25;
        const centerY = 20;
        const radius = 15;



        doc.addImage(logo, 'PNG', centerX - radius, centerY - radius, radius * 2, radius * 2);
      }
    } catch (error) {
      console.warn('Logo could not be added:', error);
    }

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('OFFICIAL PAYMENT RECEIPT', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(safeValue('Metaphile Public School'), 105, 30, { align: 'center' });

    doc.setDrawColor(colors.secondary);
    doc.setLineWidth(0.7);
    doc.roundedRect(15, 50, 180, 240, 5, 5);

    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');

    const details = [
      { label: 'Receipt Number', value: safeValue(`${parseDate(data.date)}`) },
      { label: 'Student Name', value: authState?.userDetails?.name },
      { label: 'Father Name', value: authState?.userDetails?.fatherName },
      { label: 'Class & Section', value: `${data.class} - ${data.section}` },
      { label: 'Payment Mode', value: data.signature },
      { label: 'Payment ID', value: data.payment_id },
      { label: 'Order ID', value: data.order_id },
      { label: 'Installment ID', value: data.installment_id },
      { label: 'Payment Amount (In Digits)', value: safeValue(`${data.amount}`) },
      { label: 'Payment Amount (In Words)', value: convertToWords(data.amount) },
      { label: 'Transaction Date', value: safeValue(data.date) },
    ];

    let yPosition = 75;
    details.forEach((detail) => {
      if (!detail.value) detail.value = 'N/A';
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(colors.textLight);
      doc.text(detail.label + ':', 25, yPosition);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.text);
      doc.text(String(detail.value), 110, yPosition);

      yPosition += 15;
    });

    doc.setDrawColor(colors.secondary);
    doc.setLineWidth(0.5);
    doc.line(125, 270, 185, 270);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(colors.textLight);
    doc.text('Signature', 155, 280, { align: 'center' });

    doc.setTextColor(colors.textLight);
    doc.setFontSize(8);
    doc.text('Thank you for your payment', 105, 280, { align: 'center' });
    doc.text('This is an electronically generated receipt', 105, 285, { align: 'center' });

    try {
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      window.open(url, '_blank');

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 10000);
    } catch (error) {
      //console.error('PDF Generation Error:', error);
      alert('Failed to generate receipt. Please try again.');
    }
  };


  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full overflow-x-auto ${bgClass}`}
    >
      <table className={`min-w-full shadow-md rounded-lg overflow-hidden ${bgClass}`}>
        <thead className={`${headerBgClass} ${headerTextClass}`}>
          <tr>
            {[
              '#', 'Order ID', 'Payment ID', 'Date',
              'Discount', 'Amount', 'Signature', 'Status', 'Action'
            ].map((header, index) => (
              <th
                key={index}
                className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data ? data.map((value, index) => (
            <motion.tr
              key={index}
              variants={rowVariants}
              whileHover={{ backgroundColor: darkMode ? "#4B5563" : "#f3f4f6" }}
              className={`
              border-b ${borderClass} 
              ${textClass} 
              ${clickedIndex === index ? selectedBgClass : ''}
            `}
              onClick={() => handleClick(index)}
            >
              <td className={`px-4 py-3 whitespace-nowrap text-sm`}>{index + 1}</td>
              <td className={`px-4 py-3 whitespace-nowrap text-sm`}>{value.order_id}</td>
              <td className={`px-4 py-3 whitespace-nowrap text-sm`}>{value.payment_id}</td>
              <td className={`px-4 py-3 whitespace-nowrap text-sm`}>
                <FaCalendarAlt className={`inline mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                {value.date}
              </td>
              <td className={`px-4 py-3 whitespace-nowrap text-sm`}>
                <span
                  className={`
                  px-2 inline-flex text-xs leading-5 font-semibold items-center rounded-full 
                  ${darkMode ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-800'}
                `}
                >
                  <FaMoneyBillWave className="inline mr-2" />₹ {value.discount}
                </span>
              </td>
              <td className={`px-4 py-3 whitespace-nowrap text-sm`}>
                <span
                  className={`
                  px-2 inline-flex text-xs leading-5 font-semibold items-center rounded-full 
                  ${darkMode ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-800'}
                `}
                >
                  <FaMoneyBillWave className="inline mr-2" />₹ {value.amount}
                </span>
              </td>
              <td className={`px-4 py-3 whitespace-nowrap text-sm`}>
                <FaSignature className={`inline mr-2 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                {value.signature}
              </td>
              <td className={`px-4 py-3 whitespace-nowrap text-sm`}>
                <span
                  className={`
                  px-2 inline-flex text-xs leading-5 font-semibold items-center rounded-full 
                  ${value.payment_status === 'Success'
                      ? (darkMode ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-800')
                      : (darkMode ? 'bg-red-900 text-red-400' : 'bg-red-100 text-red-800')
                    }
                `}
                >
                  <FaCheckCircle className="inline mr-1" />{value.payment_status}
                </span>
              </td>
              <td className="flex justify-center items-center gap-2 px-4 py-3 whitespace-nowrap text-sm">
                <div
                  className={`
                  ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-500 hover:text-green-600'} 
                  text-xl cursor-pointer
                `}
                  onClick={() => generateReceipt(value)}
                >
                  <FaDownload />
                </div>
              </td>
            </motion.tr>
          )) : null}
        </tbody>
      </table>
    </motion.div>
  );
}