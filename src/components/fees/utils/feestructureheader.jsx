import React from "react";
import { motion } from "framer-motion";

export default function FeeStructureHeader() {
    return (
        <motion.thead 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="bg-gradient-to-r from-blue-200 to-blue-100 text-black"
        >
            <tr>
                {["Month", "Amount", "Discount", "Status", "Action"].map((header, index) => (
                    <motion.th 
                        key={header}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 text-center "
                    >
                        {header}
                    </motion.th>
                ))}
            </tr>
        </motion.thead>
    );
}
