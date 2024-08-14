import React, { useState } from 'react';
import FeeStructure from './utils/FeeStructure';
import { ToastContainer, toast } from 'react-toastify';
export default function PreviousFee() {

    function getSession() {
        const currentYear = new Date().getFullYear();
        const prevYear = currentYear - 1;
        const session = `${prevYear}-${currentYear.toString().slice(-2)}`;
        return session;
    }

    const session = getSession();
    console.log(session);

    return (

        <div className="flex flex-col tablet:w-full mobile:max-tablet:w-screen overflow-y-auto no-scrollbar items-start mobile:max-tablet:mt-4 px-2 mt-3">
            <ToastContainer />
            <div className='flex items-center justify-between w-full'>
                <h1 className="mb-2 text-2xl font-medium mobile:max-tablet:text-lg">Pending Fees Structure</h1>
            </div>
            <FeeStructure  />
        </div>

    );
}
