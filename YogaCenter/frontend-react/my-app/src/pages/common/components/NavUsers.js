// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import '../css/navUsers.css'
// import { Link } from "react-router-dom";

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// function NavUsers(){
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };
//   const isCustomer = true;
//   return (
//     <nav className='navUsers'>

//     <Link to='/' className='logoUsers'>
//       <h1>Yoga FPTU Center</h1>
//       <p>EVERY DAY</p>
//     </Link>
//      <ul className='nav'>
//     <li><Link to='/home'>Home</Link></li>
//     <li><Link to='#'>Blog</Link></li>
//     <li><Link to={isCustomer ? '/home-customer' : '/home-instructor'}>My Account</Link></li>
//     <li> <Box sx={{ flexGrow: 0 }}>
            
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>        
//               <Menu className="menu-popover" sx={{ mt: '45px' }} id="menu-appbar"
//                     anchorEl={anchorElUser}
//                     anchorOrigin={{vertical: 'top', horizontal: 'right',}}
//                     keepMounted
//                     transformOrigin={{vertical: 'top',horizontal: 'right',}}
//                     open={Boolean(anchorElUser)}
//                     onClose={handleCloseUserMenu} > {settings.map((setting) => (
//                     <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                       {setting === 'Profile' ? (<Link to="/profile">Profile</Link>) 
                      
//                       : (<Typography textAlign="center">{setting}</Typography>)}
//                     </MenuItem>
//                     ))}
//             </Menu>
//           </Box></li>
//   </ul>
//   </nav>

//   );
// }
// export default NavUsers;