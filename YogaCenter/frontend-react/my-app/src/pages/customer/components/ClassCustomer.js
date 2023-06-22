import React from "react";
import '../css/classCustomer.css'
import {courses} from "../../../data/ListOfCourses"
import { Grid, Typography } from "@mui/material";
function ClassCustomer(){
    return(
        <div className="classCustomer">
            <div className="classCustomer-content">
                <div className="classCustomer-title">
                    <Typography variant="h2">Class ahahaha </Typography>
                </div>
                {courses.map((course) =>(
                    <Grid container md={6} key={course.id}>
                        <Grid md={4} sx={{backgroundColor:'red'}}>
                            <h2>{course.name}</h2>
                        </Grid>
                        <Grid md={8} sx={{backgroundColor:'black'}}>

                        </Grid>
                    </Grid>
                ))}
            </div>
        </div>
    )
}
export default ClassCustomer
