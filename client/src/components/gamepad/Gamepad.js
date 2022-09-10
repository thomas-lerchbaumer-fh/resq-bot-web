import React, { Fragment, useEffect, useContext, useState } from "react";
import { useGamepads } from "react-gamepads";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VisualizePad from "./VisualizedPad";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";
import { API_ROBOT } from '../../util/devConst';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  return JSON.parse(tokenString)
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  justifyItems: "center",
  alignItems: "center",
  minHeight: 300,
  alignContent: "center",
  display: "flex",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));


const sendControls = (button, data) => {

  const req = {
    "button": button,
      data
  }
  fetch(API_ROBOT + '/receiveControlInput', {  // Enter your IP address here
  method: 'POST', 
  mode: 'cors', 
  headers: new Headers({'content-type': 'application/json',
  'Accept':'application/json'}),
  body: JSON.stringify(req) // body data type must match "Content-Type" header
})
}

const Gamepad = () => {
  const [gamepads, setGamepads] = useState([]);
  const [connected, setConnected] = useState(false);
  useGamepads((_gamepads) => {
    setGamepads(Object.values(_gamepads));
  });
  const SENSITIVITY = 0.2;

  const gamepadIndx = 2;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setConnected(false);
  };

  //x button
  window.addEventListener("gamepadconnected", function (e) {

    setConnected(true);
  });

  if (gamepads.length > 0) {
    //left analog stick
    if (
      gamepads[0].axes[0] > SENSITIVITY || //left right
      gamepads[0].axes[1] > SENSITIVITY || //up down
      gamepads[0].axes[0] < SENSITIVITY * -1 || //left right
      gamepads[0].axes[1] < SENSITIVITY * -1 //up down
    ) {

      sendControls("ls", gamepads[0].axes);
    }

    //right analog stick
    if (
      gamepads[0].axes[2] > SENSITIVITY || //left right
      gamepads[0].axes[3] > SENSITIVITY || //up down
      gamepads[0].axes[2] < SENSITIVITY * -1 || //left right
      gamepads[0].axes[3] < SENSITIVITY * -1 //up down
    ) {
     
      sendControls("rs", gamepads[0].axes);
    }

    //right shoulder bottom (r2)
    if (gamepads[0].buttons[7].pressed === true){
      sendControls("r2",gamepads[0].buttons[7]);
      console.log(gamepads[0].buttons[7]);
    }
      

    //left shoulder bottom (l2)
    if (gamepads[0].buttons[6].pressed === true){
      sendControls("l2",gamepads[0].buttons[6]);
      console.log(gamepads[0].buttons[6]);
    }
     
  }

  if (gamepads.length > 0) {
    const test = gamepads[0].buttons[4].pressed;
  }
  if (gamepads.length === 0){
    return (
      <Fragment>
        <Grid
          item
          xs={12}
          md={12}
          lg={6}
          sx={{ height: "100%" }}
          justifyContent="center"
          alignContent="center"
          style={{
            justifyContent: "center",
          }}
        >
          <Item>
            <Typography variant="h6">
              Currently no controller is connected
            </Typography>
            <Link to="/how-to">
            <Tooltip title="Get Help">
              <IconButton edge="end">
                <InfoIcon fontSize="small" tooltip="Get help"></InfoIcon>
              </IconButton>
            </Tooltip>
            </Link>
          </Item>
        </Grid>
      </Fragment>
    );}
    else if(gamepads.length > 0 && getToken() !== "yes"){
      return(
        <Fragment>
             <Grid
          item
          xs={12}
          md={12}
          lg={6}
          sx={{ height: "100%" }}
          justifyContent="center"
          alignContent="center"
          style={{
            justifyContent: "center",
          }}
        >
          <Item>
            <Typography variant="h6">
             Login to control the robot
            </Typography>
            <Link to="/loginpage">
            <Tooltip title="Login">
              <IconButton edge="end">
                <InfoIcon fontSize="small" tooltip="Click to login"></InfoIcon>
              </IconButton>
            </Tooltip>
            </Link>
          </Item>

        </Grid>
        </Fragment>
      )
    }else if (gamepads.length > 0 && getToken() === "yes"){
      return (
        <Fragment>
          {
            <Grid item xs={12} lg={6} justifyContent="center" alignContent="center">
              <Item
                sx={{
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <Typography variant="h6" color="success.main">
                  Controller connected{" "}
                  <TaskAltIcon style={{ verticalAlign: "middle" }} />{" "}
                </Typography>
                <VisualizePad></VisualizePad>
              </Item>
            </Grid>
          }
          <Snackbar
            open={connected}
            autoHideDuration={4000}
            onClose={handleClose}
            severity="success"
          >
            <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
              Controller is connected now
            </Alert>
          </Snackbar>
        </Fragment>
      );
    }

};

export default Gamepad;
