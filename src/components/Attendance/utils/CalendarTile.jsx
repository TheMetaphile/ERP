import React, { useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSunday,  } from 'date-fns';

const Calendar = () => {
    
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
    const handleClick = (date) => {
    
      setSelectedDate(date);
    };
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  // Calculate the year and month for the previous month
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  // Create a new Date object for the first day of the previous month
  const prevMonthDate = new Date(prevMonthYear, prevMonth, 1);
  
  const getDateRange=(date)=>{
    console.log(date);
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }
  const currentMonthRange = getDateRange(currentDate);
  const prevMonthRange = getDateRange(prevMonthDate);
  const startDateDay = currentMonthRange[0].getDay();
  const monthName = format(currentDate, 'MMM yyyy');
  const weekdayShortNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const negativeNum =  -(weekdayShortNames.indexOf(weekdayShortNames[startDateDay])-1) ;
  const finalDateRange = [...prevMonthRange.slice(negativeNum),...currentMonthRange];
  console.log(`prev ${finalDateRange}`)
  return (
    <div className="flex flex-col w-full h-full flex-grow px-3 py-4 bg-white rounded-lg shadow-md ">
      <div className="flex justify-between items-center mb-4 text-lg font-semibold">
        {monthName}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {weekdayShortNames.map((day, index) => (
          <div key={index} className={`font-normal text-center ${index === 6 ? "text-gray-400" : "text-black"}`}>
            {day}
          </div>
        ))}
        {finalDateRange.map((date, index) => {
          return (
            <div
              key={index}
              className={`text-center py-2 rounded-full ${
                !isSameMonth(date, currentDate)
                  ? 'text-gray-400'
                  : (selectedDate.getTime() == date.getTime() && !isSunday(selectedDate)) ? "text-black bg-secondary" :isSunday(date)
                  ? 'text-gray-400 hover:bg-gray-200 cursor-pointer'
                  : 'text-gray-800 hover:bg-gray-200 cursor-pointer'
              }`}
              onClick={()=>handleClick(date)}
            >
              <div>{format(date, 'dd')}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
