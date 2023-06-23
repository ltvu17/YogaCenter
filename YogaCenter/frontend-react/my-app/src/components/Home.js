import React, { useEffect, useState } from "react";

import "../css/home.css";

import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import Grid from "@mui/material/Unstable_Grid2";
import { Input } from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const ariaLabel = { "aria-label": "description" };

export default function Home() {
  const InputCus = styled(Input)`
    &:after {
      border-bottom: 2px solid #951a3b;
    }
  `;
  const ButtonBookingLeft = styled(Button)`
    background-color: #a6789970;
    font-family: arial;
    color: white;
    width: 170px;
    height: 60px;
    font-weight: 700;
    box-shadow: -3px 5px 3px 0px #4a3f4182;
    font-size: 16px;
    border-radius: 30px;
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
    border-radius: 30px;
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

  
  const [listTecher, setListTeacher] = useState();
  const [flag, setCookie, remove] = useCookies();
  var navigate = useNavigate();
  console.log(listTecher);
  useEffect(() => {
    if (flag.flag == 1) {
      remove("flag");
      navigate(0);
    }
  });
  useEffect(() => {
    axios
      .get("https://localhost:7096/api/Teacher")
      .then((res) => {
        setListTeacher(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [cookies] = useCookies(["userId"]);
  const cookieValue = cookies.userId;
  return (
    <div className="home">
      <div className="banner">
        <img src="/assets/images/banner.PNG" />
        <div className="banner-content">
          <h4>FIND YOUR WAY</h4>
          <h1>TO YOGA LIFESTYLE</h1>
          <h3>Do yoga today with FPTU Yoga Center</h3>
          <CustomButton variant="contained">Booking Now</CustomButton>
        </div>
      </div>

      <div className="line">
        <img src="/assets/images/line1.svg" />
      </div>

      <div className="inf-center">
        <Grid container className="inf-center-detail">
          <Grid item md={6} p={2} pl={10} pr={10} className="introduction">
            <h1>
              Unleash Your Inner Strength
              <br />
              Embrace Wellness with YogaFPTU
            </h1>
            <p>
              Choose our Yoga Center to find trust. With our team of
              professional instructors and a safe environment, we are committed
              to providing you with a reliable and high-quality yoga experience.
              Put your trust in us and discover your potential with YogaFPTU
            </p>
          </Grid>
          <Grid item md={6} p={2} pl={5} pr={5} className="center-detail">
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={6} width="50%">
                    <Box p={2}>
                      <p
                        style={{
                          color: "rgb(210, 96, 141)",
                          fontSize: "28px",
                          fontWeight: 800,
                        }}
                      >
                        3
                      </p>
                      <h4
                        style={{
                          marginTop: "6px",
                          fontFamily: "sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        YEAR OF EXPERIENCE
                      </h4>
                      <p
                        style={{
                          marginTop: "12px",
                          fontFamily: "inherit",
                          fontSize: "13px",
                          opacity: " 0.8",
                          lineHeight: 1.4,
                        }}
                      >
                        We have been tirelessly working over the years to bring
                        happiness into your life
                      </p>
                    </Box>
                  </Grid>
                  <Grid item xs={6} width="50%">
                    <Box p={2}>
                      <p
                        style={{
                          color: "rgb(210, 96, 141)",
                          fontSize: "28px",
                          fontWeight: 800,
                        }}
                      >
                        300+
                      </p>
                      <h4
                        style={{
                          marginTop: "6px",
                          fontFamily: "sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        HAPPY CLIENTS
                      </h4>
                      <p
                        style={{
                          marginTop: "12px",
                          fontFamily: "inherit",
                          fontSize: "13px",
                          opacity: " 0.8",
                          lineHeight: 1.4,
                        }}
                      >
                        We take pride in our clients and students.
                      </p>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={6} width="50%">
                    <Box p={2}>
                      <p
                        style={{
                          color: "rgb(210, 96, 141)",
                          fontSize: "28px",
                          fontWeight: 800,
                        }}
                      >
                        15
                      </p>
                      <h4
                        style={{
                          marginTop: "6px",
                          fontFamily: "sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        EXPERIENCED TRAINERS
                      </h4>
                      <p
                        style={{
                          marginTop: "12px",
                          fontFamily: "inherit",
                          fontSize: "13px",
                          opacity: " 0.8",
                          lineHeight: 1.4,
                        }}
                      >
                        All of our trainers possess exceptional expertise and
                        are fully certified by reputable organizations
                      </p>
                    </Box>
                  </Grid>
                  <Grid item xs={6} width="50%">
                    <Box p={2}>
                      <p
                        style={{
                          color: "rgb(210, 96, 141)",
                          fontSize: "28px",
                          fontWeight: 800,
                        }}
                      >
                        20
                      </p>
                      <h4
                        style={{
                          marginTop: "6px",
                          fontFamily: "sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        CLASSROOMS
                      </h4>
                      <p
                        style={{
                          marginTop: "12px",
                          fontFamily: "inherit",
                          fontSize: "13px",
                          opacity: " 0.8",
                          lineHeight: 1.4,
                        }}
                      >
                        Spacious and Well-Equipped Classrooms for Optimal
                        Learning Experience
                      </p>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <div className="myCoach">
          <h1 className="title">MY COACH</h1>
          <div className="myCoach-list">
            <div className="myCoach-detail">
              <img src="/assets/images/coach.png" />
              <h2 className="myCoach-name">Quang Vinh</h2>
              <p className="myCoach-major">Strength</p>
            </div>
            <div className="myCoach-detail">
              <img src="/assets/images/coach.png" />
              <h2 className="myCoach-name">Quang Vinh</h2>
              <p className="myCoach-major">Flexibility</p>
            </div>
            <div className="myCoach-detail">
              <img src="/assets/images/coach.png" />
              <h2 className="myCoach-name">Quang Vinh</h2>
              <p className="myCoach-major">Mobility</p>
            </div>
            <div className="myCoach-detail">
              <img src="/assets/images/coach.png" />
              <h2 className="myCoach-name">Quang Vinh</h2>
              <p className="myCoach-major">Strength</p>
            </div>
          </div>
        </div>
      </div>

      <div className="line">
        <img src="/assets/images/line2.svg" />
      </div>
      <Grid
        container
        className="customer-care"
        style={{ backgroundImage: "url('/assets/images/customer-care.png')" }}
      >
        <Grid item md={6}>
          <div className="customer-care-content">
            <h1 style={{ color: "#d2608d", marginBottom: "0" }}>YOGA FPTU</h1>
            <h1>
              Embrace Health and Happiness.
              <br />
              Experience it now!
            </h1>
            <p>
              Take the time to nurture yourself and explore the hidden potential
              within you through yoga. Let us accompany you on this journey and
              provide you with memorable experiences and great benefits for your
              physical and mental well-being.
            </p>
          </div>
        </Grid>
        <>
          {cookieValue !== null ? (
            ""
          ) : (
            <Grid item md={6}>
              <ul className="customer-formRegister">
                <li>
                  <InputCus
                    className="customer-input"
                    placeholder="Họ và tên"
                    inputProps={ariaLabel}
                  />
                </li>
                <li>
                  <InputCus
                    className="customer-input"
                    placeholder="Số điện thoại"
                    inputProps={ariaLabel}
                  />
                </li>
                <li>
                  <InputCus
                    className="customer-input"
                    placeholder="Email"
                    inputProps={ariaLabel}
                  />
                </li>
                <li>
                  <InputCus
                    className="customer-input"
                    placeholder="Thành Phố"
                    inputProps={ariaLabel}
                  />
                </li>
                <li>
                  <Button variant="contained">Register</Button>
                </li>
              </ul>
            </Grid>
          )}
        </>
      </Grid>
      <div className="bookingClass">
        <div className="booking-content">
          <div
            className="booking-detail-left"
            style={{ backgroundImage: "url('/assets/images/sale-left.jpg')" }}
          >
            <div className="content-detail">
              <p>
                BECOME
                <Person2RoundedIcon
                  style={{
                    position: "relative",
                    top: "5px",
                    marginLeft: "2px",
                    marginRight: "2px",
                  }}
                ></Person2RoundedIcon>
                MEMBER
              </p>
              <h1>START TODAY</h1>
              <p>$ 100</p>
              <Link to={"/registerClass"}>
                <ButtonBookingLeft
                  variant="contained"
                  className="button-booking"
                >
                  START NOW
                </ButtonBookingLeft>
              </Link>
            </div>
          </div>
          <div
            className="booking-detail-right "
            style={{
              backgroundImage: "url('/assets/images/sale-right.jpg')",
            }}
          >
            <div className="content-detail">
              <p>SCHEDULE</p>
              <h1>FIND A CLASS</h1>
              <Link to={"/schedule"}>
                <ButtonBookingRight
                  variant="contained"
                  className="button-booking"
                >
                  SHOW SCHEDULE
                </ButtonBookingRight>
              </Link>
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
