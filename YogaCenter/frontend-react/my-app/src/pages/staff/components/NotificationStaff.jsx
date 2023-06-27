import React, { useEffect } from 'react'
import NotificationSend from './NotificationSend'
import NotificationSent from './NotificationSent'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import uuidv4, { URL_API } from './ConstDefine';
import axios from 'axios';
import { notification } from './ConstDefine';
import { useNavigate } from 'react-router-dom';


export default function NotificationStaff() {
    const [composeStatus,setComposeStatus] = useState(false);
    const [customers,setCustomers] = useState();
    const [noteId] = useState(uuidv4());
    const navigate = useNavigate();
    const [inputField,setInputFields] = useState({
        senderId: notification,
        receiverId:'',
        title:'',
        detail:'',
        status:1,
    })
    ///Handler
    const ChangeHandler = (e) =>{
        setInputFields(p => {
            return {...inputField, [e.target.name] : e.target.value }
        })    
    };
        console.log(inputField);
    ///URL_API
    let getAllCustomersAPI = URL_API+`Customer`;
    let postNotificationAPI = URL_API+`Notification`
    let postUserNotificationAPI = URL_API+`UserNotification`
    ///Getdata
    useEffect(()=>{
        axios.get(getAllCustomersAPI).then(r => setCustomers(r.data)).catch(err => console.log(err));
    },[getAllCustomersAPI])
    ///Handeler
    const statusHanlder = ()=>{
        if(composeStatus){
            setComposeStatus(false);
        }
        else{
            setComposeStatus(true);
        }
    }
    //Submit
    const Submit= async()=>{
            await axios.post(postNotificationAPI,{
            id: noteId,
            title : inputField.title,
            detail : inputField.detail,
            status : inputField.status
            }).then(r=> {console.log(r)
            }).catch(err=> console.log(err));
            await axios.post(postUserNotificationAPI,'',
            {
            headers:{
                senderId: inputField.senderId,
                receiverId : inputField.receiverId === -1?null:inputField.receiverId,
                noteId : noteId,
            }
            }).then(r=> console.log(r)).catch(err=>console.log(err));
            navigate(0);
    }
    return (
    <div style={{marginLeft:'10%', marginBottom:'2%', marginRight:'1%'}}>
        {composeStatus? (
        <div className='compose-Notification'>
            <div className='compose-blur' onClick={statusHanlder}></div>
            <div className='compose-detail'>
            {/* <form> */}
            <h1 className='staff-title'>Send notification</h1>
            <TextField
                        onChange={ChangeHandler}
                        name='receiverId'
                        id="outlined-select-currency"
                        select
                        label="Sento"
                        defaultValue=''
                        helperText="Please select account"
                        required
            >       
            <MenuItem value={-1}>
              All customers
            </MenuItem>
            {customers? customers.map((item) =>(
                <MenuItem value={item.user.id} key={item.id}>                  
                        <p>{item.customerName}||0{item.customerPhone}</p>      
                    </MenuItem>
            )
            ):(<MenuItem/>)}
            </TextField>
            <br/>
            <TextField onChange={ChangeHandler} name='title' required label="Title" variant="outlined" />
            <br/>
            <p>Detail :</p>
            <textarea onChange={ChangeHandler} name='detail' required rows={10} cols={50}></textarea>   
            <Button size='large' type='submit' onClick={Submit} startIcon={<SendIcon/>} variant="contained">Send</Button>
            {/* </form> */}
            </div>
        </div>
        ):''}
        {/* <div style={{height:'50px'}}>
        </div>  */}
        <div className='notification'>
        <h1 className='staff-title'>Notification</h1>
        <div>
        <Button size='large' onClick={statusHanlder} startIcon={<SendIcon/>} variant="contained">Compose</Button>
        </div>
        <NotificationSend/>
        <NotificationSent status={composeStatus}/>
        </div>
    </div>
    )
}
