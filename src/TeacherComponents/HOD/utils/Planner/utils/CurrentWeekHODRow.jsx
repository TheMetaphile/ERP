import React from 'react'
import { motion } from 'framer-motion';

function CurrentWeekHODRow({ details, index }) {
    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };
    return (
        <motion.tr
        key={index}
        variants={rowVariants}
    >

            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.date}
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.chapter}
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.topic}
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.teachingAids}
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.Activity}
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.description ? (
                    <>{details.description}, {details.status}</>
                ) : (
                    <>NA</>
                )}
            </td>

        </motion.tr>
    )
}

export default CurrentWeekHODRow