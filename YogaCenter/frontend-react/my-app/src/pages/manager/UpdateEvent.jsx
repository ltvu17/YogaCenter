import React, { useEffect, useState } from 'react'
import { URL_API } from '../staff/components/ConstDefine';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
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
    <Grid container item md={12}>
        <form style={{width:'100%'}}>
            <table  className="table-add-class" style={{ marginTop: "0" }}>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Detail</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Discount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='staff-add-newClass'>
                        <td> <TextField variant='outlined' name='eventName' value={inputField.eventName} required onChange={ChangeHandler}
                 sx={{ backgroundColor: "white", borderRadius: "5px" }}></TextField></td>
                        <td><TextField variant='outlined' name='eventDetail' value={inputField.eventDetail} multiline required onChange={ChangeHandler}
                 sx={{ backgroundColor: "white", borderRadius: "5px" }}></TextField></td>
                        <td>   <input type='date' name='eventStartDate' defaultValue={filterDay(inputField.eventStartDate)} required onChange={ChangeHandler}/></td>
                        <td>  <input type='date' name='eventEndDate' defaultValue={filterDay(inputField.eventEndDate)} min={filterDay(inputField.eventStartDate)}  required onChange={ChangeHandler}/></td>
                        <td>   <TextField variant='outlined' type='number' InputProps={{ inputProps: { min: 0 } }} value={inputField.eventDiscount} name='eventDiscount' label='Event Discount' required onChange={ChangeHandler}
                 sx={{ backgroundColor: "white", borderRadius: "5px" }}></TextField></td>
                        <td>  <Button variant='contained'  type='submit' onClick={submitAdd}
                        sx={{padding: 1,margin: 1, color: "white", backgroundColor: "#1263fd" }}>Save</Button></td>
                    </tr>
                </tbody>
            </table>
                       
                        
                     
                      
                     
                      
        </form>
    </Grid>
    )
}
