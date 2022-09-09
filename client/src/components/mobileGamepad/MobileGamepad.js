import React, {
  useContext,
  useEffect,
  Fragment,
  useReducer,
  useState,
} from "react";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Joystick } from "react-joystick-component";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  return JSON.parse(tokenString);
}

const sendControls = (data) => {
  const req = {
    data,
  };
  fetch("http://localhost:3001/receiveControlInput", {
    // Enter your IP address here
    method: "POST",
    mode: "cors",
    headers: new Headers({
      "content-type": "application/json",
      Accept: "application/json",
    }),
    body: JSON.stringify(req), // body data type must match "Content-Type" header
  });
};

function handleMove(button, data) {}

function handleStop() {}

const MobileGamepad = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  if (getToken() === "yes") {
    return (
      <Grid item xs={12} lg={6} justifyContent="center" alignContent="center">
        <Item
          sx={{
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            variant="h6"
            color="success.main"
            style={{ marginBottom: "10px" }}
          >
            Mobile controls enabled{" "}
            <TaskAltIcon style={{ verticalAlign: "middle" }} />{" "}
          </Typography>
          <Container maxWidth="lg">
            <Grid
              direction="row"
              alignItems="stretch"
              justifyContent="center"
              container
              spacing={1}
            >
              <Grid item xs="auto">
                <Joystick
                  size={100}
                  sticky={false}
                  baseColor="white"
                  stickColor="grey"
                  move={sendControls}
                  stop={sendControls}
                ></Joystick>
              </Grid>
              <Grid item xs="auto">
                <Button variant="contained" style={{ fontSize: "40px" }}>
                  &#10005;
                </Button>
              </Grid>
              <Grid item xs="auto">
                <Button variant="contained" style={{ fontSize: "40px" }}>
                  &#8408;
                </Button>
              </Grid>
              <Grid item xs="auto">
                <Button variant="contained" style={{ fontSize: "40px" }}>
                  &#9633;
                </Button>
              </Grid>
              <Grid item xs="auto">
                <Joystick
                  size={100}
                  sticky={false}
                  baseColor="white"
                  stickColor="grey"
                  move={sendControls}
                  stop={sendControls}
                ></Joystick>
              </Grid>
            </Grid>
          </Container>
        </Item>
      </Grid>
    );
  } else if (getToken !== "yes") {
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
            <Typography variant="h6">Login to control the robot
            <Link to="/loginpage">
              <Tooltip title="Login">
                <IconButton edge="end">
                  <InfoIcon
                    fontSize="small"
                    tooltip="Click to login"
                  ></InfoIcon>
                </IconButton>
              </Tooltip>
            </Link>
            </Typography>
          </Item>
        </Grid>
      </Fragment>
    );
  }
};

export default MobileGamepad;
