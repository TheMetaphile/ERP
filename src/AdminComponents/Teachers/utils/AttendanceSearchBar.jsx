import React from "react";

export default function AttendanceSearchBar({ handleNameChange, handleYearChange, handleMonthChange, name, year, month }) {
    return (
        <div className="flex w-full justify-between items-center self-center h-fit rounded-xl shadow-md border-2 px-2 py-2 mb-3 mobile:max-tablet:w-full">
            <div className="flex">
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Search Teacher"
                    className="rounded-lg shadow-md mr-3 px-3 py-1 border-gray-200 text-lg mobile:max-tablet:w-1/2  placeholder-sm:text-sm"
                />
                <div className="flex gap-4 mt-4">
                    <label className="block text-lg mb-2">
                        Year
                        <select id="year" value={year} onChange={handleYearChange} className="rounded-lg mr-3 shadow-md px-3 py-1 border-2 border-gray-200 text-lg mobile:max-tablet:w-1/2 mobile:max-tablet:text-sm">
                            <option value="">Select Year</option>
                            <option value="2024">2024</option>
                            <option value="2011">2011</option>
                            <option value="2012">2012</option>
                            <option value="2013">2013</option>
                            <option value="2014">2014</option>
                        </select>
                    </label>
                    <label className="block text-lg mb-2">
                        Month
                        <select id="month" value={month} onChange={handleMonthChange} className="rounded-lg mr-3 shadow-md px-3 py-1 border-2 border-gray-200 text-lg mobile:max-tablet:w-1/2 mobile:max-tablet:text-sm">
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
                    </label>
                </div>
            </div>
            <button className="rounded-lg shadow-md px-3 py-1 border-2 border-gray-200 text-lg bg-secondary">
                Search
            </button>
        </div>
    )
}
