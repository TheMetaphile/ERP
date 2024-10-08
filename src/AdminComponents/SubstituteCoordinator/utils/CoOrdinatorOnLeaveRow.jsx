import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../Context/AuthContext";
import { BASE_URL_Login } from "../../../Config";
import { FaTimes } from "react-icons/fa";
import { MdCheck, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { motion } from 'framer-motion';


export default function CoOrdinatorOnLeaveRow({ Teacher, index, date, session }) {

    const { authState } = useContext(AuthContext);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);
    const [email, setEmail] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [temp, setTemp] = useState();
    const [editingRow, setEditingRow] = useState(false);

    const [originalSubstitute, setSubstitute] = useState(Teacher.substitutes);

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setShowSuggestions(true);
    };

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target) && suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickInside = () => {
        console.log("Clicked inside the input field");
        // Execute your function for inside click here
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion) => {
        console.log(suggestion);
        SubstituteTeacher(suggestion);
        setShowSuggestions(false);

    };

    const SubstituteTeacher = (classTeacherEmail) => {
        let data = JSON.stringify({
            "wing": Teacher.wing,
            "coordinatorEmail": Teacher.email,
            "substituteEmail": classTeacherEmail.email,
            "date": date,
            "session": session
        });

        console.log(data);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_URL_Login}/CoordinatorSubstitute/create`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authState.accessToken}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("here")
                console.log(JSON.stringify(response.data));
                toast.success("Coordinator substituted successfully");
                setSubstitute(classTeacherEmail);
                handleSendNotice(Teacher.email, classTeacherEmail.email, Teacher.wing);
                setEditingRow(false);

            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.error);
            });

    }

    const handleSendNotice = async (currentTeacher, SubstituteEmail, wing) => {
        console.log('in send notice')
        const payload = {
            title: 'Substitute Co-ordinator ',
            type: 'Particular Teachers',
            description: `You have be assigned coordinator for wing ${wing}`,
            session: session,
            date: date,
            emailIds: SubstituteEmail
        };

        console.log('payload', payload);

        try {
            const response = await axios.post(`${BASE_URL_Login}/notice/upload/teacher`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`,
                    }
                }
            );
            if (response.status === 200) {
                toast.success('Notice send to substitute teacher');
                console.log('fetch', response.data);
            }
        } catch (error) {
            toast.error(error.message);
            console.error("Error in posting notice:", error);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setTemp(email);
        }, 500);

        return () => {
            clearTimeout(handler);
        }
    }, [email])

    useEffect(() => {
        if (temp) {
            const searchTeacher = async () => {
                try {
                    const response = await axios.post(`${BASE_URL_Login}/search/teacher`, {
                        accessToken: authState.accessToken,
                        searchString: temp,
                        start: 0,
                        end: 30
                    })
                    console.log(response.data)
                    const teacherEmails = response.data.Teachers.map(teacher => ({
                        email: teacher.email,
                        profileLink: teacher.profileLink,
                        employeeId: teacher.employeeId,

                        name: teacher.name,


                    }));
                    setSuggestions(teacherEmails);

                }
                catch (error) {
                    console.error("Error searching for teachers:", error);
                }
            }
            searchTeacher();
        }
    }, [temp, authState.accessToken]);

    const handleUpdateClick = () => {
        setSubstitute();
        setEditingRow(true);
    }

    const handleConfirmClick = () => {

    }

    const handleCancelClick = () => {
        setSubstitute(Teacher.substitutes)
        setEditingRow(false);
    }

    return (
        <motion.tr
        key={index}
        className="border-b border-gray-200 last:border-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      >
        <td className="py-3 px-6 text-center whitespace-nowrap">
          {Teacher.employeeId}
        </td>
        <td className="flex py-3 px-6 items-center gap-2 whitespace-nowrap">
          <motion.img
            src={Teacher.profileLink}
            alt="img"
            className="rounded-full h-12 w-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          />
          {Teacher.name}
        </td>
        <td className="py-3 px-6 text-center whitespace-nowrap">
          {date}
        </td>
        <td className="py-3 px-6 text-center whitespace-nowrap">
          {Teacher.wing}
        </td>
        <td className=" py-3 px-6 text-center items-center whitespace-nowrap">
          {originalSubstitute ? (
            <motion.div
              className="flex justify-start gap-2 items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <motion.img
                src={originalSubstitute.profileLink}
                alt="img"
                className="rounded-full h-12 w-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              />
              <div className="text-start">
                <p> {originalSubstitute.name}</p>
                {originalSubstitute.employeeId}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <input
                type="email"
                ref={inputRef}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Search Teacher"
                list={`teacher-suggestions`}
                onClick={handleClickInside}
                value={email}
                onChange={handleEmailChange}
              />
              {showSuggestions && suggestions.length > 0 && (
                <motion.ul
                  className="absolute z-10 bg-white border rounded-md mt-1 max-h-70 overflow-y-auto"
                  ref={suggestionsRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  {suggestions.map((suggestion, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSuggestionClick(suggestion)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + (index + idx) * 0.1 }}
                    >
                      <img
                        src={suggestion.profileLink}
                        alt="Profile"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      {suggestion.name}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          )}
        </td>
        <td className="py-3 px-6 text-center whitespace-nowrap">
          {editingRow ? (
            <motion.div
              className="flex gap-1 justify-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <button
                className="bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center"
                onClick={() => handleConfirmClick()}
              >
                <MdCheck className="text-white" />
              </button>
              <button
                className="bg-red-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center"
                onClick={() => handleCancelClick()}
              >
                <FaTimes className="text-white" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="flex justify-center gap-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <button
                className="bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center"
                onClick={() => handleUpdateClick()}
              >
                <MdEdit className="text-white" />
              </button>
            </motion.div>
          )}
        </td>
      </motion.tr>
    )
}