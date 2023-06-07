import React from "react";

import "../css/home.css";

import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import { Link } from "react-router-dom";
export default function Home() {
  
    const ButtonBookingLeft = styled(Button)`
      background-color: #a6789970;
  font-family: arial;
  color: white;
  width: 170px;
  height: 60px;
  font-weight: 700;
  box-shadow: -3px 5px 3px 0px #4a3f4182;
  font-size: 16px;
  border-radius:30px ;
&:hover {
  background-color: #734660;
}
`;
const ButtonBookingRight = styled(Button)`
  background-color: #48447ded;
  font-family: arial;
  color: white;
  width: 170px;
  height: 60px;
  font-weight: 700;
  box-shadow: -3px 5px 3px 0px #4a3f4182;
  font-size: 16px;
  border-radius:30px ;
&:hover {
    background-color: #2e0d51d1;
}
`;
const CustomButton = styled(Button)`
      background-color: #d49aa5;
    font-family: arial;
    color: white;
    width: 170px;
    height: 60px;
    font-weight: 700;
    box-shadow: -3px 5px 3px 0px #4a3f4182;
    font-size: 16px;
  &:hover {
    background-color: #734660;
  }
`;
  return (
    <div className="home">
    <div className="banner">
        <img src="/assets/images/banner.PNG"/>
        <div className="banner-content">
            <h4>FIND YOUR WAY</h4>
            <h1>TO YOGA LIFESTYLE</h1>
            <h3>Do yoga today with FPTU Yoga Center</h3>
            <CustomButton variant="contained">Booking Now</CustomButton>
        </div>    
    </div>
    <div className="myCoach">
       
        <h1 className="title">MY COACH</h1>
        
        <div className="myCoach-list">
            <div className="myCoach-detail">
                <img src="/assets/images/coach.png"/>
                <h2 className="myCoach-name">Quang Vinh</h2>
                <p className="myCoach-major">Strength</p>
            </div>
            <div className="myCoach-detail">
                <img src="/assets/images/coach.png"/>
                <h2 className="myCoach-name">Quang Vinh</h2>
                <p className="myCoach-major">Flexibility</p>
            </div>
            <div className="myCoach-detail">
                <img src="/assets/images/coach.png"/>
                <h2 className="myCoach-name">Quang Vinh</h2>
                <p className="myCoach-major">Mobility</p>
            </div>
            <div className="myCoach-detail">
                <img src="/assets/images/coach.png"/>
                <h2 className="myCoach-name">Quang Vinh</h2>
                <p className="myCoach-major">Strength</p>
            </div>
        </div>
    </div>
    <div className="bookingClass">
        <div className="booking-content">
            <div className="booking-detail-left" style={{backgroundImage: "url('/assets/images/sale-left.jpg')"}}>
            <div className="content-detail">
                <p>BECOME<Person2RoundedIcon style={{ position: 'relative',top: '5px', marginLeft: '2px',marginRight: '2px'}}></Person2RoundedIcon>MEMBER</p>
                <h1>START TODAY</h1>
                <ButtonBookingLeft variant="contained" className="button-booking">START NOW</ButtonBookingLeft>
                </div>
            </div>
            <div className="booking-detail-right " style={{backgroundImage: "url('/assets/images/sale-right.jpg')"}}>
                <div className="content-detail">
                <p>SCHEDULE</p>
                <h1>FIND A CLASS</h1>
                <ButtonBookingRight  variant="contained" className="button-booking">SHOW SCHEDULE</ButtonBookingRight>
                </div>
            </div>
        </div>
        <div className="booking-title">
            <div className="booking-title-context">
            <p>THE PERFECT</p>
            <h1>FPTU YOGA</h1>
            <p>FOR YOU</p>
            </div>
        </div>
    </div>
    </div>
  );
}
