import React, { useContext, useEffect, useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSunday, isToday, getDay } from 'date-fns';
import { motion } from 'framer-motion';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../../Config';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Calendar = ({ month, year }) => {
  const { authState, darkMode } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(`${year}-${month}-01`));
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchStudentAttendance();
  }, [currentDate, authState?.accessToken]);

  const fetchStudentAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/studentAttendance/fetch/student`, {
        params: {
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
        },
        headers: {
          Authorization: `Bearer ${authState?.accessToken}`,
        }
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching student month attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (date) => setSelectedDate(date);

  const changeMonth = (increment) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  };

  const getDateRange = () => {
    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);
    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  const currentMonthRange = getDateRange();
  const monthName = format(currentDate, 'MMMM yyyy');
  const weekdayShortNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getStatusDotColor = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const status = data[formattedDate] || 'defaultValue';
    switch (status) {
      case 'Absent': return 'bg-red-500';
      case 'Present': return 'bg-green-500';
      case 'Leave': return 'bg-yellow-500';
      default: return 'bg-gray-300';
    }
  };

  const calendarAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  const firstDayOfMonth = getDay(startOfMonth(currentDate)); // Get the weekday of the first day
  const blankDays = [...Array((firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1))].map((_, i) => (
    <div key={`blank-${i}`} className="flex justify-center items-center p-2" />
  ));


  const bgClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';
  const headerTextClass = darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800';
  const weekdayTextClass = darkMode
    ? (index) => index === 6 ? 'text-red-400' : 'text-gray-300'
    : (index) => index === 6 ? 'text-red-500' : 'text-gray-600';

  return (
    <motion.div
      className={`flex flex-col w-full h-full flex-grow p-6 border rounded-lg shadow-lg ${bgClass} ${textClass}`}
      initial="hidden"
      animate="visible"
      variants={calendarAnimation}
    >
      <div className={`flex justify-between items-center mb-6 text-xl font-bold ${textClass}`}>
        <button
          onClick={() => changeMonth(-1)}
          className={`${headerTextClass}`}
        >
          <FaChevronLeft />
        </button>
        <span>{monthName}</span>
        <button
          onClick={() => changeMonth(1)}
          className={`${headerTextClass}`}
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekdayShortNames.map((day, index) => (
          <div
            key={index}
            className={`font-medium text-center py-2 ${weekdayTextClass(index)}`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {blankDays}
        {currentMonthRange.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentDate);
          const isSelected = selectedDate && date.getTime() === selectedDate.getTime();
          const checkSunday = isSunday(date);
          const isCurrentDate = isToday(date);
          const dotColor = getStatusDotColor(date);

          return (
            <motion.div
              key={index}
              className={`
                flex flex-col items-center justify-center p-2 rounded-lg relative
                ${!isCurrentMonth ? (darkMode ? 'text-gray-600' : 'text-gray-400') : ''}
                ${isSelected ? (darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800') : ''}
                ${checkSunday ? (darkMode ? 'text-red-400' : 'text-red-500') : ''}
                ${isCurrentDate ? 'border-2 border-blue-500' : ''}
                ${isCurrentMonth && !isSelected && !checkSunday ? (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100') : ''}
                cursor-pointer
              `}
              onClick={() => handleDateClick(date)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`${isCurrentMonth ? 'font-semibold' : 'font-normal'}`}>
                {format(date, 'd')}
              </span>
              <span className={`w-2 h-2 mt-1 rounded-full ${dotColor}`}></span>
            </motion.div>
          );
        })}
      </div>
      {loading && (
        <div className={`text-center mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Loading...
        </div>
      )}
    </motion.div>
  );
};

export default Calendar;