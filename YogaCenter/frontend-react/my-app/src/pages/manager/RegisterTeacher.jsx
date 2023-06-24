import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import uuidv4, { URL_API } from '../staff/components/ConstDefine';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';

var curr = new Date();
curr.setDate(curr.getDate()+1);
var date = curr.toISOString().substring(0,10);
export default function RegisterTeacher() {
    const Div = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: 'black',
        padding: theme.spacing(1),  
        color:'white',
    }));
    const [message,setMessage] = useState('');
    const [idUser, setId] = useState(uuidv4());
    const [inputField,setInputFields] = useState({
        userName : '',
        userPassword : '',
        userPasswordConfirm:'',
        teacherName : '',
        teacherGender : '',
        teacherAddress: '',
        teacherPhone :'',
        teacherStartDate : date,
        teacherEndDate : date,
    });
      ////URL_API
    let postUserAPI = URL_API + `User/teacher`
    let postTeacherAPI = URL_API+`Teacher/${idUser}`;
      ////Handler
    const ChangeHandler = (e) =>{
        setInputFields(p => {
            return {...inputField, [e.target.name] : e.target.value }
        })    
    };
    const navigate = useNavigate();
      ////Submit
    async  function  SubmitHandle(event){
        event.preventDefault();
        if(inputField.userPassword !== inputField.userPasswordConfirm){
            setMessage("Confirm password doesn't match!");
            return;
        }
        if(inputField.teacherPhone.length !== 10){
            setMessage("Phone number is not valid (10 numbers)");
            return;
        }
        setMessage('');
        await axios.post(postUserAPI,{
            id: idUser,
            userName : inputField.userName,
            userPasswork : inputField.userPassword,
        }).then(r=> console.log(r)).catch(err=> setMessage(err.response.data.message));
        await axios.post(postTeacherAPI,{
            teacherName: inputField.teacherName.replace(/\s\s+/g, ' '),
            teacherGender: inputField.teacherGender,
            teacherAddress: inputField.teacherAddress.replace(/\s\s+/g, ' '),
            teacherPhone : inputField.teacherPhone.substring(1),
            teacherStartDate : inputField.teacherStartDate,
            teacherEndDate : inputField.teacherEndDate,
        }).then(r=> console.log(r)).catch(err=>console.log(err));
        if(message ===  ''){
            alert("Create successfully");
            navigate(0);
        }
        }

        ///Filter
        function filterDay(day){
            const split = day.split("T");
            let value = split[0];
            return value;
        }
    return (
    <div>
        <div>
        <div style={{height:'70px'}}>
        </div>
        <div style={{textAlign :'center'}}>
        <Div>{"Register Teacher Account"}</Div>
        <form onSubmit={(e)=>SubmitHandle(e)}>   
            <Box
            sx={{
            '& > :not(style)': { m: 1, width: '35%' },
            }}
            noValidate
            autoComplete="on"
            >
            <TextField name='userName'type='email' required label="UserName" onChange={ChangeHandler} variant="outlined" />
            <br/>
            <TextField name='userPassword' type='password' required label="UserPassword" onChange={ChangeHandler} variant="outlined" />
            <br/>
            <TextField name='userPasswordConfirm' type='password' required label="Confirm UserPassword" onChange={ChangeHandler} variant="outlined"/>
            <br/>
            <TextField name='teacherName'  required label="Name" onChange={ChangeHandler} variant="outlined" />
            <br/>
            <TextField
                    onChange={ChangeHandler}
                    name='teacherGender'
                    id="outlined-select-currency"
                    select
                    label="Gender"
                    defaultValue=''
                    helperText="Please select gender"
                    required
            >       
            <MenuItem value="Male">
                Male
            </MenuItem>
            <MenuItem value="Female">
                Female
            </MenuItem>
            </TextField>
            <br/>
            <TextField name='teacherAddress'  required label="Address" onChange={ChangeHandler} variant="outlined" />
            <br/>
            <TextField name='teacherPhone' type='number' required label="Phone"  onChange={ChangeHandler} variant="outlined" />
            <br/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker name='teacherStartDate' label="Teacher Start Date" defaultValue={dayjs(date)} 
                onChange={(newvalue) => setInputFields(p=>{return{...inputField,teacherStartDate: filterDay((new Date(`${newvalue.$y}-${newvalue.$M+1}-${newvalue.$D+1}`).toISOString()))}})}/>
                <br/>
                <DatePicker name='teacherEndDate' label="Teacher End Date" defaultValue={dayjs(date)} minDate={dayjs(inputField.teacherStartDate)}
                onChange={(newvalue) => setInputFields(p=>{return{...inputField,teacherEndDate: filterDay((new Date(`${newvalue.$y}-${newvalue.$M+1}-${newvalue.$D+1}`).toISOString()))}})}/>
            </LocalizationProvider>
            <br/>
            {message? <p style={{marginLeft:'25%', color:'red'}}>{message}</p>            
                :''}

            <Button variant="contained" type='submit'  fullWidth={false}>Register</Button>         
            </Box>
            </form>
        </div>
    </div>
    </div>
    )
}
