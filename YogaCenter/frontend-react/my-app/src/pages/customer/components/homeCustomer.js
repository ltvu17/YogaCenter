import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ".././css/homeCustomer.css";
import Notification from "./Notification";
import ProfileCustomer from "./ProfileCustomer";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { CleaningServices } from "@mui/icons-material";
import axios from "axios";

const Item = styled(Paper)`
  background-color: #ddddddb8;
  height: 50px;
  width: 50px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
  margin-left: 6px;
  box-shadow: 0px 0px 20px 3px #5f515970;
  &:hover {
    width: 66px;
    height: 66px;
  }
`;
const Course = styled(SelfImprovementIcon)`
  font-size: 30px;
  color: #d2608d;
  &:hover {
    font-size: 60px;
  }
`;
const Notifi = styled(NotificationsIcon)`
  font-size: 30px;
  color: #d2608d;
  &:hover {
    font-size: 60px;
  }
`;
const Schedule = styled(CalendarMonthIcon)`
  font-size: 30px;
  color: #d2608d;
  &:hover {
    font-size: 60px;
  }
`;
const Support = styled(PermContactCalendarIcon)`
  font-size: 30px;
  color: #d2608d;
  &:hover {
    font-size: 60px;
  }
`;
const Feedback = styled(FeedbackIcon)`
  font-size: 30px;
  color: #d2608d;
  &:hover {
    font-size: 60px;
  }
`;
export default function HomeCustomer() {
  const [userCookie, setCookie] = useCookies("");
  const [customer, setCustomer] = useState("");
  useEffect(() => {
    axios
      .get(`https://localhost:7096/api/Customer/${userCookie.userId}`)
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
   return (
    <div className="HomeCustomer">
      <div className="introduction-customer">
        <img src="/assets/images/backGroundCustomer.png" />
        <div className="content-customer">
          <Box sx={{ width: "100%" }}>
            <Typography variant="h2" component="h2">
              Good Morning
            </Typography>
            <Typography variant="h3" component="h3">
            {customer.customerName}
            </Typography>
            
            <Grid container sx={{ width: "45%", display: "flex" }}>
              <Grid sx={{ maxWidth: "180px" }} className="grid-item">
                <Link to={"/notification"}>
                  <Item>
                    <Notifi></Notifi>
                    <p>Notifications</p>
                  </Item>
                </Link>
              </Grid>

              <Grid sx={{ maxWidth: "180px" }} className="grid-item">
                <Link to={"/customer-schedule"}>
                  <Item>
                    <Schedule></Schedule>
                    <p>Schedule</p>
                  </Item>
                </Link>
              </Grid>

              <Grid sx={{ maxWidth: "180px" }} className="grid-item">
                <Link to={"/customer-course"}>
                  <Item>
                    <Course></Course>
                    <p>My Course</p>
                  </Item>
                </Link>
              </Grid>

              <Grid sx={{ maxWidth: "180px" }} className="grid-item">
                <Link to={"/contact"}>
                  <Item>
                    <Support></Support>
                    <p>Contact</p>
                  </Item>
                </Link>
              </Grid>

              <Grid sx={{ maxWidth: "180px" }} className="grid-item">
                <Link to={"/contact"}>
                  <Item>
                    <Feedback></Feedback>
                    <p>Feedback</p>
                  </Item>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}
