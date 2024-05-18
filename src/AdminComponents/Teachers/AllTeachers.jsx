import React,{useState} from "react";
import TeacherStats from "./utils/TeacherStats";
import SearchBar from "./utils/SearchBar";
import TeacherCard from "./utils/TeacherCard";
import { chatLogo, profilelogo} from "./utils/images/index.js"


export default function AllTeachers(){
    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const userData = [
        { name: "Abhishek", role: "Teacher", subjects: ["Mathematics", "Science", "Computer"], profileLogo: profilelogo, chatLogo: chatLogo },
        { name: "Sakshi", role: "Teacher", subjects: ["Mathematics", "Science", "Computer"], profileLogo: profilelogo, chatLogo: chatLogo },
        { name: "Ram", role: "Teacher", subjects: ["Mathematics", "Science", "Computer"], profileLogo: profilelogo, chatLogo: chatLogo },
        { name: "Amit", role: "Teacher", subjects: ["Mathematics", "Science", "Computer"], profileLogo: profilelogo, chatLogo: chatLogo },
        { name: "mayank", role: "Teacher", subjects: ["Mathematics", "Science", "Computer"], profileLogo: profilelogo, chatLogo: chatLogo },
        { name: "Abhishek", role: "Teacher", subjects: ["Mathematics", "Science", "Computer"], profileLogo: profilelogo, chatLogo: chatLogo },
        { name: "Abhishek", role: "Teacher", subjects: ["Mathematics", "Science", "Computer"], profileLogo: profilelogo, chatLogo: chatLogo },
        { name: "Abhishek", role: "Teacher", subjects: ["Mathematics", "Science", "Computer"], profileLogo: profilelogo, chatLogo: chatLogo },
        { name: "Abhishek", role: "Teacher", subjects: ["Mathematics", "Science", "Computer"], profileLogo: profilelogo, chatLogo: chatLogo },

    ];
    const filteredTeachers = userData.filter(user => {
        const nameMatch = user.name.toLowerCase().includes(name.toLowerCase());
       
       return nameMatch;
    });
    return(
        <div className="flex flex-col mx-4">
        <div className="mt-4 mobile:max-tablet:w-full mobile:max-tablet:mx-2 mobile:max-tablet:my-8">
            <TeacherStats/>
        </div>
        <div className="mt-8 text-xl font-semibold">
            All Teachers Data
        </div>
        <div className="mt-4 ">
            <SearchBar handleNameChange={handleNameChange} name={name}/>
        </div>
        <div className="mt-4 ">
            {
                filteredTeachers.length===0?(<TeacherCard userData={userData} />)
                :
                ( <TeacherCard userData={filteredTeachers} />)
            }
           
        </div>
        </div>
    )
} 