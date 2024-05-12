import React from "react";
import SearchBar from "./utils/SearchBar";
import BookList from "./utils/BookList";

export default function AllBooks(){
    const bookList = [
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
        { id: '1007', name: "Hindi", subject:"Hindi", writer:"Abhishek", class:"II", published: "09-10-2012", upload: '11-09-2010' },
    ];
    return(
       <div className="flex flex-col">
        <div className="text-2xl mx-8 mt-4">
            <h1>All Books</h1>
        </div>
         <div className="mt-4">
            <SearchBar/>
         </div>
         <BookList books={bookList}/>
       </div>
    )
}