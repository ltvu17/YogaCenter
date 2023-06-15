import React, { useContext, useEffect, useState } from 'react'
import { URL_API } from './ConstDefine';
import axios from 'axios';
import { dataContext } from './Staffmanage';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

var curr = new Date();
curr.setDate(curr.getDate()+1);
var date = curr.toISOString().substring(0,10);


export default function UpdateClass({id}) {
    ///Declare
    const [post,setPost] = useState(null);
    const data = useContext(dataContext)
    const [date,setDate] = useState()
    const [inputField,setInputFields] = useState({
        teacherId : '-1',
        courseId : '0',
        className : '',
        classEndDate : '',
        classStartDate: ''
    });
    ////URL_API
    let getclass = URL_API+`Class/${id}`;

    ///Get data
    
    useEffect(()=>{       
        if(id !== ''){
        axios.get(getclass)
        .then(r => setPost(r.data)).catch(err=>console.log(err));  
        }
        if(post !== null){
            setInputFields(p => {
                return {...inputField, classEndDate : filterDay(post.classEndDate),
                      classStartDate : filterDay(post.classStartDate) }
              })
        }
    },[id]);
    console.log(inputField)
    //Filter 
    function filterDay(day){
        const split = day.split("T");
        let value = split[0];
        return value;
   }
    
  return (

    <div>
    <h1 id="update">Update</h1>
      {post ? (
        
        <form>
                    <TextField variant='outlined' size='small' name='className' label={post.className} required 
                    sx={{color : 'rgb(127, 69, 101)',backgroundColor:'#F9A7B0',borderRadius:'5px'}}></TextField>
                    <input type='date' name='classStartDate' defaultValue={filterDay(post.classEndDate)} min={date} required />
                    <input type='date' name='classEndDate'    required />
                    <select defaultValue="0" name='teacherId' required>
                            <option value="0" disabled hidden>Choose Teacher</option>
                            <option value ='-1'>None</option>
                        {data.teachers.map(((item,index) =>(          
                                              
                                <option key={index} value={item.id} >{item.teacherName}</option>                      
                        )))}
                        </select>
                    
                        <select defaultValue="0" name='courseId' required >
                                <option value="0" disabled hidden>Choose Course</option>
                        {data.courses.map(((item,index) =>(          
                                              
                                <option key={index}  value={item.id} >{item.courseDescription}</option>                      
                        )))}
                          
                        </select>
                        {/* {message?(<p style={{color: 'red', backgroundColor:'white'}}>{message}</p>):''} */}
                        
                    
                    <Button variant='text' color='success' type='submit' 
                    sx={{padding :1,margin:1, color: 'white', backgroundColor:'rgb(127, 69, 101)'}}>Save</Button>
        </form>
      ):''}
    </div>

  )
}
