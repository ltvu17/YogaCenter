import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ".././css/homeinstructor.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { URL_API } from "../../../api/ConstDefine";

export default function HomeInstructor() {
  const [user] = useCookies("");
  const [teacher, setTeacher] = useState();
  let teacherAPI = URL_API + `Teacher/${user.userId}`;
  useEffect(() => {
    axios
      .get(teacherAPI)
      .then((r) => setTeacher(r.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="HomeInstructor">
      <Grid container sx={{ height: "100vh"}}>
        <Grid item md={7}>
          <div className="ins-home-title">
            <h2>Welcome</h2>
            <h1>{teacher ? teacher.teacherName : ""}!</h1>
          </div>
          <div className="ins-home-content">
            <p>
              We are thrilled to welcome you back to Yoga Center's website. This
              is the place where you can manage your classes, create amazing
              yoga experiences for your students, and inspire others through
              fantastic yoga sessions. Get ready to elevate your spirit and
              bring joy to the yoga community.
            </p>
          </div>
        </Grid>
        <Grid item md={5}>
          <div className="box-img-teacher">
            <img src="/assets/images/pig-teacher-background.jpg" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
