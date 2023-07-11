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
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import "../css/profileInstructor.css";
import { URL_API } from "../../../api/ConstDefine";
import { useNavigate } from "react-router-dom";
import { pathUser } from "../../../service/pathImage/pathToSaveFile";
import { colors } from "@mui/material";
export default function ProfileTeacher() {
  const [editing, setEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [profileTitle, setProfileTitle] = useState("Profile");
  const [cookies] = useCookies();
  const userId = cookies.userId;
  const [oldTeacher, setoldTeacher] = useState("");
  const [newTeacher, setNewTeacher] = useState("");
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState();
  const [updateAvatart, setUpdateAvatar] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [urlImage, setUrlImage] = useState(
    `../../assets/images/userImage/${userId}.jpg`
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  let profileTeacherAPI = URL_API + `Teacher/${userId}`;
  let checkCurrentPasswordAPI = URL_API + `User/${userId}`;

  useEffect(() => {
    axios
      .get(profileTeacherAPI)
      .then((res) => {
        setoldTeacher(res.data);
        setNewTeacher(res.data);
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
  // console.log(newTeacher);
  // console.log(oldTeacher);

  // localStorage.setItem("userData", JSON.stringify(userData));

  const handleEdit = () => {
    setEditing(true);
    setChangePassword(false);
    setProfileTitle("Edit");
  };
  const handleChange = (e) => {
    setNewTeacher({
      ...newTeacher,
      [e.target.name]:
        e.target.name === "teacherName"
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
      setChangePassword(false);
      setProfileTitle("Profile");
    }
    if (value === "avatar") {
      setUpdateAvatar(false);
      setProfileTitle("Profile");
    }
    setMessage("");
  };

  const handleEditProfile = () => {
    if (newTeacher.teacherPhone.toString().length !== 9) {
      setMessage("Length of phone worng!");
      return;
    }
    if (newTeacher.teacherPhone.toString().length === 9) {
      if (newTeacher.teacherPhone.toString().indexOf(0) === 0) {
        setMessage("Format of phone wrong!");
        return;
      }
    }
    axios
      .put(profileTeacherAPI, {
        teacherName: newTeacher.teacherName,
        teacherPhone: newTeacher.teacherPhone,
        teacherAddress: newTeacher.teacherAddress,
        teacherGender: newTeacher.teacherGender,
      })
      .then(alert("Update successfylly"), navigate(0))
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePasswordChange = () => {
    setEditing(false);
    setChangePassword(true);
    setProfileTitle("Change Password");
  };

  const handlerUpdatePassword = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      setMessage("new password and confirm password are not the same");
      return;
    }
    if (formData.currentPassword !== oldPassword.userPasswork) {
      setMessage("Current Password Wrong");
      return;
    }
    axios
      .put(checkCurrentPasswordAPI, {
        userName: oldPassword.userName,
        userPasswork: formData.newPassword,
        status: 1,
      })
      .then((res) => {
        alert("Update Password success");
        navigate(0);
      })
      .catch((error) => {
        setMessage(
          "Something wrong. You can send a message to the center for support"
        );
      });
  };
  const handleChangeOfPassword = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //--------------------------------Avatar-------------------------
  const handlerAvatar = (e) => {
    setUpdateAvatar(true);
    setEditing(false);
    setChangePassword(false);
    setProfileTitle("Update Avatar");

    setMessage("");
    console.log(e.target.value);
  };
  const handleChangeAvatar = (e) => {
    // console.log(e.target.files[0].name);
    setAvatar(e.target.files[0]);
  };
  const handleSubmitAvatar = async (event) => {
    setUpdateAvatar(false);
    setProfileTitle("Profile");
    if (avatar) {
      const formData = new FormData();
      formData.append("file", avatar);
      formData.append("fileName", `${oldTeacher.id}.jpg`);
      formData.append("filePath", pathUser);

      try {
        const response = await axios.post(
          "https://localhost:7096/api/File/UploadFile",
          formData
        );

        if (response.status === 200) {
          setUrlImage(`${pathUser}${userId}.jpg`);
          alert("Upload image success");
          navigate(0);
        } else {
          console.error("Failed to upload file.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        console.log("sai ròi");
      }
    }
  };

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
              image={"/assets/images/userImage/" + oldTeacher.id + ".jpg"}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = "/assets/images/userImage/avatarDefault.jpg";
              }}
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
              <div className="profileInstructor-save">
                <div className="form-row">
                  <label htmlFor="currentPassword">Current password</label>
                  <TextField
                    className="instructor-input-password"
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
                    className="instructor-input-password"
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
                    className="instructor-input-password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    value={formData.confirmNewPassword}
                    onChange={handleChangeOfPassword}
                  />
                </div>
                <p style={{ color: "red" }}>{message}</p>
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
                    onClick={handlerUpdatePassword}
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
                  <div className="profileInstructor-save">
                    <TextField
                      className="input-profile"
                      sx={{ padding: "0px 10px 32px" }}
                      label="User Name"
                      variant="standard"
                      fullWidth
                      name="teacherName"
                      defaultValue={oldTeacher.teacherName}
                      onChange={handleChange}
                    />
                    <TextField
                      type="number"
                      className="input-profile"
                      sx={{ padding: "0px 10px 32px" }}
                      label="Phone"
                      variant="standard"
                      fullWidth
                      name="teacherPhone"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+84</InputAdornment>
                        ),
                      }}
                      defaultValue={oldTeacher.teacherPhone}
                      onChange={handleChange}
                    />
                    <TextField
                      className="input-profile"
                      sx={{ padding: "0px 10px 32px" }}
                      label="Gender"
                      variant="standard"
                      fullWidth
                      name="teacherGender"
                      defaultValue={oldTeacher.teacherGender}
                      onChange={handleChange}
                    />
                    <TextField
                      className="input-profile"
                      sx={{ padding: "0px 10px 32px" }}
                      label="Address"
                      variant="standard"
                      fullWidth
                      name="teacherAddress"
                      defaultValue={oldTeacher.teacherAddress}
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
                  <Grid container className="profileInstructor-edit">
                    <Grid md={12} sx={{ padding: "0px 10px 32px" }}>
                      User Name:
                      <br />
                      <p>{oldTeacher.teacherName}</p>
                    </Grid>
                    <Grid md={12} sx={{ padding: "0px 10px 32px" }}>
                      Phone:
                      <br />
                      <p>0{oldTeacher.teacherPhone}</p>
                    </Grid>
                    <Grid md={12} sx={{ padding: "0px 10px 32px" }}>
                      Gender:
                      <br />
                      <p>{oldTeacher.teacherGender}</p>
                    </Grid>
                    <Grid md={12} sx={{ padding: "0px 10px 32px" }}>
                      Address:
                      <br />
                      <p>{oldTeacher.teacherAddress}</p>
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
