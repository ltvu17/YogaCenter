import React from "react";
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
import { Link } from "react-router-dom";

const Item = styled(Paper)`
background-color: #78657340;
height:200px;
width: 300px;
padding: 0;
display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0px 0px 9px 3px #5f515970;
`;
const Course = styled(SelfImprovementIcon)`
    font-size: 120px;
    color: #8a1523;
`;
const Notifi = styled(NotificationsIcon)`
font-size: 120px;
color: #8a1523;
`;
const Schedule = styled(CalendarMonthIcon)`
font-size: 120px;
color: #8a1523;
`;
const Support = styled(PermContactCalendarIcon)`
    font-size: 120px;
    color: #8a1523;
`;
const Feedback = styled(FeedbackIcon)`
   font-size: 120px;
    color: #8a1523;
`;
export default function HomeCustomer(){
   
    return(
        <div className="HomeCustomer">
            <div className="introduction-customer">
                <img src="/assets/images/backGroundCustomer.png"/>
                <Typography variant="h2" component="h2">
                    Welcome to Yoga FPTU Center<br/>
                    <Typography variant="h3" component="h3"> Quang Vinh!</Typography>
                </Typography>
            </div>
            <div  className="line">
                <img src="/assets/images/lineCustomer1.svg"/>
            </div>
            <div className="content-customer">
            <Box sx={{ width: '100%',padding:' 20px 150px' }}>
                <Grid container  spacing={5} columnSpacing={5} sx={{width: '70%',margin:'0 auto'}} >
                   <Grid   sx={{display: 'flex',justifyContent: 'center', height:'300px'}}  md={6}>
                        <Link to={'/notification'} >
                            <Item>
                                <Notifi></Notifi>
                                <p>Notifications</p>
                            </Item>
                        </Link>
                    </Grid>
                    
                <Grid  sx={{display: 'flex',justifyContent: 'center', height:'300px'}} md={6}>
                    <Link to={'/customer-schedule'}>
                        <Item>
                            <Schedule></Schedule>
                            <p>Schedule</p>
                        </Item>
                    </Link>
                </Grid>
                <Grid   sx={{display: 'flex',justifyContent: 'center', height:'300px'}} md={6}>
                    <Link to={'/customer-course'}>   
                        <Item>
                            <Course></Course>
                            <p>My Course</p>
                        </Item>
                    </Link>
                </Grid>
                <Grid  sx={{display: 'flex',justifyContent: 'center', height:'300px'}} md={6}>
                    <Link to={'/contact'}>   
                    <Item>
                            <Support></Support>
                            <p>Contact</p>
                        </Item>
                    </Link>
                </Grid>
                <Grid  sx={{display: 'flex',justifyContent: 'center', height:'300px'}} md={12}>
                <Link to={'/contact'}>   
                    <Item>
                            <Feedback></Feedback>
                            <p>Feedback Center</p>
                        </Item>
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </div>

        </div>
    )
}