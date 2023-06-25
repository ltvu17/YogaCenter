import React, { useState } from 'react'
import '../css/StaffSchedule.css'
import { useEffect } from 'react';
import WestIcon from '@mui/icons-material/West';
import { IconButton } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { URL_API } from './ConstDefine';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { shift } from './ConstDefine';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

export default function ScheduleManage() {
  ////initiate data

    const location = useLocation();
    const dayinweek = ["Sun", "Mon", 'Tue', "Wed", "Thu", "Fri", "Sat"]
    const month = ["","January","February","March","April","May","June","July","August","September","October","November","December"];   
    const [currentMonth,setCurrenMonth] = useState(location.state !== null? parseInt(location.state.month): (new Date).getMonth()+1);
    const [currentYear,setCurrentYear]= useState(location.state !== null? parseInt(location.state.year):(new Date).getFullYear());
    var displaydata=[];
    const GenarateData=(month,year)=>{
      var currentDateOfWeek = (new Date(`0${month} 1 ${year}`)).getDay();
      var daysInMonth = (new Date(year,month,0)).getDate();
      var daysInprevMonth = (new Date(year,month-1,0)).getDate();
      var i =0, j=0;
      var count =1;
      var place = '';
      for(i=0;i<6;i++){
        var temp =[];
        for(j=0;j<7;j++){         
          if(j<currentDateOfWeek && i===0){
            daysInprevMonth++;
            temp.push('');           
          }else
          {
          
          if(count<=daysInMonth){
          temp.push(count);
          count++;
          }
          else{

            temp.push('');
          }
        }
        displaydata[i] = temp;
      }
    }
  }
  const preMonth = () => {
    if (currentMonth === 1) {
      setCurrenMonth(12);
      setCurrentYear(p => currentYear - 1);
    }
    else {
      setCurrenMonth(p => currentMonth - 1);
    }
  }
  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrenMonth(1);
      setCurrentYear(p => currentYear + 1);
    }
    else {
      setCurrenMonth(p => currentMonth + 1);
    }
  }
  const ChangeHandlerMonth = (e) => {
    setCurrenMonth(p =>
      e.target.value
    )
  };
  const ChangeHandlerYear = (e) => {
    setCurrentYear(p =>
      e.target.value)
  };


  ////Declare
  const [lessons, setLesson] = useState([]);
  ///
  let getalllessonAPI = URL_API + `Lesson`;
  /////Get Data
  useEffect(() => {
    axios.get(getalllessonAPI).then(r => setLesson(r.data)).catch(err => console.log(err));
  }, []);

  function GetClassOfDate(day) {
    var classes = [];
    var convert = (new Date(currentYear, currentMonth - 1, day)).toString();
    var position1 = 0, position2 = 0, position3 = 0, position4 = 0;
    return (

      <React.Fragment>
        {lessons.map(item => (
          <React.Fragment key={item.id} >

            {convert === (new Date(item.lessonDate).toString()) ?
              (
                <React.Fragment>
                  {`${filterTime(item.shift.timeStart)}-${filterTime(item.shift.timeEnd)}` === shift[0] ?
                    (
                      <p className='shift0' style={{ left: `${position1}%` }}>
                        <RadioButtonCheckedIcon fontSize='small' color='primary' />
                        {item.class.className}
                        <a hidden> {position1 += 50}</a>
                      </p>
                    ) : ''
                  }
                  {`${filterTime(item.shift.timeStart)}-${filterTime(item.shift.timeEnd)}` === shift[1] ?
                    (
                      <p className='shift1' style={{ left: `${position2}%` }} >
                        <RadioButtonCheckedIcon fontSize='small' color='success' />
                        {item.class.className}
                        <a hidden> {position2 += 50}</a>
                      </p>

                    ) : ''
                  }
                  {`${filterTime(item.shift.timeStart)}-${filterTime(item.shift.timeEnd)}` === shift[2] ?
                    (
                      <p className='shift2' style={{ left: `${position3}%` }}>
                        <RadioButtonCheckedIcon fontSize='small' color='secondary' />
                        {item.class.className}
                        <a hidden> {position3 += 50}</a>
                      </p>
                    ) : ''
                  }
                  {`${filterTime(item.shift.timeStart)}-${filterTime(item.shift.timeEnd)}` === shift[3] ?
                    (
                      <p className='shift3' style={{ left: `${position4}%` }}>
                        <RadioButtonCheckedIcon fontSize='small' color='error' />
                        {item.class.className}
                        <a hidden> {position4 += 50}</a>
                      </p>
                    ) : ''
                  }
                </React.Fragment>
              ) : (
                ''
              )
            }
          </React.Fragment>
        ))}
      </React.Fragment>
    )
  }

  
  
  ////Filter
  function filterDay(day) {
    const split = day.split("T");
    let value = split[0];
    return value;
  }
  function filterTime(time) {
    const split = time.split("T");
    let value = split[1];
    return value;
  }
  return (
    <div className='Manage-schedule'>
      <h1 className='staff-title'>Schedule Management </h1>
      {GenarateData(currentMonth, currentYear)}
      <Grid container spacing={2} sx={{paddingTop:'3%', height:'100%'}}>
        <Grid item md={8} className='box-schedule'>
            <div className='staff-time-nav'><IconButton onClick={preMonth}><WestIcon /></IconButton>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-simple-select-label">Month</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentMonth}
                    label="Month"
                    name='currentMonth'
                    onChange={ChangeHandlerMonth}
                  >
                    <MenuItem value={1}>January</MenuItem>
                    <MenuItem value={2}>February</MenuItem>
                    <MenuItem value={3}>March</MenuItem>
                    <MenuItem value={4}>April</MenuItem>
                    <MenuItem value={5}>May</MenuItem>
                    <MenuItem value={6}>June</MenuItem>
                    <MenuItem value={7}>July</MenuItem>
                    <MenuItem value={8}>August</MenuItem>
                    <MenuItem value={9}>September</MenuItem>
                    <MenuItem value={10}>October</MenuItem>
                    <MenuItem value={11}>November</MenuItem>
                    <MenuItem value={12}>December</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-simple-select-label">Year</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentYear}
                    label="Year"
                    name='currentYear'
                    onChange={ChangeHandlerYear}
                  >
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
                  </Select>
                </FormControl>
                <IconButton onClick={nextMonth}><EastIcon /></IconButton>
              </div>
              <div className="scheduleTable" style={{ textAlign: 'center' }}>

                <table>
                <thead className="table-head">
                  <tr>
                    {dayinweek.map(item => (
                      <th key={item}>{item}</th>
                    ))}
                  </tr>
                </thead>
                  <div style={{height:'16px'}}></div>
                  <tbody>
                    {displaydata.map(day => (
                      <tr key={day}>
                        <td><Link to='/addclassschedule' state={{ date: `${day[0]}`, month: `${currentMonth}`, year: `${currentYear}` }}>{day[0]}</Link><div className='className'>{GetClassOfDate(day[0])}</div></td>
                        <td><Link to='/addclassschedule' state={{ date: `${day[1]}`, month: `${currentMonth}`, year: `${currentYear}` }}>{day[1]}</Link><div className='className'>{GetClassOfDate(day[1])}</div></td>
                        <td><Link to='/addclassschedule' state={{ date: `${day[2]}`, month: `${currentMonth}`, year: `${currentYear}` }}>{day[2]}</Link><div className='className'>{GetClassOfDate(day[2])}</div></td>
                        <td><Link to='/addclassschedule' state={{ date: `${day[3]}`, month: `${currentMonth}`, year: `${currentYear}` }}>{day[3]}</Link><div className='className'>{GetClassOfDate(day[3])}</div></td>
                        <td><Link to='/addclassschedule' state={{ date: `${day[4]}`, month: `${currentMonth}`, year: `${currentYear}` }}>{day[4]}</Link><div className='className'>{GetClassOfDate(day[4])}</div></td>
                        <td><Link to='/addclassschedule' state={{ date: `${day[5]}`, month: `${currentMonth}`, year: `${currentYear}` }}>{day[5]}</Link><div className='className'>{GetClassOfDate(day[5])}</div></td>
                        <td><Link to='/addclassschedule' state={{ date: `${day[6]}`, month: `${currentMonth}`, year: `${currentYear}` }}>{day[6]}</Link><div className='className'>{GetClassOfDate(day[6])}</div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              
              </div>
        </Grid>
        <Grid item md={4} className='note-schedule' >
            <div className='note-staff'>
                <h1>Note</h1>
       
            </div>
        </Grid>
      </Grid>

    </div>
  )
}
