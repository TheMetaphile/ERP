import React, { useContext, useEffect, useState } from 'react'
import Selection from './utils/Selection';
import { Outlet, useSearchParams } from "react-router-dom";
import AuthContext from '../../../../Context/AuthContext';
import AllNoteBookRecordHOD from './utils/AllNotebookRecordHOD';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';

function NoteBookHOD() {
    const { authState } = useContext(AuthContext);
    const [Class, setClass] = useState('');
    const [Section, setSection] = useState('');
    const [selectedTab, setSelectedTab] = useState('All');
    const [searchParams, setSearchParams] = useSearchParams();
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const [Subject, setSubject] = useState('');

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
        <div className="overflow-y-auto w-full items-start   no-scrollbar">
            <div className='w-full flex items-center justify-between px-4 mobile:max-tablet:py-1 mobile:max-tablet:px-0'>
                <motion.h1
                    className="text-3xl font-medium text-black mobile:max-tablet:text-lg whitespace-nowrap mb-2"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Note Book Record
                </motion.h1>
                <div className="flex justify-end tablet:hidden w-full mobile:max-tablet:text-end whitespace-nowrap">
                    <motion.button
                        className="p-2 border items-center rounded bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-300 flex"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className=''><FaFilter className="mr-2" /></span>
                        Filter
                    </motion.button>
                    {isDropdownVisible && (
                        <motion.div
                            className='flex fixed mt-11 left-0 right-0 bg-white pt-1 p-4 gap-2 justify-between mobile:max-tablet:flex-col'
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Selection setClass={setClass} setSection={setSection} setSubject={setSubject} />
                        </motion.div>
                    )}
                </div>

                <div className='mobile:max-tablet:hidden'>
                    <Selection setClass={setClass} setSection={setSection} setSubject={setSubject} />
                </div>
            </div>
            <AllNoteBookRecordHOD Class={Class} Section={Section} Subject={Subject} />

            <Outlet />
        </div>
    )
}

export default React.memo(NoteBookHOD);