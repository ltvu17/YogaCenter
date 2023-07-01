import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { URL_API } from '../staff/components/ConstDefine';
import Button from '@mui/material/Button';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import UpgradeRoundedIcon from '@mui/icons-material/UpgradeRounded';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import UpdateCourse from './UpdateCourse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import './css/CourseManage.css'
var curr = new Date();
curr.setDate(curr.getDate()+1);
var date = curr.toISOString().substring(0,10);
export default function CourseManage() {
    const navigate = useNavigate();
    const [postCourse,setCourse] = useState();
    const [count,setCount] =useState(0);
    const [idDelete,setIdDelete] =useState('');
    const [open, setOpen] = useState(false);
    
    const [inputField,setInputFields] = useState({
        courseDescription : '',
        courseLectureNumber : '',
        courseLength : '',
        coursePrice : '',
        pre_Requisite: '',
        courseDetail :'',
        courseCreateDate : date,
    });
    const [idUpdate,setUpdate] = useState('');
    ////URL_API
    let getCourseAPI = URL_API+'Course';
    let postCourseAPI = URL_API+'Course';
    let deleteAPI = URL_API+`Course/${idDelete}`
    ///GetData
    useEffect(()=>{
        axios.get(getCourseAPI).then(r=> setCourse(r.data)).catch(err=> console.log(err));
    },[]);
    ///SUbmit
    const submitAdd=()=>{
        axios.post(postCourseAPI,{
            courseDescription: inputField.courseDescription,
            courseLectureNumber :inputField.courseLectureNumber,
            courseLength : inputField.courseLength,
            coursePrice : inputField.coursePrice,
            pre_Requisite : inputField.pre_Requisite,
            courseDetail : inputField.courseDetail,
            courseCreateDate : inputField.courseCreateDate
        }).then(r=> console.log(r)).catch(err => console.log(err));
    }
    ///Handler
    const AddHandler = ()=>{
        if(count < 1)
        setCount(count => count+1);
    }
    const MinusHandler = () =>{
        if(count >0)
        setCount(count => count -1);
    }
    const offUpdateHandler = () =>{
        setUpdate(p=>'');
    }
    const ChangeHandler = (e) =>{
        setInputFields(p => {
            return {...inputField, [e.target.name] : e.target.value }
        })    
    };
    const handleClose = () => {
        setOpen(false);
    };
    ///Function
    function getvalueUpdate(value){
        if(idUpdate === '')
        setUpdate(p => value);
        const element = document.getElementById('update');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }    
    } 
    function deleteClass(value){
        setOpen(true);     
        setIdDelete(value);  
    }
    const deleteSubmit = () =>{
        setOpen(false);
        axios.delete(deleteAPI).then(r => console.log(r)).catch(err => console.log(err));
        navigate(0);
    }

    //filter function
    function filterDay(day){
        const split = day.split("T");
        let value = split[0];
        return value;
    }
    ///
    const CustomButton = styled(Button)`
         background-color: #010f51b8;
      font-family: arial;
      color: white;
      border-radius: 35px;
      height: 50px;
      font-weight: 500;

   
      &:hover {
        background-color: #27212552;
      }
    `;
    const DeleteButton = styled(Button)`
       background-color: #a70707;
     font-family: arial;
     color: white;
     border-radius: 35px;
     height: 50px;
     font-weight: 500;

  
     &:hover {
        background-color: #ff353587;
     }
   `;
    return (
    <div className='course-manage'>
    
        <div className='class-post'>
        <h1 className='staff-title'>Course Management </h1>
        <form>
        <table className='table-add-class'>
            <thead>
                <tr>
                <th>Index</th>
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
            {postCourse? postCourse.map(((item, index) =>(
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.courseDescription}</td>
                        <td>{item.courseLectureNumber}</td>
                        <td>{item.courseLength}</td>
                        <td>{item.coursePrice}</td>
                        <td>{item.pre_Requisite}</td>
                        <td>{item.courseDetail}</td>
                        <td>{filterDay(item.courseCreateDate)}</td>
                        <td>{item.event? item.event.eventName : 'None'}</td>                   
                        <td style={{textAlign: 'center'}}>
                            <div> 
                                <CustomButton variant='text'  startIcon={<UpgradeRoundedIcon/>} onClick={() => getvalueUpdate(item.id)} 
                                sx={{padding :1,margin:1, color: 'white'}}>Update Course</CustomButton>
                                <DeleteButton variant='text'  startIcon={<DeleteForeverOutlinedIcon/>} onClick={()=>deleteClass(item.id)}
                                sx={{padding :1,margin:1, color: 'white'}}>Delete Course</DeleteButton>
                            </div>
                        </td>        
                        </tr>
                    ))):''}
                    {Array.from(Array(count)).map(((index,c) => (
                        
                        <tr className='staff-add-newClass' key ={c}> 
                        <td><IconButton className='icon-delete' onClick={MinusHandler}><DeleteForeverIcon/></IconButton></td>
                        <td><TextField  className='text-addClass' variant='outlined'  name='courseDescription' placeholder='Course Name' required onChange={ChangeHandler}
                    sx={{ width:'8em', backgroundColor: 'white', borderRadius: '5px' }}></TextField></td>
                        <td><TextField   className='text-addClass' variant='outlined' type='number' InputProps={{ inputProps: { min: 0 } }}  name='courseLectureNumber' placeholder='Lecture Number' required onChange={ChangeHandler}
                    sx={{ width:'8em', backgroundColor: 'white', borderRadius: '5px'}}></TextField></td>
                        <td><TextField className='text-addClass' variant='outlined' type='number' InputProps={{ inputProps: { min: 0 } }}  name='courseLength' placeholder='courseLength' required onChange={ChangeHandler}
                    sx={{ width:'8em', backgroundColor: 'white', borderRadius: '5px'}}></TextField></td>
                        <td><TextField className='text-addClass' variant='outlined' type='number' InputProps={{ inputProps: { min: 0 } }}  name='coursePrice' placeholder='Price' required onChange={ChangeHandler}
                    sx={{ width:'8em', backgroundColor: 'white', borderRadius: '5px'}}></TextField></td>
                        <td><TextField  className='text-addClass' variant='outlined'  name='pre_Requisite' placeholder='pre_Requisite' required onChange={ChangeHandler}
                    sx={{ width:'8em', backgroundColor: 'white', borderRadius: '5px'}}></TextField></td>
                        <td><TextField className='text-addClass' variant='outlined'  name='courseDetail' placeholder='Detail' multiline required onChange={ChangeHandler}
                    sx={{ width:'8em', backgroundColor: 'white', borderRadius: '5px'}}></TextField></td>
                        <td><input type='date' name='courseCreateDate' defaultValue={date} required onChange={ChangeHandler}/></td>
                        <td colSpan={2}><Button variant='contained' type='submit' onClick={submitAdd}
                        sx={{padding :1,margin:1,  color: 'white', backgroundColor: '#a41a1a' }}>Add</Button></td> 
                        </tr>
                        )))}
                    <tr>
                        <td colSpan={10}><CustomButton variant='text' color='success' onClick={AddHandler}
                        startIcon={<AddCircleOutlineRoundedIcon sx={{ fontSize: 30 }}>add_circle</AddCircleOutlineRoundedIcon>}
                        sx={{padding :1,margin:1, color: 'white', backgroundColor:'rgb(127, 69, 101)'}}>Add New Course</CustomButton></td>
                    </tr>
            </tbody>
        </table>
        </form>
        </div>
        <div>
            {idUpdate!== '' ? (  
            <div>
            <h1 id="update">Update <IconButton color='error' onClick={offUpdateHandler}
            ><DeleteForeverIcon/></IconButton></h1>
               <UpdateCourse id={idUpdate}/>
            </div>
             ) :''}
            </div>  
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
                     <Button  onClick={deleteSubmit} autoFocus>
                    Yes
                </Button>
                 </DialogActions>
              </Dialog>        
            </div>
     
    </div>
  )
}
