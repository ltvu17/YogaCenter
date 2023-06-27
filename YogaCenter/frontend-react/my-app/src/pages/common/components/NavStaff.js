import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import axios from 'axios'
import '../css/NavStaff.css'
import '../../../css/navigation.css'


import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ReceiptIcon from '@mui/icons-material/Receipt';

export default function NavStaff(){
    const [cookie, setCookie] = useCookies();
    const navigate = useNavigate();
   
    axios.defaults.withCredentials = true;
    const logout = () => {
      axios
        .post("https://localhost:7096/api/User/Logout", "", {})
        .then((r) => console.log(r))
        .catch((er) => console.log(er));
        setCookie("flag", 1, { path: "/" });
    };

    return (
        <nav className='NavStaff'>
          <ul className="nav-sub-staff">
            <li>
                <Link to="homestaff"><HomeIcon className="icon-nav"></HomeIcon></Link>
            </li>
            <li>
                <Link to="/staff-notification"><CircleNotificationsIcon className="icon-nav"></CircleNotificationsIcon><p>Notification</p></Link>
            </li>
            <li className="menu">
              <Link to="/staffmanage"><SchoolIcon className="icon-nav"></SchoolIcon><p>Manage Class</p></Link>
            </li>
            <li className="menu">
              <Link to="#"><BookOutlinedIcon className="icon-nav"></BookOutlinedIcon><p>Manage Blog</p></Link>
            </li>
            <li className="menu">
              <Link to="/schedulemanage"><CalendarMonthIcon className="icon-nav"></CalendarMonthIcon><p>Manage Schedule</p></Link>
            </li>
            <li className="menu">
              <Link to="/register"><GroupIcon className="icon-nav"></GroupIcon><p>Register User</p></Link>
            </li>
            <li className='menu'><Link  to='/create-invoice'><ReceiptIcon className="icon-nav"></ReceiptIcon><p>Create Invoice</p></Link>
            </li>
            <li className="menu">
            <Link onClick={logout} to='/home'><LogoutIcon className="icon-nav"></LogoutIcon><p>Logout</p></Link>
            </li>
         
          </ul>
        </nav>
      );
}
