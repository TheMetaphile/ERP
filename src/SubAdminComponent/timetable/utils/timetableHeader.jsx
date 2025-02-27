import { motion } from 'framer-motion';
import { FaGraduationCap, FaClock, FaBook, FaUserTie, FaComments } from 'react-icons/fa';

export default function TimetableHeader() {
    return (
        <motion.thead
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-200 to-purple-100 text-black rounded-t-lg  text-xl w-full"
        >
            <tr>
                {['Lecture', 'Timing', 'Subject', 'Optional', 'Teacher', 'Remark'].map((header, index) => (
                    <th key={index} className="px-4 py-3 text-center border-r border-purple-400 items-center">
                        {header === 'Lecture' && <FaGraduationCap className="inline mr-2" />}
                        {header === 'Timing' && <FaClock className="inline mr-2" />}
                        {header === 'Subject' && <FaBook className="inline mr-2" />}
                        {header === 'Teacher' && <FaUserTie className="inline mr-2" />}
                        {header === 'Remark' && <FaComments className="inline mr-2" />}
                        {header}
                    </th>
                ))}
            </tr>
        </motion.thead>
    );
}
