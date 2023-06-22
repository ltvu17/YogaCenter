import React, { useEffect, useState } from 'react'
import { URL_API } from '../staff/components/ConstDefine';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

export default function UpdateEvent({id}) {

    const [inputField,setInputFields] = useState({
        eventName : '',
        eventDetail : '',
        eventStartDate : '',
        eventEndDate : '',
        eventDiscount: '',
    });
      ///URL_API
    let getEvent = URL_API+`Event/${id}`;
    ///Getdata
    useEffect(()=>{
        axios.get(getEvent).then(r=>setInputFields(p=>{
            return{
                eventName : r.data.eventName,
                eventDetail : r.data.eventDetail,
                eventStartDate : filterDay(r.data.eventStartDate),
                eventEndDate : filterDay(r.data.eventEndDate),
                eventDiscount: r.data.eventDiscount,
            }
        })).catch(err=>console.log(err));
    },[]);
    function filterDay(day){
        const split = day.split("T");
        let value = split[0];
        return value;
    }
    const ChangeHandler = (e) =>{
        setInputFields(p => {
            return {...inputField, [e.target.name] : e.target.value }
        })    
    };
    function submitAdd(e){
        axios.put(getEvent,{
        eventName: inputField.eventName,
        eventDetail :inputField.eventDetail,
        eventStartDate : inputField.eventStartDate,
        eventEndDate : inputField.eventEndDate,
        eventDiscount : inputField.eventDiscount,
        },).then(r => console.log(r)).catch(err => console.log(err));
    }
    
    

    return (
    <div>
        <form>
                        <TextField variant='outlined' size='small' name='eventName' value={inputField.eventName} label='Event Name' required onChange={ChangeHandler}
                    sx={{color : 'rgb(127, 69, 101)',backgroundColor:'#F9A7B0',borderRadius:'5px'}}></TextField>
                        <TextField variant='outlined' size='small' name='eventDetail' value={inputField.eventDetail} label='Event Detail' multiline required onChange={ChangeHandler}
                    sx={{color : 'rgb(127, 69, 101)',backgroundColor:'#F9A7B0',borderRadius:'5px'}}></TextField>
                        <input type='date' name='eventStartDate' defaultValue={filterDay(inputField.eventStartDate)} required onChange={ChangeHandler}/>
                        <input type='date' name='eventEndDate' defaultValue={filterDay(inputField.eventEndDate)} min={filterDay(inputField.eventStartDate)}  required onChange={ChangeHandler}/>
                        <TextField variant='outlined' type='number' InputProps={{ inputProps: { min: 0 } }} value={inputField.eventDiscount} size='small' name='eventDiscount' label='Event Discount' required onChange={ChangeHandler}
                    sx={{color : 'rgb(127, 69, 101)',backgroundColor:'#F9A7B0',borderRadius:'5px'}}></TextField>
                        <Button variant='text' color='success' type='submit' onClick={submitAdd}
                        sx={{padding :1,margin:1, color: 'white', backgroundColor:'rgb(127, 69, 101)'}}>Save</Button>
        </form>
    </div>
    )
}
