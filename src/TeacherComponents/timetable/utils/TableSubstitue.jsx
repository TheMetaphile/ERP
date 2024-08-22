import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaChalkboardTeacher, FaUserGraduate, FaBook, FaClock } from "react-icons/fa";

function TableSubstitute({ data, Time, numberOfLeacturesBeforeLunch }) {
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
      className="rounded-lg border border-gray-400 overflow-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <table className="mobile:max-tablet:w-fit w-full items-center rounded-lg">

        <thead className="w-fit bg-gradient-to-r from-blue-400 to-blue-200">
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
              return (
                <React.Fragment key={item._id}>
                  {(numberOfLeacturesBeforeLunch === item.Lecture || (data[idx].lectureNo < numberOfLeacturesBeforeLunch && data[idx + 1].lectureNo > numberOfLeacturesBeforeLunch)) && (
                    <motion.tr
                      className="w-full h-8 border-t border-gray-400 bg-blue-200 text-xl text-center"
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
                    className="text-center border-t border-gray-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <td className="w-32 px-4 py-2 border-r border-gray-400">

                      {item.Lecture}
                    </td>
                    <td className="w-60 px-4 py-2 border-r whitespace-nowrap border-gray-400 bg-blue-200">

                      {`${formatTime(Time[item.Lecture - 1].start)}-${formatTime(Time[item.Lecture - 1].end)}`}
                    </td>
                    <td className="w-60 px-4 py-2 border-r border-gray-400 bg-blue-200">

                      {item.class}
                    </td>
                    <td className="w-60 px-4 py-2 border-r border-gray-400 bg-blue-200">

                      {item.section}
                    </td>
                    <td className="w-60 px-4 py-2 whitespace-nowrap bg-blue-200">

                      {item.subject}
                    </td>
                  </motion.tr>
                </React.Fragment>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-blue-500">
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