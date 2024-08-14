import { motion } from "framer-motion";


export default function QuarterFeeHeader() {
    return (
        <motion.thead
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-200 to-teal-100 text-black"
        >
            <tr>
                <th className="p-3 text-center ">Month</th>
                <th className="p-3 text-center ">Quarter</th>
                <th className="p-3 text-center ">Amount</th>
                <th className="p-3 text-center ">Discount</th>
                <th className="p-3 text-center ">Pending Amount</th>
                <th className="p-3 text-center ">Status</th>
                <th className="p-3 text-center ">Action</th>
            </tr>
        </motion.thead>

    );
}
