import React, { useContext } from "react";
import AuthContext from "../../../Context/AuthContext";
import { motion } from 'framer-motion';
import FeePaymentRow from "./FeePaymentRow";
import FeePaymentRowQuarter from "./FeePaymentRowQuarter";

export default function FeeStructureField({ fees, selectedOption, setFees }) {
    const { authState } = useContext(AuthContext);

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
        <motion.thead className="bg-blue-200 rounded-t-lg w-full">
            <tr>
                <th scope="col" className="px-3 py-3">Month</th>
                <th scope="col" className="px-3 py-3">Total Fee</th>
                <th scope="col" className="px-3 py-3">Paid Fee</th>
                <th scope="col" className="px-3 py-3">Applied Discount (Manual + Category)</th>
                <th scope="col" className="px-3 py-3">Pending Fee</th>
                <th scope="col" className="px-3 py-3">Status</th>
                <th scope="col" className="px-3 py-3 text-center">Amount</th>
                <th scope="col" className="px-3 py-3">Payment Mode</th>
            </tr>
        </motion.thead>
    );

    const QuarterFeeHeader = () => (
        <motion.thead variants={rowVariants} className="bg-blue-200 rounded-t-lg w-full">
            <tr>
                <th scope="col" className="px-3 py-3">Months</th>
                <th scope="col" className="px-3 py-3">Quarter</th>
                <th scope="col" className="px-3 py-3">Total Fee</th>
                <th scope="col" className="px-3 py-3">Paid Fee</th>
                <th scope="col" className="px-3 py-3">Applied Discount</th>
                <th scope="col" className="px-3 py-3">Pending Fee</th>
 
                <th scope="col" className="px-3 py-3">Status</th>
                <th scope="col" className="px-3 py-3 text-center">Amount</th>
                <th scope="col" className="px-3 py-3">Payment Mode</th>
            </tr>
        </motion.thead>
    );

    const Cell = ({ content }) => (
        <td className="flex-1 p-4 text-center flex items-center justify-center">
            <span>{content}</span>
        </td>
    );


    return (
        <motion.table
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
        >
            {selectedOption === 'monthlyfee' && (
                <>
                    <FeeStructureHeader />
                    {fees.monthlyStatus.map((data, index) => (
                        <tbody>
                            <FeePaymentRow student={data} key={index} />
                        </tbody>

                    ))}
                </>
            )}

            {selectedOption === 'quarterFee' && (
                <>
                    <QuarterFeeHeader />
                    {fees.quarterlyStatus.map((data, index) => (
                        <tbody>
                            <FeePaymentRowQuarter student={data} key={index} />
                        </tbody>
                    ))}
                </>
            )}

        </motion.table>
    );
}


