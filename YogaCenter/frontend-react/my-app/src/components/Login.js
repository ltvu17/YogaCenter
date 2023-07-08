import React from 'react'
import { useState, useEffect } from 'react';
import {Form, Link, json,useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import { Input } from '@mui/material';
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
    color: #866077;
  }
  .MuiInput-underline:after {
    border-bottom-color: #951a3b;
  }
`;

const PasswordInputLabel = styled(InputLabel)`
&.Mui-focused {
  color: #866077;
}
::after {
  border-bottom-color: #951a3b;
}
`;

const PasswordInputUnderline = styled(Input)`
&::after {
  border-bottom-color: #951a3b;
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
        console.log('User pressed: ', event.key);
  
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
         <div className="login" style={{ backgroundImage: "url('/assets/images/backgroundLogin.png')" }}>
         <div className='box'>
         <div className='formLogin'>
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
          </div>
          </div>
        </div>
    )
}