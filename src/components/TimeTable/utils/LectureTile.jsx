import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { FaUtensils, FaBook, FaCalendarAlt } from 'react-icons/fa';

export default function LeactureTile({ index, numberOfLeacturesBeforeLunch, day, data, subjects, darkMode }) {
  const [lectures, setLectures] = useState([]);

  // console.log(lectureStructure, data, day, numberOfLeacturesBeforeLunch, '11111')

  useEffect(() => {
    if (data && data[day]) {
      setLectures(data[day]);
    }
  }, [day, data]);
  // console.log(lectures, 'adfhfbhdb')

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const dayBgClass = darkMode ? 'bg-green-900' : 'bg-green-100';
  const dayTextClass = darkMode ? 'text-green-300' : 'text-green-800';

  return (
    <>
      <motion.tr
        className={bgClass}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <td className={`border-b border-gray-200 flex flex-col gap-2 justify-center ${dayBgClass} text-center font-bold ${dayTextClass} px-4 py-3 items-center`}>
          <FaCalendarAlt />
          {day.split("").map((letter, index) => (
            <div key={index}>{letter.toUpperCase()}</div>
          ))}
        </td>

        {lectures.map((lecture, index) => (
          <React.Fragment key={index}>
            {numberOfLeacturesBeforeLunch && index === numberOfLeacturesBeforeLunch && (
              <LunchBreakColumn darkMode={darkMode} />
            )}
            <LectureColumn
              lecture={lecture}
              subjects={subjects}
              darkMode={darkMode}
            />
          </React.Fragment>
        ))}
      </motion.tr>

    </>
  );
}

const LectureColumn = ({ lecture, subjects, darkMode }) => {
  const showOptionalSubject =
    lecture.optional &&
    lecture.optionalSubjects.length > 0 &&
    subjects.includes(lecture.optionalSubjects[0].subject);

  const displayLecture = showOptionalSubject ? lecture.optionalSubjects[0] : lecture;

  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const subTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
  const iconClass = darkMode ? 'text-blue-400' : 'text-blue-600';

  return (
    <td className={`border ${borderClass} px-4 py-3`}>
      <div className={`flex items-center ${textClass}`}>
        <FaBook className={`${iconClass} mr-2`} />
        <span>{displayLecture.subject}</span>
        {displayLecture.mergeWithSection && (
          <span className={`ml-2 text-xs ${darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'} px-2 py-1 rounded-full`}>
            Merge: {displayLecture.mergeWithSection}
          </span>
        )}
      </div>

      <div className={`flex items-center mt-1 ${subTextClass}`}>
        {displayLecture.teacher?.profileLink && (
          <img
            src={displayLecture.teacher.profileLink}
            alt={displayLecture.teacher.name}
            className="w-8 h-8 rounded-full mr-2"
          />
        )}
        <span className="text-sm">{displayLecture.teacher?.name || "Unknown Teacher"}</span>
      </div>
    </td>
  );
};

const LunchBreakColumn = ({ darkMode }) => {
  const bgClass = darkMode ? 'bg-yellow-900' : 'bg-yellow-100';
  const textClass = darkMode ? 'text-yellow-300' : 'text-yellow-800';

  return (
    <td className={`border border-gray-300 px-4 py-3 ${bgClass} ${textClass} text-center font-bold`}>
      <FaUtensils className="mr-2 inline" />
      LUNCH BREAK
    </td>
  );
};
