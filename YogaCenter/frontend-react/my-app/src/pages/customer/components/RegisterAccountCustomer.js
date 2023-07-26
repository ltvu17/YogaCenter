import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { Input, TextField,MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { useCookies } from "react-cookie";
import axios from "axios";
import { URL_API, notification } from "../../../api/ConstDefine";
import {
  guestNotification,
  staffNotification,
} from "../../../service/IdPublic/IdPublic";
import uuidv4 from "../../../service/IdPublic/IdPublic";


const ariaLabel = { "aria-label": "description" };

export default function RegisterAccountCustomer( {onRegistrationSuccess}) {
  const navigate = useNavigate();
  //---------------------------------------API------------------------------------------
  let notificationAPI = URL_API + `Notification`;
  let userNotificationAPI = URL_API + `UserNotification`;

  //---------------------------------------Stype------------------------------------------
  const InputCus = styled(Input)`
    &:after {
      border-bottom: 2px solid #951a3b;
    }
  `;

  //---------------------------------------Data------------------------------------------
  const [noteId] = useState(uuidv4());
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerGender, setCustomerGender] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [phoneEvent, setPhoneEvent] = useState(false);
  const [registerEven, setRegisterEvent] = useState(false);

  //---------------------------------------handle-------------------------------------------
  const handleEmailChange = (event) => {
    setCustomerEmail(event.target.value);
  };
  const handleNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setCustomerPhone(event.target.value);
  };
  const handleGenderChange = (event) => {
    setCustomerGender(event.target.value);
  };
  const handleAddressChange = (event) => {
    setCustomerAddress(event.target.value);
  };
  const handlerRegisterSubmit = async (event) => {
    event.preventDefault();
    if (customerPhone.length === 10) {
      setPhoneEvent(false);
      await axios
        .post(notificationAPI, {
          id: noteId,
          title: "Customer Register",
          detail: `Email: ${customerEmail}\nName: ${customerName
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (match) =>
              match.toUpperCase()
            )}\nPhone: ${customerPhone.slice(
            1
          )}\nGender: ${customerGender}\nAddress: ${customerAddress}\n`,
          status: "1",
        })
        .then((res) => {
          console.log("succes create notification");
        })
        .catch((error) => {
          console.log(noteId);
          console.log(error);
        });
      await axios
        .post(
          userNotificationAPI,
          {},
          {
            headers: {
              senderId: guestNotification,
              receiverId: staffNotification,
              noteId: noteId,
            },
          }
        )
        .then((res) => {
          console.log(noteId);
          console.log("succes create userNotification");
          setCustomerEmail("");
          setCustomerName("");
          setCustomerPhone("");
          setCustomerGender("");
          setCustomerAddress("");
          setRegisterEvent(true);
        })
        .catch((error) => {
          console.log(noteId);
          console.log(error);
        });
        onRegistrationSuccess();
    } else {
      setPhoneEvent(true);
    }
  };

  return (
    <div >
      <form onSubmit={handlerRegisterSubmit}>
        <ul className="customer-formRegister">
          {registerEven ? (
            <p>
              Register succes: Follow email and we will send password for you
              late
            </p>
          ) : (
            ""
          )}
          <li>
            <TextField
              className="customer-input"
          
              placeholder="Email"
              inputProps={ariaLabel}
              required
              type="email"
              value={customerEmail}
              onChange={handleEmailChange}
            />
          </li>
          <li>
            <TextField
              className="customer-input"
          
              placeholder="Full name"
              inputProps={ariaLabel}
              required
              type="text"
              value={customerName}
              onChange={handleNameChange}
            />
          </li>
          {phoneEvent ? <p>Phone number wrong format</p> : ""}
          <li>
            <TextField
              className="customer-input"
          
              placeholder="Phone"
              inputProps={ariaLabel}
              required
              type="number"
              value={customerPhone}
              onChange={handlePhoneChange}
            />
          </li>
          <li>
    <TextField
      className="customer-input"
  
      label="Gender"
      select
      required
      value={customerGender}
      onChange={handleGenderChange}
    >
      <MenuItem value="male">Male</MenuItem>
      <MenuItem value="female">Female</MenuItem>
      <MenuItem value="other">Other</MenuItem>
    </TextField>
  </li>
          <li>
            <TextField
              className="customer-input"
              placeholder="street, city, district, province"
          
              inputProps={ariaLabel}
              required
              type="Address"
              value={customerAddress}
              onChange={handleAddressChange}
            />
          </li>
          <li>
            <Button variant="contained" type="submit">
              Register
            </Button>
          </li>
        </ul>
      </form>
    </div>
  );
}
