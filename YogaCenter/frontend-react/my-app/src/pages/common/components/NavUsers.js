import * as React from 'react';

import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import Avatar from '@mui/material/Avatar';

import MenuItem from '@mui/material/MenuItem';

import '../css/navUsers.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import axios from 'axios'
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavUsers(){

  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const isCustomer = true;
  const[cookie,setCookie]=useCookies();
  var navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const logout = () =>{
     axios.post("https://localhost:7096/api/User/Logout","",{
     })
     .then(r => console.log(r)).catch(er => console.log(er));
     setCookie('flag',1,{path : '/'});
  }
  return (
    <nav className='navUsers'>
    <Link to='/' className='logoUsers'>
      <h1>Yoga FPTU Center</h1>
      <p>EVERY DAY</p>
    </Link>
     <ul className='nav'>
    <li><Link to='/home'>Home</Link></li>
    <li><Link to='#'>Blog</Link></li>
    <li><Link to={isCustomer ? '/home-customer' : '/home-instructor'}>My Account</Link></li>
    <li> <Box sx={{ flexGrow: 0 }}>
            
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>        
              <Menu className="menu-popover" sx={{ mt: '45px' }} id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                    keepMounted
                    transformOrigin={{vertical: 'top',horizontal: 'right',}}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu} > {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      {setting === 'Profile' ? (<Link to="/profile">Profile</Link>) 
                       : setting === 'Logout'  ? (<Link onClick={logout} to="/home">Logout</Link>) 
                      : (<Typography textAlign="center">{setting}</Typography>)}
                    </MenuItem>
                    ))}
            </Menu>
          </Box></li>
  </ul>
  </nav>

  );
}
export default NavUsers;