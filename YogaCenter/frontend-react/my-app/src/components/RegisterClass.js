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
import AddIcon from "@mui/icons-material/Add";
import "../css/registerClass.css";
import "../css/customerCare.css";
import { URL_API } from "../api/ConstDefine";
import RegisterAccountCustomer from "../pages/customer/components/RegisterAccountCustomer";
import RegisClasForm from "../pages/customer/components/RegisClassForm";
import CustomerCarePopup from "./CustomerCarePopup";
const ariaLabel = { "aria-label": "description" };
export default function RegisterClass() {
  const [Classes, setClasses] = useState([]);
  const [cookies, setcookie] = useCookies(["userId"]);
  const [courseId, setCoursesId] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formRegister, setFormRegisterClass] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [clacsCheck, setClassCheck] = useState([]);
  const [voiceNote, setVoiceNote] = useState({
    status: "",
    classId: "",
  });
  // console.log(currentDate);
  // console.log(Classes.length !== 0 ? Classes[0].classStartDate : "sad");
  // console.log(currentDate < new Date(Classes[0].classEndDate))
  const userId = cookies.userId;
  const InputCus = styled(Input)`
    &:after {
      border-bottom: 2px solid #951a3b;
    }
  `;

  let ClassAPI = URL_API + `Class`;
  let getUserAPI = URL_API + `Customer/${userId}`;
  let getInvoiceByCustomerId = URL_API + `Invoice/customer/${customer.id}`;
  let lessonByCusIDAPI = URL_API + `ClassCustomer/getCustomer/${customer.id}`;
  console.log(customer.id)
  // console.log(getInvoiceByCustomerId);
  const [showPopup, setShowPopup] = useState(false);
  function handlerRegisterClassFormSublmit(courseId, classId) {
    if (userId === undefined) {
      // const element = document.getElementById("registerAccount");
      // if (element) {
      //   element.scrollIntoView({ behavior: "smooth" });
      // }
      setShowPopup(true);
    } else {
      setcookie("classId", classId);
      setShowPopup(true);
      // const element = document.getElementById("registerClass");
      // if (element) {
      //   element.scrollIntoView({ behavior: "smooth" });
      // }
      setCoursesId(courseId);
      // setFormRegisterClass(true);
    }
  }
  const handlePopupClose = () => {
    setShowPopup(false);
  };
  useEffect(() => {
    axios
      .get(getUserAPI)
      .then((r) => setCustomer(r.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(getInvoiceByCustomerId)
      .then((res) => {
        setInvoice(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [customer.id]);
  // console.log(invoice[0].note.split("_"))
  useEffect(() => {
    if (showPopup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showPopup]);
  useEffect(() => {
    axios
      .get(ClassAPI)
      .then((res) => {
        setClasses(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 
  useEffect(() => {
    if(customer.id !== undefined){
      axios
      .get(lessonByCusIDAPI)
      .then((res) => {
        setClassCheck(res.data);
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });
    }
  },[customer.id]);
  var check = [];

  clacsCheck.forEach(c=>{
    check.push(c.class.id)
  })

  var newList = [];
  Classes.forEach((c) => {
    if(!check.includes(c.id))
    {
      newList.push(c);
    }
  });
 
  // console.log(invoice);

  return (
    <div className="register-class">
      <div className="classList">
        <div className="classList-title">
          <p>Confidence and Serenity with Yoga</p>
          <h1>Explore Our Yoga Class Offerings</h1>
        </div>

        <Grid container ml={10} mr={10} mt={10} className="classList-detail">
          {newList
            ? newList.map((classe) =>
                currentDate < new Date(classe.classStartDate) ? (
                  <Grid
                    key={classe.id}
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
                      <Card className="class-content">
                        <CardMedia
                          className="class-img"
                          component="img"
                          alt="image"
                          image={`/assets/images/courseImage/${classe.course.id}.jpg`}
                        />
                        <CardContent className="class-description">
                          <Typography
                            sx={{
                              fontSize: "2rem",
                              color: "black",
                              fontWeight: "700",
                            }}
                          >
                            {classe.course.courseDescription}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontSize: "1.4rem", color: "#00000082" }}
                          >
                            <span>class: </span>
                            {classe.className}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontSize: "1.4rem", color: "#00000082" }}
                          >
                            <span>Slot: </span>
                            {classe.course.courseLength}
                          </Typography>
                          <Grid container className="class-price">
                            <Typography variant="h5">
                              <span
                                style={{ color: "red", marginRight: "10%" }}
                              >
                                $
                              </span>
                              {classe.course.coursePrice}
                            </Typography>
                          </Grid>
                        </CardContent>
                        <CardActions className="buttonCard">
                          <Button
                            variant="outlined"
                            onClick={() =>
                              handlerRegisterClassFormSublmit(
                                classe.course.id,
                                classe.id
                              )
                            }
                          >
                            Booking
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                  </Grid>
                ) : (
                  ""
                )
              )
            : ""}
          {showPopup && (
            <CustomerCarePopup onClose={handlePopupClose} courseId={courseId} />
          )}
        </Grid>
      </div>
    </div>
  );
}
