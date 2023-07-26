import React, { useEffect, useState } from "react";

import "../css/home.css";
import "../css/blog.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Grid from "@mui/material/Unstable_Grid2";
import { Input, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import RegisterAccountCustomer from "../pages/customer/components/RegisterAccountCustomer";
import Bloges from "../data/ListOfBlog";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
export default function Home() {
  const InputCus = styled(Input)`
    &:after {
      border-bottom: 2px solid #951a3b;
    }
  `;
  const ButtonBookingLeft = styled(Button)`
    background-color: #f8ff0070;
    font-family: arial;
    color: white;
    width: 170px;
    height: 60px;
    font-weight: 700;
    box-shadow: -3px 5px 3px 0px #4a3f4182;
    font-size: 16px;
    border-radius: 30px;
    &:hover {
      background-color: #acb10070;
    }
  `;
  const ButtonBookingRight = styled(Button)`
    background-color: #000000ed;
    font-family: arial;
    color: white;
    width: 170px;
    height: 60px;
    font-weight: 700;
    box-shadow: -3px 5px 3px 0px #4a3f4182;
    font-size: 16px;
    border-radius: 30px;
    &:hover {
      background-color: #262424a3;
    }
  `;

  const CustomButton = styled(Button)`
    background-color: #d4d29a;
    font-family: arial;
    color: #1d0c0ca6;
    width: 170px;
    height: 60px;
    font-weight: 700;
    box-shadow: -3px 5px 3px 0px #4a3f4182;
    font-size: 16px;
    &:hover {
      background-color: #5f5d2e;
    }
  `;

  //---------------------------------------Data------------------------------------------
  const [listTecher, setListTeacher] = useState([]);
  const [flag, setCookie, remove] = useCookies();
  var navigate = useNavigate();
  const [cookies] = useCookies(["userId"]);
  const cookieValue = cookies.userId;
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerGender, setCustomerGender] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  console.log(
    customerEmail,
    customerName,
    customerPhone,
    customerGender,
    customerAddress
  );
  // console.log(listTecher);
  // console.log(listTecher !== null);

  //---------------------------------------handle-------------------------------------------

  const handleEmailChange = (event) => {
    setCustomerEmail(event.target.value);
  };
  const handleNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setCustomerPhone(event.target.value);
  };
  const handleGenderChange = (event) => {
    setCustomerGender(event.target.value);
  };
  const handleAddressChange = (event) => {
    setCustomerAddress(event.target.value);
  };
  const handlerRegisterSubmit = (event) => {};
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
  const [bloges, setBloges] = useState([]);
  useEffect(() => {
    async function getBloges() {
      setBloges(await Bloges());
    }
    getBloges();
  }, []);
  const desiredSlugs = [
    "increase-flexibility",
    "strengthen-and-tone",
    "aging-gracefully",
  ];
  const selectedBlogs = bloges
    .filter((blog) => desiredSlugs.includes(blog.node.slug))
    .slice(0, 3);
  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
  };
  function filterDay(day) {
    const split = day.split("T");
    let value = split[0];
    return value;
  }
  return (
    <div className="home">
      <div className="banner">
        <img src="/assets/images/background-home.jpg" />
        <div className="banner-content">
          <h4>FIND YOUR WAY</h4>
          <h1>TO YOGA LIFESTYLE</h1>
          <h3>Do yoga today with FPTU Yoga Center</h3>

          <Link to={"/registerClass"}>
            <CustomButton variant="contained">Booking Now</CustomButton>
          </Link>
        </div>
        <div className="banner-yoga">
          <h1>YOGA</h1>
        </div>
      </div>
      <div className="inf-center">
        <Grid container className="inf-center-detail">
          <Grid item md={12} p={2} pl={10} pr={10} className="sub-title">
            <Typography variant="h1"> Our Yoga Goal </Typography>
            <Typography variant="subtitle1" sx={{ paddingTop: "1%" }}>
              Creating balance, improving health, and nurturing the spirit
              through a comprehensive approach that includes physical postures,
              spiritual practices, and mental techniques. By integrating the
              body, mind, and spirit, yoga aims to promote self-awareness,
              explore one's true nature, and establish a profound connection
              with universal energy.
            </Typography>
          </Grid>
          <Grid container item md={12} className="center-detail">
            {selectedBlogs.map((blog, index) => (
              <Grid
                item
                md={4}
                key={blog.node.slug}
                sx={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid sx={{ height: "300px" }}>
                  <Box
                    className="center-detail-box"
                    sx={{
                      position: "relative",
                      ...(index === 1 && {
                        backgroundColor: "#babc00",
                        border: "1px solid #babc00  !important ",
                      }),
                    }}
                  >
                    <img
                      src={blog.node.image.url}
                      alt={blog.node.title}
                      style={{
                        width: "90px",
                        height: "70px",
                        borderRadius: "50%",
                        marginTop: "8%",
                        marginBottom: "2%",
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{ ...(index === 1 && { color: "white" }) }}
                    >
                      {blog.node.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ ...(index === 1 && { color: "white !important" }) }}
                    >
                      {blog.node.description}
                    </Typography>
                    <Link to={`/blog-detail/${blog.node.slug}`}>
                      <Button
                        sx={{
                          textTransform: "none",
                          position: "absolute",
                          bottom: "8%",
                          left: "28%",
                          backgroundColor: "white",
                          borderRadius: "30px",
                          color: "#000000c7",
                          padding: "4px 20px",
                          fontSize: "0.8rem",
                          border: "1px solid wheat",
                          ...(index === 1 && {
                            backgroundColor: "#babc00",
                            color: "white",
                            border: "1px solid white",
                          }),
                        }}
                        variant="text"
                      >
                        View Detail
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            item
            md={12}
            className="inf-center-introduction"
            sx={{ marginTop: "2%", padding: "0 3%" }}
          >
            <Grid container md={6} className="introduction-left">
              <img src="assets/images/inf-center-background.jpg" />
            </Grid>
            <Grid container md={6} className="introduction-right">
              <Grid item md={12}>
                <Typography
                  variant="h3"
                  sx={{ fontFamily: "sans-serif", fontWeight: "800" }}
                >
                  Best For Healthy
                </Typography>

                <Typography
                  variant="h3"
                  sx={{ fontFamily: "sans-serif", fontWeight: "800" }}
                >
                  LifeStyle
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{ fontFamily: "sans-serif", color: "#00000078" }}
                >
                  It offers the powerful benefits of exercise. And since yoga is
                  gentle, almost anyone can do it, regardless of your age of
                  fitness level
                </Typography>
              </Grid>
              <Grid
                container
                item
                md={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  backgroundColor: "#babc00",
                  borderRadius: "25px",
                  height: "70px",
                  margin: "2% 0",
                }}
              >
                <Grid
                  item
                  md={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    paddingLeft: "5%",
                  }}
                >
                  <li>
                    <Typography variant="subtitle2" sx={{ fontSize: "2rem" }}>
                      1+
                    </Typography>
                  </li>

                  <li>
                    <Typography variant="subtitle2" sx={{ fontSize: "0.6rem" }}>
                      Year of Experience
                    </Typography>
                  </li>
                </Grid>
                <Grid
                  item
                  md={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    borderRight: "1px solid",
                    borderLeft: "1px solid",
                  }}
                >
                  <li>
                    <Typography variant="subtitle2" sx={{ fontSize: "2rem" }}>
                      300+
                    </Typography>
                  </li>

                  <li>
                    <Typography variant="subtitle2" sx={{ fontSize: "0.6rem" }}>
                      Students Every Year
                    </Typography>
                  </li>
                </Grid>
                <Grid
                  item
                  md={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    paddingLeft: "4%",
                  }}
                >
                  <li>
                    <Typography variant="subtitle2" sx={{ fontSize: "2rem" }}>
                      10+
                    </Typography>
                  </li>

                  <li>
                    <Typography variant="subtitle2" sx={{ fontSize: "0.6rem" }}>
                      Rooms
                    </Typography>
                  </li>
                </Grid>
              </Grid>

              <Grid item md={12}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#00000078",
                  }}
                >
                  <ArrowRightAltIcon
                    sx={{
                      background: "#babc00",
                      borderRadius: "50%",
                      padding: "2px",
                      color: "white",
                      marginRight: "1%",
                    }}
                  ></ArrowRightAltIcon>
                  We believe that everyone need it so we care
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#00000078",
                  }}
                >
                  <ArrowRightAltIcon
                    sx={{
                      background: "#babc00",
                      borderRadius: "50%",
                      padding: "2px",
                      color: "white",
                      marginRight: "1%",
                    }}
                  ></ArrowRightAltIcon>
                  Trainer make it easy for you
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Grid container className="myCoach">
        <Grid item md={12} className="sub-title">
          <Typography variant="h1">Our Best Trainer</Typography>
          <Typography variant="subtitle1">
            Yoga teacher training is the training of teachers of yoga as
            exercise, consisting mainly of the practice of yoga asanas, leading
            to certification
          </Typography>
        </Grid>
        <Grid container item md={12}>
          {listTecher.map((teacher, index) => (
            <Grid item md={3} key={index}>
              <div className="myCoach-detail" key={index}>
                <img src={`/assets/images/userImage/${teacher.id}.jpg`} />
                <h2 className="myCoach-name">{teacher.teacherName}</h2>
              </div>
            </Grid>
          ))}
        </Grid>
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
              <Link to="/thanks">
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
      <Grid container className="blog-home">
        <Grid item md={12} className="blog-home-title">
          <Typography variant="h1">Yoga Soul News</Typography>
          <Typography variant="subtitle1">
            Our most important goal should always be to provide most meaningful
            lessons to our students, as they are capable of doing
          </Typography>
          <Link to="/blog">
            <Typography className="subtitle1">
              All<ArrowRightAltIcon></ArrowRightAltIcon>
            </Typography>
          </Link>
        </Grid>
        <Grid container item md={12}>
          {bloges.slice(0, 4).map((blog) => (
            <Grid key={blog.node.slug} item md={3} sx={{ padding: "20px" }}>
              <Card className="card-blog">
                <Link to={`/blog-detail/${blog.node.slug}`}>
                  <div className="image-container">
                    <CardMedia
                      component="img"
                      sx={{
                        height: "250px",
                        transition: "transform 0.3s",
                      }}
                      image={blog.node.image.url}
                      className="zoom-image"
                    />
                    <Typography
                      variant="subtiltle1s"
                      sx={{
                        position: "absolute",
                        zIndex: "1",
                        color: "white",
                        bottom: "0",
                        left: "10%",
                        borderRadius: "10px 10px 0px 0px",
                        padding: "6px",
                        backgroundColor: "#babc00",
                      }}
                    >
                      {filterDay(blog.node.createdAt)}
                    </Typography>
                  </div>
                </Link>
                <CardContent>
                  <Link to={`/blog-detail/${blog.node.slug}`}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#3f3a3a",
                        fontWeight: "500",
                        fontSize: "22px",
                        margin: "0",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {blog.node.title}
                    </Typography>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid
        container
        className="customer-care"
        style={{ backgroundImage: "url('/assets/images/customer-care.jpg')" }}
      >
        <Grid item md={6}>
          <div className="customer-care-content">
            <h1 style={{ color: "#babc00", marginBottom: "0" }}>YOGA FPTU</h1>
            <h1 style={{ color: "white" }}>
              Embrace Health and Happiness.
              <br />
              Experience it now!
            </h1>
            <p style={{ color: "white" }}>
              Take the time to nurture yourself and explore the hidden potential
              within you through yoga. Let us accompany you on this journey and
              provide you with memorable experiences and great benefits for your
              physical and mental well-being.
            </p>
          </div>
        </Grid>
        <>
          <Grid item md={6}>
            {cookieValue !== undefined ? "" : <RegisterAccountCustomer />}
          </Grid>
        </>
      </Grid>
    </div>
  );
}
