import React from "react";
import Grid from "@mui/material/Grid";
import ".././css/homeinstructor.css";

export default function HomeInstructor(){
    return(
        <div className="HomeInstructor">
            <Grid container sx={{height:'100vh',marginTop:'70px'}}>
                <Grid item md={7}>
               <div className="ins-home-title">
                    <h1>Welcome, Name!</h1>
               </div>
               <div className="ins-home-content">
                <p>We are thrilled to welcome you back to Yoga Center's website. This is the place where you can manage your classes, create amazing yoga experiences for your students, and inspire others through fantastic yoga sessions. Get ready to elevate your spirit and bring joy to the yoga community.</p>
               </div>
               </Grid>
               <Grid item md={5}>
                <div className="box-img-teacher">
                        <img src="/assets/images/pig-teacher-background.jpg" />
                 </div>
               </Grid>
               </Grid>
        </div>
    )
}