import React, { useEffect } from "react";
import NotificationSend from "./NotificationSend";
import NotificationSent from "./NotificationSent";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import uuidv4, { URL_API } from "./ConstDefine";
import axios from "axios";
import { notification } from "./ConstDefine";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CreateIcon from '@mui/icons-material/Create';
import "../css/Notificationstaff.css";

export default function NotificationStaff() {
  const [composeStatus, setComposeStatus] = useState(false);
  const [customers, setCustomers] = useState();
  const [noteId] = useState(uuidv4());
  const navigate = useNavigate();
  const [inputField, setInputFields] = useState({
    senderId: notification,
    receiverId: "",
    title: "",
    detail: "",
    status: 1,
  });
  ///Handler
  const ChangeHandler = (e) => {
    setInputFields((p) => {
      return { ...inputField, [e.target.name]: e.target.value };
    });
  };
  console.log(inputField);
  ///URL_API
  let getAllCustomersAPI = URL_API + `Customer`;
  let postNotificationAPI = URL_API + `Notification`;
  let postUserNotificationAPI = URL_API + `UserNotification`;
  ///Getdata
  useEffect(() => {
    axios
      .get(getAllCustomersAPI)
      .then((r) => setCustomers(r.data))
      .catch((err) => console.log(err));
  }, [getAllCustomersAPI]);
  ///Handeler
  const statusHanlder = () => {
    if (composeStatus) {
      setComposeStatus(false);
    } else {
      setComposeStatus(true);
    }
  };
  //Submit
  const Submit = async () => {
    await axios
      .post(postNotificationAPI, {
        id: noteId,
        title: inputField.title,
        detail: inputField.detail,
        status: inputField.status,
      })
      .then((r) => {
        console.log(r);
      })
      .catch((err) => console.log(err));
    await axios
      .post(postUserNotificationAPI, "", {
        headers: {
          senderId: inputField.senderId,
          receiverId:
            inputField.receiverId === -1 ? null : inputField.receiverId,
          noteId: noteId,
        },
      })
      .then((r) => console.log(r))
      .catch((err) => console.log(err));
    navigate(0);
  };

  const [selectedItem, setSelectedItem] = useState('inbox');

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderComponent = () => {
    switch (selectedItem) {
      case 'inbox':
        return <NotificationSend />;
      case 'sent':
        return   <NotificationSent status={composeStatus} />;
      default:
        return null;
    }
  };
  return (
    <div className="staff-notification">
    
      {composeStatus ? (
   
          <div className="compose-detail">
            {/* <form> */}
            <h1 style={{marginBottom:'20px'}}>Send notification</h1>
            <TextField sx={{marginBottom:'20px'}} onChange={ChangeHandler} name="receiverId" id="outlined-select-currency" select label="Sent to" defaultValue="" helperText="Please select account" required>
              <MenuItem value={-1}>All customers</MenuItem>
              {customers ? (
                customers.map((item) => (
                  <MenuItem value={item.user.id} key={item.id}>
                    <p>{item.customerName}||0{item.customerPhone}</p>
                  </MenuItem>
                ))
              ) : (
                <MenuItem />
              )}
            </TextField>
          
            <TextField sx={{marginBottom:'20px'}} onChange={ChangeHandler} name="title"  required label="Title" variant="outlined"/>
          
            <p style={{marginBottom:'10px'}}>Detail :</p>
            <textarea style={{marginBottom:'10px'}} onChange={ChangeHandler} name="detail" required rows={10} cols={50}></textarea>
          
            <Button type="submit" onClick={Submit} startIcon={<SendIcon />} variant="contained">
              Send
            </Button>
            <div className="close-noti">
            <CloseIcon onClick={statusHanlder} ></CloseIcon>
            </div>
            {/* </form> */}
          </div>
   
      ) : (
        ""
      )}

      <h1 className="staff-title">Notification</h1>
       
        <Grid container spacing={2} sx={{marginTop:'0'}}>
        <Grid item xs={3} sx={{display:'flex',flexDirection:'column'}}>
        <div className="staff-compose">
            <Button sx={{height:'60px',border: '1px solid #bdc0b4',background: '#bdc0b4',borderRadius: '10px'}} onClick={statusHanlder} startIcon={<CreateIcon />}variant="outlined">
                <span>Compose</span>
            </Button>
        </div>
            <List component="nav">
                <ListItemButton selected={selectedItem === 'inbox'} onClick={() => handleMenuItemClick('inbox')}>
                    <ListItemIcon>
                    <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItemButton>

                <ListItemButton selected={selectedItem === 'sent'} onClick={() => handleMenuItemClick('sent')}>
                    <ListItemIcon>
                    <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sent" />
                </ListItemButton>
            </List>
        </Grid>
        <Grid item xs={9} sx={{position:'relative'}}>
            {renderComponent()}
        </Grid>
        </Grid>
        
        {/*
          <NotificationSend />
        <NotificationSent status={composeStatus} /> */}
    </div>
  );
}
