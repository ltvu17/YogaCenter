import React from 'react'
import { useState, useEffect } from 'react';
import {Form, Link, json,useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import { Grid, Input, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {styled}    from '@mui/material/styles';
import axios from 'axios';
import Alert, { AlertProps } from '@mui/material/Alert';
import { Cookies, useCookies } from 'react-cookie';
import { type } from '@testing-library/user-event/dist/type';
import '../css/login.css'

const UsernameTextField = styled(TextField)`
& label.Mui-focused {
    color:black;
  }
  .MuiInput-underline:after {
    border-bottom-color: black;
  }
`;

const PasswordInputLabel = styled(InputLabel)`
&.Mui-focused {
  color: black;
}
::after {
  border-bottom-color:black;
}
`;

const PasswordInputUnderline = styled(Input)`
&::after {
  border-bottom-color: black;
}
`;
var status = null;
var redirect = 0;
export default function Login(){
    axios.defaults.withCredentials = true;
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    useEffect(() => {
      const keyDownHandler = event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSubmit();
        }
      };
      document.addEventListener('keydown', keyDownHandler);
      return () => {
        document.removeEventListener('keydown', keyDownHandler);
      };
    }, []);
    
    const [user,setState] = useState({
      userName : "",
      userPassword: ""
    });
    const navigate = useNavigate();
    const [cookie,setCookie,remove] = useCookies();
    try{
      var mesage = JSON.stringify(cookie.mesage);
      if(mesage.localeCompare('"invalid"', undefined, { sensitivity: 'base' }) === 0){    
        status = 'Invalid Account';
        remove("mesage");
    }}catch(er){}
    
      const ChangeHandler = (e) =>{
        setState(p => {
          return {...user, [e.target.name] : e.target.value }
        })    
      };
      const handleSubmit= (e) => {   
        axios.post("https://localhost:7096/api/User/Login", "", {
          headers:{
            'userName': user.userName,
            'userPasswork': user.userPassword,
          },
        }).then().catch(er => console.log(er));    
        setCookie('flag', 1,{ path:'/'});
        navigate('/Redirecting');
      };
      
    return(
         <div className="login" >
         <Grid container className='box'>
          <Grid item md={7} sx={{ padding: '16px',
                                  background: 'white',
                                  position:'relative',
                                  borderRadius: '0px 60px 0px 60px'}}>
            <img src='assets/images/background-login.jpg' />
            <Typography variant='h1' sx={{position: 'absolute',
                                          bottom: '32%',
                                          left:'8%',
                                          fontSize: '3.4rem',
                                          color: 'white',
                                          fontWeight: '600',}}>“</Typography>
            <Typography variant='h1' sx={{position: 'absolute',
                                          bottom: '5%',
                                          fontSize: '2.4rem',
                                          color: 'white',
                                          fontWeight: '600',
                                          fontFamily: 'sans-serif',
                                          padding: '40px'
                                                  }}>Yoga is not about touching your toes, it is about what you learn on the way down.</Typography>
          </Grid>
          <Grid item md={5} className='formLogin' >
          <h1>  Sign in </h1>
          {status != null?
            (<Alert severity="error" variant="filled"  sx={{ width: '80%', marginTop: '10px', color: '#550A35', backgroundColor:'#F67280', marginLeft: '10%' }}>
            {status}
            </Alert>) :''
            }
            
          <UsernameTextField onChange={ ChangeHandler} name='userName' className="login-username"  sx={{  width: '300px' }} label="Username" variant="standard"/>
          <FormControl  className="login-password" sx={{  width: '300px' }} variant="standard">
            <PasswordInputLabel htmlFor="standard-adornment-password" label="Password">Password</PasswordInputLabel>
            <PasswordInputUnderline onChange={ ChangeHandler} name='userPassword'
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }          
            />
          </FormControl>
            <div className='button-forgot'><Link  to='/forgot-password'>Forgot your password?</Link></div>
            <form onSubmit ={handleSubmit} >
            <Button  type='submit' variant='contained' className='button-login'>Login</Button>
            </form>
            </Grid>
          </Grid>
        </div>
    )
}