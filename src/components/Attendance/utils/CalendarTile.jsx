import React, { useContext, useEffect, useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSunday, } from 'date-fns';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';


const Calendar = ( {month,year}) => {
  const { authState } = useContext(AuthContext);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://attendance-api-lako.onrender.com/studentAttendance/fetch/student?month=${month}&year=${year}`, {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          }
        });
        setData(response.data)
      } catch (error) {
        console.error("Error fetching student month attendance:", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchStudents();
  }, [authState.accessToken]);
  const currentDate = new Date(`${year}-${month}-01`);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const handleClick = (date) => {
    setSelectedDate(date);
  };


  // Calculate the year and month for the previous month
  const prevMonthYear = month === 1 ? year - 1 : year;
  const prevMonth = month === 1 ? 12 : month -1;
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
  //console.log("final range",finalDateRange);
  const getStatusDotColor = (date) => {
    // const formattedDate =  format(date, 'yyyy-MM-dd') ;
    const formattedDate1 = format(date, 'dd/MM/yyyy');
    const formattedDate2 = format(date, 'yyyy-MM-dd');
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
    <div className="flex flex-col w-full h-full flex-grow px-3 py-4 bg-white border border-gray-300 rounded-lg shadow-md ">
      <div className="flex justify-between items-center mb-4 text-lg font-semibold">
        {monthName}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {weekdayShortNames.map((day, index) => (
          <div key={index} className={`font-normal text-center ${index === 6 ? "text-gray-400" : "text-black  rounded-lg bg-secondary"}`}>
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
                  ? 'text-black bg-blue-100'
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
