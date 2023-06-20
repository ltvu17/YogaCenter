import "../css/navigation.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Button } from "@mui/material";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const settings = ["Profile", "Account", "Dashboard", "Logout"];

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
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const isCustomer = true;

  const MenuNav = () => {
    try {
      if (
        role
          .toUpperCase()
          .trim()
          .localeCompare('"CUSTOMER"', undefined, { sensitivity: "base" }) === 0
      ) {
        return (
          <nav className="navUsers">
            <Link to="/" className="logoUsers">
              <h1>Yoga FPTU Center</h1>
              <p>EVERY DAY</p>
            </Link>
            <ul className="nav">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="#">Blog</Link>
              </li>
              <li>
                <Link to={isCustomer ? "/home-customer" : "/home-instructor"}>
                  My Account
                </Link>
              </li>
              <li>
                {" "}
                <Box sx={{ flexGrow: 0 }}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                  <Menu
                    className="menu-popover"
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        {setting === "Profile" ? (
                          <Link to="/profile">Profile</Link>
                        ) : setting === "Logout" ? (
                          <Link onClick={logout} to="/home">
                            Logout
                          </Link>
                        ) : (
                          <Typography textAlign="center">{setting}</Typography>
                        )}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </li>
            </ul>
          </nav>
        );
      } else if (
        role
          .toUpperCase()
          .trim()
          .localeCompare('"STAFF"', undefined, { sensitivity: "base" }) === 0
      ) {
        return (
          <nav className="Navigation">
            <Link to="/" className="logo">
              <h1>Yoga FPTU Center</h1>
              <p>EVERY DAY</p>
            </Link>
            <ul className="nav">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li className="menu">
                <Link to="/staffmanage">Manage Class</Link>
                {/* <ul className='drop-menu'>
            <li><Link to='#'>hihi</Link></li>
            <li><Link>haha</Link></li>
            <li><Link>haha</Link></li>
            <li><Link>haha</Link></li>
          </ul>   */}
              </li>
              <li className="menu">
                <Link to="#">Manage Blog</Link>
                <ul className="drop-menu">
                  <li>
                    <Link to="">Man</Link>
                  </li>
                  <li>
                    <Link>haha</Link>
                  </li>
                  <li>
                    <Link>haha</Link>
                  </li>
                  <li>
                    <Link>haha</Link>
                  </li>
                </ul>
              </li>
              <li className="menu">
                <Link to="/schedulemanage">Manage Schedule</Link>
              </li>
              <li className="menu">
                <Link to="#">Manage User</Link>
                <ul className="drop-menu">
                  <li>
                    <Link to="#">hihi</Link>
                  </li>
                  <li>
                    <Link>haha</Link>
                  </li>
                  <li>
                    <Link>haha</Link>
                  </li>
                  <li>
                    <Link>haha</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link onClick={logout} to="/home">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        );
      }
    } catch (err) {
      return (
        <nav className="Navigation">
          <Link to="/" className="logo">
            <h1>Yoga FPTU Center</h1>
            <p>EVERY DAY</p>
          </Link>
          <ul className="nav">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="#">Blog</Link>
            </li>
            <li>
              <Link to="/schedule">Schedule</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      );
    }
  };
  return <MenuNav />;
}
