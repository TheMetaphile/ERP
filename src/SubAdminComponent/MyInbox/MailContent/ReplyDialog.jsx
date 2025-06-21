import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import { toast } from "react-toastify";

const ReplyDialog = ({ onClose, ConversationID, addNewMessage }) => {
    const { authState } = useContext(AuthContext);
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
        <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow w-full p-4 border border-gray-300 dark:border-gray-700">
            <h2 className="text-md font-semibold mb-3 text-gray-800 dark:text-white">Reply Message</h2>

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
                    className="custom-quill-editor"


                />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
                <div
                    ref={suggestionsRef}
                    className="absolute top-[160px] left-4 w-60 max-h-64 overflow-y-auto border border-gray-300 bg-white shadow-md rounded z-50"
                >
                    {fetchedFields.map((field, index) => (
                        <div
                            key={index}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
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
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
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
