import React, { useState } from 'react'
import '../css/StaffSchedule.css'
import { useEffect } from 'react';
import WestIcon from '@mui/icons-material/West';
import { IconButton, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { URL_API } from './ConstDefine';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { shift } from './ConstDefine';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';

export default function ScheduleManage() {
  ////initiate data

    const location = useLocation();
    const dayinweek = ["Sun", "Mon", 'Tue', "Wed", "Thu", "Fri", "Sat"]
    const month = ["","January","February","March","April","May","June","July","August","September","October","November","December"];   
    const [currentMonth,setCurrenMonth] = useState(location.state !== null? parseInt(location.state.month): (new Date).getMonth()+1);
    const [currentYear,setCurrentYear]= useState(location.state !== null? parseInt(location.state.year):(new Date).getFullYear());
    const [addSchedule,SetAddschedule] = useState(false);
    const [classes,getClass] = useState();
    const [rooms,getRoom] = useState();
    const [shifts,getShift] = useState();
    const [classInfor,setClassInfor] = useState();
    const navigate = useNavigate();
    const [inputField,setInputFields] = useState({
      roomId : '',
      shifftId : '',
      classId : '',
      lessonDate: '',
    }); 
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
  ///API
  const getallClass = URL_API+`Class`;
  const getallrooms = URL_API+`Room`;
  const getallshifts = URL_API+`Shift`;
  const getClassInfor = URL_API+`Class/${inputField.classId ===''?0:inputField.classId}`;
  const postLesson = URL_API+`Lesson`;
  ////
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
  useEffect(()=>{
    axios.get(getallClass).then(r=>getClass(r.data)).catch(err=>console.log(err));
  },[]);
  useEffect(()=>{
    axios.get(getallrooms).then(r=>getRoom(r.data)).catch(err=>console.log(err));
  },[]);
  useEffect(()=>{
    axios.get(getallshifts).then(r=>getShift(r.data)).catch(err=>console.log(err));
  },[]);
  useEffect(()=>{
    axios.get(getClassInfor).then(r=>setClassInfor(r.data)).catch(err=>console.log(err));
  },[inputField.classId]);
  const CustomButton = styled(Button)`
  background-color: #1263fd;
font-family: arial;
color: white;
border-radius: 8px;
height: 50px;
font-weight: 600;
width: 8rem;

&:hover {
  background-color: #0c46b5;
}
`;
  function GetClassOfDate(day) {
    var classes = [];
    var convert = (new Date(currentYear, currentMonth - 1, day)).toString();
    var position1 = 0, position2 = 0, position3 = 0, position4 = 0;
    if(day !== '')
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
  const AddSchedule = ()=>{
    if(addSchedule == false){
    SetAddschedule(true);
    }else{
      SetAddschedule(false);
    }

  }
  ///Handle
  const ChangeHandler = (e) =>{
    setInputFields(p => {
      return {...inputField, [e.target.name] : e.target.value }
    })    
  };
  
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
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  } 
  const submitSchedule = (e)=>{
    e.preventDefault();
    if(inputField.classId === '' || inputField.roomId === '' || inputField.shifftId === ''){
      alert("You must fill all the field");
      return
    }
    if(classInfor !== undefined){
    let flag = false;
    let curentDate = (new Date(filterDay(classInfor.classStartDate)))
    let getDateOfWeek = curentDate.getDay();
    let getDateOfMonth = curentDate.getDate();

    if(inputField.lessonDate === "246"){
      if(!"246".includes((getDateOfWeek+1).toString()))
      alert("The start date do not match");
      return;
    }
    if(inputField.lessonDate === "357"){
      if(!"357".includes((getDateOfWeek+1).toString()))
      alert("The start date do not match");
      return;
    }
    if(getDateOfWeek == 0){
      alert("The start date do not match");
      return;
    }
    let addDate = [];
    if(getDateOfWeek == 1 || getDateOfWeek == 2){
      let i = 0
      addDate.push(filterDay(curentDate.toISOString()));
      for( i = 1; i< classInfor.course.courseLectureNumber; i++){
          if(i % 3 == 0){
            addDate.push(filterDay(curentDate.addDays(3).toISOString()));
            curentDate = curentDate.addDays(3)
          }
          else{
            addDate.push(filterDay(curentDate.addDays(2).toISOString()));
            curentDate = curentDate.addDays(2)
          }
      }
    }
    if(getDateOfWeek == 3 || getDateOfWeek == 4){
      let i = 0
      addDate.push(filterDay(curentDate.toISOString()));
      for( i = 2; i< classInfor.course.courseLectureNumber + 1; i++){
          if(i % 3 == 0){
            addDate.push(filterDay(curentDate.addDays(3).toISOString()));
            curentDate = curentDate.addDays(3)
          }
          else{
            addDate.push(filterDay(curentDate.addDays(2).toISOString()));
            curentDate = curentDate.addDays(2)
          }
      }
    }
    if(getDateOfWeek == 5 || getDateOfWeek == 6){
      let i = 0
      addDate.push(filterDay(curentDate.toISOString()));
      for( i = 3; i< classInfor.course.courseLectureNumber + 2; i++){
          if(i % 3 == 0){
            addDate.push(filterDay(curentDate.addDays(3).toISOString()));
            curentDate = curentDate.addDays(3)
          }
          else{
            addDate.push(filterDay(curentDate.addDays(2).toISOString()));
            curentDate = curentDate.addDays(2)
          }
      }
    }
    lessons.forEach(lesson =>{
      if(addDate.includes(filterDay(lesson.lessonDate))) {
        if(inputField.roomId === lesson.room.id && inputField.shifftId === lesson.shift.id){
          flag = true;
        }
      }
    })
    if(flag) {
      alert("Dupplicate lesson");
      return;
    }
    addDate.forEach(date =>{
      axios.post(postLesson,{
        lessonDate : date
    },{
        headers:{
            roomId : inputField.roomId,
            shifftId: inputField.shifftId,
            classId: inputField.classId
        }
    }).then(r=> console.log(r)).catch(err=>console.log(err));
    navigate(0);
    })

    }
  }
  console.log(displaydata);
  return (
    <div className='Manage-schedule'>
      <h1 className='staff-title'>Schedule Management </h1>
      <CustomButton className='button-add'variant='contained' startIcon={<AddCircleOutlineRoundedIcon fontSize='large'/>} onClick={AddSchedule}
                            sx={{margin:1}}>Add</CustomButton>
      {GenarateData(currentMonth, currentYear)}
      <Grid container spacing={2} sx={{marginTop:'3%', height:'100%',backgroundColor:'white',marginLeft:'0'}}>
        <Grid item md={10} className='box-schedule'>
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
        <Grid item md={2} className='note-schedule' >
            <div className='note-staff'>
                <h1>Note</h1>
                  <Typography variant='h5' sx={{margin:'8% 0'}}><RadioButtonCheckedIcon fontSize='small' color='primary' />Slot 1</Typography>
                  <Typography variant='h5' sx={{margin:'8% 0'}}><RadioButtonCheckedIcon fontSize='small' color='success' />Slot 1</Typography>
                  <Typography variant='h5' sx={{margin:'8% 0'}}><RadioButtonCheckedIcon fontSize='small' color='secondary' />Slot 1</Typography>
                  <Typography variant='h5' sx={{margin:'8% 0'}}><RadioButtonCheckedIcon fontSize='small' color='error' />Slot 1</Typography>
            </div>
        </Grid>
      </Grid>
    {addSchedule == true?(
      <div>
                        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <p>Class name</p>
      <TextField defaultValue='' select label ="Choose Class" required name='classId' onChange={ChangeHandler}>      
                        {/* <MenuItem value="0" disabled hidden>Choose Class</MenuItem>                     */}
                        {classes.map(((item,index) =>(                                                     
                                <MenuItem key={index} value={item.id} >{item.className}</MenuItem>                      
                        )))}
                        </TextField>
      <p>Room name</p>
      <TextField defaultValue='' select label ="Choose Room" required name='roomId' onChange={ChangeHandler}>                       
                        {rooms.map(((item,index) =>(                                                     
                                <MenuItem key={index} value={item.id} >{item.roomDetail}</MenuItem>                      
                        )))}
                        </TextField>
                        <p>Shift name</p>
      <TextField defaultValue='' select label ="Choose Shift" required name='shifftId' onChange={ChangeHandler}>                       
                        {shifts.map(((item,index) =>(                                                     
                                <MenuItem key={index} value={item.id} >{filterTime(item.timeStart)}-{filterTime(item.timeEnd)}</MenuItem>                      
                        )))}
                        </TextField>
                        <p>Chedule</p>
      <TextField defaultValue='' select label ="Choose Schedule" required name='lessonDate' onChange={ChangeHandler}>                       
                        <MenuItem value="246">Mon/Wed/Fri</MenuItem>
                        <MenuItem value="357">Tue/Thu/Sat</MenuItem>
                        </TextField> 
                        <br/>
      <CustomButton  className='button-add'variant='contained' startIcon={<CheckIcon fontSize='large'/>} onClick={submitSchedule}
                            sx={{margin:1}}>Add</CustomButton>
    </Box>
      </div>
    ):''}
    </div>
  )
}
