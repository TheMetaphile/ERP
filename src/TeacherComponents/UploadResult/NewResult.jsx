import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_Result } from '../../Config';

const NewResult = ({ onClose, email , name}) => {
    const { authState } = useContext(AuthContext);
    const [selectedTerm, setSelectedTerm] = useState('');
    const [result, setResult] = useState([
        {
            subject: '',
            marksObtained: '',
            totalMarks: '',
            totalPracticalMarks: '',
            obtainedPracticalMarks: '',
        },
    ]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newResults = [...result];
        newResults[index][name] = value;
        setResult(newResults);
    };

    const addNewResult = () => {
        setResult([
            ...result,
            {
                subject: '',
                marksObtained: '',
                totalMarks: '',
                totalPracticalMarks: '',
                obtainedPracticalMarks: '',
            },
        ]);
    };

    const handleTermChange = (e) => {
        const { value } = e.target;
        setSelectedTerm(value);
        const newResults = result.map((exam) => ({
            ...exam,
            term: value,
        }));
        setResult(newResults);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const schedules = result.map(exam => ({
            subject: exam.subject,
            marksObtained: exam.marksObtained,
            totalMarks: exam.totalMarks,
            totalPracticalMarks: exam.totalPracticalMarks,
            obtainedPracticalMarks: exam.obtainedPracticalMarks,
        }));

        const resultData = {
            email: email,
            class: authState.ClassDetails.class,
            term: selectedTerm,
            result: schedules,
        };
        console.log(resultData,authState)

        try {
            const response = await axios.post(`${BASE_URL_Result}/result/create`, 
                resultData
            ,
                {
                    headers: {
                        Authorization: `bearer ${authState.accessToken}`
                    }
                }
            );
            if (response.status === 200) {
                toast.success('Result saved successfully!');
                onClose();
            } 
        } catch (error) {
            toast.error(error.response.data.error);
            console.error('Error saving result:', error.response.data.error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto no-scrollbar">
            
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-3xl">

                <h2 className="text-xl font-medium mb-4">Add Result for {name}</h2>
                <form onSubmit={handleSubmit}>
                    <div className='flex gap-3'>
                        <div className="mb-4 w-full">
                            <label htmlFor="term" className="block text-gray-700 font-medium mb-2">
                                Select Term
                            </label>
                            <select
                                id="term"
                                name="term"
                                value={selectedTerm}
                                onChange={handleTermChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="" disabled>Select Term</option>
                                <option value="1">Term 1</option>
                                <option value="2">Term 2</option>
                                <option value="final">Final</option>
                            </select>
                        </div>
                    </div>
                    <table className="bg-white w-full">
                        <thead>
                            <tr>
                                <th className="py-2">Subject</th>
                                <th className="py-2">Marks Obtained</th>
                                <th className="py-2">Total Marks</th>
                                <th className="py-2">Total Practical Marks</th>
                                <th className="py-2">Obtained Practical Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((exam, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">
                                        <select
                                            className="w-full"
                                            name="subject"
                                            value={exam.subject}
                                            onChange={(e) => handleChange(index, e)}
                                            required
                                        >
                                            <option value="" disabled>Select Subject</option>
                                            <option value="Hindi">Hindi</option>
                                            <option value="English">English</option>
                                            <option value="Maths">Maths</option>
                                            <option value="Science">Science</option>
                                            <option value="Social Science">Social Science</option>
                                            <option value="Drawing">Drawing</option>
                                            <option value="Computer">Computer</option>
                                            <option value="Sanskrit">Sanskrit</option>
                                            <option value="Physics">Physics</option>
                                            <option value="Chemistry">Chemistry</option>
                                            <option value="Economics">Economics</option>
                                            <option value="Business">Business</option>
                                            <option value="Accounts">Accounts</option>
                                        </select>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <input
                                            className="w-full"
                                            type="number"
                                            name="marksObtained"
                                            value={exam.marksObtained}
                                            onChange={(e) => handleChange(index, e)}
                                            required
                                        />
                                    </td>
                                    <td className="border px-4 py-2">
                                        <input
                                            className="w-full"
                                            type="number"
                                            name="totalMarks"
                                            value={exam.totalMarks}
                                            onChange={(e) => handleChange(index, e)}
                                            required
                                        />
                                    </td>
                                    <td className="border px-4 py-2">
                                        <input
                                            className="w-full"
                                            type="number"
                                            name="totalPracticalMarks"
                                            value={exam.totalPracticalMarks}
                                            onChange={(e) => handleChange(index, e)}
                                            required
                                        />
                                    </td>
                                    <td className="border px-4 py-2">
                                        <input
                                            className="w-full"
                                            type="number"
                                            name="obtainedPracticalMarks"
                                            value={exam.obtainedPracticalMarks}
                                            onChange={(e) => handleChange(index, e)}
                                            required
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-between mt-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={addNewResult}
                        >
                            Add New
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Save
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewResult;
