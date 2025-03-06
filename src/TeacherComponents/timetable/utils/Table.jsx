import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaBook, FaUtensils, FaUsers } from "react-icons/fa";

function Table({ day, data, fetchedTimeTableStructure }) {
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

  const lectureStructure = fetchedTimeTableStructure?.lectureStructure || [];;
  const numberOfLeacturesBeforeLunch = fetchedTimeTableStructure?.numberOfLeacturesBeforeLunch || 0;

  return (
    <motion.tr
      className="bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <td className="border-b border-gray-200 flex flex-col gap-2 justify-center bg-green-200 text-center font-bold text-green-800 px-4 py-3 items-center">
        <FaCalendarAlt size={18} />
        <span className="uppercase">{day}</span>
      </td>

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

        return lecture ? <LectureColumn key={index} lecture={lecture} /> : <EmptyColumn key={`empty-${index}`} />;
      })}
    </motion.tr>
  );
}

const LectureColumn = ({ lecture }) => (
  <td className="border border-gray-300 px-4 py-3">
    <div className="flex items-center gap-2">
      <FaBook className="text-blue-600" />
      <span className="font-medium">{lecture.subject}</span>
    </div>

    <div className="mt-1 text-sm">
      <span className="font-semibold">Class:</span> {lecture.class}
    </div>
    <div className="mt-1 text-sm">
      <span className="font-semibold">Section:</span> {lecture.section}
    </div>

    {lecture.merge && lecture.mergeWithSection && (
      <div className="mt-2 flex items-center text-xs bg-red-100 text-red-800 px-2 py-1 rounded-md">
        <FaUsers className="mr-1" />
        Merge: {lecture.mergeWithSection}
      </div>
    )}
  </td>
);

const LunchBreakColumn = () => (
  <td className="border border-gray-300 px-4 py-3 bg-yellow-200 text-yellow-900 text-center font-bold">
    <FaUtensils className="mr-2 inline" />
    LUNCH BREAK
  </td>
);

const EmptyColumn = () => <td className="border border-gray-300 px-4 py-3 bg-gray-100"></td>;

export default Table;
