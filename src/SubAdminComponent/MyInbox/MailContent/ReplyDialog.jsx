import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL } from '../../../Config';
import { toast } from "react-toastify";
const ReplyDialog = ({
    onClose,
    ConversationID,
    addNewMessage
}) => {
    const { authState } = useContext(AuthContext);
    const [body, setBody] = useState('');


    const handleSave = async () => {
        console.log("body:", body);

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
                addNewMessage({
                    _id: response.data.result.MessageID,
                    SentAt: new Date().toISOString(),
                    MessageBody: body
                });

                onClose();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to reply message");
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
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow w-full p-4 border border-gray-300 dark:border-gray-700">
            <h2 className="text-md font-semibold mb-3 text-gray-800 dark:text-white">Reply Message</h2>

            <div className="mb-3">
                <ReactQuill
                    value={body}
                    onChange={setBody}
                    modules={modules}
                    theme="snow"
                // style={{ height: '300px' }}
                />
            </div>

            <div className="flex justify-end gap-3">
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
