import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { URL_API } from "../api/ConstDefine";
import { useNavigate } from "react-router-dom";

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
    <div>
      <div style={{ height: "100px" }}></div>
      <div>
        <h1>Forgot Password</h1>
      </div>

      {formOTP !== true ? (
        <div>
          <form onSubmit={handleSubmitForgetPassword}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />
            <br />
            <button type="submit">Forgot Password</button>
          </form>
        </div>
      ) : formUpdatePassword === true ? (
        <form onSubmit={handleSubmitChangePassword}>
          <label>New password</label>
          <input type="password" onChange={newPasswordChange}></input>
          <label>Confirm password</label>
          <input type="password" onChange={confirmPasswordChange}></input>
          <br />
          <button type="submit">Change Password</button>
        </form>
      ) : (
        <div>
          <p>OTP</p>
          <form onSubmit={HandleSubmitOTP}>
            <input type="text" onChange={otpChange} value={otpData} />
            <button type="submit">Send</button>
          </form>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
