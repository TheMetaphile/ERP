import React from "react";
import SearchBar from "./utils/SearchBar";
import PromotedStudentsDetails from "./utils/PromotedStudentsDetails";

export default function StudentPromotion(){
    const students = [
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1006', name: "Alice", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1004', name: "bob", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Detained' },
        { id: '1002', name: "Abhishek", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1055', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1032', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1006', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
        { id: '1007', name: "Avni", class: "XII", section: "A", marks: "900", gpa: "9", remark: 'Promoted' },
    ];
    return(
        <div className="flex flex-col w-full mt-4">
           <div><h1 className="text-xl mx-4">All Students Data</h1></div>
           <div className="mt-2">
            <SearchBar/>
           </div>
           <div className="mx-2">
           <PromotedStudentsDetails students={students}/>
           </div>
        </div>
    )
}