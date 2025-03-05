import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaBook, FaUtensils } from "react-icons/fa";

function Table({ day, data, fetchedTimeTableStructure }) {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    if (data?.timetable) {
      const timetable = data.timetable[0];
      if (timetable?.[day]) {
        const sortedLectures = [...timetable[day]].sort((a, b) => a.lectureNo - b.lectureNo);
        setLectures(sortedLectures);
      } else {
        setLectures([]);
      }
    }
  }, [day, data]);

  const lectureStructure = fetchedTimeTableStructure?.lectureStructure || [];
  const numberOfLeacturesBeforeLunch = fetchedTimeTableStructure?.numberOfLeacturesBeforeLunch || 0;

  return (
    <motion.tr
      className="bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Day Column */}
      <td className="border-b border-gray-200 flex flex-col gap-2 justify-center bg-green-100 text-center font-bold text-green-800 px-4 py-3 items-center">
        <FaCalendarAlt />
        {day.split("").map((letter, index) => (
          <div key={index}>{letter.toUpperCase()}</div>
        ))}
      </td>

      {/* Lecture Slots */}
      {lectureStructure.map((lectureSlot, index) => {
        const lecture = lectures.find((l) => l.lectureNo === lectureSlot.lectureNo);

        if (numberOfLeacturesBeforeLunch && lectureSlot.lectureNo === numberOfLeacturesBeforeLunch + 1) {
          return (
            <React.Fragment key={`lunch-${index}`}>
              <LunchBreakColumn />
              {lecture ? <LectureColumn lecture={lecture} /> : <EmptyColumn />}
            </React.Fragment>
          );
        }

        return lecture ? <LectureColumn key={lecture._id} lecture={lecture} /> : <EmptyColumn key={`empty-${index}`} />;
      })}
    </motion.tr>
  );
}

const LectureColumn = ({ lecture }) => (
  <td className="border border-gray-300 px-4 py-3">
    <div className="flex items-center">
      <FaBook className="text-blue-600 mr-2" />
      <span>{lecture.subject}</span>
      {lecture.merge && lecture.mergeWithSection && (
        <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
          Merge: {lecture.mergeWithSection}
        </span>
      )}
    </div>
    <div className="flex items-center mt-1">
      <span className="text-sm">{lecture.class}</span>
    </div>
    <div className="flex items-center mt-1">
      <span className="text-sm">{lecture.section}</span>
    </div>
  </td>
);

const LunchBreakColumn = () => (
  <td className="border border-gray-300 px-4 py-3 bg-yellow-100 text-yellow-800 text-center font-bold">
    <FaUtensils className="mr-2 inline" />
    LUNCH BREAK
  </td>
);

const EmptyColumn = () => <td className="border border-gray-300 px-4 py-3 bg-gray-100"></td>;

export default Table;
