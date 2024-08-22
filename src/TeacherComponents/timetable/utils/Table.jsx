import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaChalkboardTeacher, FaUserGraduate, FaBook, FaClock } from "react-icons/fa";

function Table({ data, Time, numberOfLeacturesBeforeLunch }) {
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  const timetable = data.timetable.sort((a, b) => a.lectureNo - b.lectureNo) || [];

  return (
    <motion.div
      className="rounded-lg border border-gray-400 overflow-auto"
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
          {timetable.length > 0 ? (
            timetable.map((item, idx) => {
              return (
                <React.Fragment key={item._id}>
                  {(numberOfLeacturesBeforeLunch === item.lectureNo || (idx > 0 && timetable[idx - 1].lectureNo < numberOfLeacturesBeforeLunch && timetable[idx].lectureNo > numberOfLeacturesBeforeLunch)) && (
                    <motion.tr
                      className="w-full h-8 border-t border-gray-400  text-xl text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td colSpan="5">
                        LUNCH
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

                      {item.lectureNo}
                    </td>
                    <td className="w-60 px-4 py-2 border-r whitespace-nowrap border-gray-400 ">

                      {`${formatTime(Time[item.lectureNo - 1].start)}-${formatTime(Time[item.lectureNo - 1].end)}`}
                    </td>
                    <td className="w-60 px-4 py-2 border-r border-gray-400 ">

                      {item.class}
                    </td>
                    <td className="w-60 px-4 py-2 border-r border-gray-400 ">

                      {item.section}
                    </td>
                    <td className="w-60 px-4 py-2 whitespace-nowrap ">

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

export default Table;