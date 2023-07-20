import React from 'react'
import Button from '@mui/material/Button';

import UpgradeRoundedIcon from '@mui/icons-material/UpgradeRounded';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { URL_API } from '../staff/components/ConstDefine';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UpdateEvent from './UpdateEvent';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import './css/EventManage.css'
import Pagination from '@mui/material/Pagination';
var curr = new Date();
curr.setDate(curr.getDate()+1);
var date = curr.toISOString().substring(0,10);
export default function EventManage() {

  const navigate = useNavigate();
  const [idDelete,setIdDelete] =useState('');
  const [idUpdate,setUpdate] = useState('');
  const [count,setCount] =useState(0);
  const [open, setOpen] = useState(false);
  const [postEvent,setEvent] = useState([]);
  const [inputField,setInputFields] = useState({
    eventName : '',
    eventDetail : '',
    eventStartDate : date,
    eventEndDate : date,
    eventDiscount: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
   const totalItems = postEvent.length;
   const totalPages = Math.ceil(totalItems / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const displayedPosts = postEvent.slice(startIndex, endIndex);
  ///URL_API
  let getEvent = URL_API+`Event`;
  let deleteEvent = URL_API+`Event/${idDelete}`
  //Getdata
  useEffect(()=>{
    axios.get(getEvent).then(r=> setEvent(r.data)).catch(err=> console.log(err));
  },[]);
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
  ///Handler
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
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
  function deleteClass(value){
        setOpen(true);     
        setIdDelete(value);  
    }
    const handleClose = () => {
      setOpen(false);
  };
  const offUpdateHandler = () =>{
    setUpdate(p=>'');
  }
  const deleteSubmit = () =>{
    setOpen(false);
    axios.delete(deleteEvent).then(r => console.log(r)).catch(err => console.log(err));
    alert("Deleted");
    navigate(0);
}
  ///Filter
  function filterDay(day){
    const split = day.split("T");
    let value = split[0];
    return value;
}
  ///Submit
  const submitAdd=()=>{
    axios.post(getEvent,{
      eventName: inputField.eventName,
      eventDetail :inputField.eventDetail,
      eventStartDate : inputField.eventStartDate,
      eventEndDate : inputField.eventEndDate,
      eventDiscount : inputField.eventDiscount,
  }).then(r=> console.log(r)).catch(err => console.log(err));
  }
  const CustomButton = styled(Button)`
        background-color: #1263fd;
      font-family: arial;
      color: white;
      border-radius: 8px;
      height: 50px;
      font-weight: 600;

   
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
     margin :2px;

  
     &:hover {
      background-color:  #f10303;
     }
   `;

  return (
    <div className='manage-event'>
     
     
      <div className='class-post'>
      <h1 className='staff-title'>Event Management </h1>
        <form>
        <table className='table-add-class'>
            <thead>
                <tr>
                <th>Index</th>
                <th>Event Name</th>
                <th>Detail</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Discount</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {displayedPosts? displayedPosts.map(((item, index) =>(
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{item.eventName}</td>
                          <td>{item.eventDetail}</td>
                          <td>{filterDay(item.eventStartDate)}</td>
                          <td>{filterDay(item.eventEndDate)}</td>
                          <td>{item.eventDiscount}%</td>              
                          <td style={{textAlign: 'center'}}>
                            <div> 
                                <CustomButton variant='text'  startIcon={<UpgradeRoundedIcon/>}  onClick={() => getvalueUpdate(item.id)} 
                                sx={{margin: 1,color: 'white',padding:'6px 23px'}}>Update Event</CustomButton>
                                <DeleteButton variant='text'  startIcon={<DeleteForeverOutlinedIcon/>} onClick={()=> deleteClass(item.id)}
                                sx={{margin: 1,color: 'white',padding:'6px 23px'}}>Delete Event</DeleteButton>
                            </div>
                          </td>        
                      </tr>
                    ))):''}
                    {Array.from(Array(count)).map(((index,c) => (
                        
                        <tr className='staff-add-newClass' key ={c}> 
                        <td><IconButton  className='icon-delete'  onClick={MinusHandler}><DeleteForeverIcon/></IconButton></td>
                        <td><TextField  className='text-addClass' variant='outlined' name='eventName' placeholder='Event Name' required onChange={ChangeHandler}
                      sx={{ width:'11em', backgroundColor: 'white', borderRadius: '5px' }}></TextField></td>
                        <td><TextField  className='text-addClass' variant='outlined' name='eventDetail' placeholder='Event Detail' multiline required onChange={ChangeHandler}
                      sx={{ width:'11em', backgroundColor: 'white', borderRadius: '5px' }}></TextField></td>
                        <td><input  style={{height:'2.5em'}}  type='date' name='eventStartDate' defaultValue={filterDay(inputField.eventStartDate)} required onChange={ChangeHandler}/></td>
                        <td><input  style={{height:'2.5em'}}  type='date' name='eventEndDate' defaultValue={filterDay(inputField.eventEndDate)} min={filterDay(inputField.eventStartDate)}  required onChange={ChangeHandler}/></td>
                        <td><TextField  className='text-addClass' variant='outlined' type='number' InputProps={{ inputProps: { min: 0 } }} name='eventDiscount' placeholder='Event Discount' required onChange={ChangeHandler}
                      sx={{ width:'11em', backgroundColor: 'white', borderRadius: '5px' }}></TextField></td>
                        <td colSpan={2}><Button variant='text' type='submit' onClick={submitAdd}
                          sx={{ color: 'white', backgroundColor: '#1263fd' }}>Add</Button></td> 
                        </tr>
                        )))}
                    <tr>
                        <td colSpan={10}><CustomButton variant='text' onClick={AddHandler}
                        startIcon={<AddCircleOutlineRoundedIcon sx={{ fontSize: 30 }}>add_circle</AddCircleOutlineRoundedIcon>}
                        sx={{color: 'white',margin: 1,padding:'6px 23px'}}>Add New Event</CustomButton></td>
                    </tr>
            </tbody>
        </table>
        </form>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </div>
        </div>
        <div>
            {idUpdate!== '' ? (  
            <div>
            <h1 style={{width:'100%',textAlign:'center',marginTop:'25px'}} id="update">Update <IconButton color='error' onClick={offUpdateHandler}
            ><DeleteForeverIcon/></IconButton></h1>
              <UpdateEvent id={idUpdate}/>
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
                    <p style={{color:'red'}}>Do you want to delete this event ?</p>
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
