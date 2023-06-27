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
import { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substring(0,10);
export default function CreateInvoice() {
        const Div = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: 'black',
        padding: theme.spacing(5),  
        color:'white',
        }));
        const [message,setMessage] = useState('');
        const [open, setOpen] = useState(false);
        const [status,setStatus] = useState(false);
        const [idUser, setId] = useState(uuidv4());
        const [customers,setCustomer]= useState();
        const [courses, setCourses] = useState();
        const [course,setCourse] = useState();
        var price =0;
        const [inputField,setInputFields] = useState({
            customerId : '',
            courseId : '',
            note:'',
            dateRequest : date,
            datePay : date,
            totalPay: 0,
            discount:0
        });
      ////URL_API
        let getAllCustomer = URL_API + `Customer`
        let getAllCourse = URL_API+`Course`;
        let getCourse = URL_API+`Course/${inputField.courseId===''? "1": inputField.courseId}`
        let postInvoice = URL_API+`Invoice`
    /// Getdata
        useEffect(()=>{
            axios.get(getAllCustomer).then(r=>setCustomer(r.data)).catch(err => console.log(err));
        },[]);
        useEffect(()=>{
            axios.get(getAllCourse).then(r=>setCourses(r.data)).catch(err => console.log(err));
        },[]);
        useEffect(()=>{
            axios.get(getCourse).then(r=>{setCourse(r.data)
            inputField.totalPay = r.data.coursePrice
            inputField.discount = r.data.event?r.data.event.eventDiscount:0
            inputField.totalPay=inputField.totalPay - inputField.totalPay*(inputField.discount/100)
        }).catch(err => console.log(err));
        },[inputField]);
      ////Handler
        const ChangeHandler = (e) =>{
        setInputFields(p => {
            return {...inputField, [e.target.name] : e.target.value }
        })    
        };
        const OpenHandler = ()=>{
            setOpen(true);     
        }
        const handleClose = () => {
            setOpen(false);
        };

        const navigate = useNavigate();
        ////Submit
        async  function  SubmitHandle(){
            axios.post(postInvoice,{
                note : inputField.note,
                dateRequest : inputField.dateRequest,
                datePay : inputField.datePay,
                totalPay : inputField.totalPay
            },{
                headers:{
                    customerId : inputField.customerId,
                    courseId : inputField.courseId
                }
            })
            alert("Submit success");
            navigate(0);
        
        }
    return (
        <div>
        <div style={{textAlign :'center'}}>
        <Div>{"Create Invoice"}</Div>
        <form onSubmit={(e)=>SubmitHandle(e)}>
        
            <Box
            sx={{
            '& > :not(style)': { m: 1, width: '35%' },
            }}
            noValidate
            autoComplete="on"
            >
            <TextField
                        onChange={ChangeHandler}
                        name='customerId'
                        id="outlined-select-currency"
                        select
                        label="Select Customer"
                        defaultValue=''
                        helperText="Please select gender"
                        required
            >       
            
            {customers? customers.map((item) =>(
                <MenuItem value={item.id} key={item.id}>                  
                        <p>{item.customerName}||0{item.customerPhone}</p>      
                    </MenuItem>
            )
            ):(<MenuItem/>)}
        
            </TextField>
            <br/>
            <TextField
                        onChange={ChangeHandler}
                        name='courseId'
                        id="outlined-select-currency"
                        select
                        label="Select Course"
                        defaultValue=''
                        helperText="Please select gender"
                        required
            >       
            {courses? courses.map((item) =>(
                <MenuItem value={item.id} key={item.id}>                  
                        <p>{item.courseDescription}||Event:{item.event?item.event.eventName:''}</p>      
                    </MenuItem>
            )
            ):(<MenuItem/>)}
            </TextField>
            <br/>
            <TextField name='totalPay' type='number' required label="Total Pay" value={inputField.totalPay} onChange={ChangeHandler} variant="outlined" />
            <br/>
            <TextField name='note' type='text' required label="note" onChange={ChangeHandler} variant="outlined" />
            <br/>
            {message? <p style={{marginLeft:'33%', color:'red', textAlign:'left'}}>{message}</p>            
                :''}

            <Button variant="contained" onClick={OpenHandler} fullWidth={false}>Submit Invoice</Button>         
            </Box>
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
                    <p style={{color:'red'}}>Do you want to delete this class ?</p>
                        </DialogContentText>
                    </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                    <Button type='submit' onClick={SubmitHandle}   autoFocus>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
            </form>
        </div>
    </div>
    )
}
