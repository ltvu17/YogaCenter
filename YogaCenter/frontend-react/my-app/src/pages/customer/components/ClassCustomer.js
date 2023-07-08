import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../css/classCustomer.css";
import { courses } from "../../../data/ListOfCourses";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { URL_API } from "../../staff/components/ConstDefine";
import axios from "axios";

function ClassCustomer() {
  const [userId] = useCookies("userId");
  const [userData, setUserData] = useState("");
  const customerId = userData !== "" ? userData.id : "";
  let customerByUserIdAPI = URL_API + `Customer/${userId.userId}`;
  let lessonByCusIDAPI = URL_API + `ClassCustomer/getCustomer/${customerId}`;
  //   console.log(savedUserData);

  const isSingleItem = courses.length === 1;
  const gridColumnCount = isSingleItem ? 1 : 2;
  const [myClass, setMyClass] = useState("");
  // console.log(myClass[0].class.id)
  useEffect(() => {
    axios
      .get(customerByUserIdAPI)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(lessonByCusIDAPI)
      .then((res) => {
        setMyClass(res.data);
        console.log("oke");
      })
      .catch((error) => {
        console.log("sai roi");
        console.log(error);
      });
  }, [customerId]);
  return (
    <div className="classCustomer">
      <div className="classCustomer-content">
        <div className="classCustomer-title">
          <Typography variant="h2">My Class</Typography>
        </div>
        <Grid container spacing={10}>
          {myClass 
            ? myClass.map((classs) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  key={classs.class.id}
                  sx={{
                    width: "20%",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: isSingleItem ? "center" : "flex-start",
                    gridColumn: `span ${gridColumnCount}`,
                  }}
                >
                  <div className="course-box">
                    <Card
                      sx={{
                        display: "flex",
                        backgroundColor: "#dfd3d9ad",
                        width: "100%",
                        height: "100%",
                        borderRadius: "20px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={
                          "/assets/images/classImage/" +
                          classs.class.id +
                          ".jpg"
                        }
                        onError={(e) => {
                          e.target.onError = null;
                          e.target.src =
                            "/assets/images/classImage/classDefault.jpg";
                        }}
                        alt="green iguana"
                        sx={{
                          width: "40%",
                          padding: "25px",
                          borderRadius: "45px",
                        }}
                      />
                      <CardContent
                        sx={{
                          width: "60%",
                          margin: "16px",
                          padding: "0",
                          position: "relative",
                        }}
                      >
                        <Typography variant="h2">
                          {classs.class.className}
                        </Typography>
                        <Typography variant="subtitle1">
                          Start Date:{" "}
                          {new Date(
                            classs.class.classStartDate
                          ).toLocaleDateString()}
                        </Typography>
                        <Typography variant="subtitle1">
                          Start Date:{" "}
                          {new Date(
                            classs.class.classEndDate
                          ).toLocaleDateString()}
                        </Typography>
                        <Typography variant="subtitle1">
                          {classs.class.course.courseDetail}
                        </Typography>
                        <Typography variant="h5">
                          {classs.class.teacher !== null
                            ? classs.class.teacher.teacherName
                            : ""}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
              ))
            : ""}
        </Grid>
      </div>
    </div>
  );
}

export default ClassCustomer;
