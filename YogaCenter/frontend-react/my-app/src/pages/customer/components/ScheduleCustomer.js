import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import "../css/ScheduleCustomer.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { URL_API } from "../../../api/ConstDefine";
import { Grid } from "@mui/material";
import axios from "axios";
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
  const time = ["06:00", "07:00", "17:00 ", "18:00 "];
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  //Get Data
  const [userData, setUserData] = useState('');
  const [lessonList, setLessonList] = useState([]);
  const [teacher, setTeacher] = useState()
  // console.log(userData)
  // console.log(savedUserData);
  const [userId, setUserId] = useCookies("userId");
  let customerByUserIdAPI = URL_API + `Customer/${userId.userId}`

  let lessonByCusIDAPI =
    URL_API + `CustomerLesson/getCusLessonByCusId/${userData !== '' ? userData.id : ""}`;
 
  //getClassCustomer
  console.log(userData.id);
  useEffect(() => {
    axios
      .get(customerByUserIdAPI)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(lessonByCusIDAPI)
      .then((res) => {
        setLessonList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData.id]);
 
  // useEffect(() => {
  //   axios
  //     .get(teacherByClassAPI)
  //     .then((res) => {
  //       setUserData(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  // console.log(teacher)
  // console.log(lessonList[0].lesson.class.id)
  // const classID = lessonList[0].lesson.class.id
  // console.log(classID)
  return (
    <div className="week-schedule-container">
      <div className="schedule-box">
        <h1 style={{ color: "black" }}>
        <div style={{ fontSize:'20px', backgroundColor: '#bdded999',borderRadius: '25px',padding: '10px',display: 'flex',alignItems: 'center'}}>
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
                  backgroundColor: 'rgb(0 0 0 / 49%)',
                 padding:'10px',
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
              <tr key={timeSlot} >
                <td style={{backgroundColor:'#d3dfef'}}>
                  <h1
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "black",
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
                      <td key={`${day}-${timeSlot}` }>
                        <Grid container className="lessonDay">
                          <Grid className="lesson-info" item md={10} sx={{padding:'25px'}}>
                            <p style={{ fontSize:'0.9rem'}}>

                              {
                                lessonMatch.lesson.class.course
                                  .courseDescription
                              }
                            </p>
                            <p style={{ color: '#878d00',fontWeight: '600',fontSize: '25px'}}>
                           {lessonMatch.lesson.class.className}
                            </p>
                            {/* <p>
                              Teacher:
                            </p> */}
                            <p style={{ color: "##47004e" }}>

                        
                              Room: {lessonMatch.lesson.room.roomDetail}
                            </p>
                            </Grid>
                            <Grid item md={2} className="lesson-attendence">
                            {lessonMatch.attendance === 2 ? (
                              <p style={{ }}>Not get</p>
                            ) : lessonMatch.attendance === 1 ? (
                              <p style={{ backgroundColor:'#5cb85c', color: "white" }}>Attendence</p>
                            ) : (
                              <p style={{ backgroundColor:'#ED2B2A', color: "white" }}>Absent</p>
                            )}
                            </Grid>
                        </Grid>
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

export default ScheduleCustomer;
