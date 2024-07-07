import React, { useState, useContext, useEffect } from "react";
import CalendarTile from "./CalendarTile";


export default function TeacherCalendar() {

  const currentDate = new Date();

  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const months = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ];

  const years = Array.from({ length: 30 }, (v, i) => ({
    value: new Date().getFullYear() - 15 + i,
    label: new Date().getFullYear() - 15 + i,
  }));

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);

  };

  return (
    <div className=" flex flex-col w-full overflow-y-auto items-start px-2 mb-1 pb-4 no-scrollbar">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-medium">Attendance</h1>
        <div>

          <select
            id="month-selector"
            value={selectedMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="border rounded p-2 mx-2"
          >
            <option value="" disabled>Select a month</option>
            {months.map((month, index) => (
              <option key={index} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          <select
            id="year-selector"
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="border rounded p-2 mx-2"
          >
            <option value="" disabled>Select a year</option>
            {years.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full h-full mt-3">
        <CalendarTile month={selectedMonth} year={selectedYear} />
      </div>

    </div>
  )
}
