import React, { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import ".././css/homeCustomer.css";

import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import axios from "axios";
import TextAnimation from "../../../animations/TextAnimation";

const Item = styled(Paper)`
 
    background-color: #d3c809;
  height:5em;
  width: 5em;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 12px;
  margin-left: 6px;
    box-shadow: 0px 0px 20px 3px #5f515970;

`;
const Course = styled(SelfImprovementIcon)`
   
    font-size: 50px;
        color:white

`;
const Notifi = styled(NotificationsIcon)`

font-size: 50px;
    color:white

`;
const Schedule = styled(CalendarMonthIcon)`

font-size: 50px;
    color:white

`;
const Support = styled(PermContactCalendarIcon)`

    font-size: 50px;
    color:white
`;
const Bedicon = styled(BedtimeIcon)`
    font-size: 50px;
    margin-left: 2%;
  `;
const Sunnyicon = styled(WbSunnyIcon)`
  font-size: 50px;
  margin-left: 2%;
  
`;



export default function HomeCustomer() {
  const [userCookie, setCookie] = useCookies("");
  const [customer, setCustomer] = useState("");
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState(null);
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
  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12 && currentHour >=5) {
      setGreeting("Good Morning");
      setIcon(<Sunnyicon></Sunnyicon>)
    } else if (currentHour <= 18 && currentHour >=12) {
      setGreeting("Good Afternoon");
      setIcon(<Bedicon  ></Bedicon>)
    } else {
      setGreeting("Good Evening");
      setIcon(<Bedicon  ></Bedicon>)
    }
  }, []);

   return (
    <div className="HomeCustomer">
    
      
       
        <div className="content-customer">
          <Box sx={{ width: "100%" }}>
            <Typography variant="h2" component="h2">
              <TextAnimation />
            </Typography>
            <Typography variant="h3" component="h3">
              {customer.customerName}
            </Typography>    
            
            <Grid container sx={{ width: "20%", marginLeft:'5%',marginTop:'3%', display: "flex" }}>
              <Grid item xs={12} sm={12} md={6} sx={{ maxWidth: "10%" }} className="grid-item">
                <Link to={"/notification"}>
                  <Item>
                    <Notifi></Notifi>
                    <p>Notifications</p>
                  </Item>
                </Link>
              </Grid>

              <Grid item xs={12} sm={12} md={6} sx={{ maxWidth: "10%" }} className="grid-item">
                <Link to={"/customer-schedule"}>
                  <Item>
                    <Schedule></Schedule>
                    <p>Schedule</p>
                  </Item>
                </Link>
              </Grid>

              <Grid item xs={12} sm={12} md={6} sx={{ maxWidth: "10%" }} className="grid-item">
                <Link to={"/customer-class"}>
                  <Item>
                    <Course></Course>
                    <p>My Class</p>
                  </Item>
                </Link>
              </Grid>

              <Grid item xs={12} sm={12} md={6} sx={{ maxWidth: "10%" }} className="grid-item">
                <Link to={"/contact"}>
                  <Item>
                    <Support></Support>
                    <p>Contact</p>
                  </Item>
                </Link>
              </Grid>

            </Grid>
          </Box>
        </div>
    
    </div>
  );
}
