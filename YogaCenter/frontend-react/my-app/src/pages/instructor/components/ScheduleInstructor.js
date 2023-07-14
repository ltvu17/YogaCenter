import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "../css/scheduleInstructor.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { URL_API } from "../../../api/ConstDefine";
import Button from '@mui/material/Button';
import axios from "axios";
import CheckAttendent from "./CheckAttendent";
function ScheduleInstructor() {
  //-----------------------------const-----------------------------
  const [userId, setUserId] = useCookies("userId");
  const [lesson, setLesson] = useState("");
  const [components, setComponent] = useState(false);
  const [lessonCheckAttendent, setLessonCheckAttendent] = useState();
  //-----------------------------API--------------------------------
  let lessonByUserId = URL_API + `Lesson/teacher/${userId.userId}`;
  //-----------------------------useEfect--------------------------
  useEffect(() => {
    axios
      .get(lessonByUserId)
      .then((res) => {
        setLesson(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //----------------------------clg----------------------------------
  // console.log(teacherData)
  // console.log(teacherData.id);
  // console.log(classTeacher === '' ? "" : classTeacher[1].id);
  console.log(lesson);
  // console.log(lesson[0] === undefined ? "" : lesson[0].class)
  // console.log(lessonByClassId);

  //-----------------------------Date-------------------------------
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const is30Days = (month) => {
    const months30Days = [4, 6, 9, 11];
    return months30Days.includes(month);
  };
  //--------------------------handlerClick--------------------------
  const handlerClickAttendent = (e) => {
    setLessonCheckAttendent(e);
    setComponent(true);
  };
  const handleBackClick = () => {
    setComponent(false);
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
  return (
    <div>
      {components === false ? (
        <div className="week-schedule-container">
          <div className="schedule-box">
            <h1 style={{ color: "black" }}>
              <div
                style={{
                  fontSize: "20px",
                  backgroundColor: "#bdded999",
                  borderRadius: "25px",
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <KeyboardDoubleArrowLeftIcon onClick={goTobeforeMonth} />
                <span>{currentMonthName}</span>
                <span>{currentYear}</span>
                <KeyboardDoubleArrowRightIcon onClick={goToNextMonth}>
                  Next Month
                </KeyboardDoubleArrowRightIcon>
              </div>
            </h1>

            <table className="schedule-table-customer">
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: "rgb(0 0 0 / 49%)",
                      padding: "10px",
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
                    <td style={{ backgroundColor: '#afb99e73'  }}>
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

                      const lessonMatch =
                        lesson === ""
                          ? undefined
                          : lesson.find((lesson) => {
                              const lessonDate = new Date(lesson.lessonDate);
                              const apiTime = new Date(lesson.shift.timeStart);
                              const rowDate = new Date();
                              rowDate.setHours(
                                Number(timeSlot.split(":")[0]),
                                0,
                                0,
                                0
                              );
                              if (
                                lessonDate.getDate() === currentDayTable &&
                                lessonDate.getMonth() ===
                                  currentMonthTable - 1 &&
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
                                <p style={{ padding: '10px',
                                        backgroundColor: '#d1b0b0',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        color: '#9b7575fa',
                                        borderTopRightRadius: '15px',
                                        borderTopLeftRadius: '15px'}}>
                                  {lessonMatch.class.course.courseDescription}
                                </p>
                                <p style={{ color: 'rgb(171 77 77)', 
                                      fontWeight: '600',
                                      fontSize: '25px',
                                      letterSpacing: '3px',
                                      padding: '5px' }}>
                                 {lessonMatch.class.className}
                                </p>
                                <p style={{ padding: '5px',
                                      color: '#621212',
                                      fontWeight: '600'}}>

                                  Room  {lessonMatch.room.roomDetail}
                                </p>
                                <Button variant="text"
                                  onClick={() =>
                                    handlerClickAttendent(lessonMatch)
                                  }
                                  sx={{color: '#679501',
                                        fontWeight: '600'}}
                                >
                                  Attendent
                                </Button>
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
      ) : (
        <>
          <div style={{ padding: "35px" }}></div>
          <CheckAttendent
            lesson={lessonCheckAttendent}
            onBackClick={handleBackClick}
          />
          
        </>
      )}
    </div>
  );
}

export default ScheduleInstructor;
