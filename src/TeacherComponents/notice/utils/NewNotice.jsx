import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import Loading from './../../../LoadingScreen/Loading';
import { BASE_URL_Notice, BASE_URL_ClassTeacher, BASE_URL_Login } from '../../../Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaEdit ,FaUserPlus,FaPlus,  FaSearch,FaChalkboardTeacher} from 'react-icons/fa';


function NewNotice({ setShowModal }) {
    const { authState } = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState('Particular Students');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [emailIds, setEmailIds] = useState([]);
    const [searchInputStudent, setSearchInputStudent] = useState('');
    const [searchResultsStudent, setSearchResultsStudent] = useState([]);
    const [classOptions] = useState(['Pre-Nursery', 'Nursery', 'L.K.G','U.K.G', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']);
    const [selectedClass, setSelectedClass] = useState('');
    const [sectionOptions, setSectionOptions] = useState([]);
    const [selectedSection, setSelectedSection] = useState('');
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedClass) {
            fetchSections();
        }
    }, [selectedClass]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    function getCurrentSession() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        if (currentMonth > 3) {
            return `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
        } else {
            return `${currentYear - 1}-${currentYear.toString().slice(-2)}`;
        }
    }
    const Session = getCurrentSession();

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const today = getCurrentDate();

    const handleSubmit = async () => {
        if (!description || !title) {
            alert('Please fill all fields')
        }
        else {
            const payload = {
                title,
                type: selectedOption,
                description,
                session: Session,
                date: today,
            };

            if (selectedOption === 'Particular Students') {
                payload.emailIds = emailIds.map(user=> user.email);
            } else if (selectedOption === 'Particular Classes') {
                payload.Classes = classes;
            }

            console.log('payload', payload);
            setLoading(true);

            try {
                const response = await axios.post(`${BASE_URL_Notice}/notice/upload/teacher`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${authState.accessToken}`,
                        }
                    }
                );
                if (response.status === 200) {
                    toast.success('Successfully Posted');
                    console.log('fetch', response.data);
                    handleCloseModal();
                }
            } catch (error) {
                toast.error(error.message);
                console.error("Error in posting notice:", error);
            } finally {
                setLoading(false);
            }
        }

    };

    const fetchSections = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${BASE_URL_ClassTeacher}/classTeacher/fetch/sections`, {
                accessToken: authState.accessToken,
                class: selectedClass,
            });
            if (response.status === 200) {
                console.log('section fetched');
                const sectionsdetail = response.data.sections.map(section => section.section);
                setSectionOptions(sectionsdetail);
            }

        } catch (error) {
            console.error("Error fetching sections:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddClass = () => {
        const existingClass = classes.find(cls => cls.Class === selectedClass);

        if (existingClass) {
            if (!existingClass.sections.includes(selectedSection)) {
                existingClass.sections.push(selectedSection);
                setClasses([...classes]);
            }
        } else {
            setClasses([...classes, { Class: selectedClass, sections: [selectedSection] }]);
        }

        setSelectedClass('');
        setSelectedSection('');
        setSectionOptions([]);
    };

    const handleRemoveClass = (classToRemove) => {
        setClasses(classes.filter(cls => cls.Class !== classToRemove));
    };

    const handleRemoveSection = (classToRemove, sectionToRemove) => {
        setClasses(classes.map(cls => {
            if (cls.Class === classToRemove) {
                return { ...cls, sections: cls.sections.filter(sec => sec !== sectionToRemove) };
            }
            return cls;
        }));
    };

    const removeEmailId = (email) => {
        setEmailIds(emailIds.filter(id => id !== email));
    };



    const handleSearchChangeStudent = (e) => {
        setSearchInputStudent(e.target.value);
        if (e.target.value.length > 2) {
            searchStudents(e.target.value);
        } else {
            setSearchResultsStudent([]);
        }
    };

    const searchStudents = async (query) => {
        console.log(query)
        try {
            const response = await axios.post(`${BASE_URL_Login}/search/student`, {
                accessToken: authState.accessToken,
                searchString: query,

            });
            console.log('search', response.data);
            setSearchResultsStudent(response.data.Teachers);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };



    const addEmailId = (email) => {
        if (!emailIds.includes(email)) {
            setEmailIds([...emailIds, email]);
        }
    };

    const renderSpecificOptions = () => {
        switch (selectedOption) {
            case 'Particular Students':
                return (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white p-6 rounded-lg shadow-lg"
                    >
                      <div className="relative mb-4">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Search for users"
                          value={searchInputStudent}
                          onChange={handleSearchChangeStudent}
                        />
                      </div>
                      
                      {searchResultsStudent.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="w-full bg-gray-100 mb-4 border border-gray-300 rounded-lg p-3 max-h-60 overflow-y-auto"
                        >
                          {searchResultsStudent.map(user => (
                            <motion.div
                              key={user.email}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="flex justify-between items-center mb-2 bg-white p-2 rounded-lg shadow-sm"
                            >
                              <span className="flex items-center gap-2">
                                <img src={user.profileLink} alt="" className="w-8 h-8 rounded-full" />
                                {user.name}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-full flex items-center gap-1"
                                onClick={() => addEmailId({email:user.email,name:user.name})}
                              >
                                <FaUserPlus /> Add
                              </motion.button>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                
                      <motion.div
                        layout
                        className="w-full mb-4 border border-gray-300 rounded-lg p-3 min-h-[100px]"
                      >
                        {emailIds.length > 0 ? (
                          emailIds.map(user => (
                            <motion.div
                              key={user.email}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="flex justify-between items-center mb-2 bg-blue-100 rounded-full px-4 py-2 shadow-md"
                            >
                              <span>{user.name}</span>
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeEmailId(user)}
                              >
                                <FaTimes className="text-red-500 h-5 w-5" />
                              </motion.button>
                            </motion.div>
                          ))
                        ) : (
                          <span className="text-gray-500 italic">No email IDs added.</span>
                        )}
                      </motion.div>
                    </motion.div>
                  );

            case 'Particular Classes':
                return (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white p-6 rounded-lg shadow-lg"
                    >
                      <div className="flex mb-4 space-x-4">
                        <motion.select
                          whileFocus={{ scale: 1.02 }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={selectedClass}
                          onChange={(e) => setSelectedClass(e.target.value)}
                        >
                          <option value="">Select Class</option>
                          {classOptions.map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </motion.select>
                        <motion.select
                          whileFocus={{ scale: 1.02 }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={selectedSection}
                          onChange={(e) => setSelectedSection(e.target.value)}
                          disabled={!selectedClass}
                        >
                          <option value="">Select Section</option>
                          {sectionOptions.map(section => (
                            <option key={section} value={section}>{section}</option>
                          ))}
                        </motion.select>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
                          onClick={handleAddClass}
                          disabled={!selectedClass || !selectedSection}
                        >
                          <FaPlus /> Add
                        </motion.button>
                      </div>
                      
                      {classes.length > 0 && (
                        <motion.ul
                          layout
                          className="w-full mb-4 border border-gray-300 rounded-lg p-4 space-y-4"
                        >
                          {classes.map(cls => (
                            <motion.li
                              key={cls.Class}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="bg-gray-100 rounded-lg p-4 shadow-md"
                            >
                              <motion.div className="flex justify-between items-center mb-2 bg-blue-100 rounded-full px-4 py-2">
                                <span className="flex items-center gap-2">
                                  <FaChalkboardTeacher className="text-blue-600" />
                                  {cls.Class}: {cls.sections.join(', ')}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1, rotate: 90 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleRemoveClass(cls.Class)}
                                >
                                  <FaTimes className="text-red-500 h-5 w-5" />
                                </motion.button>
                              </motion.div>
                              <motion.ul layout className="space-y-2 mt-2">
                                {cls.sections.map(section => (
                                  <motion.li
                                    key={section}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="flex justify-between items-center bg-white rounded-full px-4 py-2 shadow-sm"
                                  >
                                    <span>{section}</span>
                                    <motion.button
                                      whileHover={{ scale: 1.1, rotate: 90 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleRemoveSection(cls.Class, section)}
                                    >
                                      <FaTimes className="text-red-500 h-4 w-4" />
                                    </motion.button>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </motion.div>
                  );
            default:
                return null;
        }
    };

   
    return (
        <AnimatePresence >
            <motion.div
                className="fixed z-50 inset-0 flex items-center justify-center w-full bg-gray-800 bg-opacity-50 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-lg shadow-xl w-1/2 max-w-md mx-4  my-10"
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 500 }}
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                <FaEdit className="mr-2" /> Write Notice
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes size={24} />
                            </motion.button>
                        </div>
                        <motion.select
                            className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={selectedOption}
                            onChange={handleOptionChange}
                            whileHover={{ boxShadow: '0px 0px 8px rgba(0,0,0,0.2)' }}
                        >
                            <option value="Particular Students">Particular Students</option>
                            <option value="Particular Classes">Particular Classes</option>
                        </motion.select>
                        <motion.input
                            className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            whileHover={{ boxShadow: '0px 0px 8px rgba(0,0,0,0.2)' }}
                        />
                        <motion.textarea
                            className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            whileHover={{ boxShadow: '0px 0px 8px rgba(0,0,0,0.2)' }}
                        />
                        {renderSpecificOptions()}
                        <div className="flex justify-end space-x-2 mt-3">
                            <motion.button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                                onClick={handleSubmit}
                                disabled={loading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {loading ? <Loading /> : (
                                    <>
                                        <FaPaperPlane className="mr-2" />
                                        Submit
                                    </>
                                )}
                            </motion.button>
                            <motion.button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center"
                                onClick={handleCloseModal}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaTimes className="mr-2" />
                                Cancel
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default NewNotice;
