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
import { useNavigate } from "react-router-dom";
export default function ProfileCustomer() {
  const [editing, setEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [profileTitle, setProfileTitle] = useState("Profile");
  const [cookies] = useCookies();
  const userId = cookies.userId;
  const [oldCustomer, setOldCustomer] = useState({});
  const [newCustomer, setNewCustomer] = useState({});
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  let profileCustomerAPI = URL_API + `Customer/${userId}`;

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
  // console.log(newCustomer);
  // console.log(oldCustomer);

  // localStorage.setItem("userData", JSON.stringify(userData));

  const handleEdit = () => {
    setEditing(true);
    setChangePassword(false);
    setProfileTitle("Edit");
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
      setChangePassword(false);
      setProfileTitle("Profile");
    }
  };

  const handleEditProfile = () => {
    setEditing(false);
    setProfileTitle("Profile");
    if (newCustomer.customerPhone.length === 9) {
      axios
        .put(profileCustomerAPI, {
          customerName: newCustomer.customerName,
          customerPhone: newCustomer.customerPhone,
          customerAddress: newCustomer.customerAddress,
          customerGender: newCustomer.customerGender,
        })
        .then(navigate(0))
        .catch((error) => {
          console.log(error);
        });
    } else {
      setValidPhoneNumber(false);
      return;
    }
  };

  const handlePasswordChange = () => {
    setEditing(false);
    setChangePassword(true);
    setProfileTitle("Change Password");
  };

  const handlerUpdatePassword = (e) => {
    e.preventDefault();
    setEditing(false);
    setChangePassword(false);
    setProfileTitle("Profile");
    // if (formData.newPassword !== formData.confirmNewPassword) {
    //   console.log("Mật khẩu mới không khớp!");
    //   return;
    // }

    // axios
    // .post(CHECK_CURRENT_PASSWORD_API, {
    //   userId: userId,
    //   currentPassword: currentPassword,
    // })
    // .then((res) => {
    //   axios
    //     .put(profileCustomerAPI, {
    //       newPassword: newPassword,
    //     })
    //     .then((res) => {
    //       console.log("Mật khẩu đã được cập nhật thành công!");
    //     })
    //     .catch((error) => {
    //       console.log("Có lỗi xảy ra khi cập nhật mật khẩu:", error);
    //     });
    // })
    // .catch((error) => {
    //   console.log("Mật khẩu hiện tại không chính xác:", error);
    // });

  };
  const handleChangeOfPassword = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData);

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
                    value={formData.currentPassword}
                    onChange={handleChangeOfPassword}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="newPassword">New password</label>
                  <TextChangePassword
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
                  <TextChangePassword
                    id="confirmNewpassword"
                    name="confirmNewpassword"
                    type="password"
                    value={formData.confirmNewPassword}
                    onChange={handleChangeOfPassword}
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
                      <p>
                        {!validPhoneNumber
                          ? "Số điện thoại sai format. Vui lòng nhập lại!"
                          : ""}
                      </p>
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
