import React, { useState } from "react";
import SearchBar from "./utils/SearchBar";
import BookList from "./utils/BookList";

export default function AllBooks(){
    const[id,setId]=useState('');
    const [subject,setSubject]=useState('');
    const [writer,setWriter]=useState('');
    const handleIdChange=(e)=>{
        setId(e.target.value);
    }
    const handleSubjectNameChange=(e)=>{
        setSubject(e.target.value);
    }
    const handleAuthorNameChange=(e)=>{
       setWriter(e.target.value);
    }
    const bookList = [
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
    ];

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
            <button className="text-lg rounded-lg shadow-lg px-4 border bg-blue-400 hover:bg-blue-100">Add a New Book</button>
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
       </div>
    )
}