import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LuXCircle } from "react-icons/lu";
import { BASE_URL } from '../../../Config';
import AuthContext from '../../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ComposeEmail = () => {
    const { authState } = useContext(AuthContext);
    const [to, setTo] = useState('');
    const [cc, setCc] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [attachments, setAttachments] = useState([]);

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);

        setAttachments((prev) => {
            const existingFileNames = new Set(prev.map(f => f.name));
            const uniqueNewFiles = newFiles.filter(file => !existingFileNames.has(file.name));
            return [...prev, ...uniqueNewFiles];
        });

        e.target.value = null;
    };


    const removeAttachment = (indexToRemove) => {
        setAttachments(prev => prev.filter((_, i) => i !== indexToRemove));
    };


const handleSubmit = async (e) => {
    e.preventDefault();

    const toRecipients = to.split(',').map(item => item.trim()).filter(Boolean);
    const ccRecipients = cc.split(',').map(item => item.trim()).filter(Boolean);

    if (toRecipients.length === 0) {
        toast.warning("Please add at least one recipient in 'To'");
        return;
    }

    try {
        const payload = {
            Sender: String(authState?.userDetails?._id || ""),
            MessageBody: body || "",
            Subject: subject || "",
            DraftStatus: false,
            IsClosed: false,
            Role: authState?.userDetails?.rolee || "",
            ToRecipients: toRecipients,
            CcRecipients: ccRecipients
        };

        const response = await axios.post(
            `${BASE_URL}/myInbox/start-conversation`,
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
            setTo('');
            setCc('');
            setSubject('');
            setBody('');
            setAttachments([]);
        }
    } catch (error) {
        console.error(error);
        toast.error("Failed to send message");
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
        <div className=" p-4 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Compose Email</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium">To:</label>
                    <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        placeholder="recipient1@example.com, recipient2@example.com"
                        required
                    />
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">CC:</label>
                        <input
                            type="text"
                            value={cc}
                            onChange={(e) => setCc(e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                            placeholder="cc@example.com"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        placeholder="Email subject"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Body:</label>
                    <ReactQuill
                        value={body}
                        onChange={setBody}
                        modules={modules}
                        theme="snow"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Attachments:</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="mt-1"
                    />
                    {attachments.length > 0 && (
                        <ul className="mt-2 text-sm list-disc pl-5 space-y-1">
                            {attachments.map((file, i) => (
                                <li key={i} className="flex items-center justify-between w-1/4 p-1 border border-black border-1 rounded-md">
                                    <span>{file.name}</span>
                                    <LuXCircle
                                        className="text-red-600 hover:text-red-800 cursor-pointer"
                                        onClick={() => removeAttachment(i)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}

                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ComposeEmail;
