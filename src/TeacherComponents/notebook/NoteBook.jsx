import React, { useContext, useEffect, useState } from 'react'
import Selection from './utils/Selection';
import { Outlet, useSearchParams } from "react-router-dom";
import Tabs from './utils/Tabs';
import AuthContext from '../../Context/AuthContext';

function NoteBook() {
    const { authState } = useContext(AuthContext);
    const [Class, setClass] = useState(authState.subject[0].class);
    const [Section, setSection] = useState(authState.subject[0].section);
    const [selectedTab, setSelectedTab] = useState('All');
    const [searchParams, setSearchParams] = useSearchParams();

    const [Subject, setSubject] = useState(authState.subject[0].subject);

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
        <div className="overflow-y-auto w-full items-start  px-2 no-scrollbar">
            <div className='w-full flex items-center justify-between px-4 '>
                <h1 className="text-2xl font-medium mb-2">Note Book Record</h1>
                <Selection setClass={setClass} setSection={setSection} setSubject={setSubject} />
            </div>
            <Tabs onTabChange={onTabChange} selectedTab={selectedTab} Class={Class} Section={Section} Subject={Subject} />
            <Outlet />


        </div>

    )
}

export default NoteBook











