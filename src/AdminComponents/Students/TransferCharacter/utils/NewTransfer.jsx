import React, { useState } from 'react';

function NewTransfer({ onClose }) {
  const [formData, setFormData] = useState({
    studentName: '',
    admissionId: '',
    className: '',
    tcnumber: '',
    reason :'',
    rollNumber: '',
    dob: '',
    motherName: '',
    fatherName: '',
    totalAttendance: '',
    presentAttendance: '',
    result : '',
    due: '',
    category: '',
    gender: '',
    ncc: '',
    stream: '',
    issue: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    console.log('Saved Data:', formData);
  };




  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 shadow-lg ">
        
        <h2 className="text-lg font-semibold mb-3 mt-3 text-blue-500">Details</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
           { label: 'Student Name', name: 'studentName' },
           { label: 'Admission ID', name: 'admissionId' },
           { label: 'Class', name: 'className' },
           { label: 'TC No.', name: 'tcnumber' },
           { label: 'TC Reason.', name: 'reason' },
           { label: 'Roll Number', name: 'rollNumber' },
           { label: 'Date of Birth', name: 'dob', type: 'date' },
           { label: 'Mother\'s Name', name: 'motherName' },
           { label: 'Father\'s Name', name: 'fatherName' },
           { label: 'Total Attendance', name: 'totalAttendance' },
           { label: 'Present Attendance', name: 'presentAttendance' },
           { label: 'Result', name: 'result' },
           { label: 'Fee Due', name: 'due' },
           { label: 'Category', name: 'category', type: 'select', options: ['Gen','OBC', 'SC', 'ST','EWS'] },
           { label: 'Gender', name: 'gender', type: 'select', options: ['Male','Female', 'Others'] },
           { label: 'NCC Candidate', name: 'ncc', type: 'select', options: ['Yes','No'] },
           { label: 'Stream', name: 'stream', type: 'select', options: ['General','PCM', 'PCB','Commerce','Arts','PCMB'] },
           { label: 'Date of Issue', name: 'issue' },


          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:ring-opacity-50"
                >
                  <option>Select {field.label}</option>
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:ring-opacity-50"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-500"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewTransfer;