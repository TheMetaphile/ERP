import React, { useContext, useEffect, useState } from 'react'
import Selection from './utils/Selection';
import { Outlet, useSearchParams } from "react-router-dom";
import Tabs from './utils/Tabs';
import AuthContext from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function NoteBook() {
  const { authState, darkMode } = useContext(AuthContext);
  const [Class, setClass] = useState(localStorage.getItem('Class') || '');
  const [Section, setSection] = useState(localStorage.getItem('Section') || '');
  const [selectedTab, setSelectedTab] = useState('All');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [Subject, setSubject] = useState(localStorage.getItem('Subject') || '');

  useEffect(() => {
    localStorage.setItem('Class', Class);
    localStorage.setItem('Section', Section);
    localStorage.setItem('Subject', Subject);
  }, [Class, Section, Subject]);

  const onTabChange = (tab) => {
    setSelectedTab(tab);
  }

  const updateQueryParams = () => {
    setSearchParams({ Class: Class, Section: Section, Subject: Subject });
  };

  useEffect(() => {
    updateQueryParams();
  }, [Class, Section, Subject]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`overflow-y-auto w-full items-start px-2 no-scrollbar ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}
    >
      <div className='w-full flex items-center justify-between px-4 mobile:max-tablet:px-1 mb-2'>
        <div className='mobile:max-tablet:flex'>
          <motion.h1
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className={`text-3xl font-medium mobile:max-tablet:text-lg whitespace-nowrap ${darkMode ? 'text-white' : 'text-black'
              }`}
          >
            Note Book Record
          </motion.h1>
        </div>
        <div className="flex justify-end tablet:hidden w-full mobile:max-tablet:text-end right-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 border rounded flex items-center justify-center ${darkMode
                ? 'bg-gray-700 text-white border-gray-600'
                : 'bg-white text-black border-gray-300'
              }`}
            onClick={() => setDropdownVisible(!isDropdownVisible)}
          >
            <FaFilter className="mr-2" />
            Filter
            {isDropdownVisible ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
          </motion.button>
          {isDropdownVisible && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`fixed left-0 right-0 pt-1 p-4 gap-2 justify-between mobile:max-tablet:flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
            >
              <Selection
                setClass={setClass}
                setSection={setSection}
                setSubject={setSubject}
                darkMode={darkMode}
              />
            </motion.div>
          )}
        </div>
        <div className='mobile:max-tablet:hidden'>
          <Selection
            setClass={setClass}
            setSection={setSection}
            setSubject={setSubject}
            darkMode={darkMode}
          />
        </div>
      </div>
      <Tabs
        onTabChange={onTabChange}
        selectedTab={selectedTab}
        Class={Class}
        Section={Section}
        Subject={Subject}
        darkMode={darkMode}
      />
      <Outlet context={{ darkMode }} />
    </motion.div>
  );
}

export default NoteBook;