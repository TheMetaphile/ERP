import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';

function Selection({ onSearch, onDayChange }) {
  const [day, setDay] = useState('');

  const handleDayChange = (event) => {
    const value = event.target.value;
    setDay(value);
    onDayChange(value);
  };

  return (
    <motion.div
      className="w-1/4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <select
        type="text"
        className="w-full px-4 py-2 border-2 border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder="Day"
        value={day}
        onChange={handleDayChange}
      >
        <option value="">
          <FaCalendarAlt className="inline-block mr-2" />
          Select Day
        </option>
        <option value="monday">
          <FaCalendarAlt className="inline-block mr-2" />
          Monday
        </option>
        <option value="tuesday">
          <FaCalendarAlt className="inline-block mr-2" />
          Tuesday
        </option>
        <option value="wednesday">
          <FaCalendarAlt className="inline-block mr-2" />
          Wednesday
        </option>
        <option value="thursday">
          <FaCalendarAlt className="inline-block mr-2" />
          Thursday
        </option>
        <option value="friday">
          <FaCalendarAlt className="inline-block mr-2" />
          Friday
        </option>
        <option value="saturday">
          <FaCalendarAlt className="inline-block mr-2" />
          Saturday
        </option>
        <option value="sunday">
          <FaCalendarAlt className="inline-block mr-2" />
          Sunday
        </option>
      </select>
    </motion.div>
  );
}

export default Selection;