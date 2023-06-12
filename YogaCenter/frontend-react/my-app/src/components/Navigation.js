import React from 'react'
import {Link} from 'react-router-dom'
import '../css/navigation.css'
import axios from 'axios'
import { useCookies } from 'react-cookie'


export default function Navigation({role}){
  const[cookie,setCookie]=useCookies();
  axios.defaults.withCredentials = true;
  const logout = () =>{
     axios.post("https://localhost:7096/api/User/Logout","",{
     } )
     .then(r => console.log(r)).catch(er => console.log(er));
      setCookie("flag",1,{path : '/'})
  }
  const Menu = () => {
    try{
    if(role.toUpperCase().trim().localeCompare('"CUSTOMER"', undefined, { sensitivity: 'base' }) === 0){
    return(
      <nav className='Navigation'>
      <Link to='/' className='logo'>
        <h1>Yoga FPTU Center</h1>
        <p>EVERY DAY</p>
      </Link>
    <ul className='nav'>
      <li><Link to='/home'>Home</Link></li>
      <li><Link to='#'>Blog</Link></li>
      <li><Link to='/schedule'>Schedule</Link></li>
      <li><Link to='#'>Profile</Link></li>
    </ul>
    </nav>
    );
    }
    else
    if(role.toUpperCase().trim().localeCompare('"STAFF"', undefined, { sensitivity: 'base' }) === 0){
      return(
      <nav className='Navigation'>
      <Link to='/' className='logo'>
        <h1>Yoga FPTU Center</h1>
        <p>EVERY DAY</p>
      </Link>
    <ul className='nav'>
      <li><Link to='/home'>Home</Link></li>
      <li><Link to='#'>Manage Class</Link></li>
      <li><Link to='#'>Manage Blog</Link></li>
      <li><Link to='#'>Manage User</Link></li>
      <li><Link onClick={logout} to='/home'>Logout</Link></li>
    </ul>
    </nav> 
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
      <li><Link to='#'>Blog</Link></li>
      <li><Link to='/schedule'>Schedule</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </ul>
    </nav>
    );
  };
  }
  return(  
     <Menu/>
  )
}

  