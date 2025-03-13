import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaBook, FaUtensils, FaUsers } from "react-icons/fa";

function Table({ 
  day, 
  data, 
  fetchedTimeTableStructure, 
  darkMode 
}) {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    if (data?.timetable) {
      const timetable = data.timetable.filter((entry) => entry.day === day);
      const sortedLectures = [...timetable].sort((a, b) => a.lectureNo - b.lectureNo);
      setLectures(sortedLectures);
    } else {
      setLectures([]);
    }
  }, [day, data]);

  const lectureStructure = fetchedTimeTableStructure?.lectureStructure || [];
  const numberOfLeacturesBeforeLunch = fetchedTimeTableStructure?.numberOfLeacturesBeforeLunch || 0;

  return (
    <motion.tr
      className={`${darkMode ? 'bg-gray-900' : 'bg-white'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <td 
        className={`border-b flex flex-col gap-2 justify-center text-center font-bold px-4 py-3 items-center ${
          darkMode 
            ? 'bg-green-900 text-green-300 border-gray-700' 
            : 'bg-green-200 text-green-800 border-gray-200'
        }`}
      >
        <FaCalendarAlt size={18} />
        <span className="uppercase">{day}</span>
      </td>

      {lectureStructure.map((lectureSlot, index) => {
        const lecture = lectures.find((l) => l.lectureNo === lectureSlot.lectureNo);

        if (numberOfLeacturesBeforeLunch && lectureSlot.lectureNo === numberOfLeacturesBeforeLunch + 1) {
          return (
            <React.Fragment key={`lunch-${index}`}>
              <LunchBreakColumn darkMode={darkMode} />
              {lecture ? <LectureColumn lecture={lecture} darkMode={darkMode} /> : <EmptyColumn darkMode={darkMode} />}
            </React.Fragment>
          );
        }

        return lecture 
          ? <LectureColumn key={index} lecture={lecture} darkMode={darkMode} /> 
          : <EmptyColumn key={`empty-${index}`} darkMode={darkMode} />;
      })}
    </motion.tr>
  );
}

const LectureColumn = ({ lecture, darkMode }) => (
  <td 
    className={`border px-4 py-3 ${
      darkMode 
        ? 'border-gray-700 bg-gray-800 text-white' 
        : 'border-gray-300 bg-white'
    }`}
  >
    <div className="flex items-center gap-2">
      <FaBook className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
      <span className="font-medium">{lecture.subject}</span>
    </div>

    <div className={`mt-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      <span className="font-semibold">Class:</span> {lecture.class}
    </div>
    <div className={`mt-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      <span className="font-semibold">Section:</span> {lecture.section}
    </div>

    {lecture.merge && lecture.mergeWithSection && (
      <div 
        className={`mt-2 flex items-center text-xs px-2 py-1 rounded-md ${
          darkMode 
            ? 'bg-red-900 text-red-300' 
            : 'bg-red-100 text-red-800'
        }`}
      >
        <FaUsers className="mr-1" />
        Merge: {lecture.mergeWithSection}
      </div>
    )}
  </td>
);

const LunchBreakColumn = ({ darkMode }) => (
  <td 
    className={`border px-4 py-3 text-center font-bold ${
      darkMode 
        ? 'bg-yellow-900 text-yellow-300 border-gray-700' 
        : 'bg-yellow-200 text-yellow-900 border-gray-300'
    }`}
  >
    <FaUtensils className="mr-2 inline" />
    LUNCH BREAK
  </td>
);

const EmptyColumn = ({ darkMode }) => (
  <td 
    className={`border px-4 py-3 ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-gray-100 border-gray-300'
    }`}
  ></td>
);

export default Table;