import React, { useState } from 'react';
import '../css/ScheduleCustomer.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function ScheduleCustomer() {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const is30Days = (month) => {
    const months30Days = [4, 6, 9, 11]; 
    return months30Days.includes(month);
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextDate = new Date(prevDate);
      const currentMonth = nextDate.getMonth();
      const currentDay = nextDate.getDate();

      if (currentDay <= 23) {
        nextDate.setDate(currentDay + 7);
      } else {
        const isCurrentMonth30Days = is30Days(currentMonth + 1);
        const nextMonth = currentMonth + 1;

        if ((currentDay === 24 && isCurrentMonth30Days) || currentDay === 25) {
        
          nextDate.setMonth(nextMonth + 1);
          nextDate.setDate(1);
        } else {
        
          nextDate.setMonth(nextMonth);
          nextDate.setDate(currentDay + 7 - (isCurrentMonth30Days ? 30 : 31));
        }
      }

      return nextDate;
    });
  };

  const goTobeforeMonth = () => {
    setCurrentDate((prevDate) => {
      const beforeDate = new Date(prevDate);
      const currentMonth = beforeDate.getMonth();
      const currentDay = beforeDate.getDate();

      if (currentDay >= 8) {
        beforeDate.setDate(currentDay - 7);
      } else {
        const isbeforeMonth30Days = is30Days(currentMonth - 1);
        const beforeMonth = currentMonth - 1;

        if (currentDay === 7 || (currentDay === 6 && isbeforeMonth30Days)) {
          
          beforeDate.setMonth(beforeMonth - 1);
          beforeDate.setDate(isbeforeMonth30Days ? 30 : 31);
        } else {
         
          beforeDate.setMonth(beforeMonth);
          beforeDate.setDate(
            currentDay - 7 + (isbeforeMonth30Days ? 30 : 31)
          );
        }
      }

      return beforeDate;
    });
  };

  const monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const currentMonthName = monthName[currentMonth - 1];

  const [scheduleData, setScheduleData] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const time = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="week-schedule-container">
      <h1>
        <ChevronLeftIcon onClick={goTobeforeMonth} />
        <span>{currentMonthName}</span>
        <span>{currentYear}</span>
        <NavigateNextIcon onClick={goToNextMonth}>Next Month</NavigateNextIcon>
      </h1>

      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((day, index) => (
              <th key={day}>
                <div className="day-header">
                  <div className="day-name">{day}</div>
                  <div className="day-date">
                    <span className="date">
                      {currentDate.getDate() + index <= (is30Days(currentMonth) ? 30 : 31)
                        ? currentDate.getDate() + index
                        : currentDate.getDate() + index - (is30Days(currentMonth) ? 30 : 31)}
                    </span>/
                    <span className="month">
                      {currentDate.getDate() + index <= (is30Days(currentMonth) ? 30 : 31) ? currentMonth : currentMonth + 1}
                    </span>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {time.map((timeSlot) => (
            <tr key={timeSlot}>
              <td>{timeSlot}</td>
              {days.map((day) => (
                <td key={`${day}-${timeSlot}`}>
                    {/* Data bỏ đây á nghe */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleCustomer;
