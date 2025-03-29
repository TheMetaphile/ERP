import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from "../../Context/AuthContext";


const FileUploadField = ({ icon, label, name, required, accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.bmp,.webp", value = '', onChange }) => {
    const { darkMode } = useContext(AuthContext);
    const [fileName, setFileName] = useState('');
    const [filePreview, setFilePreview] = useState(null);
    const [fileType, setFileType] = useState('');
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setFileType(file.type);
            setError('');

            // Generate preview for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setFilePreview(e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                setFilePreview(null);
            }
        } else {
            setFileName('');
            setFilePreview(null);
            setFileType('');
        }
        onChange(e);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            fileInputRef.current.files = e.dataTransfer.files;
            setFileName(file.name);
            setFileType(file.type);
            setError('');

            // Generate preview for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setFilePreview(e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                setFilePreview(null);
            }

            // Trigger the onChange event
            const event = new Event('change', { bubbles: true });
            fileInputRef.current.dispatchEvent(event);
        }
    };

    const removeFile = (e) => {
        e.stopPropagation();
        setFileName('');
        setFilePreview(null);
        setFileType('');
        fileInputRef.current.value = '';

        // Trigger the onChange event with an empty value
        const event = { target: { name, value: '', files: [] } };
        onChange(event);
    };

    useEffect(() => {
        if (!value) {
            setFileName('');
            setFilePreview(null);
            setFileType('');
        }
    }, [value]);

    // Function to render appropriate file icon based on file type
    const renderFileIcon = () => {
        if (fileType.startsWith('application/pdf')) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            );
        } else if (fileType.startsWith('application/msword') || fileType.includes('document')) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            );
        } else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            );
        }
    };

    return (
        <div className="flex-grow">
            <div className='flex items-center gap-2'>
                <div className="text-blue-500 text-xl">{icon}</div>
                <label className={`text-sm text-gray-500 ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            </div>
            <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${darkMode
                    ? 'border-gray-600 hover:bg-gray-800'
                    : 'border-gray-300 hover:bg-gray-50'} 
                    border-dashed rounded-md cursor-pointer ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {!fileName ? (
                    <div className="space-y-1 text-center">
                        <svg
                            className={`mx-auto h-12 w-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className={`flex text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span>Drop a file here or click to browse</span>
                            <input
                                id={name}
                                name={name}
                                type="file"
                                className="sr-only"
                                required={required}
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                accept={accept}
                            />
                        </div>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>PDF, DOC, DOCX up to 10MB</p>
                    </div>
                ) : (
                    <div className="w-full">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="text-red-500 hover:text-red-700"
                                onClick={removeFile}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                            {filePreview ? (
                                <div className="relative w-full max-w-md">
                                    <img
                                        src={filePreview}
                                        alt={fileName}
                                        className={`max-h-64 mx-auto object-contain rounded ${darkMode ? 'border-gray-700' : 'border-gray-200'} border`}
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    {renderFileIcon()}
                                </div>
                            )}
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} break-all text-center`}>
                                {fileName}
                            </span>
                        </div>

                        <input
                            id={name}
                            name={name}
                            type="file"
                            className="sr-only"
                            required={required}
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            accept={accept}
                        />
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default FileUploadField;