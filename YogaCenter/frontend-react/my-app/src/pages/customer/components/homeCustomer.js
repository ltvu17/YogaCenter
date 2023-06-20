import React, { useState,useEffect } from "react";

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import FeedbackIcon from '@mui/icons-material/Feedback';
import '.././css/homeCustomer.css';
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../css/profileCustomer.css'
import { URL_API } from '../../../api/ConstDefine';

const Item = styled(Paper)`
 
    background-color: #ddddddb8;
height:50px;
width: 50px;
padding: 0;
display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
  margin-left: 6px;
    box-shadow: 0px 0px 20px 3px #5f515970;

`;
const Course = styled(SelfImprovementIcon)`
   
    font-size: 30px;
        color: #d2608d;

`;
const Notifi = styled(NotificationsIcon)`

font-size: 30px;
    color: #d2608d;

`;
const Schedule = styled(CalendarMonthIcon)`

font-size: 30px;
    color: #d2608d;

`;
const Support = styled(PermContactCalendarIcon)`

    font-size: 30px;
        color: #d2608d;
 
`;
const Feedback = styled(FeedbackIcon)`

   font-size: 30px;
        color: #d2608d;

`;
export default function HomeCustomer(){
    const [cookies] = useCookies(['id']);
    const userId = cookies.userId;
    const [userData, setUserData] = useState({});
    let profileCustomerAPI = URL_API +`Customer/${userId}`
    console.log(userId)
    // Data
    useEffect(() => {
        axios.get(profileCustomerAPI)
        .then(response => {
        const userData = {
            customerId: response.data.id,
            userName: response.data.customerName,
            phone: response.data.customerPhone,
            address: response.data.customerAddress,
        };
          setUserData(userData);
        })
        .catch(error => {
          console.log(error);
        });
      
      }, []);
      localStorage.setItem('userData', JSON.stringify(userData));
   
    return(
        <div className="HomeCustomer">
            <div className="introduction-customer">
                <img src="/assets/images/backGroundCustomer.png"/>
                <div className="content-customer">
                    <Box sx={{ width: '100%' }}>
                    <Typography variant="h2" component="h2">
                          Good Morning<br/>
                            <Typography variant="h3" component="h3"> Quang Vinh</Typography>
                        </Typography>
                        <Grid container sx={{ width: '45%', display:'flex'}}>
                            <Grid sx={{ maxWidth: '180px' }}  className="grid-item">
                                <Link to={'/notification'}>
                                <Item className="list-content">
                                    <Notifi className="content-item"></Notifi>
                                    <p>Notifications</p>
                                </Item>
                                </Link>
                            </Grid>

                            <Grid sx={{ maxWidth: '180px' }}  className="grid-item">
                                <Link to={'/customer-schedule'}>
                                <Item className="list-content">
                                    <Schedule className="content-item"></Schedule>
                                    <p>Schedule</p>
                                </Item>
                                </Link>
                            </Grid>

                            <Grid sx={{ maxWidth: '180px' }}  className="grid-item">
                                <Link to={'/customer-course'}>
                                <Item className="list-content">
                                    <Course className="content-item"></Course>
                                    <p>My Course</p>
                                </Item>
                                </Link>
                            </Grid>

                            <Grid sx={{ maxWidth: '180px' }}  className="grid-item">
                                <Link to={'/contact'}>
                                <Item className="list-content">
                                    <Support className="content-item"></Support>
                                    <p>Contact</p>
                                </Item>
                                </Link>
                            </Grid>

                            <Grid sx={{ maxWidth: '180px' }}  className="grid-item">
                                <Link to={'/contact'}>
                                <Item className="list-content">
                                    <Feedback className="content-item"></Feedback>
                                    <p>Feedback</p>
                                </Item>
                                </Link>
                            </Grid>
                            </Grid>

                    </Box>
                
            </div>
            </div>
           
        </div>
    
    )
}