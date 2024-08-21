import React from 'react'
import { motion } from "framer-motion";

function NextWeekAdminRow({ details, index }) {

    console.log(details);


    return (
        <motion.tr
            key={index}
            className=""
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
        >
            <td className=" p-4  whitespace-nowrap gap-2 text-purple-500">
                {details.date}
            </td>
            <td className=" p-4  whitespace-nowrap gap-2 text-purple-500">
                {details.chapter}
            </td>
            <td className=" p-4  whitespace-nowrap gap-2 text-purple-500">
                {details.topic}
            </td>
            <td className=" p-4  whitespace-nowrap gap-2 text-purple-500">
                {details.teachingAids}
            </td>
            <td className=" p-4  whitespace-nowrap gap-2 text-purple-500">
                {details.Activity}
            </td>
        </motion.tr>
    )
}

export default NextWeekAdminRow

