import React, { useCallback, useContext, useEffect, useState } from 'react'
import { URL_API } from '../../../api/ConstDefine';
import axios from 'axios';
import { dataContext } from './Staffmanage';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

var curr = new Date();
curr.setDate(curr.getDate()+1);
var date = curr.toISOString().substring(0,10);


export default function UpdateClass({id}) {
    ///Declare
    const data = useContext(dataContext);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [inputField,setInputFields] = useState({
      teacherId : '-1',
      courseId : '0',
      className : '',
      classEndDate :'',
      classStartDate: '',
      teacherName:'',
      courseName:''
  });
    ////URL_API
    let getclass = URL_API+`Class/${id}`;
    
    ///Get data
  
    useEffect(()=>{       
        if(id !== ''){
        axios.get(getclass)
        .then(r => setInputFields(p=>{
          return{
            classEndDate : r.data.classEndDate,
            classStartDate : r.data.classStartDate,
            className : r.data.className,
            courseId : r.data.course.id,
            teacherId : r.data.teacher ? r.data.teacher.id : '-1',
            teacherName : r.data.teacher ? r.data.teacher.teacherName : 'None',
            courseName : r.data.course.courseDescription
          }
        })).catch(err=>console.log(err));  
        }     
    },[id]);
   ////Submit data
   const submitAdd=()=>{
    setOpen(false);
    navigate(0);
    if(inputField.className === ''){
        return;
    }
    axios.put(getclass,{
      className : inputField.className,
      classStartDate : inputField.classStartDate,
      classEndDate : inputField.classEndDate,
    },{
        headers:{
            teacherId : inputField.teacherId === '-1'?null:inputField.teacherId,
            courseId : inputField.courseId
        }
    }
    ).then(r => console.log(r)).catch(er=>console.log(er));
  }
  
    //Filter 
    function filterDay(day){
        const split = day.split("T");
        let value = split[0];
        return value;
   }
   ///Handler
   const ChangeHandler = (e) =>{

    setInputFields(p => {
      return {...inputField, [e.target.name] : e.target.value }
    })    
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const Updatecomp = useCallback(()=>{
    return (
               <div>
               <form>
                      <TextField variant='outlined' size='small' name='className' value={inputField.className} required onChange={ChangeHandler}
                      sx={{color : 'rgb(127, 69, 101)',backgroundColor:'#F9A7B0',borderRadius:'5px'}}></TextField>
                      <input type='date' name='classStartDate' defaultValue={filterDay(inputField.classStartDate)} onChange={ChangeHandler} required />
                      <input type='date' name='classEndDate' defaultValue={filterDay(inputField.classEndDate)} onChange={ChangeHandler} min ={filterDay(inputField.classStartDate)} required />
                          <select defaultValue={inputField.teacherId} name='teacherId' required onChange={ChangeHandler} >
                              <option value={inputField.teacherId} disabled hidden>{inputField.teacherName}</option>
                              <option value ="-1">None</option>
                          {data.teachers.map(((item,index) =>(                                                         
                                  <option key={index} value={item.id} >{item.teacherName}</option>                      
                          )))}
                          </select>
                      
                          <select defaultValue={inputField.courseId} name='courseId' required onChange={ChangeHandler} >
                                  <option value={inputField.courseId} disabled hidden>{inputField.courseName}</option>
                          {data.courses.map(((item,index) =>(                                                         
                                  <option key={index}  value={item.id} >{item.courseDescription}</option>                      
                          )))}
                            
                          </select>
                          {/* {message?(<p style={{color: 'red', backgroundColor:'white'}}>{message}</p>):''} */}
                          
                      
                      <Button variant='text' color='success' onClick={handleClickOpen}
                      sx={{padding :1,margin:1, color: 'white', backgroundColor:'rgb(127, 69, 101)'}}>Save</Button>   
                      <Dialog
                       open={open}
                         onClose={handleClose}
                         aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                         >
                         <DialogTitle id="alert-dialog-title">
                              {"YogaCenter Management"}
                 </DialogTitle>
               <DialogContent>
               <DialogContentText id="alert-dialog-description">
                    Do you want to update ?
               </DialogContentText>
                </DialogContent>
               <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button type='submit' onClick={submitAdd} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>                
           </form>
           
           </div>
    )
  // });
  // return(
  //   <Updatecomp/>
  // );
}
