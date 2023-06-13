import React from 'react'
import { useState, useEffect } from 'react';
import {Link, json,useNavigate } from 'react-router-dom'
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
import '../css/login.css'
import { useCookies } from 'react-cookie';
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
export default function Redirect() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [userCookie, setCookie, removeCookie] = useCookies("");
    const navigate = useNavigate();
    let haveCookie = JSON.stringify(userCookie);   
    var count = 0;   
    useEffect(() =>{     
     
          if(userCookie.flag == 1){
          removeCookie("flag");
          navigate(0);}
  
          if(haveCookie.localeCompare('{}', undefined, { sensitivity: 'base' }) === 0){
            setCookie("mesage","invalid",{ path : '/'});
            navigate("/login");
          }
          try{
            var role = JSON.stringify(userCookie.Role);       
            if(role.toUpperCase().trim().localeCompare('"CUSTOMER"', undefined, { sensitivity: 'base' }) === 0){        
              navigate('/Home');
            }
            else 
              if(role.toUpperCase().trim().localeCompare('"STAFF"', undefined, { sensitivity: 'base' }) === 0){               
              navigate('/StaffManager');
            }}catch(err){
            }        
    },[count]);

  return (
        <div className="login" style={{ backgroundImage: "url('/assets/images/backgroundLogin.png')" }}>
         <div className='box'>
         <div className='formLogin'>
         <h1>  Sign in </h1>
         <UsernameTextField  name='userName' className="login-username"  sx={{  width: '300px' }} label="Username" variant="standard"/>
         <FormControl  className="login-password" sx={{  width: '300px' }} variant="standard">
          <PasswordInputLabel htmlFor="standard-adornment-password" label="Password">Password</PasswordInputLabel>
          <PasswordInputUnderline 
            name='userPasswork'
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
        <div className='button-forgot'><Link  to='/#'>Forgot your password?</Link></div>
        <Button variant='contained' className='button-login'>Login</Button>
          </div>
          </div>
        </div>
        
  )
}