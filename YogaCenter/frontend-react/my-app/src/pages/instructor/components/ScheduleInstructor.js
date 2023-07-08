import React, { useState, useEffect } from "react";

import "../css/scheduleInstructor.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { URL_API } from "../../../api/ConstDefine";

import axios from "axios";
function ScheduleInstructor() {
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
          nextDate.setMonth(nextMonth);
          nextDate.setDate(1);
        } else {
          nextDate.setMonth(nextMonth);
          nextDate.setDate(currentDay + 7 - (isCurrentMonth30Days ? 30 : 31));
        }
      }

      return new Date(nextDate);
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
          beforeDate.setMonth(beforeMonth);
          beforeDate.setDate(isbeforeMonth30Days ? 30 : 31);
        } else {
          beforeDate.setMonth(beforeMonth);
          beforeDate.setDate(currentDay - 7 + (isbeforeMonth30Days ? 30 : 31));
        }
      }

      return new Date(beforeDate);
    });
  };

  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthName = monthName[currentMonth - 1];
  const time = ["06:00", "07:00", "15:00 ", "18:00 "];
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  //Get Data
  const [scheduleData, setScheduleData] = useState({});
  const [classData, setClassData] = useState({});
  const [courses, setCourse] = useState([]);
  const [lessonList, setLessonList] = useState([]);

  // Lấy Data Teacher nhé sửa lại cái Vinh comment tại đó là của Customer nhé 

  
//   const savedUserData = localStorage.getItem("userData");
//   const userData = savedUserData ? JSON.parse(savedUserData) : {};
//   const customerId = userData.customerId;
//   let classCustomerAPI = URL_API + `ClassCustomer/getCustomer/${customerId}`;
//   // lấy invioce để lấy courses
//   let invoiceByCusIdAPI = URL_API + `Invoice/customer/${customerId}`;
//   let lessonByCusIDAPI =
//     URL_API + `CustomerLesson/getCusLessonByCusId/${customerId}`;
//   //getClassCustomer
//   console.log(customerId);
//   useEffect(() => {
//     axios
//       .get(classCustomerAPI)
//       .then((response) => {
//         const lessons = response.data;
//         const classInfo = lessons.map((lesson) => lesson.class);
//         setClassData(classInfo);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get(invoiceByCusIdAPI)
//       .then((res) => {
//         setCourse(res.data.map((item) => item.course));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [customerId]);
//   useEffect(() => {
//     axios
//       .get(lessonByCusIDAPI)
//       .then((res) => {
//         setLessonList(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [customerId]);
//   useEffect(() => {
//     if (classData.length > 0) {
//       let lessonClassAPI = URL_API + `Lesson/${classData[0].id}`;
//       axios
//         .get(lessonClassAPI)
//         .then((response) => {
//           setScheduleData(response.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   }, [classData]);

  return (
    <div className="week-schedule-container">
      <div className="schedule-box">
        <h1 style={{ color: "white" }}>
          <KeyboardDoubleArrowLeftIcon onClick={goTobeforeMonth} />
          <span>{currentMonthName}</span>
          <span>{currentYear}</span>
          <KeyboardDoubleArrowRightIcon onClick={goToNextMonth}>
            Next Month
          </KeyboardDoubleArrowRightIcon>
        </h1>

        <table className="schedule-table-customer">
          <thead>
            <tr>
              <th
                style={{
                  background:
                    "linear-gradient(90deg, #d2608d, rgb(136 101 136 / 65%))",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  width: "125px",
                }}
              >
                <CalendarMonthIcon
                  style={{ color: "white", fontSize: "40px" }}
                />
              </th>
              {days.map((day, index) => {
                const currentDateCopy = new Date(currentDate);
                currentDateCopy.setDate(
                  currentDateCopy.getDate() -
                    currentDateCopy.getDay() +
                    index +
                    1
                );
                const currentDay = currentDateCopy.getDate();
                const currentMonthNumber = currentDateCopy.getMonth() + 1;
                return (
                  <th key={day}>
                    <div className="day-header">
                      <div className="day-name">
                        <span>{day}</span>
                      </div>
                      <div className="day-date">
                        <span className="date">{currentDay}</span>
                        <span>/</span>
                        <span className="month">{currentMonthNumber}</span>
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {time.map((timeSlot) => (
              <tr key={timeSlot}>
                <td
                  style={{
                    background:
                      "linear-gradient(90deg, rgb(183 159 181), rgb(209 191 209 / 27%))",
                  }}
                >
                  <h1
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: "25px",
                      fontWeight: "700",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {timeSlot}
                  </h1>
                </td>

                {days.map((day, index) => {
                  //date of table
                  const currentDateCopy = new Date(currentDate);
                  currentDateCopy.setDate(
                    currentDateCopy.getDate() -
                      currentDateCopy.getDay() +
                      index +
                      1
                  );
                  const currentDayTable = currentDateCopy.getDate();
                  const currentMonthTable = currentDateCopy.getMonth() + 1;
                  const currentYearTable = currentDateCopy.getFullYear();

                  const lessonMatch = lessonList.find((lesson) => {
                    const lessonDate = new Date(lesson.lesson.lessonDate);
                    const apiTime = new Date(lesson.lesson.shift.timeStart);
                    const rowDate = new Date();
                    rowDate.setHours(Number(timeSlot.split(":")[0]), 0, 0, 0);
                    if (
                      lessonDate.getDate() === currentDayTable &&
                      lessonDate.getMonth() === currentMonthTable - 1 &&
                      lessonDate.getFullYear() === currentYearTable &&
                      rowDate.getHours() === apiTime.getHours()
                    ) {
                      return lesson;
                    } else {
                      return undefined;
                    }
                  });
                  if (lessonMatch !== undefined) {
                    return (
                      <td key={`${day}-${timeSlot}`}>
                        <div className="lessonDay">
                          <div className="lesson-details">
                            <p style={{ color: "##47004e" }}>
                              name course:{" "}
                              {
                                lessonMatch.lesson.class.course
                                  .courseDescription
                              }
                            </p>
                            <p style={{ color: "##47004e" }}>
                              Name class: {lessonMatch.lesson.class.className}
                            </p>
                            <p style={{ color: "##47004e" }}>
                              Room: {lessonMatch.lesson.room.roomDetail}
                            </p>
                            {lessonMatch.attendance === 2 ? (
                              <p style={{ color: "red" }}>Not get</p>
                            ) : lessonMatch.attendance === 1 ? (
                              <p style={{ color: "green" }}>Attendence</p>
                            ) : (
                              <p style={{ color: "red" }}>Absent</p>
                            )}
                          </div>
                        </div>
                      </td>
                    );
                  } else {
                    return <td key={`${day}-${timeSlot}`}></td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScheduleInstructor;