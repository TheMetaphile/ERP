import React, { useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSunday, parse, } from 'date-fns';


const Calendar = ({ data }) => {

  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const handleClick = (date) => {
    setSelectedDate(date);
  };
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth()+1;

  // Calculate the year and month for the previous month
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  // Create a new Date object for the first day of the previous month
  const prevMonthDate = new Date(prevMonthYear, prevMonth, 1);

  const getDateRange = (date) => {
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
  const negativeNum = -(weekdayShortNames.indexOf(weekdayShortNames[startDateDay]) - 1);
  const finalDateRange = [...prevMonthRange.slice(negativeNum), ...currentMonthRange];
  console.log(`prev ${finalDateRange}`)

  const getStatusDotColor = (date) => {
    // const formattedDate =  format(date, 'yyyy-MM-dd') ;
    console.log(date, 'ppp')
    const formattedDate1 = format(date, 'dd/MM/yyyy');
    const formattedDate2 = format(date, 'yyyy-MM-dd');
    console.log(formattedDate1, 'pppsss')
    console.log(formattedDate2, 'pppaaaaaaa')

    // Check if the key exists in the data object
    const status = data[`${formattedDate1}`] || data[`${formattedDate2}`] || 'defaultValue';
    switch (status) {
      case 'Absent':
        return 'bg-red-300';
      case 'Present':
        return 'bg-green-300';
      case 'Leave':
        return 'bg-yellow-300';
      default:
        return 'bg-gray-200';
    }
  };

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
          const isCurrentMonth = isSameMonth(date, currentDate);
          const isSelectedDate = selectedDate.getTime() === date.getTime() && !isSunday(selectedDate);
          const isDateSunday = isSunday(date);
          const dotColor = getStatusDotColor(date);

          return (
            <div
              key={index}
              className={`flex justify-center text-center py-2 rounded-full relative ${!isCurrentMonth
                ? 'text-gray-400'
                : isSelectedDate
                  ? 'text-black bg-secondary'
                  : isDateSunday
                    ? 'text-red-500 hover:bg-gray-200 cursor-pointer'
                    : 'text-black hover:bg-gray-200 cursor-pointer'
                }`}
              onClick={() => handleClick(date)}
            >
              <div className={`${isCurrentMonth ? dotColor : "bg-white text-gray-400"}  rounded-full w-8 h-8 text-center `}>{format(date, 'dd')}</div>
              {dotColor && (
                <span
                  className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${dotColor}`}
                ></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
