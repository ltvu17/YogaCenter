import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import uuidv4, { HmacSHA256Hash, IpAddr, URL_API, URL_VNPay, command, commandPay, currCode, locale, locate, reciveURL, secretKey, tmnCode, txnRef, version } from './ConstDefine';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Avatar } from '@mui/material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { HmacSHA256, HmacSHA512 } from 'crypto-js';

export default function RegisClasForm({courseId}) {
  const [course,setCourse] = useState([]);
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [user] = useCookies();
  const [inputField,setInputField] = useState({
    totalPaid :0,
    coursePay : '',
  }); 
  const [payment,setPayment] = useState(2);
  
  let getInvoiceAPI = URL_API+`Course/${courseId}`
  let getUserAPI = URL_API+`Customer/${user.userId}`
  //---------------------------------------API------------------------------------------
  useEffect(()=>{
    axios.get(getInvoiceAPI).then(r=>setCourse(r.data)).catch(err => console.log(err));
  },[courseId])
  useEffect(()=>{
    axios.get(getUserAPI).then(r=>setCustomer(r.data)).catch(err => console.log(err));
  },[courseId])
  var cus = customer.customerName + "||"+ "0"+customer.customerPhone
  var corseInfor = '';
  var totalPay = 0;
  ///Handler
  const handleClose = () => {
    setOpen(false);
  };

  const changeHandler=(e)=>{
    setPayment(e.target.value);
  }
  const submitInvoice =()=>{
    setOpen(true);
  }
  function parseDate(){
    var today = new Date();
    today.setHours(today.getHours() + 7);
    today = today.toISOString();
    today = today.replaceAll('-','');
    today = today.replaceAll(":",'');
    today = today.replaceAll("T",'');
    let split = today.split(".");
    today = split[0];
    return today;
  }
  if(course !== undefined){
  if(course.event){
    corseInfor = course.courseDescription + "||" + course.event.eventName
    totalPay = course.coursePrice - (course.event.eventDiscount/100)*course.coursePrice
    inputField.totalPaid = totalPay
    inputField.coursePay = course.id
  }else{
    corseInfor = course.courseDescription + "||" 
    totalPay = course.coursePrice
    inputField.totalPaid = totalPay
    inputField.coursePay = course.id
  }
  }
  console.log(payment.toString());
  let amount = 'vnp_Amount='+inputField.totalPaid*100;
  let command = '&vnp_Command='+commandPay;
  let createDate = '&vnp_CreateDate='+parseDate();
  let curCode = '&vnp_CurrCode='+currCode;
  let ipAdd = '&vnp_IpAddr=' + IpAddr;
  let local = '&vnp_Locale=' + locale;
  let orderInfor = '&vnp_OrderInfo=' + inputField.coursePay;
  let orderType = '&vnp_OrderType=' + 'YogaCourse';
  let returnUrl = '&vnp_ReturnUrl=' + reciveURL
  let tmn = '&vnp_TmnCode=' + tmnCode;
  let ref = '&vnp_TxnRef=' + txnRef;
  let vpnVersion = '&vnp_Version='+version;
  let plainText = amount+command+createDate+curCode+ipAdd+local+orderInfor+orderType
  +returnUrl+tmn+ref+vpnVersion;
  let sercureHash = HmacSHA512(plainText,secretKey).toString();
  var vnPayURLRequest = URL_VNPay+plainText+"&vnp_SecureHash="+sercureHash
  
  //---------------------------------------Style------------------------------------------
 

  //---------------------------------------Data------------------------------------------
  

  //---------------------------------------handle-------------------------------------------
  

  return (
    <div>
      <div style={{height:"100px"}}></div>
     <div className='invoice'>
             <h1 className='staff-title'>Shopping Cart</h1>
            <Box
            sx={{
            '& > :not(style)': { m: 1, width: '70%' },
            }}
            noValidate
            autoComplete="on"
            >
            <TextField
                        name='customerId'
                        id="outlined-select-currency"
                        label='Customer'
                        value={cus}
            >       
            </TextField>
            <br/>
            <TextField
                        name='courseId'
                        id="outlined-select-currency"
                        label="Course selected"
                        value={corseInfor}
                        
            >       
           
            </TextField>
            <br/>
            <TextField
                        name='courseId'
                        id="outlined-select-currency"
                        placeholder='Total Pay'
                        value={totalPay ===undefined? 0: totalPay}
                        
            >       
           
            </TextField>
            <br/>
            <TextField
                        name='courseId'
                        id="outlined-select-currency"
                        placeholder='Total Pay'
                        select
                        onChange={changeHandler}
                        label="Payment method"
                        value={payment}         
            >       
           <MenuItem value={1} >VNPay<Avatar sx={{marginLeft:'2%'}} src='/assets/images/VNPay.PNG' variant='square' ></Avatar> </MenuItem>
           <MenuItem value={2} >Cash <LocalAtmIcon/></MenuItem>
            </TextField>
            <br/>
            <Button variant="contained" type="submid" onClick={submitInvoice}>Place Order</Button>         
            </Box>    
    </div>
            {payment === 1 ?(
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"YogaCenter Management"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" >
                            <p style={{ color: 'red' }}>Do you want to pay for this class ?</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}><Link to='/registerClass'>No</Link></Button>
                        <Button  autoFocus>
                            <Link to={vnPayURLRequest}>Yes</Link>
                        </Button>
                    </DialogActions>
                </Dialog>):
                (
                  <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                  >
                      <DialogTitle id="alert-dialog-title">
                          {"YogaCenter Management"}
                      </DialogTitle>
                      <DialogContent>
                          <DialogContentText id="alert-dialog-description" >
                              <p style={{ color: 'red' }}>Please contact with staff to complete the payment</p>
                          </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                          <Button onClick={handleClose}  autoFocus>
                          <Link to='/registerClass'>Close</Link>
                          </Button>
                      </DialogActions>
                  </Dialog>)
                }
    </div>
  );
}
