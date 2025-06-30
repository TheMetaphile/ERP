// ForwardDialog.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LuXCircle } from "react-icons/lu";
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import { toast } from "react-toastify";
import { refreshAccessToken } from "../../../RefreshTokenHelper";
const ForwardDialog = ({
  onClose,
  ConversationID
}) => {
  const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
  const [searchString, setSearchString] = useState('');
  const [role, setRole] = useState('teacher');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [to, setTo] = useState([]);
  const [toIds, setToIds] = useState([]);
  const [showRoles, setShowRoles] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (searchString) {
      const handler = setTimeout(() => {
        setShowSuggestions(true);
        const searchRole = async () => {
          try {
            const response = await axios.post(`${BASE_URL}/search/${role}`, {
              accessToken: authState?.accessToken,
              searchString,
              start: 0,
              end: 30
            });

            const roleSuggestions = response.data.Teachers.map(person => ({
              _id: person._id,
              email: person.email,
              profileLink: person.profileLink,
              name: person.name
            }));
            setSuggestions(roleSuggestions);
          } catch (error) {
            console.error("Error searching for roles:", error);
            if (
              error.response &&
              error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
              toast.warn('Access denied. Attempting to refresh token...');
              try {
                const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                await searchRole();
              } catch (refreshError) {
              }
            } else {
              toast.error(error.response?.data?.error || "An error occurred");
            }
          }
        };
        searchRole();
      }, 500);
      return () => clearTimeout(handler);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchString, role, authState?.accessToken]);

  const removeRecipient = (email, type) => {
    setTo(prev => prev.filter(e => e !== email));
    setToIds(prev => prev.filter((_, i) => to[i] !== email));
  };

  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false);
    setTo(prev => [...prev, suggestion.email]);
    setToIds(prev => [...prev, suggestion._id]);
    setSearchString('');
  };

  const handleSave = async () => {
    console.log("Forward to:", toIds);
    if (toIds.length === 0) {
      toast.warning("Please add at least one recipient in 'To'");
      return;
    }
    try {
      const payload = {
        Sender: String(authState?.userDetails?._id || ""),
        ConversationID: ConversationID,
        Role: authState?.userDetails?.rolee.split('-')[0] || "",
        ToRecipients: toIds,
      };
      console.log(payload)

      const response = await axios.post(
        `${BASE_URL}/myInbox/forwardConversation`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${authState?.accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 200) {
        toast.success("Message sent successfully");
        setToIds([]);
        onClose();
        setShowRoles(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
      if (
        error.response &&
        error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
      ) {
        toast.warn('Access denied. Attempting to refresh token...');
        try {
          const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
          await handleSave();
        } catch (refreshError) {
        }
      } else {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-lg shadow-lg w-[90%] max-w-xl p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        <h2 className={`text-lg font-bold mb-4 ${darkMode ? " text-white" : "text-gray-900"} `}>Forward Message</h2>

        <div className="mb-4">
          <label className={`block text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>To:</label>
          <div className={`flex items-center space-x-2 overflow-x-auto border p-2 rounded ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}>
            {to.map((email, idx) => (
              <div
                key={idx}
                className={`p-1 rounded flex items-center ${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"}`}
              >
                <span>{email}</span>
                <LuXCircle
                  className="ml-1 text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => removeRecipient(email, 'to')}
                />
              </div>
            ))}
            <input
              type="text"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className={`flex-grow p-1 outline-none bg-transparent ${darkMode ? "text-white" : "text-black"}`}
              placeholder={`Search ${role.charAt(0).toUpperCase() + role.slice(1)}s`}
              onFocus={() => setShowRoles(true)}
              onBlur={() => setTimeout(() => setShowRoles(false), 200)}
            />
          </div>

          {showRoles && (
            <div
              className="mt-2 mb-4 grid grid-cols-4 gap-4"
              onMouseEnter={() => setIsFocused(true)}
              onMouseLeave={() => setIsFocused(false)}
            >
              {['teacher', 'student', 'subAdmin', 'admin'].map((roleOption) => (
                <button
                  key={roleOption}
                  type="button"
                  onClick={() => setRole(roleOption)}
                  className={`p-2 border rounded text-center ${role === roleOption
                    ? "bg-blue-500 text-white"
                    : darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-gray-200 text-black"
                    }`}
                >
                  {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                </button>
              ))}
            </div>
          )}

          {showSuggestions && (
            <div className={`mt-2 border rounded max-h-48 overflow-y-auto shadow ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`p-2 cursor-pointer flex items-center ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <img
                    src={suggestion.profileLink}
                    alt="Profile"
                    className='w-6 h-6 rounded-full mr-2'
                  />
                  <span>{suggestion.email}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded font-semibold ${darkMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>

  );
};

export default ForwardDialog;
