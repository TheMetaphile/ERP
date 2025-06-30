import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import { toast } from "react-toastify";
import { refreshAccessToken } from "../../../RefreshTokenHelper";

const ReplyDialog = ({ onClose, ConversationID, addNewMessage }) => {
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [body, setBody] = useState('');
    const [fetchedFields, setFetchedFields] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(null);
    const [editorRef, setEditorRef] = useState(null);
    const suggestionsRef = useRef(null);

    const handleSave = async () => {
        try {
            const payload = {
                Sender: String(authState?.userDetails?._id || ""),
                ConversationID: ConversationID,
                DraftStatus: false,
                MessageBody: body || "",
            };

            console.log(payload)

            const response = await axios.post(
                `${BASE_URL}/myInbox/sendReply`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                toast.success("Message replied successfully");
                // addNewMessage({
                //     _id: response.data.result.MessageID,
                //     SentAt: new Date().toISOString(),
                //     MessageBody: body
                // });
                onClose();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to reply message");
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

    useEffect(() => {
        fetchFields();
        const handleClickOutside = (e) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [authState?.accessToken]);

    const fetchFields = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/fieldMaping/fetch/combinedField`, {
                headers: {
                    'Authorization': `Bearer ${authState?.accessToken}`
                }
            });

            if (response.status === 200) {
                setFetchedFields(response.data || []);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            console.log(error);
            toast.error(errorMessage);
            setFetchedFields([]);
            if (
                error.response &&
                error.response.data.error === 'You are not permitted to access this data. Please contact the admin'
            ) {
                toast.warn('Access denied. Attempting to refresh token...');
                try {
                    const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                    await fetchFields();
                } catch (refreshError) {
                }
            } else {
                toast.error(error.response?.data?.error || "An error occurred");
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === '{') {
            setShowSuggestions(true);
        } else if (e.key === 'Backspace') {
            const editor = editorRef;
            const selection = editor?.getSelection();

            if (selection?.index > 0) {
                const textBeforeCursor = editor.getText(selection.index - 1, 1);
                if (textBeforeCursor !== '{') {
                    setShowSuggestions(false);
                }
            } else {
                setShowSuggestions(false);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };


    const handleSelectSuggestion = (key) => {
        if (editorRef && cursorPosition != null) {
            const indexToReplace = cursorPosition - 1;

            editorRef.deleteText(indexToReplace, 1);

            editorRef.insertText(indexToReplace, `{${key}}`);

            editorRef.setSelection(indexToReplace + key.length + 2);

            setShowSuggestions(false);
        }
    };


    const modules = {
        toolbar: [
            [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['link', 'image'],
        ]
    };

    return (
        <div
            className={`
    relative rounded-lg shadow w-full p-4 border
    ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"}
  `}
        >
            <h2 className={`text-md font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-800"}`}>
                Reply Message
            </h2>

            <div
                className="mb-3"
                onKeyDown={handleKeyDown}
                onClick={() => setShowSuggestions(false)}
            >
                <ReactQuill
                    value={body}
                    onChange={setBody}
                    modules={modules}
                    theme="snow"
                    onChangeSelection={(range) => {
                        if (range) setCursorPosition(range.index);
                    }}
                    ref={(el) => {
                        if (el !== null) setEditorRef(el.getEditor());
                    }}
                    className={`custom-quill-editor ${darkMode ? "bg-gray-900 text-white" : ""}`}
                />
            </div>

            {showSuggestions && (
                <div
                    ref={suggestionsRef}
                    className={`
        absolute top-[160px] left-4 w-60 max-h-64 overflow-y-auto rounded z-50 border shadow-md
        ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}
      `}
                >
                    {fetchedFields.map((field, index) => (
                        <div
                            key={index}
                            className={`
            px-3 py-2 cursor-pointer
            ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}
          `}
                            onClick={() => handleSelectSuggestion(field.key)}
                        >
                            {field.key} - ({field.for})
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-end gap-3 mt-4">
                <button
                    onClick={onClose}
                    className={`
        px-4 py-2 rounded font-semibold
        ${darkMode
                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800"}
      `}
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                    Send
                </button>
            </div>
        </div>

    );
};

export default ReplyDialog;
