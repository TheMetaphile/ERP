import React from 'react';
import { 
  MdEmail, 
  MdPerson, 
  MdNumbers, 
  MdSchool, 
  MdGroup,
  MdFamilyRestroom 
} from 'react-icons/md';

const StudentCard = ({ 
  email, 
  name, 
  profileLink, 
  rollNumber, 
  currentClass, 
  section, 
  fatherName,
}) => {
  return (
    <div className="w-full mx-auto border border-gray-300 mt-2 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-3">
        <div className="flex flex-col items-center mb-6">
          {/* Profile Image */}
          <div className="w-24 h-24 mb-3 relative">
            {profileLink ? (
              <img 
                src={profileLink} 
                alt={`${name}'s profile`}
                className="w-full h-full rounded-full object-cover border-4 border-indigo-500"
                onError={(e) => {
                  e.target.onerror = null; // Prevents infinite loop if fallback image also fails
                  e.target.src = 'https://via.placeholder.com/150'; // You can replace this with your default image
                }}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center border-4 border-indigo-500">
                <MdPerson className="text-4xl text-indigo-500" />
              </div>
            )}
          </div>
          
          {/* Title */}
          <div className="uppercase tracking-wide text-xl text-indigo-600 font-semibold flex items-center">
            <MdSchool className="mr-2 text-2xl" />
            Student Details
          </div>
        </div>

        <div className="grid grid-cols-1 tablet:max-laptop:grid-cols-4 laptop:grid-cols-6 gap-4">
          {/* Name */}
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <MdPerson className="text-2xl text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-gray-700 font-medium">{name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <MdEmail className="text-2xl text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-700 font-medium">{email}</p>
            </div>
          </div>


          {/* Roll Number */}
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <MdNumbers className="text-2xl text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500">Roll Number</p>
              <p className="text-gray-700 font-medium">{rollNumber}</p>
            </div>
          </div>

          {/* Class */}
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <MdSchool className="text-2xl text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500">Class</p>
              <p className="text-gray-700 font-medium">{currentClass}</p>
            </div>
          </div>

          {/* Section */}
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <MdGroup className="text-2xl text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500">Section</p>
              <p className="text-gray-700 font-medium">{section}</p>
            </div>
          </div>

          {/* Father's Name */}
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <MdFamilyRestroom className="text-2xl text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500">Father's Name</p>
              <p className="text-gray-700 font-medium">{fatherName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;