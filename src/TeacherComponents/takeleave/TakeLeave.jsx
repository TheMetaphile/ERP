import React, { useState } from 'react'
import Progress from './utils/Progress'
import History from './utils/History'
import NewLeave from './utils/NewLeave'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaPlus} from 'react-icons/fa';

function TakeLeave() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [additionalData, setAdditionalData] = useState([]);


    const handleOpen = () => {
        setIsDialogOpen(true);
    }
    const handleClose = () => {
        setIsDialogOpen(false);
    }

    const handleNewLeave = (newLeave) => {
        console.log('take.jsx', newLeave)
        setAdditionalData([newLeave]);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <motion.div

            className="flex flex-col px-6 mobile:max-tablet:px-2 h-screen overflow-y-auto items-start mt-4 mb-6 no-scrollbar "

            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <ToastContainer />

            <motion.div className='w-full flex items-center justify-between py-4 mobile:max-tablet:mb-0 mobile:max-tablet:p-2' variants={itemVariants}>
                <h1 className='text-3xl mobile:max-tablet:text-lg font-medium text-black'>Your Leave</h1>

                <motion.button
                    className='flex items-center text-sm bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-700 transition-colors duration-300'
                    onClick={handleOpen}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaPlus className="mr-2" />
                    Take New Leave
                </motion.button>
            </motion.div>

            <motion.div className='w-full mb-8 mobile:max-tablet:mb-2' variants={itemVariants}>
                <Progress />
            </motion.div>


            <History additionalData={additionalData} />


            {isDialogOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                >
                    <NewLeave onClose={handleClose} onNewLeave={handleNewLeave} />
                </motion.div>
            )}
        </motion.div>

    )
}

export default TakeLeave