import React, { useState, useEffect, useRef, useContext } from 'react';
import logo from '../../../../src/assets/school logo.png';
import { useParams } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Print.css';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext';
import { BASE_URL_Login } from '../../../Config';

const PrintableComponent = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="print:your-component px-3 pb-4">
            <div className="text-center mb-8">
                <img src={logo} alt="School Logo" className="mx-auto mb-4" />
                <h1 className="text-2xl font-bold">METAPHILE PUBLIC SCHOOL</h1>
                <p className="text-sm">Affiliated To CBSE, Delhi NUR to XII CO-EDUCATIONAL (ENGLISH MEDIUM)</p>
                <p className="text-sm">Address, ph no, email</p>
            </div>
            <div className="text-center mb-8">
                <h2 className="border-b-2 border-black inline-block text-lg font-semibold">Character Certificate</h2>
            </div>
            <div className="mb-8">
                <p className="text-center font-bold mb-4">To Whom so ever it may concern</p>
                <p className="text-justify">
                    This is to certify that <span className="font-semibold">{props.editing ? <input type="text" value={props.name} onChange={props.handleNameChange} /> : props.data.name}</span> s/o, d/o Sh.
                    <span className="font-semibold">{props.editing ? <input type="text" value={props.father} onChange={props.handleFatherChange} /> : props.data.fatherName}</span> was the bonafide student of class&nbsp;
                    <span className="font-semibold">{props.editing ? <input type="text" value={props.classs} onChange={props.handleClassChange} /> : props.data.currentClass}</span> of this school in session&nbsp; 
                    <span className="font-semibold">{props.editing ? <input type="text" value={props.editSession} onChange={props.handleSessionChange} /> : props.sessions}</span>. Her/His behaviour in the school during her/his tenure of studies in that session was satisfactory.
                </p>
                <p className="mt-4">Thanks</p>
            </div>
            <div className="flex justify-between text-center mt-16 mobile:max-tablet:text-xs">
                <div>
                    <p>Mr./Mrs.....</p>
                    <p>Prepared By</p>
                </div>
                <div>
                    <p>Mr./Mrs.....</p>
                    <p>Checked By</p>
                </div>
                <div>
                    <p>Mr./Mrs.....</p>
                    <p>Sign of Principal</p>
                </div>
            </div>
        </div>
    );
});

const Character = () => {
    const { tc, class: className, section: secttions, session: sessions } = useParams();
    const ref1 = useRef();
    const [data, setData] = useState([]);
    const { authState } = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const [father, setFather] = useState('');
    const [classs, setClass] = useState('');
    const [editSession, setEditSession] = useState('');

    useEffect(() => {
        fetchUserCc();
    }, []);

    const fetchUserCc = async () => {
        try {
            const response = await axios.get(`${BASE_URL_Login}/terminate/terminatedSingle?session=${sessions}&id=${tc}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            if (response.status === 200) {
                setData(response.data);
                setName(response.data.name);
                setFather(response.data.fatherName);
                setClass(response.data.currentClass);
                setEditSession(sessions);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        setData(prevData => ({
            ...prevData,
            name: name,
            fatherName: father,
            currentClass: classs,
            session: editSession 
        }));

        setEditing(false);
    };

    const handleCancel = () => {
        setEditing(false);
        setName(data.name);
        setFather(data.fatherName);
        setClass(data.currentClass);
        setEditSession(sessions);
    };

    const handlePrint = async () => {
        const page1 = ref1.current;
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        const marginTop = pageHeight * 0.15;
        const marginLeft = 5;

        const addPageContent = async (element) => {
            try {
                await Promise.all(Array.from(element.getElementsByTagName('img')).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(resolve => { img.onload = resolve; });
                }));

                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                });

                const imgData = canvas.toDataURL('image/png');
                const imgWidth = pageWidth - 2 * marginLeft;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth, imgHeight);
            } catch (error) {
                console.error('Error capturing element with html2canvas:', error);
            }
        };

        try {
            await addPageContent(page1);
            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div className="tablet:max-laptop:max-w-xl pt-20 px-60 w-full">
            <div className="w-full justify-center">
                <div className='flex justify-between items-center'>
                    <div className="text-xl font-medium mb-4 justify-center w-fit rounded-lg shadow-md py-1 px-3 mt-3 bg-secondary text-black hover:bg-blue-400 cursor-pointer hover:text-white" onClick={handlePrint}>
                        Download
                    </div>
                    {editing ? (
                        <>
                            <div className="text-xl font-medium mb-4 justify-center w-fit rounded-lg shadow-md py-1 px-3 mt-3 bg-secondary text-black hover:bg-blue-400 cursor-pointer hover:text-white" onClick={handleSave}>
                                Save
                            </div>
                            <div className="text-xl font-medium mb-4 justify-center w-fit rounded-lg shadow-md py-1 px-3 mt-3 bg-secondary text-black hover:bg-blue-400 cursor-pointer hover:text-white" onClick={handleCancel}>
                                Cancel
                            </div>
                        </>
                    ) : (
                        <div className="text-xl font-medium mb-4 justify-center w-fit rounded-lg shadow-md py-1 px-3 mt-3 bg-secondary text-black hover:bg-blue-400 cursor-pointer hover:text-white" onClick={handleEdit}>
                            Edit
                        </div>
                    )}
                </div>
                <PrintableComponent 
                    ref={ref1} 
                    data={data} 
                    sessions={sessions} 
                    editing={editing}
                    name={name}
                    father={father}
                    classs={classs}
                    editSession={editSession}
                    handleNameChange={(e) => setName(e.target.value)}
                    handleFatherChange={(e) => setFather(e.target.value)}
                    handleClassChange={(e) => setClass(e.target.value)}
                    handleSessionChange={(e) => setEditSession(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Character;
