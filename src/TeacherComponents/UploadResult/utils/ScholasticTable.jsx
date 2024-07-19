import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL_Result } from '../../../Config'; // Make sure to add the notebook API URL to your Config file
import AuthContext from "../../../Context/AuthContext";

export default function ScholasticTable({ students, term, Class, subject }) {
    const { authState } = useContext(AuthContext);
    const [totalTheoryMarks, setTotalMarks] = useState({
        noteBook: "",
        practical: "",
        subjectEnrichment: "",
        theory: ""
    });

    const [marks, setMarks] = useState(students.reduce((acc, student) => {
        acc[student.email] = {
            noteBook: '',
            subjectEnrichment: '',
            practical: '',
            theory: '',
            lastNoteBookChecked: '' // New field for last notebook checked
        };
        return acc;
    }, {}));

    useEffect(() => {
        fetchLastNoteBookChecked();
    }, [subject]);

    const fetchLastNoteBookChecked = async () => {
        try {
            const responses = await Promise.all(
                students.map(student =>
                    axios.get(`${BASE_URL_Result}/notebook/fetch/student/last?subject=${subject}&email=${student.email}`, {
                        headers: {
                            Authorization: `bearer ${authState.accessToken}`
                        }
                    })
                )
            );

            const lastNoteBookCheckedData = responses.reduce((acc, response, index) => {
                acc[students[index].email] = response.data;
                return acc;
            }, {});

            setMarks(prevMarks => ({
                ...prevMarks,
                ...Object.keys(lastNoteBookCheckedData).reduce((acc, email) => {
                    acc[email] = {
                        ...prevMarks[email],
                        lastNoteBookChecked: lastNoteBookCheckedData[email].last ? lastNoteBookCheckedData[email].last[0] : ''
                    };
                    return acc;
                }, {})
            }));

        } catch (error) {
            toast.error('Error fetching last notebook checked data');
            console.error('Error fetching last notebook checked data:', error);
        }
    };
    const handleInputChange = (email, type, value) => {
        setMarks(prevMarks => ({
            ...prevMarks,
            [email]: {
                ...prevMarks[email],
                [type]: value
            }
        }));
    };
    const handletotalMarksChange = (type, value) => {
        setTotalMarks(prevMarks => ({
            ...prevMarks,
            [type]: value
        }));
    };

    const handleSave = async (email) => {
        if (!term) {
            toast.error("Term is not selected");
            return;
        }
        if (!Class) {
            toast.error("Class is not selected");
            return;
        }
        if (!subject) {
            toast.error("Subject is not selected");
            return;
        }
        const studentMarks = marks[email];
        console.log(studentMarks);
        const schedules = {
            subject,
            marksObtained: Number(studentMarks.theory),
            totalMarks: Number(totalTheoryMarks.theory),
            totalPracticalMarks: Number(totalTheoryMarks.practical),
            obtainedPracticalMarks: Number(studentMarks.practical),
            totalNoteBookMarks: Number(totalTheoryMarks.noteBook),
            obtainedNoteBookMarks: Number(studentMarks.noteBook),
            totalSubjectEnrichmentMarks: Number(totalTheoryMarks.subjectEnrichment),
            obtainedSubjectEnrichmentMarks: Number(studentMarks.subjectEnrichment),
        }
        console.log(schedules);
        const resultData = {
            email,
            class: Class,
            result: schedules,
            term: term,
        };
        console.log(resultData);

        try {
            const response = await axios.put(`${BASE_URL_Result}/result/update/addSubject`,
                resultData,
                {
                    headers: {
                        Authorization: `bearer ${authState.accessToken}`
                    }
                }
            );
            if (response.status === 200) {
                toast.success('Result saved successfully!');
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Error saving result');
            console.error('Error saving result:', error.response?.data?.error);
        }
    };
    return (
        <div className="w-full overflow-x-auto rounded-lg">
            <div className="flex gap-3 ml-2">
                <div className="flex flex-col mb-4">
                    <label className="mb-2 text-gray-700">
                        Total Theory Marks
                    </label>
                    <input
                        type="number"
                        value={totalTheoryMarks.theory}
                        onChange={(e) => handletotalMarksChange("theory", e.target.value)}
                        className="border rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        placeholder="Enter total theory marks"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2 text-gray-700">
                        Total Subject Enrichment Marks
                    </label>
                    <input
                        type="number"
                        value={totalTheoryMarks.subjectEnrichment}
                        onChange={(e) => handletotalMarksChange("subjectEnrichment", e.target.value)}
                        className="border rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        placeholder="Enter total subject enrichment marks"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2 text-gray-700">
                        Total Note Book Marks
                    </label>
                    <input
                        type="number"
                        value={totalTheoryMarks.noteBook}
                        onChange={(e) => handletotalMarksChange("noteBook", e.target.value)}

                        className="border rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        placeholder="Enter total note book marks"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2 text-gray-700">
                        Total Practical Marks
                    </label>
                    <input
                        type="number"
                        value={totalTheoryMarks.practical}
                        onChange={(e) => handletotalMarksChange("practical", e.target.value)}

                        className="border rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        placeholder="Enter total practical marks"
                    />
                </div>
            </div>

            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-secondary text-gray-600 text-lg ">
                        <th className="py-2 px-2 text-center rounded-t-r">Roll No.</th>
                        <th className="py-2 px-2 text-center">Name</th>
                        <th className="py-2 px-2 text-center">Last Note Book Checked</th>
                        <th className="py-2 px-2 text-center">Note Book</th>
                        <th className="py-2 px-2 text-center">Subject Enrichment</th>
                        <th className="py-2 px-2 text-center">Practical Marks</th>
                        <th className="py-2 px-2 text-center">Theory Marks</th>
                        <th className="py-2 px-2 text-center rounded-t-l mr-2">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-md font-normal">
                    {students.map((student, index) => (
                        <tr key={index} className="border-b border-gray-200 last:border-none">
                            <td className="py-2 px-2 text-center rounded-t-r">{student.rollNumber}</td>
                            <td className="py-2 px-2 text-center">{student.name}</td>
                            <td className="py-2 px-2 text-center">
                                {marks[student.email]?.lastNoteBookChecked?.topic || 'No data'}
                            </td>

                            <td className="py-2 px-2 text-center">
                                <input
                                    type="number"
                                    value={marks[student.email]?.noteBook || ''}
                                    onChange={(e) => handleInputChange(student.email, 'noteBook', e.target.value)}
                                    className="border rounded-md py-2 px-4 w-28 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                    placeholder="Note Book Marks"
                                />
                            </td>
                            <td className="py-2 px-2 text-center">
                                <input
                                    type="number"
                                    value={marks[student.email]?.subjectEnrichment || ''}
                                    onChange={(e) => handleInputChange(student.email, 'subjectEnrichment', e.target.value)}
                                    className="border rounded-md py-2 px-4 w-28 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                    placeholder="Subject Enrichment Marks"
                                />
                            </td>
                            <td className="py-2 px-2 text-center">
                                <input
                                    type="number"
                                    value={marks[student.email]?.practical || ''}
                                    onChange={(e) => handleInputChange(student.email, 'practical', e.target.value)}
                                    className="border rounded-md py-2 px-4 w-28 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                    placeholder="Practical Marks"
                                />
                            </td>
                            <td className="py-2 px-2 text-center">
                                <input
                                    type="number"
                                    value={marks[student.email]?.theory || ''}
                                    onChange={(e) => handleInputChange(student.email, 'theory', e.target.value)}
                                    className="border rounded-md py-2 px-4 w-28 focus:outline-none focus:ring-1 focus:ring-gray-500"
                                    placeholder="Theory Marks"
                                />
                            </td>
                            <td className="py-4 px-2 mr-2 flex justify-center items-center">
                                <button
                                    type="button"
                                    onClick={() => handleSave(student.email)}
                                    className="text-green-600 rounded-md border border-green-500 w-fit px-4 hover:bg-green-500 hover:text-white hover:cursor-pointer hover:shadow-md hover:border-black"
                                >
                                    Save
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
