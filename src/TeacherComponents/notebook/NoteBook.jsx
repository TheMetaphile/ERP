import React, { useContext, useEffect, useState } from 'react'
import Selection from './utils/Selection';
import { Outlet, useSearchParams } from "react-router-dom";
import Tabs from './utils/Tabs';
import AuthContext from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function NoteBook() {
  const { authState } = useContext(AuthContext);
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
    // Update param1 and add a new param3
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
      className="overflow-y-auto w-full items-start px-2 no-scrollbar"
    >
      <div className='w-full flex items-center justify-between px-4 mobile:max-tablet:px-1 mb-2'>
        <div className=' mobile:max-tablet:flex'>
          <motion.h1
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="text-3xl font-medium text-black mobile:max-tablet:text-lg whitespace-nowrap"
          >
            Note Book Record
          </motion.h1>
        </div>
        <div className="flex justify-end tablet:hidden w-full mobile:max-tablet:text-end right-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 border rounded flex items-center justify-center"
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
              className='flex fixed left-0 right-0 bg-white pt-1 p-4 gap-2 justify-between mobile:max-tablet:flex-col'
            >
              <Selection setClass={setClass} setSection={setSection} setSubject={setSubject} />
            </motion.div>
          )}
        </div>
        <div className='mobile:max-tablet:hidden'>
          <Selection setClass={setClass} setSection={setSection} setSubject={setSubject} />
        </div>
      </div>
      <Tabs onTabChange={onTabChange} selectedTab={selectedTab} Class={Class} Section={Section} Subject={Subject} />
      <Outlet />
    </motion.div>
  );
}

export default NoteBook











