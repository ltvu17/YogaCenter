import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import "../css/profileCustomer.css";
import { URL_API } from "../../../api/ConstDefine";
export default function ProfileCustomer() {
  const [editing, setEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [profileTitle, setProfileTitle] = useState("Profile");
  const [cookies] = useCookies(["id"]);
  const userId = cookies.userId;
  const [userData, setUserData] = useState({});
  let profileCustomerAPI = URL_API + `Customer/${userId}`;
  useEffect(() => {
    axios
      .get(profileCustomerAPI)
      .then((response) => {
        const userData = {
          customerId: response.data.id,
          userName: response.data.customerName,
          phone: response.data.customerPhone,
          address: response.data.customerAddress,
          gender: response.data.customerGender,
        };
        setUserData(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  localStorage.setItem("userData", JSON.stringify(userData));
  console.log(editing)
  const handleEdit = () => {
    setEditing(true);
    setChangePassword(false);
    setProfileTitle("Edit");
  };
  const handlePasswordChange = () => {
    setEditing(false);
    setChangePassword(true);
    setProfileTitle("Change Password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    setChangePassword(false);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name)
  };
  const handleEditProfile = (e) => {
    e.preventDefault();
    setEditing(false);
    setProfileTitle("Profile");
    axios
      .put(
        profileCustomerAPI,
        {
          customerName: userData.userName,
          customerPhone: userData.phone,
          customerAddress: userData.address,
          customerGender: userData.gender,
        },
        {
          header: {
            customerId: userData.customerId
          },
        }
      )
      .then(
        console.log("Check nek"),
        console.log(profileCustomerAPI),
        console.log(userData)
      )
      .catch((error) => {
        console.log(error);
      });
  };
  const TextChangePassword = styled(TextField)`
    & .MuiInputBase-root {
      height: 40px;
      margin-left: 10px;
      & .MuiInputLabel-root {
        margin-right: 10px;
      }
    }
    & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #951a3b;
    }
  `;

  return (
    <div className="profile">
      <div className="profile-content">
        <div className="profile-title">
          <Typography variant="h2" component="h2">
            <KeyboardDoubleArrowRightIcon />
            {profileTitle}
          </Typography>
        </div>
        <Grid container>
          <Grid
            xs={6}
            md={5}
            sx={{
              paddingTop: "50px",
              paddingBottom: "50px",
              paddingRight: "20px",
              paddingLeft: "40px",
            }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="65%"
              image="../../assets/images/class1.jpg"
              sx={{ marginBottom: "20px" }}
            />
            <CardActions className="changeProfile">
              <Button sx={{ border: "1px dashed #532e4d", padding: "20px" }}>
                <UpgradeIcon />
                Avatar
              </Button>
              <Button
                sx={{ border: "1px dashed #532e4d", padding: "20px" }}
                onClick={handlePasswordChange}
              >
                Change Password
              </Button>
            </CardActions>
          </Grid>
          <Grid
            xs={6}
            md={7}
            sx={{
              paddingTop: "50px",
              paddingBottom: "50px",
              paddingLeft: "20px",
              paddingRight: "40px",
            }}
          >
            {changePassword ? (
              <div className="profileCustomer-save">
                <div className="form-row">
                  <label htmlFor="currentPassword">Current password</label>
                  <TextChangePassword
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    variant="outlined"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="newPassword">New password</label>
                  <TextChangePassword
                    id="newPassword"
                    name="newPassword"
                    type="password"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="confirmNewpassword">
                    Confirm new password
                  </label>
                  <TextChangePassword
                    id="confirmNewpassword"
                    name="confirmNewpassword"
                    type="password"
                  />
                </div>
                <CardActions
                  sx={{
                    paddingTop: "22px",
                    position: "relative",
                    top: "140px",
                  }}
                >
                  <Button
                    className="button-save"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                  <Button
                    className="button-cancel"
                    variant="contained"
                    onClick={() => setChangePassword(false)}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </div>
            ) : (
              <>
                {editing ? (
                  <div className="profileCustomer-save">
                    <TextField className="input-profile"
                      sx={{ padding: "0px 10px 32px" }}
                      label="User Name"
                      variant="standard"
                      fullWidth
                      name="userName"
                      defaultValue={userData.userName}
                      onChange={handleChange}
                    />
                    <TextField className="input-profile"
                      sx={{ padding: "0px 10px 32px" }}
                      label="Phone"
                      variant="standard"
                      fullWidth
                      name="phone"
                      defaultValue={userData.phone}
                      onChange={handleChange}
                    />
                    <TextField className="input-profile"
                      sx={{ padding: "0px 10px 32px" }}
                      label="Gender"
                      variant="standard"
                      fullWidth
                      name="Gender"
                      defaultValue={userData.gender}
                      onChange={handleChange}
                    />
                    <TextField className="input-profile"
                      sx={{ padding: "0px 10px 32px" }}
                      label="Address"
                      variant="standard"
                      fullWidth
                      name="address"
                      defaultValue={userData.address}
                      onChange={handleChange}
                    />
                    <CardActions sx={{ paddingTop: "22px" }}>
                      <Button
                        className="button-save"
                        onClick={handleEditProfile}
                        variant="contained"
                      >
                        Save
                      </Button>
                      <Button
                        className="button-cancel"
                        onClick={handleEditProfile}
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </CardActions>
                  </div>
                ) : (
                  <Grid container className="profileCustomer-edit">
                    <Grid md={12} sx={{ padding: "0px 10px 32px" }}>
                      User Name:
                      <br />
                      <p>{userData.userName}</p>
                    </Grid>
                    <Grid md={12} sx={{ padding: "0px 10px 32px" }}>
                      Phone:
                      <br />
                      <p>{userData.phone}</p>
                    </Grid>
                    <Grid md={12} sx={{ padding: "0px 10px 32px" }}>
                      Gender:
                      <br />
                      <p>{userData.gender}</p>
                    </Grid>
                    <Grid md={12} sx={{ padding: "0px 10px 32px" }}>
                      Address:
                      <br />
                      <p>{userData.address}</p>
                    </Grid>
                    <CardActions>
                      <Button
                        sx={{
                          border: "1px solid #532e4d",
                          backgroundColor: "#cab2b65c",
                        }}
                        onClick={handleEdit}
                      >
                        <EditIcon sx={{ paddingRight: "5px" }} />
                        Edit Profile
                      </Button>
                    </CardActions>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
