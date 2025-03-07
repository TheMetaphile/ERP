import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { FaUtensils, FaBook, FaCalendarAlt } from 'react-icons/fa';


export default function LeactureTile({ index, numberOfLeacturesBeforeLunch, day, data, subjects }) {
  const [lectures, setLectures] = useState([]);

  // console.log(lectureStructure, data, day, numberOfLeacturesBeforeLunch, '11111')

  useEffect(() => {
    if (data && data[day]) {
      setLectures(data[day]);
    }
  }, [day, data]);
  // console.log(lectures, 'adfhfbhdb')
  return (
    <>
      <motion.tr
        className="bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >

        <td className="border-b  border-gray-200 flex flex-col gap-2 justify-center bg-green-100 text-center font-bold text-green-800 px-4 py-3 items-center">
          <FaCalendarAlt />
          {day.split("").map((letter, index) => (
            <div key={index}>{letter.toUpperCase()}</div>
          ))}
        </td>

        {lectures.map((lecture, index) => (
          <>
            {numberOfLeacturesBeforeLunch && index === numberOfLeacturesBeforeLunch && (
              <LunchBreakColumn key={`lunch-${index}`} />
            )}
            <LectureColumn key={index} lecture={lecture} subjects={subjects}/>
          </>
        ))}
      </motion.tr>

    </>
  );
}

const LectureColumn = ({ lecture, subjects }) => {
  const showOptionalSubject =
    lecture.optional &&
    lecture.optionalSubjects.length > 0 &&
    subjects.includes(lecture.optionalSubjects[0].subject);

  const displayLecture = showOptionalSubject ? lecture.optionalSubjects[0] : lecture;

  return (
    <td className="border border-gray-300 px-4 py-3">
      <div className="flex items-center">
        <FaBook className="text-blue-600 mr-2" />
        <span>{displayLecture.subject}</span>
        {displayLecture.mergeWithSection && (
          <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
            Merge: {displayLecture.mergeWithSection}
          </span>
        )}
      </div>

      <div className="flex items-center mt-1">
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


const LunchBreakColumn = () => (
  <td className="border border-gray-300 px-4 py-3 bg-yellow-100 text-yellow-800 text-center font-bold">
    <FaUtensils className="mr-2 inline" />
    LUNCH BREAK
  </td>
);