import { useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from 'date-fns';

const HorizontalCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  const currentDate = new Date();
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
  
  return (
    <div className="flex w-full overflow-x-auto">
      {dateRange.map((date, index) => (
        <div
          key={index}
          className={`flex flex-col items-center mx-2 px-3 py-3 text-gray-800 hover:bg-gray-200 rounded-full w-12 h-12 justify-center cursor-pointer ${
            selectedDate && isSameDay(date, selectedDate)
              ? 'bg-secondary '
              : ''
          }`}
          onClick={() => handleDateClick(date)}
        >
          <span className="font-semibold">{format(date, 'd')}</span>
          <span className="text-sm text-gray-500">{format(date, 'EEE')}</span>
        </div>
      ))}
    </div>
  );
};

export default HorizontalCalendar;