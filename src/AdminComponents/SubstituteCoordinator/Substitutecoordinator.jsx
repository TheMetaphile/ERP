import React, { useState } from 'react';
import SubstituteTable from './utils/SubstituteTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SubstituteCoordinator() {
    const [data, setData] = useState([
        {
            id: 1,
            employeeId: '1',
            name: 'Mukul Singh',
            date: '2024-07-30',
            class: '9th',
            section: 'B',
            substituteName: '',
            substitutePhoto: ''
        },
        {
            id: 2,
            employeeId: '4',
            name: 'Harshit Rana',
            date: '2024-07-30',
            class: '9th',
            section: 'A',
            substituteName: 'Ankit Sharma',
            substitutePhoto: 'https://via.placeholder.com/40'
        },
    ]);

    const handleSave = (id, substituteName) => {
        const newData = data.map(item =>
            item.id === id ? { ...item, substituteName } : item
        );
        setData(newData);
        toast.success(`Substitute assigned for employee ID ${id}`);
    };

    const handleDelete = (id) => {
        const newData = data.map(item =>
            item.id === id ? { ...item, substituteName: '' } : item
        );
        setData(newData);
        toast.success(`Substitute removed for employee ID ${id}`);
    };

    return (
        <div className="flex flex-col px-3 mobile:max-tablet:px-0 h-screen overflow-y-auto items-start mt-2 mb-3 no-scrollbar mobile:max-tablet:mt-6">
            <ToastContainer />
            <div className="flex justify-between">
                <h1 className="text-xl font-medium mb-2 mobile:max-tablet:text-lg">Coordinators on leave (Today)</h1>
            </div>
            <SubstituteTable />


        </div>
    );
}

export default SubstituteCoordinator;
