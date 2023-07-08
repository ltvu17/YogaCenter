import React, { useEffect, useState } from "react";
import "../css/classInstructor.css";
// import { courses } from "../../../data/ListOfCourses";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { URL_API } from "../../../api/ConstDefine";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function ClassInstructor(){
    const [courses,setCourses] = useState([]);
    const [user] = useCookies('');
    let getClassOfTeacherAPI = URL_API+`Class/Teacher/${user.userId}`;
    useEffect(()=>{
        axios.get(getClassOfTeacherAPI).then(r=>setCourses(r.data)).catch(err => console.log(err));
    },[]);
    const isSingleItem = courses.length === 1;
    const gridColumnCount = isSingleItem ? 1 : 2;
    function filterDay(day){
        const split = day.split("T");
        let value = split[0];
        return value;
    }
    return ( 
        <div className="ClassInstructor">
            <div className="classInstructor-content">
                <div className="classInstructor-title">
                    <Typography variant="h2">My Class</Typography>
                </div>
                <Grid container spacing={10}>
                    {courses?courses.map((course) => (
                        <Grid item xs={12} md={6} key={course.id}sx={{width: "20%",borderRadius: "10px", display: "flex",justifyContent: isSingleItem ? "center" : "flex-start",gridColumn: `span ${gridColumnCount}`}}>
                            <div className="instructor-course-box">
                                <Card sx={{display: "flex",backgroundColor: "#dfd3d9ad",width: "100%",height: "100%",borderRadius: "20px", }}>
                                    <CardMedia component="img" image="/assets/images/class1.jpg" alt="green iguana" sx={{ width: "40%", padding: "25px", borderRadius: "45px", }}/>
                                    <CardContent sx={{ width: "60%", margin: "16px", padding: "0",position: "relative", }}>
                                    <Typography  variant="h2">{course.course.courseDescription}</Typography>
                                        <Grid sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                            <Typography variant="h1">{course.className}</Typography>
                                            <Link to='/schedule-instructor' ><Typography variant="h5">Attendance</Typography></Link>
                                        </Grid>
                                        <Typography variant="subtitle1">
                                        {course.course.courseDetail}
                                        </Typography>
                                        <Grid sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',position:'absolute',bottom:'4%'}} className="instructor-time-class">
                                            <Typography  variant="h6">
                                            ({filterDay(course.classStartDate)} - {filterDay(course.classEndDate)})
                                            </Typography>
                                            <Typography  variant="h6">
                                            {course.courseLength}
                                            </Typography>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </div>
                        </Grid>
                    )):''}
                </Grid>
            </div>
        </div>
    );
       
    
}