import React, { useState } from "react";
import SearchBar from "./utils/SearchBar";
import BookList from "./utils/BookList";

export default function AllBooks(){
    const[id,setId]=useState('');
    const [subject,setSubject]=useState('');
    const [writer,setWriter]=useState('');
    const [bookList, setBookList] = useState([
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Avni", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Maths", writer:"ram", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"English", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '7707', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '9007', name: "Hindi", subject:"history", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '8007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1005', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
    ]);
    const handleIdChange=(e)=>{
        setId(e.target.value);
    }
    const handleSubjectNameChange=(e)=>{
        setSubject(e.target.value);
    }
    const handleAuthorNameChange=(e)=>{
       setWriter(e.target.value);
    }

    const [popUp, setPopUp] = useState(false);
    const handleClick = () => {
        setPopUp(!popUp);
    }
    const handleClosePopup = () => {
        setPopUp(false);
    }
    const [bookName, setBookName] = useState('');
    const [bookId, setBookId] = useState(['']);
    const [bookSubject,setBookSubject]=useState('');
    const[bookWriter,setBookWriter]=useState('');
    const[bookClass,setBookClass]=useState('');
    const[bookPublished,setBookPublished]=useState('');
    const[bookUpload,setBookUpload]=useState('');




    // Handle form submission, e.g., send data to backend
    const handleSubmit = (e) => {
        e.preventDefault();
        const newBook = { 
            id: bookId, 
            name: bookName, 
            subject: bookSubject, 
            writer: bookWriter, 
            class: bookClass, 
            published: bookPublished, 
            upload: bookUpload 
        };
        const updatedBookList = [...bookList, newBook];
        setBookList(updatedBookList);
        setBookName('');
        setBookId('');
        setBookSubject('');
        setBookWriter('');
        setBookClass('');
        setBookPublished('');
        setBookUpload('');
        setPopUp(false);
    };

    const filteredBooks=bookList.filter(book=>{
        const idMatch=book.id.includes(id);
        const authorMatch=book.writer.toLowerCase().includes(writer.toLowerCase());
        const subjectMatch=book.subject.toLowerCase().includes(subject.toLowerCase());
        return idMatch && authorMatch && subjectMatch;
    })

    return(
       <div className="flex flex-col">
        <div className="flex justify-between">
        <div className="text-2xl mx-8 mt-4">
            <h1>All Books</h1>
        </div>
        <div className="mt-4 mx-4">
            <button className="text-lg rounded-lg shadow-lg px-4 border bg-blue-400 hover:bg-blue-100" onClick={handleClick}>Add a New Book</button>
        </div>
        </div>
         <div className="mt-4 mx-2">
            <SearchBar handleAuthorNameChange={handleAuthorNameChange} handleIdChange={handleIdChange} handleSubjectNameChange={handleSubjectNameChange} subjectName={subject} id={id} authorName={writer}/>
         </div>
         <div className="mx-2">

            {
                filteredBooks.length==0?(
                    <BookList books={bookList}/>
                ):(
                    <BookList books={filteredBooks}/>
                )
            }
         </div>
         {popUp && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg p-6 w-1/4 mt-10">
                        <h1 className="text-xl mb-4">Add New Book</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="bookName" className="block text-sm font-medium text-gray-700">Book Name:</label>
                                <input
                                    id="bookName"
                                    name="bookName"
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={bookName}
                                    onChange={(e) => setBookName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bookid" className="block text-sm font-medium text-gray-700">Book ID:</label>
                                <input
                                    id="bookId"
                                    name="bookId"
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={bookId}
                                    onChange={(e) => setBookId(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bookSubject" className="block text-sm font-medium text-gray-700">Book's Subject:</label>
                                <input
                                    id="bookSubject"
                                    name="bookSubject"
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={bookSubject}
                                    onChange={(e) => setBookSubject(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bookWriter" className="block text-sm font-medium text-gray-700">Book's Writer:</label>
                                <input
                                    id="bookSubject"
                                    name="bookSubject"
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={bookWriter}
                                    onChange={(e) => setBookWriter(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bookClass" className="block text-sm font-medium text-gray-700">Book's Class:</label>
                                <input
                                    id="bookClass"
                                    name="bookClass"
                                    type="text"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={bookClass}
                                    onChange={(e) => setBookClass(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bookPublished" className="block text-sm font-medium text-gray-700">Book's Published Date:</label>
                                <input
                                    id="bookDate"
                                    name="bookDate"
                                    type="date"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={bookPublished}
                                    onChange={(e) => setBookPublished(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bookUpload" className="block text-sm font-medium text-gray-700">Book's Upload Date:</label>
                                <input
                                    id="bookUploadDate"
                                    name="bookUploadDate"
                                    type="date"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={bookUpload}
                                    onChange={(e) => setBookUpload(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSubmit}>Submit</button>
                                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleClosePopup}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>


            )
            }
       </div>
    )
}