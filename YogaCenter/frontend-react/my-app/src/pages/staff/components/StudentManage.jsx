import React, { useCallback } from 'react'
import { useState } from 'react'
import { URL_API } from './ConstDefine';
import { useEffect } from 'react';
import axios from 'axios';
import '../css/StudentManage.css'
import Button from '@mui/material/Button';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



export default function StudentManage() {
    ///Declare
  const location = useLocation();
  const [id,setId] = useState(location.state.id);
  const [name,setName] = useState(location.state.name);
  const navigate = useNavigate()
  const [studentPosts,setStudentPosts] = useState([]);
  const [students,setStudents] = useState([]);
  const [studentAdd, setStudentAdd] = useState([]);
  const [add,setAddMode] = useState(false);
  const [currentList,setList] =useState([]);
  const [open, setOpen] = useState(false);
  const [idDelete,setIdDelete] =useState('');
  const [studentHasClass,setStudentHasClass] = useState();

    ////URL_API
    let studentClassAPI = URL_API+`ClassCustomer/${id}`;
    let getAllStudentAPI = URL_API+'Customer'
    let getAllStudentRegisAPI = URL_API+`Invoice/course/${location.state.courseId}`
    let postStudentClass = URL_API+`ClassCustomer/${id}`
    let getStudentAlreadyHaveClassAPI = URL_API+`ClassCustomer/course/${location.state.courseId}`
    let deleteStudentClass = URL_API+`ClassCustomer/${id}`
    ///Get DATA
    useEffect(()=>{
        if(id !== ''){
            axios.get(studentClassAPI).then(r=> {setStudentPosts(r.data)}).catch(err => console.log(err));
        }
    },[id]);
    useEffect(() =>{
        if(id !== ''){
            axios.get(getStudentAlreadyHaveClassAPI).then(r => {setStudentHasClass(r.data)}).catch(err => console.log(err));
        }
    },[id]);
    useEffect(() =>{
        if(id !== ''){
            axios.get(getAllStudentRegisAPI).then(r => {setStudents(r.data)}).catch(err => console.log(err));
        }
    },[id]);
    console.log(location);
    ////Fuctions

    const addStudenClass = () =>{
        alert("Add successfully");
        
        studentAdd.forEach(student=>{
            axios.post(postStudentClass,"",{
                headers:{
                    customerId : student
                }
            }).then(r => console.log(r)).catch(err => console.log(err))
        }
        )
        navigate(0);
    }
    const deleteSubmit = () =>{
       axios.delete(deleteStudentClass,{
        headers:{
        customerId : idDelete,
       }}).then(r => console.log(r)).catch(err => console.log(err))
       navigate(0);
    }
    
    

    ////Handler
    function StudentListHandler(studentid){
        if(studentAdd.includes(studentid))
        {          
            
            studentAdd.splice(studentAdd.indexOf(studentid),1);
        }
        else
        {
            studentAdd.push(studentid);
        }    
        setStudentAdd(studentAdd);
    }
    function deleteStudent(studentId){
        setOpen(true);     
        setIdDelete(studentId);  
    }
    const handleClose = () => {
        setOpen(false);
    }; 
    const addModeOff = () =>{
        setAddMode(p => false)
    }
    const addMode = ()=>{
        studentHasClass.forEach(student =>{
            currentList.push(student.id);
        })
        if(add ===false){ 
        setAddMode(p => true)}
        else{
            setAddMode(p => false);
        }
    }
    console.log(currentList);
    const back = () =>{
        navigate('/staffmanage');
    }
    
  return (
    <div className='student-manage'>
    
    <div className='class-post'>
    <Button className='button-back' variant='contained'  startIcon={<ArrowBackIcon fontSize='large'/>} onClick={back}
        sx={{padding :1,margin:1, color: 'white', fontSize:'18px',fontWeight:'600', backgroundColor:'rgb(38 38 38 / 85%)'}}>Back to class list</Button>
        <h1>Class Name: {name}</h1>
        {studentPosts.length < 20? (
        <div><Button className='button-add'variant='contained' startIcon={<PersonAddIcon fontSize='large'/>} onClick={addMode}
        sx={{padding :1,margin:1, color: 'white', backgroundColor:'#010f51b8'}}>Add Student</Button></div>
        ):''}
        
        <table className='table-add-class'>
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Student id</th>
                    <th>Student Name</th>
                    <th>Student Image</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
     {studentPosts && add ===false ? studentPosts.map(((item,index) =>(
        <tr key={index}>
            <td>{index+1}</td>
            <td>{item.customerId}</td>
            <td>{item.customer.customerName}</td>
            <td>N/a</td>
            <td><Button variant='text' size='small' startIcon={<DeleteForeverOutlinedIcon/>} onClick={()=>deleteStudent(item.customerId)}
                sx={{padding :1,margin:1, color: 'white', backgroundColor:'#a70707'}}>Delete Student</Button></td>
        </tr>
     ))): <tr></tr>}
    {add === true ? students.map(((item,index)=>
       
        <tr key={index}>
            <td>{index+1}</td>
            <td>{item.id}</td>
            <td>{item.customerName}</td>
            <td>N/a</td>
            <td>{currentList.includes(item.id)?(<input className="checkBox" type="checkbox" id="myCheckBox" value={item.id} checked readOnly/>):(
                <input className="checkBox" type="checkbox" id="myCheckBox" value={item.id} onChange={()=>StudentListHandler(item.id)}/>
            )}</td>
        </tr>   
       )):<tr>
        </tr>}
            </tbody>
        </table>
        {add === true ? (
            <div style={{textAlign:'center'}}><Button className='cancel-add-stu' variant='contained' startIcon={<CheckCircleOutlineIcon/>} onClick={addModeOff}
            sx={{padding :1,margin:1, color: 'white', backgroundColor:'#a70707'}}>Cancel</Button>
            <Button className='save-add-stu' variant='contained' startIcon={<CheckCircleOutlineIcon/>} onClick={addStudenClass}
            sx={{padding :1,margin:1, color: 'white', backgroundColor:'#010f51b8'}}>Save</Button></div>
        ):''}
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
                    <p style={{color:'red'}}>Do you want to delete this student ?</p>
                        </DialogContentText>
                    </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                     <Button onClick={deleteSubmit} autoFocus>
                    Yes
                </Button>
                 </DialogActions>
              </Dialog>        
            </div>
    </div>
    </div>
  )
}
