import React from "react";
import Assign from "./utils/Assign";
import { ToastContainer } from "react-toastify";
import { motion } from 'framer-motion';

export default function Assigncoordinator() {
    return (
        <motion.div
            className="flex flex-col w-full mt-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ToastContainer />
            <motion.div
                className="flex justify-between w-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <h1 className="text-3xl mobile:max-tablet:text-xl px-4 text-purple-600 font-bold">
                    Assign Coordinator
                </h1>
            </motion.div>
            <motion.div
                className="flex w-full rounded-md shadow-md"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Assign />
            </motion.div>
        </motion.div>
    )
}