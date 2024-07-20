import React from "react";

export default function SearchBar({ handleClassChange, handleSessionChange, handleMonthChange, handleSectionChange, classValue, session, month, section }) {
    return (

        <div className="flex mobile:max-tablet:flex-col w-full mobile:max-tablet:w-full mobile:max-tablet:gap-2 mobile:max-tablet:p-2 ">
            <select
                id="class"
                name="class"
                value={classValue}
                onChange={handleClassChange}
                className="rounded-lg shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg overflow-auto mobile:max-tablet:mr-0 flex-1 "
            >
                <option value="">Select Class</option>
                <option value="Pre-Nursery">Pre-Nursery</option>
                <option value="Nursery">Nursery</option>
                <option value="L.K.J">L.K.J</option>
                <option value="U.K.J">U.K.J</option>
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
            <select
                id="session"
                name="session"
                value={session}
                onChange={handleSessionChange}
                className="rounded-lg shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg mobile:max-tablet:mr-0 flex-1"
            >
                <option value="">Select Term</option>
                <option value="Term1">Term 1</option>
                <option value="Term2">Term 2</option>
            </select>
            <select
                id="month"
                name="month"
                value={month}
                onChange={handleMonthChange}
                className="rounded-lg shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg mobile:max-tablet:mr-0 flex-1"
            >
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
            </select>
            <select
                id="section"
                name="section"
                value={section}
                onChange={handleSectionChange}
                className="rounded-lg shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg mobile:max-tablet:mr-0 flex-1"
            >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
                <option value="I">I</option>
            </select>
        </div>

    );
}
