import React, { useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSunday, } from 'date-fns';

const Calendar = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const eventList = [currentDate.toLocaleDateString()];
  const eventTitle = {};
  const handleClick = (date) => {
    console.log("\n eventtile" + JSON.stringify(eventTitle));
    console.log("\n eventtile" + eventList[0]);
    setSelectedDate(date);
  };
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Calculate the year and month for the previous month
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  // Create a new Date object for the first day of the previous month
  const prevMonthDate = new Date(`${prevMonthYear}-${prevMonth}-1`);

  const getDateRange = (date) => {
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }

  const currentMonthRange = getDateRange(currentDate);
  const prevMonthRange = getDateRange(prevMonthDate);
  const startDateDay = currentMonthRange[0].getDay();
  console.log('startDateDAy',startDateDay)
  const monthName = format(currentDate, 'MMMM yyyy');
  const weekdayShortNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var negativeNum;
  switch (startDateDay){
    case 0:
      negativeNum=-6;
      break;
    case 1:
      negativeNum=0;
      break;
      case 2:
      negativeNum=-1;
      break;
      case 3:
      negativeNum=-2;
      break;
      case 4:
      negativeNum=-3;
      break;
      case 5:
      negativeNum=-4;
      break;
      case 6:
      negativeNum=-5;
      break;
  }
  const finalDateRange = negativeNum==0 ? currentMonthRange : [...prevMonthRange.slice(negativeNum), ...currentMonthRange];
  return (
    <div className="flex flex-col  border border-gray-300 w-full bg-white rounded-lg shadow-md my-2 px-2">
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
              className={`items-center text-center py-2 rounded-full ${!isSameMonth(date, currentDate)
                ? 'text-gray-400'
                : (selectedDate.getTime() == date.getTime() && !isSunday(selectedDate)) ? "text-black bg-secondary" : isSunday(date)
                  ? 'text-gray-400 hover:bg-gray-200 cursor-pointer'
                  : 'text-gray-800 hover:bg-gray-200 cursor-pointer'
                }`}
              onClick={() => handleClick(date)}
            >
              <div>{format(date, 'dd')}</div>
              <div className=' mobile:max-tablet:text-xxs text-xs'>
                {eventList.includes(date.toLocaleDateString()) ? 'Holiday' : ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
