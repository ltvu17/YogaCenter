import "../css/navigation.css";
import axios from "axios";
import { useCookies } from "react-cookie";

import * as React from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavUsers from "../pages/common/components/NavUsers";
import NavStaff from "../pages/common/components/NavStaff";
import NavInstructor from "../pages/common/components/NavInstructor"

import NavManager from "../pages/common/components/NavManager";


import NavAdmin from "../pages/common/components/NavAdmin"

export default function Navigation({ role }) {
  const [cookie, setCookie] = useCookies();
  var navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const logout = () => {
    axios
      .post("https://localhost:7096/api/User/Logout", "", {})
      .then((r) => console.log(r))
      .catch((er) => console.log(er));
    setCookie("flag", 1, { path: "/" });
  };


  const MenuNav = () => {
    try {
      if (
        role
          .toUpperCase()
          .trim()
          .localeCompare('"CUSTOMER"', undefined, { sensitivity: "base" }) === 0
      ) {
        return (
          <NavUsers></NavUsers>
        );
      } else  if (
        role
          .toUpperCase()
          .trim()
          .localeCompare('"TEACHER"', undefined, { sensitivity: "base" }) === 0
      ) { 
        return(
          <NavInstructor></NavInstructor>
        )
      }else if (
        role
          .toUpperCase()
          .trim()
          .localeCompare('"STAFF"', undefined, { sensitivity: "base" }) === 0
      ) {
        return (
          <NavStaff/>
        );
      }
    else
    if(role.toUpperCase().trim().localeCompare('"MANAGER"', undefined, { sensitivity: 'base' }) === 0){
      return(      
        <NavManager/>
    );
    }
    else
    if(role.toUpperCase().trim().localeCompare('"ADMIN"', undefined, { sensitivity: 'base' }) === 0){
      return(      
        <NavAdmin/>

    );
    }
  }catch(err){
    return(
      <nav className='Navigation'>
      <Link to='/' className='logo'>
        <h1>Yoga FPTU Center</h1>
        <p>EVERY DAY</p>
      </Link>
    <ul className='nav'>
      <li><Link to='/home'>Home</Link></li>
      <li><Link to='/blog'>Blog</Link></li>
      <li><Link to='/schedule'>Schedule</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </ul>
    </nav>
    );

  };
}

  return(
  <MenuNav />
  );
}
