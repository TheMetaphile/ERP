import React from 'react';
import logo from '../../../../src/assets/school logo.png'
import { useParams } from "react-router-dom";

const Transfer = () => {
    const { tc } = useParams();

    return (
        <div className=" mobile:max-tablet:max-w-xl mx-auto p-8">
            <div className="text-center mb-8">
                <img src={logo} alt="School Logo" className="mx-auto mb-4" />
                <h1 className="text-2xl font-bold">METAPHILE PUBLIC SCHOOL</h1>
                <p className="text-sm">Affiliated To CBSE, Delhi NUR to XII CO-EDUCATIONAL (ENGLISH MEDIUM)</p>
                <p className="text-sm">Address, ph no, email</p>
            </div>
            <div className="text-center mb-8">
                <h2 className="border-b-2 border-black inline-block text-lg font-semibold">Transfer Certificate</h2>
            </div>
            <div className="mb-8">
                <div className="flex justify-between flex-wrap leading-loose mobile:max-tablet:text-sm">
                    <p>School No :</p>
                    <p>Admission No :</p>
                    <p>Renewed upto :</p>
                    <p>T.C. No : <span>{tc}</span></p>
                    <p>Registration No :</p>
                    <p>Affiliation No :</p>
                </div>
                <div className="flex gap-8 mb-4">

                </div>
                <div className=' mobile:max-tablet:text-xs'>
                    <p>1. Name of the Student:</p>
                    <p>2. Mother Name:</p>
                    <p>3. Father Name:</p>
                    <p>4. Nationality:</p>
                    <p>5. Category of Student:</p>
                    <p>6. Date of Birth:</p>
                    <p>7. Whether the Student is Failed:</p>
                    <p>8. Subjects Offered:</p>
                    <p>9. Class in which the student last studied:</p>
                    <p>10. Annual Exam Result:</p>
                    <p>11. Qualified for promotion to the Next Higher Class:</p>
                    <p>12. Student has paid their all Due:</p>
                    <p>13. Student is NCC Candidate/Boy Scout/Girl Guide:</p>
                    <p>14. Date in which the student take admission in School:</p>
                    <p>15. Reason of Leaving the school:</p>
                    <p>16. Total No of Attendance:</p>
                    <p>17. No of School Days Student Attended the School:</p>
                    <p>18. Any Other Remark:</p>
                    <p>19. Date of issue of Certificate:</p>
                </div>
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

export default Transfer;
