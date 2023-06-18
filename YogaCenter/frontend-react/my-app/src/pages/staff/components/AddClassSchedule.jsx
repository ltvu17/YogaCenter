import React from 'react'
import { useLocation } from 'react-router-dom'
import { URL_API } from './ConstDefine';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';

export default function AddClassSchedule() {
    ///Declare
    const location = useLocation('state');
    const [lessons,setLessons] = useState();
    const [count,setCount] =useState(0);
    const date = `${location.state.year}-${location.state.month}-${location.state.date}`;
    ///URL_API
    const getclassbydate = URL_API+`Lesson/date/${date}`;
    ///GetData
    useEffect(()=>{
        axios.get(getclassbydate).then(r=>setLessons(r.data)).catch(err=>console.log(err));
    },[]);
    console.log(lessons);
    ///Handler
    const AddHandler = ()=>{
        if(count < 1)
        setCount(count => count+1);
     }
    const MinusHandler = () =>{
        if(count >0)
        setCount(count => count -1);
    }
    ///Filter
    function filterTime(time){
        const split = time.split("T");
        let value = split[1];
        return value;
      }
    return (
    <div>
        <div style={{height:'70px'}}>
        </div>
        <div className='class-post'>
            <table >
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Class Name</th>
                        <th>Room</th>
                        <th>Shift</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons ? lessons.map((item,index) =>(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.class.className}</td>
                            <td>{item.room.roomDetail}</td>
                            <td>{filterTime(item.shift.timeStart)}-{filterTime(item.shift.timeEnd)}</td>
                        </tr>
                    )):''
                    }
                     {Array.from(Array(count)).map(((index,c) => (
                        
                        <tr key ={c}>         
                        <td><IconButton onClick={MinusHandler}><DeleteForeverIcon/></IconButton></td>
                        <th>Class Name</th>
                        <th>Room</th>
                        <th>Shift</th>               
                        </tr>
                        )))}
                    <tr>
                        <td colSpan={7}><Button variant='text' color='success' onClick={AddHandler}
                        startIcon={<AddCircleOutlineRoundedIcon sx={{ fontSize: 30 }}>add_circle</AddCircleOutlineRoundedIcon>}
                        sx={{padding :1,margin:1, color: 'white', backgroundColor:'rgb(127, 69, 101)'}}>Add Class</Button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
