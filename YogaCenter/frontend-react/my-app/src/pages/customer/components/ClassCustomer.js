import React from "react";
import "../css/classCustomer.css";
import { courses } from "../../../data/ListOfCourses";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

function ClassCustomer() {
    const isSingleItem = courses.length === 1;
    const gridColumnCount = isSingleItem ? 1 : 2;

    return (
        <div className="classCustomer">
            <div className="classCustomer-content">
                <div className="classCustomer-title">
                    <Typography variant="h2">My Class</Typography>
                </div>
                <Grid container spacing={10}>
                    {courses.map((course) => (
                        <Grid item xs={12} md={6} key={course.id}sx={{width: "20%",borderRadius: "10px", display: "flex",justifyContent: isSingleItem ? "center" : "flex-start",gridColumn: `span ${gridColumnCount}`}}>
                            <div className="course-box">
                                <Card sx={{display: "flex",backgroundColor: "#dfd3d9ad",width: "100%",height: "100%",borderRadius: "20px", }}>
                                    <CardMedia component="img" image={course.img} alt="green iguana" sx={{ width: "40%", padding: "25px", borderRadius: "45px", }}/>
                                    <CardContent sx={{ width: "60%", margin: "16px", padding: "0",position: "relative", }}>
                                        <Typography variant="h2">{course.name}</Typography>
                                        <Typography variant="subtitle1">
                                        (Course detaile nghe) {course.inf}
                                        </Typography>
                                        <Typography variant="h5">Teacher Name</Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default ClassCustomer;
