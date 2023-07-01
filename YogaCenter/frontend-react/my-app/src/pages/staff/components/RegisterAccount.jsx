import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import uuidv4, { URL_API } from './ConstDefine';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../css/RegisterAccount.css'

import { Grid, Typography } from "@mui/material";
export default function RegisterAccount() {

  const [message,setMessage] = useState('');
  const [status,setStatus] = useState(false);
  const [idUser, setId] = useState(uuidv4());
  const [inputField,setInputFields] = useState({
    userName : '',
    userPassword : '',
    userPasswordConfirm:'',
    customerName : '',
    customerGender : '',
    customerAddress: '',
    customerPhone :'',
  });
  ////URL_API
  let postUserAPI = URL_API + `User/customer`
  let postCustomerAPI = URL_API+`Customer/${idUser}`;
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
    if(inputField.customerPhone.length !== 10){
      setMessage("Phone number is not valid (10 numbers)");
      return;
    }
    setMessage('');
    await axios.post(postUserAPI,{
      id: idUser,
      userName : inputField.userName,
      userPasswork : inputField.userPassword,
    }).then(r=> {console.log(r)
                setStatus(true)}).catch(err=> setMessage(err.response.data.message));
    await axios.post(postCustomerAPI,{
      customerName: inputField.customerName.replace(/\s\s+/g, ' '),
      customerGender: inputField.customerGender,
      customerAddress: inputField.customerAddress.replace(/\s\s+/g, ' '),
      customerPhone : inputField.customerPhone.substring(1)
    }).then(r=> console.log(r)).catch(err=>console.log(err));
    if(status === true){
      alert("Create successfully");
      navigate(0);
    }
  }

  return (
    <div className='register-acc-container'>
        
        <h1 className='staff-title'>Register Account</h1>
      
        <form style={{width:'60%',height:'60%',position:'relative'}} onSubmit={(e)=>SubmitHandle(e)}>
        
          <Box className="box-register-acc">
          <Typography variant='h1'>New Customer</Typography>
            <Grid container>
         
              <Grid item md={12}>
                <TextField className='input-register-acc' name='customerName'  required label="Full name" onChange={ChangeHandler} variant="outlined" />
              </Grid>
              <Grid item md={12}>
                <TextField  className='input-register-acc' name='userName'type='email' required label="UserName" onChange={ChangeHandler} variant="outlined" />
              </Grid>
              <Grid container item md={12} spacing={2}>
                <Grid item md={6}>
                  <TextField   className='input-register-acc' name='userPassword' type='password' required label="UserPassword" onChange={ChangeHandler} variant="outlined" />
                </Grid>
                <Grid item md={6}>
                  <TextField  className='input-register-acc' name='userPasswordConfirm' type='password' required label="Confirm UserPassword" onChange={ChangeHandler} variant="outlined"/>
                </Grid>
              </Grid>
            
              <Grid container item md={12} spacing={2}>
                <Grid item md={6}>
                  <TextField  className='input-register-acc'
                          onChange={ChangeHandler}
                          name='customerGender'
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
                  <TextField  className='input-register-acc' name='customerPhone' type='number' required label="Phone"  onChange={ChangeHandler} variant="outlined" />
                </Grid>
              </Grid>
              <Grid item md={12}>
                <TextField  className='input-register-acc' name='customerAddress'  required label="Address" onChange={ChangeHandler} variant="outlined" />
              </Grid>
              {message? <p style={{marginLeft:'33%', color:'red', textAlign:'left'}}>{message}</p>            
                :''}

              <Button variant="contained" type='submit' sx={{width:"100%",borderRadius:'16px',fontSize:'20px',fontWeight:'600'}}>Register</Button>     
            </Grid>    
          </Box>
        </form>
     
    </div>
  )
}
