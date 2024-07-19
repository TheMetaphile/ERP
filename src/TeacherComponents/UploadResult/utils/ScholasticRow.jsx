import React from 'react';

export default function ScholasticRow({ area, index }) {
    const totalobtained = parseInt(area.obtainedNoteBookMarks) + parseInt(area.obtainedSubjectEnrichmentMarks) + parseInt(area.marksObtained);
    const total = parseInt(area.totalMarks) + parseInt(area.totalNoteBookMarks) + parseInt(area.totalSubjectEnrichmentMarks);
    const percentage = total !== 0 ? (totalobtained / total) * 100 : 0;

    const scholastic = [
        { lower: 91, grade: "A1", upper: 100 },
        { lower: 81, grade: "A2", upper: 90 },
        { lower: 71, grade: "B1", upper: 80 },
        { lower: 61, grade: "B2", upper: 70 },
        { lower: 51, grade: "C1", upper: 60 },
        { lower: 41, grade: "C2", upper: 50 },
        { lower: 33, grade: "D", upper: 40 },
        { lower: 0, grade: "E", upper: 32 }
    ];

    const grade = scholastic.find(range => percentage >= range.lower && percentage <= range.upper)?.grade || 'N/A';

    return (
        <tr className='text-center' key={index}>
            <td className="px-4 py-2 border-x border-gray-200">{area.subject}</td>
            <td className="px-4 py-2 border-x border-gray-200">{area.obtainedNoteBookMarks}</td>
            <td className="px-4 py-2 border-x border-gray-200">{area.obtainedSubjectEnrichmentMarks}</td>
            <td className="px-4 py-2 border-x border-gray-200">{area.marksObtained}</td>
            <td className="px-4 py-2 border-x border-gray-200">{totalobtained}</td>
            <td className="px-4 py-2 border-x border-gray-200">{percentage.toFixed(2)}</td>
            <td className="px-4 py-2 border-x border-gray-200">{grade}</td>
        </tr>
    );
}
