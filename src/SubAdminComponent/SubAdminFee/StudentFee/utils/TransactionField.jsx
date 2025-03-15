import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFileAlt, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle, FaSignature, FaUndo } from 'react-icons/fa';
import jsPDF from 'jspdf';
import logo from '../../../../assets/metaphile_logo.png';
import { MdDeleteForever } from 'react-icons/md';
import AuthContext from '../../../../Context/AuthContext';
import { BASE_URL } from '../../../../Config';
import axios from 'axios';
import { toast } from 'react-toastify';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function TransactionField({ data, selectedStudent, setData }) {
  const { authState, darkMode } = useContext(AuthContext);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [password, setPassword] = useState('');
  const [trans, setTrans] = useState('');

  const [reason, setReason] = useState('');

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
    console.log(data, 'asasa', selectedStudent);
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
      { label: 'Student Name', value: selectedStudent.name },
      { label: 'Father Name', value: selectedStudent.fatherName },
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

  const handleDelete = async (index, id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/fee/delete/discount?id=${id}`, {
        headers: {
          Authorization: `Bearer ${authState?.accessToken}`
        }
      });

      if (response.status === 200) {
        setDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
        toast.success('Discount Deleted Successfully');
      }
    } catch (error) {
      console.error("Error deleting Discount:", error);
      toast.error('Error deleting Discount');
    }
  };

  const handleDeleteClick = (value) => {
    setShowPopup(true);
    setTrans(value)
  };

  const closePopup = () => {
    setShowPopup(false);
    setPassword('');
  };

  const confirmDelete = async (stud) => {
    if (reason.length < 1) {
      toast.error('Please Provide Reason First')
      return;
    }


    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/fee/delete/transaction/particular/${stud._id}/${!stud.flag}`,
      headers: {
        'Authorization': `Bearer ${authState?.accessToken}`
      },
      data: {
        reason: reason,
        email: selectedStudent.email
      }
    };

    try {
      const response = await axios.request(config);
      setData(data.map((item) => {
        return item._id === stud._id ? { ...item, flag: !item.flag } : item
      })

      );



      toast.success('Transaction deleted successfully');
      closePopup();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setReason(e.target.value);
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full overflow-x-auto"
    >
      <table className={`min-w-full rounded-lg overflow-hidden shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
        <thead className={`${darkMode ? 'bg-gray-700' : 'bg-blue-200'
          }`}>
          <tr>
            {[
              '#', 'Order ID', 'Payment ID', 'Date', 'Discount',
              'Amount', 'Signature', 'Status', 'Action'
            ].map((header) => (
              <th
                key={header}
                className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-black'
                  }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.map((value, index) => (
            <motion.tr
              key={index}
              variants={rowVariants}
              whileHover={{
                backgroundColor: darkMode ? "#374151" : "#f3f4f6"
              }}
              className={`border-b ${darkMode
                ? 'border-gray-700 bg-gray-800 hover:bg-gray-700'
                : 'border-gray-200 bg-white hover:bg-gray-50'
                } ${clickedIndex === index ? (darkMode ? 'bg-blue-900' : 'bg-blue-50') : ''}`}
              onClick={() => handleClick(index)}
            >
              <td className={`px-4 py-3 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>{index + 1}</td>

              <td className={`px-4 py-3 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>{value.order_id}</td>

              <td className={`px-4 py-3 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>{value.payment_id}</td>

              <td className={`px-4 py-3 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                <FaCalendarAlt className={`inline mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'
                  }`} />
                {value.date}
              </td>

              <td className="px-4 py-3 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold items-center rounded-full ${darkMode
                  ? 'bg-green-900 text-green-300'
                  : 'bg-green-100 text-green-800'
                  }`}>
                  <FaMoneyBillWave className={`inline mr-2 ${darkMode ? 'text-green-400' : ''
                    }`} />
                  ₹ {value.discount}
                </span>
              </td>

              <td className="px-4 py-3 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold items-center rounded-full ${darkMode
                  ? 'bg-green-900 text-green-300'
                  : 'bg-green-100 text-green-800'
                  }`}>
                  <FaMoneyBillWave className={`inline mr-2 ${darkMode ? 'text-green-400' : ''
                    }`} />
                  ₹ {value.amount}
                </span>
              </td>

              <td className={`px-4 py-3 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                <FaSignature className={`inline mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'
                  }`} />
                {value.signature}
              </td>

              <td className="px-4 py-3 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold items-center rounded-full ${value.payment_status === 'Success'
                  ? (darkMode
                    ? 'bg-green-900 text-green-300'
                    : 'bg-green-100 text-green-800')
                  : (darkMode
                    ? 'bg-red-900 text-red-300'
                    : 'bg-red-100 text-red-800')
                  }`}>
                  <FaCheckCircle className={`inline mr-1 ${darkMode
                    ? (value.payment_status === 'Success' ? 'text-green-400' : 'text-red-400')
                    : ''
                    }`} />
                  {value.payment_status}
                </span>
              </td>

              <td className="flex justify-center items-center gap-2 px-4 py-3 whitespace-nowrap text-sm">
                {value.flag ? (
                  <div
                    className={`cursor-pointer ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-500'
                      } text-xl`}
                    onClick={() => handleDeleteClick(value)}
                  >
                    <FaUndo />
                  </div>
                ) : (
                  <div className='flex gap-3 items-center'>
                    <div
                      className={`cursor-pointer ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500'
                        } text-2xl`}
                      onClick={() => handleDeleteClick(value)}
                    >
                      <MdDeleteForever />
                    </div>
                    <div
                      className={`cursor-pointer ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-500'
                        } text-xl`}
                      onClick={() => generateReceipt(value)}
                    >
                      <FaDownload />
                    </div>
                  </div>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className={`rounded-2xl shadow-2xl p-8 w-full max-w-4xl transform transition-all duration-300 scale-100 mx-4 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white'
            }`}>
            <div className="relative mb-8">
              <h2 className={`text-2xl font-bold pb-2 border-b-2 ${darkMode
                ? 'text-blue-400 border-blue-700'
                : 'text-blue-600 border-blue-500'
                }`}>
                Transaction Details
              </h2>
              <div className={`absolute -bottom-0.5 left-0 w-24 h-1 rounded-full ${darkMode ? 'bg-blue-700' : 'bg-blue-500'
                }`}></div>
            </div>

            <div className="space-y-3">
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-800'
                }`}>
                Transaction Information
              </h3>
              {[
                { label: 'Date', value: trans.date },
                { label: 'Order ID', value: trans.order_id },
                { label: 'Discount', value: trans.discount },
                { label: 'Payment ID', value: trans.payment_id },
                { label: 'Mode', value: trans.signature },
                { label: 'Status', value: trans.payment_status }
              ].map(({ label, value }) => (
                <p
                  key={label}
                  className={`py-1.5 border-b ${darkMode
                    ? 'border-gray-700 text-gray-400'
                    : 'border-gray-100 text-gray-700'
                    }`}
                >
                  <span className={`font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                    {label}:
                  </span>
                  <span className="ml-2">{value}</span>
                </p>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 flex items-center justify-between mb-2 gap-2">
              <div className='w-full'>
                <p className={`mb-3 font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  Enter your Reason:
                </p>
                <input
                  className={`w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-300 ease-in-out ${darkMode
                    ? 'bg-gray-700 text-gray-200 border-gray-600 focus:ring-blue-600'
                    : 'bg-white text-gray-700 border-2 border-indigo-700 focus:border-indigo-700/90'
                    }`}
                  name="reason"
                  value={reason}
                  onChange={handleChange}
                  placeholder="Reason"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => confirmDelete(trans)}
                className={`px-6 py-3 rounded-lg font-medium shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ${darkMode
                  ? 'bg-red-700 text-white hover:bg-red-600'
                  : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                  }`}
              >
                Confirm
              </button>
              <button
                onClick={closePopup}
                className={`px-6 py-3 rounded-lg font-medium transform hover:-translate-y-0.5 transition-all duration-200 ${darkMode
                  ? 'bg-blue-700 text-white hover:bg-blue-600'
                  : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300'
                  }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}