import React, { useState } from "react";
import ParentsList from "./utils/ParentsList";
import SearchBar from "./utils/SearchBar";

export default function AllParents(){
    const [number,setNumber]=useState('');
    const [name,setName]=useState('');
    const handleNameChange=(e)=>{
        setName(e.target.value);
    }
    const handleNumberChange=(e)=>{
        setNumber(e.target.value)
    }
    const details = [
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Avni', father: "Arjun", mother: "Sakshi", contact: "+91-89298989",email: "a123@gmail.com"},
        { child:'Abhishek', father: "Arjun", mother: "Sakshi", contact: "+91-989000000",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
        { child:'Alice', father: "Arjun", mother: "Sakshi", contact: "+91-989898989",email: "a123@gmail.com"},
    ];
    const filteredParents = details.filter(detail => {
        const nameMatch = detail.child.toLowerCase().includes(name.toLowerCase());
        const numberMatch = detail.contact.includes(number);
        return nameMatch && numberMatch;
    });
    return(
        <>
         <div className="flex flex-col w-full mt-4">
           <div><h1 className="text-xl mx-4">Parents Data</h1></div>
           <div className="mt-2">
            <SearchBar handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} name={name} phoneNumber={number}/>
           </div>
           <div className="mx-2">
           {
            filteredParents.length===0?(
                <ParentsList details={details}/>
            ):(
                <ParentsList details={filteredParents}/>
            )
           }
           </div>
        </div>
        </>
    )
}