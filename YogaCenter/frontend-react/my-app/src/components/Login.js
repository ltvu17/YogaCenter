import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom'
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
export default function Login(){
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    axios.defaults.withCredentials = true;
    const [user,setState] = useState({
      userName : "",
      userPasswork: ""
    });
    
      const ChangeHandler = (e) =>{
        setState(p => {
          return {...user, [e.target.name] : e.target.value }
        })
        
      };
      const handleSubmit = (e) => {
        axios.post("https://localhost:7096/api/User/Login", "", {
          headers:{
            'userName': user.userName,
            'userPasswork': user.userPasswork
          },
        })
        .then(r => console.log(r)).catch(er => console.log(er))
        console.log(user)
      };
    return(
        
        <div className="login" style={{ backgroundImage: "url('/assets/images/backgroundLogin.png')" }}>
         <div className='box'>
         <div className='formLogin'>
         <h1>  Sign in </h1>
         <UsernameTextField onChange={ChangeHandler} name='userName' className="login-username"  sx={{  width: '300px' }} label="Username" variant="standard"/>
         <FormControl  className="login-password" sx={{  width: '300px' }} variant="standard">
          <PasswordInputLabel htmlFor="standard-adornment-password" label="Password">Password</PasswordInputLabel>
          <PasswordInputUnderline onChange={ ChangeHandler}
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
        <Button onClick={handleSubmit} variant='contained' className='button-login'>Login</Button>
          </div>
          </div>
        </div>
    )
}