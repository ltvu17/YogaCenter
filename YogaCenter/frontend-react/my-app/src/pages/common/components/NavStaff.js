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

export default function NavStaff(){
    const [cookie, setCookie] = useCookies();
    const navigate = useNavigate();
   
    axios.defaults.withCredentials = true;


    return (
        <nav className='NavStaff'>
          <ul className="nav-sub-staff">
            <li>
                <Link to="homestaff"><HomeIcon className="icon-nav"></HomeIcon></Link>
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
              <Link to="/studentmanage"><GroupIcon className="icon-nav"></GroupIcon><p>Manage User</p></Link>
            </li>
         
          </ul>
        </nav>
      );
}
