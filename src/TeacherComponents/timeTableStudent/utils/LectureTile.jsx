import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { FaUtensils, FaBook, FaCalendarAlt } from 'react-icons/fa';


export default function LeactureTile({
  index,
  day,
  data,
  fetchedTimeTableStructure,
  darkMode
}) {
  const [lectures, setLectures] = useState([]);

  const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const dayBgClass = darkMode ? 'bg-green-900' : 'bg-green-100';
  const dayTextClass = darkMode ? 'text-green-300' : 'text-green-800';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';
  // console.log(lectureStructure, data, day, numberOfLeacturesBeforeLunch, '11111')

  useEffect(() => {
    if (data && data[day]) {
      setLectures(data[day]);
    }
  }, [day, data]);

  const lectureStructure = fetchedTimeTableStructure?.lectureStructure || [];
  const numberOfLeacturesBeforeLunch = fetchedTimeTableStructure?.numberOfLeacturesBeforeLunch || 0;


  // console.log(lectures, 'adfhfbhdb')
  return (
    <motion.tr
      className={bgClass}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <td
        className={`
            border-b ${borderClass} flex flex-col gap-2 
            justify-center ${dayBgClass} text-center 
            font-bold ${dayTextClass} px-4 py-3 items-center
        `}
      >
        <FaCalendarAlt />
        {day.split("").map((letter, index) => (
          <div key={index}>{letter.toUpperCase()}</div>
        ))}
      </td>

      {lectureStructure.map((lectureSlot, index) => {
        const lecture = lectures.find((l) => l.lectureNo === lectureSlot.lectureNo);

        if (numberOfLeacturesBeforeLunch && lectureSlot.lectureNo === numberOfLeacturesBeforeLunch + 1) {
          return (
            <React.Fragment key={`lunch-${index}`}>
              <LunchBreakColumn darkMode={darkMode} />
              {lecture ? (
                <LectureColumn lecture={lecture} darkMode={darkMode} />
              ) : (
                <EmptyColumn darkMode={darkMode} />
              )}
            </React.Fragment>
          );
        }

        return lecture ? (
          <LectureColumn
            key={lecture._id || `lecture-${index}`}
            lecture={lecture}
            darkMode={darkMode}
          />
        ) : (
          <EmptyColumn
            key={`empty-${index}`}
            darkMode={darkMode}
          />
        );
      })}
    </motion.tr>
  );
}

const LectureColumn = ({ lecture, darkMode }) => {
  const textClass = darkMode ? 'text-white' : 'text-black';
  const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
  const iconClass = darkMode ? 'text-blue-400' : 'text-blue-600';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';

  return (
    <td className={`border ${borderClass} px-4 py-3`}>
      <div className={`flex items-center ${textClass}`}>
        <FaBook className={`${iconClass} mr-2`} />
        <span>{lecture.subject}</span>
        {lecture?.optional && (
          <span
            className={`
                          ml-2 text-xs rounded-full px-2 py-1 
                          ${darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'}
                      `}
          >
            Merge: {lecture?.optionalSubjects?.[0].mergeWithSection}
          </span>
        )}
      </div>

      <div className={`flex items-center mt-1 ${subTextClass}`}>
        {lecture.teacher?.profileLink && (
          <img
            src={lecture.teacher.profileLink}
            alt={lecture.teacher.name}
            className="w-8 h-8 rounded-full mr-2"
          />
        )}
        <span>{lecture.teacher?.name || "Unknown Teacher"}</span>
      </div>

      {lecture.optionalSubjects?.length > 0 && (
        <div className={`mt-2 text-xs ${subTextClass}`}>
          <strong>Optional:</strong>
          {lecture.optionalSubjects.map((sub, idx) => (
            <div key={sub._id || idx} className="flex items-center mt-1">
              {sub.teacher?.profileLink && (
                <img
                  src={sub.teacher.profileLink}
                  alt={sub.teacher.name}
                  className="w-6 h-6 rounded-full mr-1"
                />
              )}
              {sub.subject} ({sub.teacher?.name || "Unknown Teacher"})
            </div>
          ))}
        </div>
      )}
    </td>
  );
};

const LunchBreakColumn = ({ darkMode }) => (
  <td
    className={`
          border ${darkMode ? 'border-gray-700' : 'border-gray-300'} 
          px-4 py-3 
          ${darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'} 
          text-center font-bold
      `}
  >
    <FaUtensils className="mr-2 inline" />
    LUNCH BREAK
  </td>
);

const EmptyColumn = ({ darkMode }) => (
  <td
    className={`
          border ${darkMode ? 'border-gray-700' : 'border-gray-300'} 
          px-4 py-3 
          ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}
      `}
  ></td>
);
