import React, { useEffect, useState } from 'react'

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import axios from 'axios';
import { URL_API } from '../staff/components/ConstDefine';
import { useNavigate } from 'react-router-dom';


import { Grid} from '@mui/material';
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
    
    <Grid container item md={12}>

    
      <form style={{width:'100%'}}>
      <table className='table-add-class' style={{marginTop:'0'}}>
            <thead>
              <tr>
                      <th>Name</th>
                      <th>Lecture Number</th>
                      <th>Length</th>
                      <th>Price</th>
                      <th>Pre_Requisite</th>
                      <th>Detail</th>
                      <th>Create Date</th>
                      <th>Event</th>
                      <th>Action</th>
              </tr>
            </thead>
            <tbody>
            <tr className='staff-add-newClass'>
            <td> <TextField variant='outlined'  name='courseDescription'  value={inputField.courseDescription} required onChange={ChangeHandler}
                    sx={{backgroundColor: 'white', borderRadius: '5px'}}></TextField></td>
                        <td>  <TextField variant='outlined' type='number' InputProps={{ inputProps: { min: 0 } }}  value={inputField.courseLectureNumber} name='courseLectureNumber'  required onChange={ChangeHandler}
                    sx={{backgroundColor: 'white', borderRadius: '5px'}}></TextField> </td> 
                      
                      <td>  <TextField variant='outlined' type='number' InputProps={{ inputProps: { min: 0 } }}  value={inputField.courseLength} name='courseLength' required onChange={ChangeHandler}
                    sx={{backgroundColor: 'white', borderRadius: '5px'}}></TextField></td>
                       <td> <TextField variant='outlined' type='number' InputProps={{ inputProps: { min: 0 } }}  value={inputField.coursePrice} name='coursePrice'  required onChange={ChangeHandler}
                    sx={{backgroundColor: 'white', borderRadius: '5px'}}></TextField></td>
                       <td> <TextField variant='outlined'  name='pre_Requisite' value={inputField.pre_Requisite}  required onChange={ChangeHandler}
                    sx={{backgroundColor: 'white', borderRadius: '5px'}}></TextField></td>
                        <td><TextField variant='outlined'  name='courseDetail' value={inputField.courseDetail} multiline required onChange={ChangeHandler}
                    sx={{backgroundColor: 'white', borderRadius: '5px'}}></TextField></td>
                       <td><input type='date' name='courseCreateDate' defaultValue={filterDay(inputField.courseCreateDate)} required onChange={ChangeHandler}/></td>
                        <td><select defaultValue={inputField.evenId} name='evenId' required onChange={ChangeHandler} >
                              <option value={inputField.evenId} disabled hidden>{inputField.eventName}</option>
                              <option value ={"-1"}>None</option>
                          {postsEvent? postsEvent.map(((item,index) =>(                                                         
                                  <option key={index} value={item.id} >{item.eventName}</option>                      
                          ))):''}
                          </select>
                          </td>
                    <td><Button variant='contained'  type='submit' onClick={submitAdd}
                       sx={{
              padding: 1,
              margin: 1,
              color: "white",
              backgroundColor: "#0643b9",
            }}>Save</Button></td>
            </tr>
            </tbody>
      </table>
     
                     
        </form>
        </Grid>

  )
}
