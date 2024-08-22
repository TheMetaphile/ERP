import React, {  useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBook, FaChalkboardTeacher, FaClock, FaGraduationCap, FaUtensils } from "react-icons/fa";


export default function LectureTile({ index, numberOfLecturesBeforeLunch, Time, data, day }) {
    const [lectures, setLectures] = useState({});

    useEffect(() => {
        setLectures(data && data[day] ? data[day][index] : {})
    }, [day, data]);

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const LectureCell = ({ icon: Icon, content, imageUrl, imageName }) => (
        <motion.td 
            className="px-4 py-3 text-center border-r border-gray-300"
            whileHover={{ backgroundColor: "#e5e7eb" }}
        >
            <motion.div 
                className="flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
            >
                <Icon className="text-gray-600" />
                {imageUrl ? (
                    <img src={imageUrl} alt={imageName} className="w-8 h-8 rounded-full" />
                ) : null}
                <span className="text-sm whitespace-nowrap">{content}</span>
            </motion.div>
        </motion.td>
    );

    if (numberOfLecturesBeforeLunch === index) {
        return (
            <motion.tr
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5 }}
                className="bg-yellow-100"
            >
                <td colSpan="4" className="px-4 py-3 text-center border-t border-b border-gray-400">
                    <motion.div 
                        className="flex items-center justify-center space-x-2 text-xl"
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaUtensils className="text-yellow-600" />
                        <span>LUNCH</span>
                    </motion.div>
                </td>
            </motion.tr>
        );
    }

    if (lectures.optional) {
        return lectures.optionalSubjects.map((optSub, optSubIndex) => (
            <motion.tr
                key={optSubIndex}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: optSubIndex * 0.1 }}
                className="bg-gradient-to-r from-green-50 to-blue-50"
            >
                <LectureCell icon={FaGraduationCap} content={lectures.lectureNo} />
                <LectureCell icon={FaBook} content={optSub.optionalSubject} />
                <LectureCell 
                    icon={FaChalkboardTeacher} 
                    content={optSub.teacher.name}
                    imageUrl={optSub.teacher.profileLink}
                    imageName={optSub.teacher.name}
                />
                <LectureCell icon={FaClock} content={Time} />
            </motion.tr>
        ));
    }

    if (Object.keys(lectures).length > 0) {
        return (
            <motion.tr
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5 }}
            >
                <LectureCell icon={FaGraduationCap} content={lectures.lectureNo} />
                <LectureCell icon={FaBook} content={lectures.subject} />
                <LectureCell 
                    icon={FaChalkboardTeacher} 
                    content={lectures.teacher.name}
                    imageUrl={lectures.teacher.profileLink}
                    imageName={lectures.teacher.name}
                />
                <LectureCell icon={FaClock} content={Time} />
            </motion.tr>
        );
    }

    return null;
}