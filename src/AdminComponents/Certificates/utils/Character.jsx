import React from 'react';
import logo from '../../../../src/assets/school logo.png'
import { useParams } from "react-router-dom";


const Character = () => {
    const { id } = useParams();
    return (
        <div className="tablet:max-laptop:max-w-xl p-8 w-full">
            <div className="text-center mb-8">
                <img src={logo} alt="School Logo" className="mx-auto mb-4" />
                <h1 className="text-2xl font-bold">METAPHILE PUBLIC SCHOOL</h1>
                <p className="text-sm">Affiliated To CBSE, Delhi NUR to XII CO-EDUCATIONAL (ENGLISH MEDIUM)</p>
                <p className="text-sm">Address, ph no, email</p>
            </div>
            <div className="text-center mb-8">
                <h2 className="border-b-2 border-black inline-block text-lg font-semibold">Character Certificate</h2>
            </div>
            <div className="mb-8">
                <p className="text-center font-bold mb-4">To Whom so ever it may concern</p>
                <p className="text-justify">
                    This is to certify that <span className="font-semibold">{id}</span> s/o, d/o Sh.
                    <span className="font-semibold"> .............</span> was the bonafide student of class
                    <span className="font-semibold"> ...........</span> of this school in session
                    <span className="font-semibold"> ............</span>. Her/His behaviour in the school during her/his
                    tenure of studies in that session i.e <span className="font-semibold"> .............</span> was satisfactory.
                </p>
                <p className="mt-4">Thanks</p>
            </div>
            <div className="flex justify-between text-center mt-16 mobile:max-tablet:text-xs">
                <div>
                    <p>Mr./Mrs.....</p>
                    <p>Prepared By</p>
                </div>
                <div>
                    <p>Mr./Mrs.....</p>
                    <p>Checked By</p>
                </div>
                <div>
                    <p>Mr./Mrs.....</p>
                    <p>Sign of Principal</p>
                </div>
            </div>
        </div>
    );
};

export default Character;
