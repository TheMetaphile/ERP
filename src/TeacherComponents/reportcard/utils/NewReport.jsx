import React, { useState } from 'react';

function NewReport({ onClose }) {
    const [formData, setFormData] = useState({
        admissionId: '',
        studentName: '',
        className: '',
        academicYear: '',
        rollNumber: '',
        dob: '',
        motherName: '',
        fatherName: '',
        contactNumber: '',
        termAttendance: '',
        totalAttendance: '',
        presentAttendance: '',
        termPerformance: '',
        gpa: '',
        subjects: '',
        number: '',
        grade: ''
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
                <h2 className="text-lg font-semibold mb-3 text-blue-500">Fill the Student Records</h2>
                <div className="grid grid-cols-4 gap-4  ">
        {[
          { label: 'Admission ID', name: 'admissionId' },
          { label: 'Student Name', name: 'studentName' },
          { label: 'Class', name: 'className' },
          { label: 'Academic Year', name: 'academicYear' },
          { label: 'Roll Number', name: 'rollNumber' },
          { label: 'Date of Birth', name: 'dob', type: 'date' },
          { label: 'Mother\'s Name', name: 'motherName' },
          { label: 'Father\'s Name', name: 'fatherName' },
          { label: 'Contact Number', name: 'contactNumber' },
        ].map((field, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type={field.type || 'text'}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-3 mt-3 text-blue-500">Attendance</h2>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Term', name: 'termAttendance', type: 'select', options: ['Term 1', 'Term 2', 'Term 3'] },
          { label: 'Total Attendance', name: 'totalAttendance' },
          { label: 'Present Attendance', name: 'presentAttendance' },
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

      <h2 className="text-lg font-semibold mb-3 mt-3 text-blue-500">Academic Performance</h2>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Term', name: 'termPerformance', type: 'select', options: ['Term 1', 'Term 2', 'Term 3'] },
          { label: 'GPA', name: 'gpa' },
          { label: 'Subjects', name: 'subjects' },
          { label: 'Number', name: 'number' },
          { label: 'Grade', name: 'grade' },
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

export default NewReport;
