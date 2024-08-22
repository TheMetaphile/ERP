import React from 'react'
import { motion } from "framer-motion";

function CurrentWeekAdminRow({ details, index }) {
    return (
        <motion.tr
            key={index}
            className="border-b border-purple-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
        >
            <td className="border-y p-4 border-purple-500 whitespace-nowrap gap-2 text-purple-500">
                {details.date}
            </td>
            <td className="border-y p-4 border-purple-500 whitespace-nowrap gap-2 text-purple-500">
                {details.chapter}
            </td>
            <td className="border-y p-4 border-purple-500 whitespace-nowrap gap-2 text-purple-500">
                {details.topic}
            </td>
            <td className="border-y p-4 border-purple-500 whitespace-nowrap gap-2 text-purple-500">
                {details.teachingAids}
            </td>
            <td className="border-y p-4 border-purple-500 whitespace-nowrap gap-2 text-purple-500">
                {details.Activity}
            </td>
            <td className="border-y p-4 border-purple-500 whitespace-nowrap gap-2 text-purple-500">
                {details.description ? (
                    <>
                        {details.description}, {details.status}
                    </>
                ) : (
                    <>NA</>
                )}
            </td>
        </motion.tr>
    )
}

export default CurrentWeekAdminRow