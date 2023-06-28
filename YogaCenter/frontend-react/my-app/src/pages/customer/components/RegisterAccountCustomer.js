import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { Input, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const ariaLabel = { "aria-label": "description" };

export default function RegisterAccountCustomer() {
  //---------------------------------------Stype------------------------------------------
  const InputCus = styled(Input)`
    &:after {
      border-bottom: 2px solid #951a3b;
    }
  `;

  //---------------------------------------Data------------------------------------------

  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerGender, setCustomerGender] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

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
  const handlerRegisterSubmit = (event) => {};
  return (
    <div>
        <ul className="customer-formRegister">
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
              placeholder="Họ và tên"
              inputProps={ariaLabel}
              required
              type="text"
              value={customerName}
              onChange={handleNameChange}
            />
          </li>
          <li>
            <TextField
              className="customer-input"
              placeholder="Số điện thoại"
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
              placeholder="Gender"
              inputProps={ariaLabel}
              required
              type="Gender"
              value={customerGender}
              onChange={handleGenderChange}
            />
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
            <Button variant="contained" onSubmit={handlerRegisterSubmit}>
              Register
            </Button>
          </li>
        </ul>
    </div>
  );
}
