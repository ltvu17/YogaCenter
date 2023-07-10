import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { URL_API,notification } from './ConstDefine';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { Typography } from '@mui/material';
import { useCookies } from 'react-cookie';


export default function Notification() {
    const [sendPost,setSendPost] = useState([]);
    const [user] = useCookies();
    const [specificPost , setSpecificPosts] = useState([]);
    const navigate = useNavigate();
    const [state,setState] = useState(false);
    ///URP_API
    let getSendPostAPI = URL_API +`UserNotification/Common`;
    let getSpecificPostAPI = URL_API +`UserNotification/${user.userId}`;
    useEffect(()=>{
        axios.get(getSendPostAPI).then(r=>{setSendPost(r.data)
        setState(false)}).catch(err => console.log(err));

    },[state]);
    useEffect(()=>{
        axios.get(getSpecificPostAPI).then(r=>{setSpecificPosts(r.data);
        setState(false)}).catch(err => console.log(err));
    },[]);
    var post = specificPost.concat(sendPost);
    function filterDate(time){
        const split = time.split("T");
        let value = split[0];
        return value;
      }
      function readHanlder(noteId){
        let maskAsReadAPI = URL_API + `Notification/${noteId}`;
        axios.put(maskAsReadAPI).then(r => console.log(r)).catch(err=>console.log(err));
        setState(true);

    }
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
     const totalItems = post.length;
     const totalPages = Math.ceil(totalItems / itemsPerPage);
     const startIndex = (currentPage - 1) * itemsPerPage;
     const endIndex = startIndex + itemsPerPage;
     const displayedPosts = post.slice(startIndex, endIndex);
     const handlePageChange = (event, page) => {
        setCurrentPage(page);
      };
  return (
    <div>
    <div style={{height :'100px'}}></div>
    <div className='staff-inbox'  style={{position :'unset', textAlign:'center'}}>
    <Typography variant='h3'>Notification</Typography>
    <table  className='table-staff-noti' style={{width:'80%', marginLeft:'10%'}}>
        <thead>
            <tr >
                <th>Index</th>
                <th>Title</th>
                <th>Desctiption</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {displayedPosts?displayedPosts.map((item,index) =>(              
                <tr key={index}>  
                    <td>{startIndex+index +1}</td>
                    <td>{item.notification.title}</td>
                    <td><textarea disabled style={{ whiteSpace: 'pre-wrap'}} rows={5} cols={50} value={item.notification.detail}></textarea></td>
                    
                    <td>{filterDate(item.daycreate)}</td>
                </tr>
               
            )
            ):<tr></tr>}
          
        </tbody>
    </table>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </div>
    </div>
    </div>
  )
}
