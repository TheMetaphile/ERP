import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../../../Context/AuthContext";
import { BASE_URL_Login } from "../../../../Config";

export default function SearchBar({ handleClassChange, handleSectionChange,handleMonthChange, handlebothEventsCalled, Class, Section, Month }) {
    const { authState } = useContext(AuthContext);
    const [sectionsDetails, setSectionsDetails] = useState([]);

    const fetchSections = async (selectedClass) => {
        try {
            const response = await axios.post(`${BASE_URL_Login}/classTeacher/fetch/sections`, {
                accessToken: authState.accessToken,
                class: selectedClass,
            });
            console.log(response.data,'section')
            const sectionsDetail = response.data.sections.map(sectionObj => sectionObj.section); 
            setSectionsDetails(sectionsDetail);
        } catch (error) {
            console.error("Error while fetching section:", error);
        }
    };

    const handleClassChangeWithFetch = (e) => {
        const selectedClass = e.target.value;
        handleClassChange(e); 
        if (selectedClass) {
            fetchSections(selectedClass); 
        } else {
            setSectionsDetails([]);
        }
    };

    return (

        <div className="flex mobile:max-tablet:flex-col w-full mobile:max-tablet:w-full mobile:max-tablet:gap-2 mobile:max-tablet:p-2 ">
             <select id="class" value={Class} onChange={handleClassChangeWithFetch} className="rounded-lg shadow-md px-3 py-2 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-lg mr-3 mobile:max-tablet:mr-0 flex-1">
                    <option value="">Search by Class</option>
                    <option value="Pre-Nursery">Pre-Nursery</option>
                    <option value="Nursery">Nursery</option>
                    <option value="L.K.G">L.K.G</option>
                    <option value="U.K.G">U.K.G</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
                    <option value="9th">9th</option>
                    <option value="10th">10th</option>
                    <option value="11th">11th</option>
                    <option value="12th">12th</option>
                </select>

                <select id="section" value={Section} onChange={handleSectionChange} className="rounded-lg shadow-md px-3 py-2 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-lg mr-3 mobile:max-tablet:mr-0 flex-1">
                    <option value="">Search by Section</option>
                    {sectionsDetails.map((section, index) => (
                        <option key={index} value={section}>{section}</option>
                    ))}
                </select>
           
            <select
                id="month"
                name="month"
                value={Month}
                onChange={handleMonthChange}
                className="rounded-lg shadow-md mr-3 px-3 py-2 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-lg mobile:max-tablet:mr-0 flex-1"
            >
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
           
        </div>

    );
}
