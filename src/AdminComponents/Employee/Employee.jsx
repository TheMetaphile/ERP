import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        aadhaarNumber: '',
        profileLink: '',
        permanentAddress: '',
        permanentState: '',
        permanentDistrict: '',
        permanentPincode: '',
        residentialAddress: '',
        residentialState: '',
        residentialDistrict: '',
        residentialPincode: '',
        department: '',
        role: '',
        instruments: [],
    });

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    const handleChange = (input) => (e) => {
        setFormData({ ...formData, [input]: e.target.value });
    };

    const handleAddInstrument = (title, amount) => {
        const newInstrument = { title, amount };
        setFormData({ ...formData, instruments: [...formData.instruments, newInstrument] });
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return <Details nextStep={nextStep} handleChange={handleChange} formData={formData} />;
            case 1:
                return <Address nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />;
            case 2:
                return <Access nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />;
            case 3:
                return <Ctc nextStep={nextStep} prevStep={prevStep} handleAddInstrument={handleAddInstrument} formData={formData} />;
            case 4:
                return <Preview prevStep={prevStep} formData={formData} />;
            default:
                return null;
        }
    };

    const pageVariants = {
        initial: { opacity: 0, x: "-100%" },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: "100%" }
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5
    };

    return (
        <motion.div
            className="flex flex-col px-6 items-start mt-8 mb-6 w-full  mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ToastContainer />

            <motion.h1
                className="text-3xl font-bold text-purple-600 mb-8 self-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                Employee Registration
            </motion.h1>

            <div className="flex flex-col items-center justify-center w-full bg-purple-50 rounded-xl shadow-lg p-8">
                <ProgressBar step={step} />
                <div className="relative w-full mt-8">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={step}
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}

export default Employee;