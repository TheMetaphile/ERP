import React, { useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from 'date-fns';
import { FaCheck, FaTimes,FaExclamation } from "react-icons/fa";
import { motion } from 'framer-motion';

export default function AttendanceStatusGridTile({ data, month }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };
    const handleStudentClick = (index) => {
        setSelectedStudent(index);
    };

    const currentDate = new Date();
    currentDate.setMonth(month - 1);
    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const students = Object.values(data.output).filter(item => item.name);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            staggerChildren: 0.1,
            delayChildren: 0.3
          }
        }
      };
    
      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      };

    return (
        <motion.div 
      className="flex mb-2 bg-purple-100 p-4 rounded-lg shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex w-full h-full overflow-x-auto mt-3 items-start">
        {dateRange.map((date, index) => (
          <motion.div 
            key={index} 
            className="flex h-full items-start"
            variants={itemVariants}
          >
            <div className="flex flex-col justify-center w-fit">
              {index === 0 &&
                students.map((student, index2) => (
                  <motion.div 
                    className={`flex flex-col`} 
                    key={index2}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index2 === 0 ? (
                      <div>
                        <h1 className="font-semibold h-12 text-xl border border-purple-300 px-2 pt-2 bg-purple-200 rounded-t-lg">Students</h1>
                        <motion.h1 
                          className={`font-normal text-lg h-12 text-start whitespace-nowrap border border-purple-300 px-2 pt-2 cursor-pointer ${selectedStudent === index2 ? 'bg-purple-300' : "bg-purple-200"}`}
                          onClick={() => handleStudentClick(index2)}
                          whileHover={{ backgroundColor: "#D8B4FE" }}
                        >
                          {student.name}
                        </motion.h1>
                      </div>
                    ) : (
                      <motion.h1 
                        className={`font-normal text-lg h-12 text-start whitespace-nowrap border border-purple-300 px-2 pt-2 cursor-pointer ${selectedStudent === index2 ? 'bg-purple-300' : "bg-purple-200"}`}
                        onClick={() => handleStudentClick(index2)}
                        whileHover={{ backgroundColor: "#D8B4FE" }}
                      >
                        {student.name}
                      </motion.h1>
                    )}
                  </motion.div>
                ))
              }
            </div>
            <motion.div 
              className={`flex flex-col justify-start items-center h-12 ${selectedDate === index ? "bg-purple-300" : "bg-purple-200"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="flex flex-col w-12 items-center h-12 border border-purple-300 cursor-pointer" 
                onClick={() => handleDateClick(index)}
                whileHover={{ backgroundColor: "#D8B4FE" }}
              >
                <span className="font-semibold text-lg">{format(date, 'd')}</span>
                <span className={`text-sm text-purple-700`}>{format(date, 'EEE')}</span>
              </motion.div>
              <div className={`flex flex-col justify-center`}>
                {students.map((student, index2) => (
                  <motion.div 
                    key={index2} 
                    className={`flex justify-center font-normal text-lg w-12 h-12 whitespace-nowrap border border-purple-300 px-2 pt-3 ${selectedDate === index ? "bg-purple-300" : ""} ${selectedStudent === index2 ? "bg-purple-300" : ""} ${selectedStudent === index2 && selectedDate === index ? "bg-purple-400" : ""}`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {format(date, 'EEE') !== 'Sun' && format(date, 'EEE') !== 'Sat' ? (
                      student[format(date, 'dd/MM/yyyy')] === 'Present' || student[format(date, 'yyyy-MM-dd')] === 'Present' ? (
                        <FaCheck className={`${selectedDate !== index ? "text-green-400" : "text-green-600"} ${selectedStudent !== index2 ? "text-green-400" : "text-green-600"} ${selectedStudent === index2 && selectedDate === index ? "text-green-700" : ""}`} />
                      ) :
                      student[format(date, 'dd/MM/yyyy')] === 'Absent' || student[format(date, 'yyyy-MM-dd')] === 'Absent' ? (
                        <FaTimes className={`${selectedDate !== index ? "text-red-400" : "text-red-600"} ${selectedStudent !== index2 ? "text-red-400" : "text-red-600"} ${selectedStudent === index2 && selectedDate === index ? "text-red-700" : ""}`} />
                      ) :
                      student[format(date, 'dd/MM/yyyy')] === 'Leave' || student[format(date, 'yyyy-MM-dd')] === 'Leave' ? (
                        <FaExclamation className={`${selectedDate !== index ? "text-yellow-400" : "text-yellow-600"} ${selectedStudent !== index2 ? "text-yellow-400" : "text-yellow-600"} ${selectedStudent === index2 && selectedDate === index ? "text-yellow-700" : ""}`} />
                      ) : (
                        <div>—</div>
                      )
                    ) : (
                      <div>—</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
    )
}