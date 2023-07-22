import React, { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import { useCookies } from "react-cookie";
import uuidv4 from "../../../service/IdPublic/IdPublic";
import { URL_API, notification } from "../../../api/ConstDefine";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { staffNotification } from "../../../service/IdPublic/IdPublic";
import "../css/contact.css";
export default function Contact() {
  const InputCus = styled(TextField)`
    & .MuiInputBase-root {
      background-color: #e0d7df;
      border: 1px solid #6a526473;
      border-bottom: 1px solid #6a526473;
      border-radius: 2px;
    }
    & .MuiFilledInput-root:before {
      border-bottom: none;
    }
    & label.Mui-focused {
      color: #866077;
    }
    & .MuiFilledInput-root:after {
      border-bottom: 1px solid #7e404b;
    }
  `;
  //-----------------------------validate-----------------------------------------
  const [feedbackData, setFeedbackData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    describe: "",
  });
  const [message, setMessage] = useState("");
  const [cookies] = useCookies();
  const userId = cookies.userId;
  const [noteId] = useState(uuidv4());
  const navigate = useNavigate();
  //---------------------------------------API------------------------------------------
  let notificationAPI = URL_API + `Notification`;
  let userNotificationAPI = URL_API + `UserNotification`;

  //-----------------------------handlerChange------------------------------
  const handlerChangeFeedback = (e) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(feedbackData.phone.indexOf(0));

  //---------------------------handlerClick--------------------------
  const handlerClickFeedback = async (event) => {
    event.preventDefault();
    if (feedbackData.phone.length !== 9) {
      setMessage("Length of phone worng!");
      return;
    }
    if (feedbackData.phone.length === 9) {
      if (feedbackData.phone.indexOf(0) === 0) {
        setMessage("Format of phone wrong!");
        return;
      }
    }

    await axios
      .post(notificationAPI, {
        id: noteId,
        title: "Feedback",
        detail: `FirstName: ${feedbackData.firstName
          .trim()
          .replace(/\s+/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (match) =>
            match.toUpperCase()
          )}\nLastName: ${feedbackData.lastName
          .trim()
          .replace(/\s+/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (match) => match.toUpperCase())}\nEmail: ${
          feedbackData.email
        }\nPhone: ${feedbackData.phone.slice(1)}\nDescribe: ${feedbackData.describe}`,
        status: "1",
      })
      .then((res) => {
        console.log("succes create notification");
        axios
          .post(
            userNotificationAPI,
            {},
            {
              headers: {
                senderId: userId,
                receiverId: staffNotification,
                noteId: noteId,
              },
            }
          )
          .then((res) => {
            console.log("success create usernotification");
            alert("Send feedback success");
            navigate(0);
          })
          .catch((error) => {
            console.log(noteId);
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="contact">
      <Box className="box-container">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "100%",
            backgroundColor: "#f8f8f8",
            borderRadius: "35px",
            boxShadow: '0px 0px 15px -4px #989e56'
          }}
        >
          <Grid
            className="contact-detail"
            item
            xs={6}
            md={5}
            sx={{
              position: "relative",
              height: "100%",
              backgroundImage:
                "linear-gradient(180deg, #d69bd440,#ffffff9e), url(./assets/images/contact-img.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "35px 0 0 35px",
            }}
          >
            <div className="inf-customer-contact">
              <Typography variant="h4">FPTU Yoga</Typography>
              <Typography variant="subtitle1">
                FPTU Yoga fosters and empowers personal well-being and
                mindfulness through a dedicated practice built on ancient
                traditions and modern techniques.
              </Typography>
              <ul className="contact-social">
                <a
                  href="https://www.facebook.com/hniv.gnauqnart"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li>
                    <FacebookIcon
                      sx={{ fontSize: "3em", padding: "10px" }}
                    ></FacebookIcon>
                  </li>
                </a>
                <a
                  href="https://www.instagram.com/qng.vin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li>
                    {" "}
                    <InstagramIcon
                      sx={{ fontSize: "3em", padding: "10px" }}
                    ></InstagramIcon>
                  </li>
                </a>
                <a>
                  <li>
                    {" "}
                    <TwitterIcon
                      sx={{ fontSize: "3em", padding: "10px" }}
                    ></TwitterIcon>
                  </li>
                </a>
                <a>
                  <li>
                    {" "}
                    <PhoneEnabledIcon
                      sx={{ fontSize: "3em", padding: "10px" }}
                    ></PhoneEnabledIcon>
                  </li>
                </a>
              </ul>
            </div>
          </Grid>
          <Grid className="feedback-container" item xs={6} md={7}>
            <div className="feedback-detail">
              <div className="feedback-title">
                <h1>Get it touch</h1>
                <p> We will answer your questions and problems</p>
                <p style={{ color: "red" }}>{message}</p>
              </div>
              <div
                className="form-feedback"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Grid className="inf-customer-feedback" style={{ flex: "1" }}>
                  <TextField
                    id="filled-read-only-input"
                    label="First Name"
                    variant="filled"
                    sx={{ width: "47%" }}
                    style={{ flex: "0 0 auto" }}
                    required
                    name="firstName"
                    defaultValue={feedbackData.firstName}
                    onChange={handlerChangeFeedback}
                  />
                  <TextField
                    id="filled-read-only-input"
                    label="Last Name"
                    variant="filled"
                    sx={{ width: "47%" }}
                    style={{ flex: "0 0 auto" }}
                    name="lastName"
                    defaultValue={feedbackData.lastName}
                    onChange={handlerChangeFeedback}
                  />
                </Grid>
                <TextField
                  id="filled-read-only-input"
                  label="Email"
                  sx={{ width: "100%", margin: "5px 0" }}
                  variant="filled"
                  style={{ flex: "0 0 auto" }}
                  type="email"
                  required
                  name="email"
                  defaultValue={feedbackData.email}
                  onChange={handlerChangeFeedback}
                />
                <TextField
                  id="filled-read-only-input"
                  label="Phone"
                  sx={{ width: "100%", margin: "5px 0" }}
                  variant="filled"
                  style={{ flex: "0 0 auto" }}
                  type="number"
                  name="phone"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+84</InputAdornment>
                    ),
                  }}
                  defaultValue={feedbackData.phone}
                  onChange={handlerChangeFeedback}
                />
                <TextField
                  id="filled-multiline-static"
                  label="Describe your issue"
                  multiline
                  rows={4}
                  variant="filled"
                  sx={{ width: "100%", margin: "5px 0" }}
                  style={{ flex: "0 0 auto" }}
                  name="describe"
                  defaultValue={feedbackData.describe}
                  onChange={handlerChangeFeedback}
                />
                <Button
                  sx={{
                    width: "100%",
                    height: "4em",
                    backgroundColor: "black",
                    marginTop: "1.5em",
                  }}
                  variant="contained"
                  onClick={handlerClickFeedback}
                >
                  Feedback
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
