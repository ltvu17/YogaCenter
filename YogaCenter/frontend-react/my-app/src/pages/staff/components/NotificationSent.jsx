import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { URL_API,notification } from './ConstDefine';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

export default function NotificationSent({status}) {
    const [sendPost,setSendPost] = useState();
    const [open, setOpen] = useState(false);
    const [idDelete, setIdDelete] = useState('');
    const navigate = useNavigate();
    ///URP_API
    let getSendPostAPI = URL_API +`UserNotification/sender/`+notification;
    let deleteNotification = URL_API+`Notification/${idDelete}`;
    useEffect(()=>{
        axios.get(getSendPostAPI).then(r=>setSendPost(r.data)).catch(err => console.log(err));
    },[]);
    function filterDate(time){
        const split = time.split("T");
        let value = split[0];
        return value;
    }
    const DeleteButton = styled(Button)`
       background-color: #a70707;
     font-family: arial;
     color: white;
     border-radius: 35px;
     height: 50px;
     font-weight: 500;
     margin :2px;
  
     &:hover {
        background-color: #ff353587;
     }
   `;
   ///Handler
    
    const handleClose = () => {
    setOpen(false);
    };
    function deleteClass(value){
        setOpen(true);     
        setIdDelete(value);  
    }
    const deleteSubmit = () => {
    setOpen(false);
    axios.delete(deleteNotification).then(r=> console.log(r)).catch(err => console.log(err));
    alert("Deleted");
    navigate(0);
    }
    return (
    <div className='staff-sent'>
    
    <table className='table-staff-noti'>
        <thead>
            <tr>
                <th>Index</th>
                <th>Title</th>
                <th>Desctiption</th>
                <th>Date</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {sendPost?sendPost.map((item,index) =>(
                
                <tr key={index}>
                    <td>{index +1}</td>
                    <td>{item.notification.title}</td>
                    <td><textarea disabled style={{ whiteSpace: 'pre-wrap'}} rows={5} cols={50}>{item.notification.detail}</textarea></td>
                    <td>{filterDate(item.daycreate)}</td>
                    <td>{status?'':(<DeleteButton  onClick={() => deleteClass(item.notification.id)}>Delete</DeleteButton>)}</td>
                </tr>              
            )
            ):<tr></tr>}         
        </tbody>
    </table>
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
                            <p style={{ color: 'red' }}>Do you want to delete this notification ?</p>
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
    )
}
