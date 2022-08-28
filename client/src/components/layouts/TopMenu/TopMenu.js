import React, { Fragment, useEffect, useContext, useState } from "react";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import RobotInfoPopover from "../../robotInfos/RobotInfoPopover";
import { Routes, Route, Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import SmartToyIcon from '@mui/icons-material/SmartToy';

const pages = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "How To",
    link: "/how-to",
  },
  {
    name: "The Team",
    link: "/the-team",
  },
];
/*
const loggedinpages = [
  {
    name: "JoystickControl",
    link: "/joystickcontrol",
  },
  {
    name: "MobileControl",
    link: "/mobilecontrol",
  },
  {
    name: "Data History",
    link: "/history",
  },
];
*/
const settings = ["Profile", "Account", "Dashboard", "Logout"];


function getToken() {
  const tokenString = sessionStorage.getItem('token');
  return JSON.parse(tokenString)
}


function logout() {
  sessionStorage.removeItem('token');
  fetch('http://10.0.0.94:3002/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  window.location.reload(false)
}

const TopMenu = () => {
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

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const isLoggedIn = true;
  return (

    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RESQ Bot
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(function (page) {
                return (
                  <Link key={page.link} to={page.link}>
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </Link>
                );
              })}
              <Link key="Control" to="/control">
                <MenuItem key="Control" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Control</Typography>
                </MenuItem>
              </Link>
              {/*            {getToken() === "yes" ? loggedinpages.map(function (page) {
                return (
                  <Link key={page.link} to={page.link}>
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </Link>
                );
              }) :""} */}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(function (page) {
              return (
                <Link key={page.link} to={page.link}>
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      ":hover": {
                        bgcolor: "#333", // theme.palette.primary.main
                        color: "white",
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              );
            })}

            {getToken() === "yes" ?
              <Tooltip title="Available" placement="bottom">
                <Link key="Control" to="/control">
                  <Button
                    key="Control"
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      ":hover": {
                        bgcolor: "#333", // theme.palette.primary.main
                        color: "white",
                      },
                    }}
                  >
                    Control
                  </Button>
                </Link>
              </Tooltip>
            :
            <Tooltip title="Locked Please Login" placement="bottom">
              <Button
                key="Control"
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  ":hover": {
                    bgcolor: "#333", // theme.palette.primary.main
                    color: "white",
                  },
                }}
              >
                Control
              </Button>
          </Tooltip>
            }



            {/*      {getToken() === "yes" ? loggedinpages.map(function (page) {
              return (
                <Link key={page.link} to={page.link}>
                  <Button
                    key={page.name}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      ":hover": {
                        bgcolor: "#333", // theme.palette.primary.main
                        color: "white",
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              );
            }) :""}
             */}
          </Box>

          {getToken() === "yes" ? <Button
            key="Logout"
            onClick={logout}
            sx={{
              my: 2,
              color: "white",
              display: "block",
              ":hover": {
                bgcolor: "#333", // theme.palette.primary.main
                color: "white",
              },
            }}
          >
            Logout
          </Button> : <Link key="/loginpage" to="/loginpage">
            <Button
              key="Login"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                ":hover": {
                  bgcolor: "#333", // theme.palette.primary.main
                  color: "white",
                },
              }}
            >
              Login
            </Button>
          </Link>}




          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Get device information">
              <IconButton
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                sx={{ p: 0, color: "orange" }}
              >
                <Avatar style={{ background: "white" }} color="#181818">
                  <SmartToyIcon color="secondary" />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <RobotInfoPopover></RobotInfoPopover>
            </Popover>
          </Box>

          {/*       <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopMenu;
