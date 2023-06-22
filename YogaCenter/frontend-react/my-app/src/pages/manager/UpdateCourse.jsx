import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import axios from 'axios';
import { URL_API } from '../staff/components/ConstDefine';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';

var curr = new Date();
curr.setDate(curr.getDate()+1);
var date = curr.toISOString().substring(0,10);
export default function UpdateCourse({id}) {
    const [open, setOpen] = React.useState(false);
    const [postsEvent,setEvent] = useState(); 
    const navigate = useNavigate();
    const [inputField,setInputFields] = useState({
        courseDescription : '',
        courseLectureNumber : '',
        courseLength : '',
        coursePrice : '',
        pre_Requisite: '',
        courseDetail :'',
        courseCreateDate : '',
        evenId : '-1',
        eventName :'',
  });
  ///URL_API
  let getEvent = URL_API+`Event`;
  let getCourse = URL_API+`Course/${id}`;
  let postCourse = URL_API+`Course/${id}`;
  ///GetData
   useEffect(()=>{
    axios.get(getEvent).then(r=>setEvent(r.data)).catch(err=>console.log(err));
   },[])
   useEffect(()=>{       
    if(id !== ''){
    axios.get(getCourse)
    .then(r => setInputFields(p=>{
      return{
            courseDescription: r.data.courseDescription,
            courseLectureNumber :r.data.courseLectureNumber,
            courseLength : r.data.courseLength,
            coursePrice : r.data.coursePrice,
            pre_Requisite : r.data.pre_Requisite,
            courseDetail : r.data.courseDetail,
            courseCreateDate : filterDay(r.data.courseCreateDate),
            evenId : r.data.event? r.data.event.id:'-1',
            eventName : r.data.event? r.data.event.eventName:''
      }
    })).catch(err=>console.log(err));  
    }     
},[id]);
   ///Submit
   function submitAdd(e){
    axios.put(postCourse,{
      courseDescription: inputField.courseDescription,
      courseLectureNumber :inputField.courseLectureNumber,
      courseLength : inputField.courseLength,
      coursePrice : inputField.coursePrice,
      pre_Requisite : inputField.pre_Requisite,
      courseDetail : inputField.courseDetail,
      courseCreateDate : inputField.courseCreateDate
    },{
      headers:{
        eventId : inputField.evenId === "-1"? null : inputField.evenId
      }
    }).then(r => console.log(r)).catch(err => console.log(err));
  }
   ///Handler
   const ChangeHandler = (e) =>{
    setInputFields(p => {
      return {...inputField, [e.target.name] : e.target.value }
    })    
  };
   //Filter 
   function filterDay(day){
    const split = day.split("T");
    let value = split[0];
    return value;
    }
    console.log(inputField);
  return (
    <div>
      <form>
                        <TextField variant='outlined' size='small' name='courseDescription' label='Course Name' value={inputField.courseDescription} required onChange={ChangeHandler}
                    sx={{color : 'rgb(127, 69, 101)',backgroundColor:'#F9A7B0',borderRadius:'5px'}}></TextField>
                        <TextField variant='outlined' type='number' InputProps={{ inputProps: { min: 0 } }} size='small' value={inputField.courseLectureNumber} name='courseLectureNumber' label='courseLectureNumber' required onChange={ChangeHandler}
                    sx={{color : 'rgb(127, 69, 101)',backgroundColor:'#F9A7B0',borderRadius:'5px'}}></TextField>
                        <TextField variant='outlined' type='number' InputProps={{ inputProps: { min: 0 } }} size='small' value={inputField.courseLength} name='courseLength' label='courseLength' required onChange={ChangeHandler}
                    sx={{color : 'rgb(127, 69, 101)',backgroundColor:'#F9A7B0',borderRadius:'5px'}}></TextField>
                        <TextField variant='outlined' type='number' InputProps={{ inputProps: { min: 0 } }} size='small' value={inputField.coursePrice} name='coursePrice' label='coursePrice' required onChange={ChangeHandler}
                    sx={{color : 'rgb(127, 69, 101)',backgroundColor:'#F9A7B0',borderRadius:'5px'}}></TextField>
                        <TextField variant='outlined' size='small' name='pre_Requisite' value={inputField.pre_Requisite} label='pre_Requisite' required onChange={ChangeHandler}
                    sx={{color : 'rgb(127, 69, 101)',backgroundColor:'#F9A7B0',borderRadius:'5px'}}></TextField>
                        <TextField variant='outlined' size='small' name='courseDetail' value={inputField.courseDetail} label='courseDetail' multiline required onChange={ChangeHandler}
                    sx={{color : 'rgb(127, 69, 101)',backgroundColor:'#F9A7B0',borderRadius:'5px'}}></TextField>
                        <input type='date' name='courseCreateDate' defaultValue={filterDay(inputField.courseCreateDate)} required onChange={ChangeHandler}/>
                        <select defaultValue={inputField.evenId} name='evenId' required onChange={ChangeHandler} >
                              <option value={inputField.evenId} disabled hidden>{inputField.eventName}</option>
                              <option value ={"-1"}>None</option>
                          {postsEvent? postsEvent.map(((item,index) =>(                                                         
                                  <option key={index} value={item.id} >{item.eventName}</option>                      
                          ))):''}
                          </select>
                    <Button variant='text' color='success' type='submit' onClick={submitAdd}
                        sx={{padding :1,margin:1, color: 'white', backgroundColor:'rgb(127, 69, 101)'}}>Save</Button>
        </form>
    </div>
  )
}
