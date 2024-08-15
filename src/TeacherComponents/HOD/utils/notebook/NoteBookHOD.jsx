import React, { useContext, useEffect, useState } from 'react'
import Selection from './utils/Selection';
import { Outlet, useSearchParams } from "react-router-dom";
import Tabs from './utils/Tabs';
import AuthContext from '../../../../Context/AuthContext';
import AllNoteBookRecordHOD from './utils/AllNotebookRecordHOD';

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
        <div className="overflow-y-auto w-full items-start  px-2 no-scrollbar  ">
            <div className='w-full flex items-center justify-between px-4 mobile:max-tablet:py-1 mobile:max-tablet:px-0 '>
                <h1 className="text-2xl font-medium mb-2 mobile:max-tablet:text-lg whitespace-nowrap">Note Book Record</h1>
                <div className="block tablet:hidden w-full mobile:max-tablet:text-end">
                    <button
                        className="p-2 border rounded"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                    >
                        Filter
                    </button>
                    {isDropdownVisible && (
                        <div className='flex fixed left-0 right-0 bg-white pt-1 p-4 gap-2 justify-between mobile:max-tablet:flex-col '>
                            <Selection setClass={setClass} setSection={setSection} setSubject={setSubject} />
                        </div>
                    )}
                </div>

                <div className='mobile:max-tablet:hidden'>
                    <Selection setClass={setClass} setSection={setSection} setSubject={setSubject} />
                </div>
            </div>
            <AllNoteBookRecordHOD Class={Class} Section={Section} Subject={Subject} />
            {/* <Tabs onTabChange={onTabChange} selectedTab={selectedTab} Class={Class} Section={Section} Subject={Subject} /> */}
            <Outlet />
        </div>

    )
}

export default NoteBookHOD











