import React, { useContext } from "react";
import AuthContext from "../../../Context/AuthContext";
import { motion } from 'framer-motion';
import FeePaymentRow from "./FeePaymentRow";
import FeePaymentRowQuarter from "./FeePaymentRowQuarter";

export default function FeeStructureField({
    fees,
    selectedOption,
    setFees,
    darkMode
}) {
    const { authState } = useContext(AuthContext);

    // Dark mode classes
    const bgHeaderClass = darkMode ? 'bg-gray-700' : 'bg-blue-200';
    const textHeaderClass = darkMode ? 'text-white' : 'text-gray-800';
    const bgRowClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const textClass = darkMode ? 'text-gray-300' : 'text-gray-800';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const FeeStructureHeader = () => (
        <motion.thead className={`${bgHeaderClass} rounded-t-lg w-full`}>
            <tr>
                {[
                    'Month', 'Total Fee', 'Paid Fee',
                    'Applied Discount (Manual + Category)',
                    'Pending Fee', 'Status', 'Amount', 'Payment Mode'
                ].map((header, index) => (
                    <th
                        key={index}
                        scope="col"
                        className={`px-3 py-3 ${textHeaderClass}`}
                    >
                        {header}
                    </th>
                ))}
            </tr>
        </motion.thead>
    );

    const QuarterFeeHeader = () => (
        <motion.thead
            variants={rowVariants}
            className={`${bgHeaderClass} rounded-t-lg w-full`}
        >
            <tr>
                {[
                    'Months', 'Quarter', 'Total Fee', 'Paid Fee',
                    'Applied Discount', 'Pending Fee',
                    'Status', 'Amount', 'Payment Mode'
                ].map((header, index) => (
                    <th
                        key={index}
                        scope="col"
                        className={`px-3 py-3 ${textHeaderClass}`}
                    >
                        {header}
                    </th>
                ))}
            </tr>
        </motion.thead>
    );

    const Cell = ({ content }) => (
        <td
            className={`flex-1 p-4 text-center flex items-center justify-center ${textClass}`}
        >
            <span>{content}</span>
        </td>
    );

    const firstUnpaidIndex = fees.monthlyStatus.findIndex(student =>
        student.totalFee !== student.paidFee + student.manualDiscount + student.categoryDiscount
    );

    const firstUnpaidIndexQuarter = fees.quarterlyStatus.findIndex(student =>
        student.totalFee !== student.paidFee
    );



    return (
        <motion.table
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`w-full ${bgRowClass}`}
        >
            {selectedOption === 'monthlyfee' && (
                <>
                    <FeeStructureHeader />
                    {fees.monthlyStatus.map((data, index) => (
                        <tbody
                            key={index}
                            className={`${bgRowClass} ${borderClass} border-b`}
                        >
                            <FeePaymentRow
                                student={data}
                                darkMode={darkMode}
                                currentIndex={index}
                                firstUnpaidIndex={firstUnpaidIndex}
                            />
                        </tbody>
                    ))}
                </>
            )}

            {selectedOption === 'quarterFee' && (
                <>
                    <QuarterFeeHeader />
                    {fees.quarterlyStatus.map((data, index) => (
                        <tbody
                            key={index}
                            className={`${bgRowClass} ${borderClass} border-b`}
                        >
                            <FeePaymentRowQuarter
                                student={data}
                                darkMode={darkMode}
                                currentIndex={index}
                                firstUnpaidIndexQuarter={firstUnpaidIndexQuarter}
                            />
                        </tbody>
                    ))}
                </>
            )}
        </motion.table>
    );
}