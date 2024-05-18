import React, { useState } from "react";
import StudentsFees from "./StudentsFees";
import TeacherSalary from "./TeacherSalary";
import SearchBar from "./SearchBar";


const RoleCard = () => {
    const [selectedRole, setSelectedRole] = useState('teacher');

    const selectRole = (role) => {
        setSelectedRole(role);
    };
    const details=[
        {id:"101",name:"Ram",subjects:"Hindi,Maths",workingDays:"26/30",bonus:"Rs 1500",deduction:"Rs 500",salary:"Rs 15000",TotalAmt:"Rs 16000",status:"paid"},
        {id:"101",name:"Ram",subjects:"Hindi,Maths",workingDays:"26/30",bonus:"Rs 1500",deduction:"Rs 500",salary:"Rs 15000",TotalAmt:"Rs 16000",status:"paid"},
        {id:"101",name:"Ankit",subjects:"Hindi,Maths",workingDays:"26/30",bonus:"Rs 1500",deduction:"Rs 500",salary:"Rs 15000",TotalAmt:"Rs 16000",status:"paid"},
        {id:"101",name:"Ram",subjects:"Hindi,Maths",workingDays:"26/30",bonus:"Rs 1500",deduction:"Rs 500",salary:"Rs 15000",TotalAmt:"Rs 16000",status:"paid"},
        {id:"101",name:"Ram",subjects:"Hindi,Maths",workingDays:"26/30",bonus:"Rs 1500",deduction:"Rs 500",salary:"Rs 15000",TotalAmt:"Rs 16000",status:"paid"},
        {id:"989",name:"Ram",subjects:"Hindi,Maths",workingDays:"26/30",bonus:"Rs 1500",deduction:"Rs 500",salary:"Rs 15000",TotalAmt:"Rs 16000",status:"paid"},
        {id:"101",name:"Ram",subjects:"Hindi,Maths",workingDays:"26/30",bonus:"Rs 1500",deduction:"Rs 500",salary:"Rs 15000",TotalAmt:"Rs 16000",status:"paid"},
        {id:"101",name:"Ram",subjects:"Hindi,Maths",workingDays:"26/30",bonus:"Rs 1500",deduction:"Rs 500",salary:"Rs 15000",TotalAmt:"Rs 16000",status:"unpaid"},
    ];

    const studentDetails=[
        {id:"12",name:"Ankit",misc:"Rs 100",total:"Rs 12300",payed:"Rs 5000",pending:"Rs7300"},
        {id:"98",name:"Ankit",misc:"Rs 100",total:"Rs 12300",payed:"Rs 5000",pending:"Rs7300"},
        {id:"12",name:"Ankit",misc:"Rs 100",total:"Rs 12300",payed:"Rs 5000",pending:"Rs7300"},
        {id:"12",name:"ram",misc:"Rs 100",total:"Rs 12300",payed:"Rs 5000",pending:"Rs7300"},
        {id:"12",name:"Ankit",misc:"Rs 100",total:"Rs 12300",payed:"Rs 5000",pending:"Rs7300"},
        {id:"12",name:"Ankit",misc:"Rs 100",total:"Rs 12300",payed:"Rs 5000",pending:"Rs7300"},
        {id:"12",name:"Ankit",misc:"Rs 100",total:"Rs 12300",payed:"Rs 5000",pending:"Rs7300"},
        {id:"12",name:"Ankit",misc:"Rs 100",total:"Rs 12300",payed:"Rs 5000",pending:"Rs7300"},
    ]
     
    const [name,setName]=useState('');
    const [id,setId]=useState('');
    const handleIdChange=(e)=>{
        setId(e.target.value);
    }
    const handleNameChange=(e)=>{
        setName(e.target.value);
    }
    const filteredStudentData=studentDetails.filter(detail=>{
        const idMatch=detail.id.includes(id);
        const nameMatch=detail.name.toLowerCase().includes(name.toLowerCase())
        return idMatch && nameMatch;
    })
    const filteredTeacherData=details.filter(detail=>{
        const idMatch=detail.id.includes(id);
        const nameMatch=detail.name.toLowerCase().includes(name.toLowerCase())
        return idMatch && nameMatch;
    })

    return (
        <div className="bg-white p-4 rounded-lg  w-full flex flex-col mt-4">
            <div><SearchBar name={name} Id={id} handleIdChange={handleIdChange} handleNameChange={handleNameChange}/></div>
            <div className="flex justify-between mt-4">
            <div className="flex gap-10  mobile:max-tablet:gap-4">
                <button className={`text-xl  ${selectedRole === 'student' ? 'bg-blue-400' : 'bg-white'} px-2 rounded-lg`}
                    onClick={() => selectRole('student')}>Student</button>
                <button className={`text-xl  ${selectedRole === 'teacher' ? 'bg-blue-400' : 'bg-white'} px-2 rounded-lg`}
                    onClick={() => selectRole('teacher')}>Teacher</button>
            </div>
            <div><button className="rounded-lg text-xl border px-2 bg-blue-400 hover:bg-blue-200">Edit</button></div>
            </div>
       
            <div className="full h-1 border-b-2 border-gray-300"></div>
            <div className="mt-2">
                {selectedRole === 'teacher' && (
                    <div className="">
                        {filteredStudentData.length===0?(
                            <TeacherSalary details={details}/>
                        ):(
                            <TeacherSalary details={filteredTeacherData}/>
                        )}
                    </div>
                )}
                {selectedRole === 'student' && (
                    <div className="">
                        {filteredStudentData.length===0?(
                            <StudentsFees details={studentDetails}/>
                        ):(
                            <StudentsFees details={filteredStudentData}/>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoleCard;
