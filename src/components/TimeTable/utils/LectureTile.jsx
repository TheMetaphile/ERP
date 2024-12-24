import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../Context/AuthContext";
import { motion } from 'framer-motion';
import { FaUtensils, FaBook, FaUserTie, FaClock } from 'react-icons/fa';


export default function LeactureTile({ index, numberOfLeacturesBeforeLunch, Time, data, day }) {
  const { authState } = useContext(AuthContext);
  const [lectures, setLectures] = useState({});

  useEffect(() => {
    setLectures(data && data[day] ? data[day][index] : {})
  }, [day, data]);

  return (
    <>
      {numberOfLeacturesBeforeLunch === index && <LunchBreakRow />}
      {lectures?.optional ? (
        lectures.optionalSubjects.map((optSub, optSubIndex) => (
          authState.subjects.includes(optSub.optionalSubject) && (
            <LectureRow
              key={optSubIndex}
              lectureNo={lectures.lectureNo}
              subject={optSub.optionalSubject}
              teacher={optSub.teacher}
              time={Time}
              isOptional={true}
              mergeWithSection={optSub.mergeWithSection !== authState.userDetails.section ? optSub.mergeWithSection : null}
            />
          )
        ))
      ) : (
        Object.keys(lectures || {}).length > 0 && (
          <LectureRow
            lectureNo={lectures.lectureNo}
            subject={lectures.subject}
            teacher={lectures.teacher}
            time={Time}
            isOptional={false}
          />
        )
      )}
    </>
  );
}

const LectureRow = ({ lectureNo, subject, teacher, time, isOptional, mergeWithSection }) => (
  <motion.tr
    className="bg-white"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <td className="border-b border-gray-200 bg-green-100 text-center font-bold text-green-800 px-4 py-3">{lectureNo}</td>
    <td className="border-b border-gray-200 px-4 py-3">
      <div className="flex items-center">
        <FaBook className="text-blue-600 mr-2" />
        <span>{subject}</span>
        {isOptional && mergeWithSection && (
          <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
            Merge: {mergeWithSection}
          </span>
        )}
      </div>
    </td>
    <td className="border-b border-gray-200 bg-blue-50 px-4 py-3">
      <div className="flex items-center">
        <img src={teacher.profileLink} alt={teacher.name} className="w-8 h-8 rounded-full mr-2" />
        <span className="text-sm">{teacher.name}</span>
      </div>
    </td>
    <td className="border-b border-gray-200 bg-purple-50 px-4 py-3">
      <div className="flex items-center justify-center">
        <FaClock className="text-purple-600 mr-2" />
        <span>{time}</span>
      </div>
    </td>
  </motion.tr>
);

const LunchBreakRow = () => (
  <motion.tr
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <td colSpan="4" className="border-b  border-gray-200">
      <div className="h-12 bg-yellow-100 text-yellow-800 text-xl font-bold flex items-center justify-center">
        <FaUtensils className="mr-2" />
        LUNCH BREAK
      </div>
    </td>
  </motion.tr>
);