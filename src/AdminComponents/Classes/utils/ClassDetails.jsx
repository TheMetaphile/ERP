import React, { useState } from 'react';

const ClassDetailsModal = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    sectionA: 'A',
    sectionB: 'B',
    sectionC: 'C',
    fans: 4,
    lights: 7,
    teacherChair: 2,
    studentBench: 19,
    blackBoard: 1,
    teacherTable: 1,
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button className="view-details-btn text-red-500 text-lg" onClick={toggleModal}>
        View Details
      </button>

      {isOpen &&
        (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl">
                  {className} Details
                </h2>
                <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
                  &times;
                </button>
              </div>
              <p>Section: {details.sectionA}&nbsp; Section: {details.sectionB} &nbsp;Section: {details.sectionC}</p>
              <p className="mt-2">Present in Class:</p>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="bg-gray-200 rounded-md p-2">
                  Fans:{' '}
                  {isEditing ? (
                    <input
                      type="number"
                      name="fans"
                      value={details.fans}
                      onChange={handleInputChange}
                      className="w-12 px-1"
                    />
                  ) : (
                    details.fans
                  )}
                </div>
                <div className="bg-gray-200 rounded-md p-2">
                  Lights:{' '}
                  {isEditing ? (
                    <input
                      type="number"
                      name="lights"
                      value={details.lights}
                      onChange={handleInputChange}
                      className="w-12 px-1"
                    />
                  ) : (
                    details.lights
                  )}
                </div>
                <div className="bg-gray-200 rounded-md p-2">
                  Teacher Chair:{' '}
                  {isEditing ? (
                    <input
                      type="number"
                      name="teacherChair"
                      value={details.teacherChair}
                      onChange={handleInputChange}
                      className="w-12 px-1"
                    />
                  ) : (
                    details.teacherChair
                  )}
                </div>
                <div className="bg-gray-200 rounded-md p-2">
                  Student Bench:{' '}
                  {isEditing ? (
                    <input
                      type="number"
                      name="studentBench"
                      value={details.studentBench}
                      onChange={handleInputChange}
                      className="w-12 px-1"
                    />
                  ) : (
                    details.studentBench
                  )}
                </div>
                <div className="bg-gray-200 rounded-md p-2">
                  Black Board:{' '}
                  {isEditing ? (
                    <input
                      type="number"
                      name="blackBoard"
                      value={details.blackBoard}
                      onChange={handleInputChange}
                      className="w-12 px-1"
                    />
                  ) : (
                    details.blackBoard
                  )}
                </div>
                <div className="bg-gray-200 rounded-md p-2">
                  Teacher Table:{' '}
                  {isEditing ? (
                    <input
                      type="number"
                      name="teacherTable"
                      value={details.teacherTable}
                      onChange={handleInputChange}
                      className="w-12 px-1"
                    />
                  ) : (
                    details.teacherTable
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                {isEditing ? (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default ClassDetailsModal;