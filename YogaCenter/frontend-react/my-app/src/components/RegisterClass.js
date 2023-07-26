import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { pathCourse } from "../service/pathImage/pathToSaveFile";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Input } from "@mui/material";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import "../css/registerClass.css";
import '../css/customerCare.css';
import { URL_API } from "../api/ConstDefine";
import RegisterAccountCustomer from "../pages/customer/components/RegisterAccountCustomer";
import RegisClasForm from "../pages/customer/components/RegisClassForm";
import CustomerCarePopup from "./CustomerCarePopup";
const ariaLabel = { "aria-label": "description" };
export default function RegisterClass() {
  const [Class, setClass] = useState([]);
  const [cookies] = useCookies(["userId"]);
  const [courses, setCourses] = useState("");
  const [courseId,setCoursesId] = useState(0);
  const [formRegister, setFormRegisterClass] = useState(false);
  const userId = cookies.userId;
  const InputCus = styled(Input)`
    &:after {
      border-bottom: 2px solid #951a3b;
    }
  `;

  let CourseAPI = URL_API + `Course`;
  const [showPopup, setShowPopup] = useState(false);
  function handlerRegisterClassFormSublmit(courseId) {
    if (userId === undefined) {
      // const element = document.getElementById("registerAccount");
      // if (element) {
      //   element.scrollIntoView({ behavior: "smooth" });
      // }
      setShowPopup(true);
    } else {
      setShowPopup(true);
      // const element = document.getElementById("registerClass");
      // if (element) {
      //   element.scrollIntoView({ behavior: "smooth" });
      // }
      setCoursesId(courseId);
      // setFormRegisterClass(true);
    }
  };
  const handlePopupClose = () => {

    setShowPopup(false);
  };
  useEffect(() => {
    if (showPopup) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showPopup]);
  useEffect(() => {
    axios
      .get(CourseAPI)
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="register-class">
    
      <div className="classList">
        <div className="classList-title">
          <p>Confidence and Serenity with Yoga</p>
          <h1>Explore Our Yoga Class Offerings</h1>
        </div>
  
          
    
        <Grid container ml={10} mr={10} mt={10} className="classList-detail">
          {courses
            ? courses.map((coursesDetail) => (
                <Grid
                  key={coursesDetail.id}
                  item
                  containter
                  md={4}
                  pb="50px"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Card className="class-content" >
                      <CardMedia    
                       className="class-img"
                        component="img"
                   
                        alt="image"
                        image={`/assets/images/courseImage/${coursesDetail.id}.jpg`}
                       
                      />
                      <CardContent 
                       className="class-description"  >
                        <Typography
                          sx={{ fontSize: '2rem',color:'black',fontWeight: '700' }}
                        >
                          {coursesDetail.courseDescription}
                        </Typography>
                        <Typography sx={{color: '#0000006b'}} variant="body2" >
                          {coursesDetail.courseDetail}
                        </Typography>
                        <Typography variant="h6" sx={{    fontSize: '1.4rem', color: '#00000082'   }}>
                          <span>Slot: </span>{coursesDetail.courseLength}
                        </Typography>
                        <Grid container className="class-price" >
                        
                      <Typography variant="h5"> 

                          <span style={{color:'red',marginRight:'10%'}}>$</span>{coursesDetail.coursePrice}
                        </Typography>
                      
                        </Grid>
                      </CardContent>
                      <CardActions
                        className="buttonCard"
                        
                      >
                       
                        <Button
                          variant="outlined"
                      
                          onClick={() =>
                            handlerRegisterClassFormSublmit(coursesDetail.id)
                          }
                        >
                       Booking
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                </Grid>
              ))
            : ""}
            {showPopup && <CustomerCarePopup onClose={handlePopupClose} courseId={courseId}  />}
        </Grid>
      </div>
    </div>
  );
}
