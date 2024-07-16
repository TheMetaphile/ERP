import React, { useState } from 'react';
import Details from './utils/Details';
import Address from './utils/Address';
import Access from './utils/Access';
import Ctc from './utils/Ctc';
import Preview from './utils/Preview';
import ProgressBar from './utils/ProgressBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Employee() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        qualification: '',
        institute: '',
        phoneNumber: '',
        emergencyContactNumber: '',
        email: '',
        dob: '',
        bloodGroup: '',
        aadhaarNumber : '',
        permanentAddress : '',
        permanentState : '',
        permanentDistrict : '',
        permanentPincode : '',
        residentialAddress : '',
        residentialState : '',
        residentialDistrict : '',
        residentialPincode : '',
        department: '',
        role: '',
        // inHandSalary: '',
        // instruments: [],

    });

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    const handleChange = (input) => (e) => {
        setFormData({ ...formData, [input]: e.target.value });
    };

    const handleAddInstrument = (title, amount) => {
        const newInstrument = { title, amount };
        setFormData({ ...formData, instruments: [...formData.instruments, newInstrument] });
    };

    return (
        <div className="flex flex-col px-3 mobile:max-tablet:px-0 items-start mt-2 mb-3 mobile:max-tablet:mt-6">
            <ToastContainer />

            <div className="flex flex-col items-center justify-center w-full">
                <ProgressBar step={step} />
                <div className="relative w-full">
                    {step === 0 && (
                        <div className={`transform transition-transform duration-300 ease-in-out ${step === 0 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                            <Details nextStep={nextStep} handleChange={handleChange} />
                        </div>
                    )}
                    {step === 1 && (
                        <div className={`transform transition-transform duration-300 ease-in-out ${step === 1 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                            <Address nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} />
                        </div>
                    )}
                    {step === 2 && (
                        <div className={`transform transition-transform duration-300 ease-in-out ${step === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                            <Access nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} />
                        </div>
                    )}
                    {step === 3 && (
                        <div className={`transform transition-transform duration-300 ease-in-out ${step === 3 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                            <Ctc nextStep={nextStep} prevStep={prevStep} handleAddInstrument={handleAddInstrument} />
                        </div>
                    )}
                    {step === 4 && (
                        <div className={`transform transition-transform duration-300 ease-in-out ${step === 4 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                            <Preview prevStep={prevStep} formData={formData} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Employee