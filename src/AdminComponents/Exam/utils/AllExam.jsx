import React, { useState } from "react";
import NewExam from "./NewExam";

export default function AllExam() {
    const [exams, setExams] = useState([
        { class: "1st", subject: "Hindi", Time: "10.00", date: "2022-03-12",duration:"3hrs" },
        { class: "1st", subject: "Hindi", Time: "10.00", date: "2022-03-12",duration:"3hrs" },
        { class: "1st", subject: "Hindi", Time: "10.00", date: "2022-03-12",duration:"3hrs" },
        { class: "1st", subject: "Hindi", Time: "10.00", date: "2022-03-12",duration:"3hrs" },
        { class: "1st", subject: "Hindi", Time: "10.00", date: "2022-03-12",duration:"3hrs" },
        { class: "1st", subject: "Hindi", Time: "10.00", date: "2022-03-12",duration:"3hrs" },
        { class: "1st", subject: "Hindi", Time: "10.00", date: "2022-03-12",duration:"3hrs" },
        { class: "1st", subject: "Hindi", Time: "10.00", date: "2022-03-12",duration:"3hrs" },
        { class: "1st", subject: "Hindi", Time: "10.00", date: "2022-03-12",duration:"3hrs" },
        { class: "1st", subject: "Hindi", Time: "10.00", date: "2022-03-12",duration:"3hrs" },
        { class: "1st", subject: "Hindi", Time: "10.00", date: "2022-03-12",duration:"3hrs" },
        { class: "1st", subject: "Hindi", Time: "10.00", date: "2022-03-12",duration:"3hrs" },
      ]);
    
    const[popUp,setPopUp]=useState(false);
    const togglePopUp = () => {
        setPopUp(!popUp);
      };
      const addExam = (newExam) => {
        setExams([...exams, newExam]);
        togglePopUp();
      };
      const deleteExam = (index) => {
        const updatedExams = [...exams];
        updatedExams.splice(index, 1);
        setExams(updatedExams);
    };

    return (
        <div className="flex flex-col mb-4">
            <div>
                <h1 className="text-3xl mx-4">All Exam Schedule</h1>
            </div>
            <div className="flex justify-between">
            <div>
                <select
                    className="mx-4 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                    id="Class"
                    name="Class"
                    required
                >
                    <option value="">Select a Class</option>
                    <option value="Math">1st</option>
                    <option value="Science">2nd</option>
                    <option value="History">3rd</option>

                </select>
            </div>
            <div><button className="rounded-lg border bg-blue-400 px-4 text-xl hover:bg-blue-200" onClick={togglePopUp}>Schedule New Exam</button></div>
            </div>
            <div className="rounded-xl shadow-lg mb-4">
          <div className="overflow-x-auto w-full mt-4 rounded-lg">
            <table className="min-w-full divide-y divide-gray-600">
                <thead className="">
                    <tr>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Class</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Subject</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Time</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Date</th>
                        <th className="px-6 py-3 text-center text-xl font-normal border-r bg-secondary">Duration</th>
                        <th className="px-6 py-3 text-center text-xl font-normal bg-secondary">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {exams.map((exam, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.class}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.subject}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.Time}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.date}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">{exam.duration}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-lg border-r text-center">
                                        <button onClick={() => deleteExam(index)} className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {
            popUp&&(
                <NewExam onClose={togglePopUp} addExam={addExam} />
            )
        }
        </div>
        </div>
    )
}