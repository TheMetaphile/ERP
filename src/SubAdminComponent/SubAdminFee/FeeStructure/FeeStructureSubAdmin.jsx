import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaChevronDown } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeeAdminRow from './FeeAdminRow';
import Header from './Header';
import SessionSelector from './SessionSelector';
import PageTitle from './PageTitle';

const getSessions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => {
    const startYear = currentYear - i;
    return `${startYear}-${(startYear + 1).toString().slice(-2)}`;
  });
};

const content = [
  { class: 'Pre-Nursery-U.K.G' },
  { class: '1st-5th' },
  { class: '6th-8th' },
  { class: '9th-10th' },
  { class: '11th-12th Com./Huma' },
  { class: '11th-12th Science' },
];

function FeeStructureSubAdmin() {
  const sessions = getSessions();
  const [selectedSession, setSelectedSession] = useState(sessions[0]);

  return (
    <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3}}
      className="min-h-screen p-8 bg-gradient-to-br from-purple-50 to-white"
    >
      <ToastContainer />
      <div className='flex justify-between items-center mb-8'>
        <PageTitle icon={FaGraduationCap} title="Fee Structure Management" />
        <SessionSelector
          sessions={sessions}
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
        />
      </div>
     
        <table className="w-full border-collapse bg-white">
          <Header headings={['Class Group', 'Admission Fee', 'Monthly Fee', 'Quarterly Fee', 'Actions']} />
          <tbody className="divide-y divide-gray-200">
            {content.map((con, index) => (
              
                <FeeAdminRow
                  Class={con.class}
                  session={selectedSession}
                  key={index}
                />
         
            ))}
          </tbody>
        </table>
      
    </motion.div>
  );
}

export default FeeStructureSubAdmin;