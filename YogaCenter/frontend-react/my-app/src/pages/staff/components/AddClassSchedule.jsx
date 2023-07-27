import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { URL_API } from './ConstDefine';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import TextField from "@mui/material/TextField";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { Check } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { shift } from './ConstDefine';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import styled from '@emotion/styled';
import '../css/AddClassSchedule.css'
export default function AddClassSchedule() {
    ///Declare
    const location = useLocation('state');
    const [lessons,setLessons] = useState();
    console.log(location)
    const navigate = useNavigate();
    var day ;
    if(parseInt(location.state.month)<10){
        // day = ${location.state.year}-0${location.state.month}-${location.state.date};
        if(parseInt(location.state.date)<10){
            day = `${location.state.year}-0${location.state.month}-0${location.state.date}`;
        }
        else{
            day = `${location.state.year}-0${location.state.month}-${location.state.date}`;
        }
    }else{
        // day = ${location.state.year}-${location.state.month}-${location.state.date};
        if(parseInt(location.state.date)<10){
            day = `${location.state.year}-${location.state.month}-0${location.state.date}`;
        }
        else{
            day = `${location.state.year}-${location.state.month}-${location.state.date}`;
        }
    }
    
    const [classes,getClass] = useState();
    const [rooms,getRoom] = useState();
    const [shifts,getShift] = useState();
    const [count,setCount] =useState(0);
    const [idDelete,setIdDelete] =useState('');
    const [open, setOpen] = useState(false);
    const [inputField,setInputFields] = useState({
        roomId : '',
        shifftId : '',
        classId : '',
        lessonDate: day,
    });  
    ///URL_API
    const getclassbydate = URL_API+`Lesson/date/${day}`;
    const getallClass = URL_API+`Class`;
    const getallrooms = URL_API+`Room`;
    const getallshifts = URL_API+`Shift`;
    const postLesson = URL_API+`Lesson`;
    const deleteLesson = URL_API+`Lesson/${idDelete}`;
    ///GetData
    useEffect(()=>{
        axios.get(getclassbydate).then(r=>setLessons(r.data)).catch(err=>console.log(err));
    },[]);
    useEffect(()=>{
        axios.get(getallClass).then(r=>getClass(r.data)).catch(err=>console.log(err));
    },[]);
    useEffect(()=>{
        axios.get(getallrooms).then(r=>getRoom(r.data)).catch(err=>console.log(err));
    },[]);
    useEffect(()=>{
        axios.get(getallshifts).then(r=>getShift(r.data)).catch(err=>console.log(err));
    },[]);
    ///Submit
    function submitAdd(){       
        axios.post(postLesson,{
            lessonDate : inputField.lessonDate
        },{
            headers:{
                roomId : inputField.roomId,
                shifftId: inputField.shifftId,
                classId: inputField.classId
            }
        }).then(r=> console.log(r)).catch(err=>console.log(err));
        navigate(0);
    }
    console.log(day)
    ///Handler
    const AddHandler = ()=>{
        if(count < 1)
        setCount(count => count+1);
     }
    const MinusHandler = () =>{
        if(count >0)
        setCount(count => count -1);
    }
    const ChangeHandler = (e) =>{
        setInputFields(p => {
          return {...inputField, [e.target.name] : e.target.value }
        })    
      };
    const handleClose = () => {
        setOpen(false);
    };
    ///
    function deleteClass(value){
        setOpen(true);     
        setIdDelete(value);  
    }
    const deleteSubmit = () =>{
        setOpen(false);        
        axios.delete(deleteLesson).then(r => console.log(r)).catch(err => console.log(err));
        navigate(0);
    }
    const back = ()=>{
        navigate('/schedulemanage',{state:{month:location.state.month, year:location.state.year}});
    }
    ///Filter
    function filterTime(time){
        const split = time.split("T");
        let value = split[1];
        return value;
      }
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
  const DeleteButton = styled(Button)`
   background-color: #dd0202;
  font-family: arial;
  color: white;
  border-radius: 8px;
  height: 50px;
  font-weight: 600;
  
   width: 8rem;

   &:hover {
    background-color:  #f10303;
   }
 `;
    return (
    <div className='add-class-container'>
     
        <div className='class-post'>
        <Button className='button-back' variant='contained'  startIcon={<ArrowBackIcon fontSize='large'/>} onClick={back}
        sx={{floar:'right',padding :1,margin:1, color: 'white', fontSize:'18px',fontWeight:'600', backgroundColor:'black'}}>Back to class list</Button>
            <table className='table-add-class'>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Class Name</th>
                        <th>Room</th>
                        <th>Shift</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons ? lessons.map((item,index) =>(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.class.className}</td>
                            <td>{item.room.roomDetail}</td>
                            <td>
                                
            {`${filterTime(item.shift.timeStart)}-${filterTime(item.shift.timeEnd)}` === shift[0]?
            (
            <RadioButtonCheckedIcon fontSize='small' color='primary'/>
            ):''
            }
            {`${filterTime(item.shift.timeStart)}-${filterTime(item.shift.timeEnd)}` === shift[1]?
            (
            <RadioButtonCheckedIcon fontSize='small' color='success'/>          
            ):''
            }
            {`${filterTime(item.shift.timeStart)}-${filterTime(item.shift.timeEnd)}` === shift[2]?
            (
            <RadioButtonCheckedIcon fontSize='small' color='secondary'/>
            ):''
            }
            {`${filterTime(item.shift.timeStart)}-${filterTime(item.shift.timeEnd)}` === shift[3]?
            (
            <RadioButtonCheckedIcon fontSize='small' color='error'/>
            ):''
            }
            {filterTime(item.shift.timeStart)}-{filterTime(item.shift.timeEnd)}
            </td>
                            <td><DeleteButton variant='text'  startIcon={<DeleteForeverOutlinedIcon/>} onClick={()=>deleteClass(item.id)}
                                 sx={{cursor:'pointer',margin:1}}>Delete</DeleteButton></td>
                        </tr>
                    )):''
                    }
                     {Array.from(Array(count)).map(((index,c) => (
                        
                        <tr key ={c}>         
                        <td><IconButton onClick={MinusHandler}><DeleteForeverIcon/></IconButton></td>
                        <td><select defaultValue={0} required name='classId' onChange={ChangeHandler}>      
                        <option value="0" disabled hidden>Choose Class</option>                    
                        {classes.map(((item,index) =>(                                                     
                                <option key={index} value={item.id} >{item.className}</option>                      
                        )))}
                        </select></td>
                        <td><select defaultValue={0}  required name='roomId' onChange={ChangeHandler}> 
                        <option value="0" disabled hidden>Choose Room</option>                         
                        {rooms.map(((item,index) =>(                                                     
                                <option key={index} value={item.id} >{item.roomDetail}</option>                      
                        )))}
                        </select></td>
                        <td><select defaultValue={0} required name='shifftId' onChange={ChangeHandler}>   
                        <option value="0" disabled hidden>Choose Shift</option>                       
                        {shifts.map(((item,index) =>(                                                     
                                <option key={index} value={item.id} >{filterTime(item.timeStart)}-{filterTime(item.timeEnd)}</option>                      
                        )))}
                        </select></td>     
                        <td><CustomButton className='button-add'variant='contained' startIcon={<Check fontSize='large'/>} onClick={submitAdd}
                            sx={{margin:1}}>Add</CustomButton></td>
                            
                        </tr>
                        )))}
                    <tr>
                        <td colSpan={7}><CustomButton className='button-add'variant='contained' startIcon={<AddCircleOutlineRoundedIcon fontSize='large'/>} onClick={AddHandler}
                               sx={{margin:1,width:'12rem'}}>Add Class</CustomButton></td>
                    </tr>
                </tbody>
            </table>
            <form>
            <div id="delete"> 
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
                        <DialogContentText id="alert-dialog-description" >
                    <p style={{color:'red'}}>Do you want to delete this class ?</p>
                        </DialogContentText>
                    </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button type='button' onClick={deleteSubmit}autoFocus>
                        Yes
                        </Button>
                 </DialogActions>
              </Dialog>                   
            </div>
            </form>  
        </div>
    </div>
  )
}
