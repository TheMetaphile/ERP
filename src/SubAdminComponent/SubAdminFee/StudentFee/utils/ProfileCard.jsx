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
  darkMode
}) => {
  // Dark mode classes
  const bgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';
  const textPrimaryClass = darkMode ? 'text-white' : 'text-gray-700';
  const textSecondaryClass = darkMode ? 'text-gray-400' : 'text-gray-500';
  const hoverBgClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const iconClass = darkMode ? 'text-indigo-400' : 'text-indigo-500';
  const titleClass = darkMode ? 'text-indigo-400' : 'text-indigo-600';

  return (
    <div className={`w-full mx-auto border ${borderClass} mt-2 ${bgClass} rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300`}>
      <div className="p-3">
        <div className="flex flex-col items-center mb-6">
          {/* Profile Image */}
          <div className="w-24 h-24 mb-3 relative">
            {profileLink ? (
              <img 
                src={profileLink} 
                alt={`${name}'s profile`}
                className={`w-full h-full rounded-full object-cover border-4 ${darkMode ? 'border-indigo-700' : 'border-indigo-500'}`}
              />
            ) : (
              <div className={`w-full h-full rounded-full ${darkMode ? 'bg-indigo-900' : 'bg-indigo-100'} flex items-center justify-center border-4 ${darkMode ? 'border-indigo-700' : 'border-indigo-500'}`}>
                <MdPerson className={`text-4xl ${iconClass}`} />
              </div>
            )}
          </div>
          
          {/* Title */}
          <div className={`uppercase tracking-wide text-xl ${titleClass} font-semibold flex items-center`}>
            <MdSchool className="mr-2 text-2xl" />
            Student Details
          </div>
        </div>

        <div className="grid grid-cols-1 tablet:max-laptop:grid-cols-4 laptop:grid-cols-6 gap-4">
          {/* Name */}
          <div className={`flex items-center space-x-3 p-3 ${hoverBgClass} rounded-lg transition-colors`}>
            <MdPerson className={`text-2xl ${iconClass}`} />
            <div>
              <p className={`text-sm ${textSecondaryClass}`}>Name</p>
              <p className={`${textPrimaryClass} font-medium`}>{name}</p>
            </div>
          </div>

          {/* Email */}
          <div className={`flex items-center space-x-3 p-3 ${hoverBgClass} rounded-lg transition-colors`}>
            <MdEmail className={`text-2xl ${iconClass}`} />
            <div>
              <p className={`text-sm ${textSecondaryClass}`}>Email</p>
              <p className={`${textPrimaryClass} font-medium`}>{email}</p>
            </div>
          </div>

          {/* Roll Number */}
          <div className={`flex items-center space-x-3 p-3 ${hoverBgClass} rounded-lg transition-colors`}>
            <MdNumbers className={`text-2xl ${iconClass}`} />
            <div>
              <p className={`text-sm ${textSecondaryClass}`}>Roll Number</p>
              <p className={`${textPrimaryClass} font-medium`}>{rollNumber}</p>
            </div>
          </div>

          {/* Class */}
          <div className={`flex items-center space-x-3 p-3 ${hoverBgClass} rounded-lg transition-colors`}>
            <MdSchool className={`text-2xl ${iconClass}`} />
            <div>
              <p className={`text-sm ${textSecondaryClass}`}>Class</p>
              <p className={`${textPrimaryClass} font-medium`}>{currentClass}</p>
            </div>
          </div>

          {/* Section */}
          <div className={`flex items-center space-x-3 p-3 ${hoverBgClass} rounded-lg transition-colors`}>
            <MdGroup className={`text-2xl ${iconClass}`} />
            <div>
              <p className={`text-sm ${textSecondaryClass}`}>Section</p>
              <p className={`${textPrimaryClass} font-medium`}>{section}</p>
            </div>
          </div>

          {/* Father's Name */}
          <div className={`flex items-center space-x-3 p-3 ${hoverBgClass} rounded-lg transition-colors`}>
            <MdFamilyRestroom className={`text-2xl ${iconClass}`} />
            <div>
              <p className={`text-sm ${textSecondaryClass}`}>Father's Name</p>
              <p className={`${textPrimaryClass} font-medium`}>{fatherName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;