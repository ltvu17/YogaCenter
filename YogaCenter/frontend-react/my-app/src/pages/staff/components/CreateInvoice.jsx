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

import '../css/CreateInvoice.css'
var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substring(0,10);
export default function CreateInvoice() {
     
        const [message,setMessage] = useState('');

        const [status,setStatus] = useState(false);
        const [idUser, setId] = useState(uuidv4());
        const [customers,setCustomer]= useState();
        const [courses, setCourses] = useState([]);
        const [course,setCourse] = useState();
        var displayCourse =[];
        const [inputField,setInputFields] = useState({
            customerId : '',
            classId : '',
            courseId : '',
            note:'',
            dateRequest : date,
            datePay : date,
            totalPay: 0,
            discount:''
        });
      ////URL_API
        let getAllCustomer = URL_API + `Customer`
        let getAllCourse = URL_API+`Class`;
        let getCourse = URL_API+`Class/${inputField.classId===''? "1": inputField.classId}`
        let addClassAPI = URL_API+`ClassCustomer/${inputField.classId===''? "1": inputField.classId}`
        let postInvoice = URL_API+`Invoice`
    /// Getdata
        useEffect(()=>{
            axios.get(getAllCustomer).then(r=>setCustomer(r.data)).catch(err => console.log(err));
        },[]);
        useEffect(()=>{
            axios.get(getAllCourse).then(r=>
            setCourses(r.data)
        ).catch(err => console.log(err));
        },[]);
        useEffect(()=>{
            axios.get(getCourse).then(r=>{setCourse(r.data)
            inputField.courseId = r.data.course.id
            inputField.totalPay = r.data.course.coursePrice
            inputField.discount = r.data.course.event?r.data.course.event.eventDiscount:0
            inputField.totalPay=inputField.totalPay - inputField.totalPay*(inputField.discount/100)
        }).catch(err => console.log(err));
        },[inputField]);
      ////Handler
        const ChangeHandler = (e) =>{
        setInputFields(p => {
            return {...inputField, [e.target.name] : e.target.value }
        })    
        };
        courses.forEach(c =>{
            if(((new Date(c.classStartDate)).getTime()) > ((new Date(date)).getTime())){
                displayCourse.push(c);
            }
        })
        const navigate = useNavigate();
        ////Submit
        async  function  SubmitHandle(){
            if (!inputField.customerId) {
                setMessage("Customer ID is empty!");
                return;
            }
            if(!inputField.customerId){
                setMessage("Course ID is empty!");
                return;
            }
            if(course.capacity >= 20){
                alert("This Class is full!");
                return;
            }
            setMessage('');
            axios.post(postInvoice,{
                note : `Paid_${inputField.classId}`,
                dateRequest : inputField.dateRequest,
                datePay : inputField.datePay,
                totalPay : inputField.totalPay
            },{
                headers:{
                    customerId : inputField.customerId,
                    courseId : inputField.courseId
                }
            })
            axios.post(addClassAPI,{},{
                headers:{
                    customerId:inputField.customerId
                }
            })
            alert("Submit success");
            navigate(0);
        
        }
        ///Filter
        function filterDay(day){
            const split = day.split("T");
            let value = split[0];
            return value;
        }
            
    return (
        <div className='create-invoice'>
             <h1 className='staff-title'>Create Invoice</h1>
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
                        name='classId'
                        id="outlined-select-currency"
                        select
                        label="Select Course"
                        defaultValue=''
                       
                        required
            >       
            {displayCourse? displayCourse.map((item) =>(
                (<MenuItem value={item.id} key={item.id}>                  
                        <p>{item.className}||Course: {item.course.courseDescription}||Event:{item.course.event?item.course.event.eventName:''}</p>      
                    </MenuItem>)
            )
            ):(<MenuItem/>)}
            </TextField>
            <br/>
            <TextField name='totalPay' type='number' required label="Total Pay" value={inputField.totalPay} onChange={ChangeHandler} variant="outlined" />
            <br/>
            {message? <p style={{marginLeft:'33%', color:'red', textAlign:'left'}}>{message}</p>            
                :''}

            <Button variant="contained" type="submid">Submit Invoice</Button>         
            </Box>
            </form>
      
    </div>
    )
}
