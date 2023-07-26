import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import "../css/profileCustomer.css";
import { URL_API } from "../../../api/ConstDefine";
import { useNavigate } from "react-router-dom";
import { pathUser } from "../../../service/pathImage/pathToSaveFile";
export default function ProfileCustomer() {
  const [editing, setEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [updateAvatart, setUpdateAvatar] = useState(false);
  const [profileTitle, setProfileTitle] = useState("Profile");
  const [cookies] = useCookies();
  const userId = cookies.userId;
  console.log(userId);
  const [avatar, setAvatar] = useState(null);
  const [urlImage, setUrlImage] = useState(
    `../../assets/images/userImage/${userId}.jpg`
  );
  const [oldCustomer, setOldCustomer] = useState({});
  const [newCustomer, setNewCustomer] = useState({});
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  let profileCustomerAPI = URL_API + `Customer/${userId}`;
  let checkCurrentPasswordAPI = URL_API + `User/${userId}`;
  useEffect(() => {
    axios
      .get(profileCustomerAPI)
      .then((res) => {
        setOldCustomer(res.data);
        setNewCustomer(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);
  useEffect(() => {
    axios
      .get(checkCurrentPasswordAPI)
      .then((res) => {
        setOldPassword(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);
  // console.log(oldPassword);
  // console.log(formData.newPassword);
  // console.log(newCustomer);
  // console.log(oldCustomer);

  // localStorage.setItem("userData", JSON.stringify(userData));

  const handleEdit = () => {
    setEditing(true);
    setChangePassword(false);
    setProfileTitle("Edit");
    setMessage("");
  };
  const handleChangeAvatar = (e) => {
    // console.log(e.target.files[0].name);
    setAvatar(e.target.files[0]);
  };
  const handleChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]:
        e.target.name === "customerName"
          ? e.target.value
              .trim()
              .replace(/\s+/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (match) => match.toUpperCase())
          : e.target.value,
    });
  };

  const handlerCancel = (value) => {
    if (value === "edit") {
      setEditing(false);
      setProfileTitle("Profile");
    }
    if (value === "password") {
      setUpdateAvatar(false);
      setChangePassword(false);
      setProfileTitle("Profile");
    }
    if (value === "avatar") {
      setUpdateAvatar(false);
      setProfileTitle("Profile");
    }
    setMessage("");
  };
  const handleSubmitAvatar = async (event) => {
    event.preventDefault();
    setUpdateAvatar(false);
    setProfileTitle("Profile");
    if (avatar) {
      const formData = new FormData();
      formData.append("file", avatar);
      formData.append("fileName", `${userId}.jpg`);
      formData.append("filePath", pathUser);

      try {
        const response = await axios.post(
          "https://localhost:7096/api/File/UploadFile",
          formData
        );

        if (response.status === 200) {
          setUrlImage(`${pathUser}${userId}.jpg`);
          console.log("File uploaded successfully!");
        } else {
          console.error("Failed to upload file.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        console.log("sai ròi");
      }
    }
  };
  const handleEditProfile = () => {
    // setUpdateAvatar(false);

    if (newCustomer.customerPhone.length !== 9) {
      setMessage("Length of phone worng!");
      return;
    }
    if (newCustomer.customerPhone.length === 9) {
      if (newCustomer.customerPhone.indexOf(0) === 0) {
        setMessage("Format of phone wrong!");
        return;
      }
    }
    axios
      .put(profileCustomerAPI, {
        customerName: newCustomer.customerName,
        customerPhone: newCustomer.customerPhone,
        customerAddress: newCustomer.customerAddress,
        customerGender: newCustomer.customerGender,
      })
      .then(alert("Edit profile success"), navigate(0))
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePasswordChange = () => {
    setEditing(false);
    setChangePassword(true);
    setProfileTitle("Change Password");

    setMessage("");
  };

  const handlerSubmitChangePassword = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      setMessage("new password and confirm password are not the same");
      return;
    }
    if (formData.currentPassword !== oldPassword.userPasswork) {
      setMessage("Password Wrong");
      console.log("nhap password sai roi");
      return;
    }
    axios
      .put(checkCurrentPasswordAPI, {
        userName: oldPassword.userName,
        userPasswork: formData.newPassword,
        status: 1,
      })
      .then((res) => {
        alert("Change Password Success")
        setEditing(false);
        setChangePassword(false);
        setProfileTitle("Profile");
        navigate(0);
      })
      .catch((error) => {
        setMessage(
          "Something wrong. You can send a message to the center for support"
        );
      });
  };
  const handlerAvatar = (e) => {
    setUpdateAvatar(true);
    setEditing(false);
    setChangePassword(false);
    setProfileTitle("Update Avatar");

    setMessage("");
    console.log(e.target.value);
  };
  const handleChangeOfPassword = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(formData);

  return (
    <div className="profile">
      <div className="profile-content">
        <div className="profile-title">
          <Typography variant="h2" component="h2">
            <KeyboardDoubleArrowRightIcon />
            {profileTitle}
          </Typography>
          <font>
            <div>{message}</div>
          </font>
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
              image={"/assets/images/userImage/" + userId + ".jpg"}
              sx={{ marginBottom: "20px" }}
            />
            <CardActions className="changeProfile">
              <Button
                sx={{ border: "1px dashed #532e4d", padding: "20px" }}
                onClick={handlerAvatar}
              >
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
                  <TextField
                    className="inputPassword-profile"
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    variant="outlined"
                    value={formData.currentPassword}
                    onChange={handleChangeOfPassword}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="newPassword">New password</label>
                  <TextField
                    className="inputPassword-profile"
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChangeOfPassword}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="confirmNewpassword">
                    Confirm new password
                  </label>
                  <TextField
                    id="confirmNewpassword"
                    name="confirmNewPassword"
                    type="password"
                    value={formData.confirmNewPassword}
                    onChange={handleChangeOfPassword}
                  />
                </div>

                <CardActions
                  sx={{
                    paddingTop: "22px",
                    position: "relative",
                    top: "5.6em",
                  }}
                >
                  <Button
                    className="button-save"
                    variant="contained"
                    onClick={handlerSubmitChangePassword}
                  >
                    Save
                  </Button>
                  <Button
                    className="button-cancel"
                    variant="contained"
                    onClick={() => handlerCancel("password")}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </div>
            ) : (
              <>
                {editing ? (
                  <div className="profileCustomer-save">
                    <TextField
                      className="input-profile"
                      sx={{ padding: "0px 10px 32px" }}
                      label="User Name"
                      variant="standard"
                      fullWidth
                      name="customerName"
                      defaultValue={oldCustomer.customerName}
                      onChange={handleChange}
                    />
                    <TextField
                      type="number"
                      className="input-profile"
                      sx={{ padding: "0px 10px 32px" }}
                      label="Phone"
                      variant="standard"
                      fullWidth
                      name="customerPhone"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+84</InputAdornment>
                        ),
                      }}
                      defaultValue={oldCustomer.customerPhone}
                      onChange={handleChange}
                    />
                    <TextField
                      className="input-profile"
                      sx={{ padding: "0px 10px 32px" }}
                      label="Gender"
                      variant="standard"
                      fullWidth
                      name="customerGender"
                      defaultValue={oldCustomer.customerGender}
                      onChange={handleChange}
                    />
                    <TextField
                      className="input-profile"
                      sx={{ padding: "0px 10px 32px" }}
                      label="Address"
                      variant="standard"
                      fullWidth
                      name="customerAddress"
                      defaultValue={oldCustomer.customerAddress}
                      onChange={handleChange}
                    />
                    <p>{message}</p>
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
                        onClick={() => handlerCancel("edit")}
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </CardActions>
                  </div>
                ) : updateAvatart ? (
                  <div className="profileCustomer-save">
                    <div>
                      <input type="file" onChange={handleChangeAvatar} />
                    </div>

                    <CardActions sx={{ paddingTop: "22px" }}>
                      <Button
                        className="button-save"
                        onClick={handleSubmitAvatar}
                        variant="contained"
                      >
                        Save
                      </Button>
                      <Button
                        className="button-cancel"
                        onClick={() => handlerCancel("avatar")}
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
                      <p>{oldCustomer.customerName}</p>
                    </Grid>
                    <Grid md={12} sx={{ padding: "0px 10px 32px" }}>
                      Phone:
                      <br />
                      <p>0{oldCustomer.customerPhone}</p>
                    </Grid>
                    <Grid md={12} sx={{ padding: "0px 10px 32px" }}>
                      Gender:
                      <br />
                      <p>{oldCustomer.customerGender}</p>
                    </Grid>
                    <Grid md={12} sx={{ padding: "0px 10px 32px" }}>
                      Address:
                      <br />
                      <p>{oldCustomer.customerAddress}</p>
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
