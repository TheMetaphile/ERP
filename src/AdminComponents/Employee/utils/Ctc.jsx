import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave } from 'react-icons/fa';

const Ctc = ({ nextStep, prevStep }) => {
  const [showModal, setShowModal] = useState(false);
  const [instruments, setInstruments] = useState([]);
  const [instrumentTitle, setInstrumentTitle] = useState('');
  const [instrumentAmount, setInstrumentAmount] = useState('');

  const handleAddInstrument = () => {
    if (!instrumentTitle || !instrumentAmount) {
      alert("Please fill in both fields.");
      return;
    }
    setInstruments([...instruments, { title: instrumentTitle, amount: instrumentAmount }]);
    setInstrumentTitle('');
    setInstrumentAmount('');
    setShowModal(false);
  };

  const handleRemoveInstrument = (index) => {
    setInstruments(instruments.filter((_, i) => i !== index));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        mass: 0.4,
        damping: 8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 50 }
    }
  };

  return (
    <motion.div
      className="rounded-lg w-full px-3 mobile:max-tablet:px-0 items-start mt-2 mb-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-6 mx-auto bg-purple-50 rounded-lg shadow-lg space-y-6 border border-purple-200">
        <motion.h2
          className="text-2xl font-semibold p-2 text-purple-800 mobile:max-tablet:text-xl"
          variants={childVariants}
        >
          CTC Management
        </motion.h2>

        <motion.div className="space-y-6" variants={childVariants}>
          <InputField
            icon={<FaMoneyBillWave />}
            label="Enter In-hand Salary"
            placeholder="Enter In-hand Salary"
            // value={formData.inHandSalary}
            // onChange={handleChange('inHandSalary')}
          />
        </motion.div>

        <motion.div className="flex justify-between" variants={childVariants}>
          <motion.button
            onClick={prevStep}
            className="bg-purple-500 text-white p-2 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back
          </motion.button>
          <motion.button
            onClick={nextStep}
            className="bg-purple-700 text-white p-2 rounded-lg shadow-md hover:bg-purple-800 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Proceed
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Ctc;


function InputField({ icon, label, placeholder, value, onChange }) {
  return (
    <label className="block">
      <span className="text-purple-700 font-medium">{label}</span>
      <div className="relative mt-1">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-500">
          {icon}
        </span>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full p-2 pl-10 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          // value={value}
          // onChange={onChange}
        />
      </div>
    </label>
  );
}