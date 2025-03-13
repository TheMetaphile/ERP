import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaChalkboardTeacher, FaUserGraduate, FaBook, FaClock } from "react-icons/fa";

function TableSubstitute({ data, Time, numberOfLeacturesBeforeLunch, darkMode }) {
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  return (
    <motion.div
      className="rounded-lg border border-gray-400 overflow-auto text-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <table className="mobile:max-tablet:w-fit w-full items-center rounded-lg">

        <thead className="w-fit bg-gradient-to-r from-blue-200 to-blue-100">
          <tr className="w-fit whitespace-nowrap">

            <th className="w-32 px-4 py-2 font-medium border-r border-gray-400">
              <FaCalendarAlt className="inline-block mr-2" /> Lecture
            </th>
            <th className="w-60 px-4 py-2 font-medium border-r border-gray-400">
              <FaClock className="inline-block mr-2" /> Timing
            </th>
            <th className="w-60 px-4 py-2 font-medium border-r border-gray-400">
              <FaChalkboardTeacher className="inline-block mr-2" /> Class
            </th>
            <th className="w-60 px-4 py-2 font-medium border-r border-gray-400">
              <FaUserGraduate className="inline-block mr-2" /> Section
            </th>
            <th className="w-60 px-4 py-2 font-medium border-r border-gray-400">
              <FaBook className="inline-block mr-2" /> Subject
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.sort((a, b) => a.lectureNo - b.lectureNo).map((item, idx) => {
              const isLunchBreak =
                (numberOfLeacturesBeforeLunch === item.Lecture) ||
                (data[idx].lectureNo < numberOfLeacturesBeforeLunch && data[idx + 1]?.lectureNo > numberOfLeacturesBeforeLunch);

              return (
                <React.Fragment key={item._id}>
                  {isLunchBreak && (
                    <motion.tr
                      className={`w-full h-8 border-t text-xl text-center ${darkMode
                        ? 'border-gray-700 bg-gray-900 text-yellow-300'
                        : 'border-gray-400 bg-white text-yellow-900'
                        }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td colSpan="5">
                        <FaCalendarAlt className="inline-block mr-2" /> LUNCH
                      </td>
                    </motion.tr>
                  )}
                  <motion.tr
                    className={`text-center border-t ${darkMode
                      ? 'border-gray-700 hover:bg-gray-700'
                      : 'border-gray-400 hover:bg-gray-100'
                      }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    {[
                      item.Lecture,
                      `${formatTime(Time[item.Lecture - 1].start)}-${formatTime(Time[item.Lecture - 1].end)}`,
                      item.class,
                      item.section,
                      item.subject
                    ].map((cellData, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`w-60 px-4 py-2 border-r whitespace-nowrap ${darkMode
                          ? 'border-gray-700 text-white'
                          : 'border-gray-400 text-black'
                          } ${cellIndex === 4 ? 'border-r-0' : ''}`}
                      >
                        {cellData}
                      </td>
                    ))}
                  </motion.tr>
                </React.Fragment>
              );
            })
          ) : (
            <tr>
              <td
                colSpan="5"
                className={`text-center py-4 ${darkMode ? 'text-blue-400' : 'text-blue-500'
                  }`}
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
}

export default TableSubstitute;