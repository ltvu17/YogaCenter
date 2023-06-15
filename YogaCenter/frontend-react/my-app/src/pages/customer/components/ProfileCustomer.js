import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import UpgradeIcon from '@mui/icons-material/Upgrade';

import CardMedia from '@mui/material/CardMedia';
import '../css/profileCustomer.css'
import { Routes } from "react-router-dom";


export default function ProfileCustomer() {
    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState({
      userName: "Quang Vinh",
      phone: "0888385759",
      email: "quangvinh11602@gmail.com",
      address: "6/3 Chân Lý, P.Bình Thọ, Thành Phố Thủ Đức",
    });
    const handleEdit = () => {
        setEditing(true);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
       
        setEditing(false);
      };
      const handleChange = (e) => {
        setUserData({
          ...userData,
          [e.target.name]: e.target.value,
        });
      };
      const TextCus = styled(TextField)`
      & label.Mui-focused {
          color: #866077;
        }
        .MuiInput-underline:after {
          border-bottom-color: #951a3b;
        }
      `;
     ;
    return (
        <div className="profile" >
            <div className="profile-content" >
            <div className="profile-title"> <Typography variant="h2" component="h2"><KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>Profile</Typography></div>
            <Grid container >
                <Grid xs={6} md={5}   sx={{paddingTop:'50px',paddingBottom:'50px',paddingRight:'20px',paddingLeft:'40px'}}>     
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="65%"
                        image="../../assets/images/class1.jpg"
                        sx={{marginBottom:'20px'}}
                    />
                    <CardActions  className="changeProfile" >
                        <Button  sx={{border:"1px dashed #532e4d", padding:'20px'}}><UpgradeIcon></UpgradeIcon>Avatar</Button>
                        <Button  sx={{border:"1px dashed #532e4d",padding:'20px'}}>Change Password</Button>
                    </CardActions>
                
                </Grid>
                <Grid xs={6} md={7} sx={{paddingTop:'50px',paddingBottom:'50px',paddingLeft:'20px',paddingRight:'40px'}}>
            
                    {editing ? (
                        <form onSubmit={handleSubmit} className="profileCustomer-save">
                            <TextCus 
                                sx={{padding: "0px 10px 32px"}}
                                label="User Name"
                                variant="standard"
                                fullWidth
                                name="userName"
                                value={userData.userName}
                                onChange={handleChange}
                            />
                            <TextCus  
                                sx={{padding: "0px 10px 32px"}}
                                label="Phone"
                                variant="standard"
                                fullWidth
                                name="phone"
                                value={userData.phone}
                                onChange={handleChange}
                            />
                            <TextCus
                                sx={{padding: "0px 10px 32px"}}
                                label="Email"
                                variant="standard"
                                fullWidth
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                            <TextCus
                                sx={{padding: "0px 10px 32px"}}
                                label="Address"
                                variant="standard"
                                fullWidth
                                name="address"
                                value={userData.address}
                                onChange={handleChange}
                            />
                            <CardActions sx={{paddingTop: "22px"}} >
                                <Button className="button-save " type="submit" variant="contained" >
                                    Save
                                </Button>
                                <Button className="button-cancel " type="submit" variant="contained" >
                                    Cancel
                                </Button>
                            </CardActions>
                        </form>
                    ) : (
                        <Grid container className="profileCustomer-edit">
                            <Grid md={12} sx={{padding: "0px 10px 32px"}}>User Name:<br/> <p>{userData.userName}</p></Grid>
                            <Grid md={12} sx={{padding: "0px 10px 32px"}}>Phone: <br/> <p>{userData.phone}</p></Grid>
                            <Grid md={12} sx={{padding: "0px 10px 32px"}}>Email: <br/> <p>{userData.email}</p></Grid>
                            <Grid md={12} sx={{padding: "0px 10px 32px"}}>Address: <br/> <p>{userData.address}</p></Grid>
                                <CardActions>
                                    <Button sx={{border:"1px solid #532e4d",backgroundColor:"#cab2b65c"}} onClick={handleEdit}>
                                        <EditIcon sx={{paddingRight:"5px"}}></EditIcon>Edit Profile
                                    </Button>
                                </CardActions>
                        </Grid>
                    )}
                </Grid> 
            </Grid>
            </div>
          
        </div>

    )
}

