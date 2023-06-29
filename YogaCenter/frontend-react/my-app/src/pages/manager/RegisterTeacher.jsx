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
import { Grid, Typography } from "@mui/material";
import '../staff/css/RegisterAccount.css'
var curr = new Date();
curr.setDate(curr.getDate()+1);
var date = curr.toISOString().substring(0,10);
export default function RegisterTeacher() {
    const Div = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: 'black',
        padding: theme.spacing(5),  
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
    <div className='register-acc-container'>
       <h1 className='staff-title'>Register Teacher</h1>
       
       
        <form  style={{width:'60%',height:'60%',position:'relative'}} onSubmit={(e)=>SubmitHandle(e)}>   
            <Box className="box-register-acc">
                <Typography variant='h1'>New Teacher</Typography>
                <Grid container>
                    <Grid item md={12}>
                        <TextField className='input-register-acc' name='teacherName'  required label="Full name" onChange={ChangeHandler} variant="outlined" />
                    </Grid>
                    <Grid item md={12}>
                        <TextField className='input-register-acc' name='userName' type='email' required label="UserName" onChange={ChangeHandler} variant="outlined" />
                    </Grid>
                    <Grid container item md={12} spacing={2}>
                        <Grid item md={6}>
                            <TextField className='input-register-acc' name='userPassword' type='password' required label="UserPassword" onChange={ChangeHandler} variant="outlined" />
                        </Grid>
                        <Grid item md={6}>
                            <TextField className='input-register-acc' name='userPasswordConfirm' type='password' required label="Confirm UserPassword" onChange={ChangeHandler} variant="outlined"/>
                        </Grid>
                    </Grid>
                    <Grid container item md={12} spacing={2}>
                        <Grid item md={6}>
                            <TextField className='input-register-acc'
                                onChange={ChangeHandler}
                                name='teacherGender'
                                id="outlined-select-currency"
                                select
                                label="Gender"
                                defaultValue=''
                                required
                        >    
                            <MenuItem value="Male">
                                Male
                            </MenuItem>
                            <MenuItem value="Female">
                                Female
                            </MenuItem>
                        </TextField>
                        </Grid>
                        <Grid item md={6}>
                            <TextField className='input-register-acc' name='teacherPhone' type='number' required label="Phone"  onChange={ChangeHandler} variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <TextField className='input-register-acc' name='teacherAddress'  required label="Address" onChange={ChangeHandler} variant="outlined" />
                    </Grid>
                    <Grid container item md={12} spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid item md={6}>
                        <DatePicker className='input-register-acc' name='teacherStartDate' label="Teacher Start Date" defaultValue={dayjs(date)} 
                        onChange={(newvalue) => setInputFields(p=>{return{...inputField,teacherStartDate: filterDay((new Date(`${newvalue.$y}-${newvalue.$M+1}-${newvalue.$D+1}`).toISOString()))}})}/>
                        <br/>
                        </Grid>
                        <Grid item md={6}>
                        <DatePicker  className='input-register-acc' name='teacherEndDate' label="Teacher End Date" defaultValue={dayjs(date)} minDate={dayjs(inputField.teacherStartDate)}
                        onChange={(newvalue) => setInputFields(p=>{return{...inputField,teacherEndDate: filterDay((new Date(`${newvalue.$y}-${newvalue.$M+1}-${newvalue.$D+1}`).toISOString()))}})}/>
                        </Grid>
                       
                    </LocalizationProvider>
                    </Grid>
                </Grid>

            {message? <p style={{marginLeft:'25%', color:'red'}}>{message}</p>            
                :''}

            <Button variant="contained" type='submit' sx={{width:"100%",borderRadius:'16px',fontSize:'20px',fontWeight:'600'}}>Register</Button>         
            </Box>
            </form>
        
 
    </div>
    )
}
