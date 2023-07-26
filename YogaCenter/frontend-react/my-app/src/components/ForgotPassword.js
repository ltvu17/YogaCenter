import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { URL_API } from "../api/ConstDefine";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import '../css/forgotpassword.css'
export default function ForgotPassword() {
  const CryptoJS = require("crypto-js");
  var OTP = "";
  var navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [otpCookie, setOtpCookie] = useState("");
  const [email, setEmail] = useState("");
  const [otpData, setOtpData] = useState();
  const [formOTP, setFormOTP] = useState(false);
  const [formUpdatePassword, setFromUpdatePassword] = useState(false);
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  //Api path
  let profileCustomerAPI = URL_API + `Email/sendOTPByEmail/${email}`;
  let checkCurrentPasswordAPI = URL_API + `User/userName/${email}`;
  let x = "";

  useEffect(() => {
    x = document.cookie;
  });

  //-------------------------------Onchange----------------------------
  const newPasswordChange = (e) => {
    setnewPassword(e.target.value);
  };
  const confirmPasswordChange = (e) => {
    setconfirmPassword(e.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const otpChange = (e) => {
    setOtpData(e.target.value);
  };

  //-----------------------------Submit------------------------------
  const handleSubmitForgetPassword = (event) => {
    // Gửi yêu cầu đặt lại mật khẩu với email được nhập
    // Gọi API hoặc thực hiện xử lý tại đây
    axios
      .post(profileCustomerAPI)
      .then(setFormOTP(true))
      .catch((er) => console.log(er));
    console.log("Email submitted: ", email);
  };
  const HandleSubmitOTP = (e) => {
    e.preventDefault();
    setOtpCookie(cookies.OTP);
    OTP = CryptoJS.SHA256(otpData).toString();
    if (OTP === x.slice(4)) {
      setFromUpdatePassword(true);
      console.log("dung");
    } else if (otpCookie === undefined) {
      setMessage("Timeout to enter OTP, please re-enter new OTP");
      console.log("sairoi");
    } else {
      setMessage("Wrong OTP");
      console.log("Sai nhieu roi");
    }
  };

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      axios
        .put(checkCurrentPasswordAPI, {
          userName: "dsada",
          userPasswork: newPassword,
          status: 1,
        })
        .then((res) => {
          alert("Change Password Successfully")
          navigate('/login');
        })
        .catch((error) => {
          setMessage(
            "Something wrong. You can send a message to the center for support"
          );
        });
    } else {
      setMessage("New password and confirm password are not the same");
    }
  };

  return (
    <div className="forgotPassword-container">
     <div className="forgotPassword-main" >
      {formOTP !== true ? (

          <form onSubmit={handleSubmitForgetPassword}>
          <Box sx={{display:'flex',flexDirection:'column'}}>
          <Grid sx={{textAlign:'center',marginBottom:'10%'}}>
            <h1>Forgot Password</h1>
            <p>No worries, we'll send you reset instructions</p>
          </Grid>
            <TextField  className="input-forgotPassword"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="  Enter your email"
              required  variant="outlined"
              sx={{    marginBottom: '7%'}}
            />
            <Button sx={{height:'47px',borderRadius: '16px',marginBottom:'7%'}} variant="contained" type="submit">Reset Password</Button>
            <Link to='/login'>   
              <Button sx={{    backgroundColor: 'white',color: 'black', width:'100%',height:'47px',borderRadius: '16px',marginBottom:'7%'}} variant="contained" type="submit">Back to Login</Button>
            </Link>  
          </Box>
          </form>
     
      ) : formUpdatePassword === true ? (
        <form onSubmit={handleSubmitChangePassword}>
          <label>New password</label>
          <TextField  className="input-forgotPassword" type="password" onChange={newPasswordChange}></TextField>
          <br />
          <label>Confirm password</label>
          <TextField  className="input-forgotPassword" type="password" onChange={confirmPasswordChange}></TextField>
          <Button sx={{height:'47px',borderRadius: '16px',marginBottom:'7%'}}  type="submit">Change Password</Button>
        </form>
      ) : (
        <Box sx={{display:'flex',flexDirection:'column'}}>
          <Grid sx={{textAlign:'center',marginBottom:'10%'}}>
            <h1>OTP Verification</h1>
            <p>Enter OTP Code sent to email</p>
          </Grid>
   
          <form onSubmit={HandleSubmitOTP}>
          <Box sx={{display:'flex',flexDirection:'column'}}>
            <TextField  className="input-forgotPassword"
              type="text"
              value={otpData} 
              onChange={otpChange}
              
                sx={{marginBottom: '7%'}}
              />
          
          <Button sx={{height:'47px',borderRadius: '16px',marginBottom:'7%'}} variant="contained" type="submit">Send</Button>
          </Box>
          </form>
          <p>{message}</p>
        </Box>
      )}
      </div>
    </div>
  );
}
