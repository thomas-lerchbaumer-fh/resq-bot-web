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
const buttonLabels = [
  "A",
  "B",
  "X",
  "Y",
  "L1",
  "R1",
  "L2",
  "R2",
  "Back",
  "Start",
  "L3",
  "R3",
  "UP",
  "DOWN",
  "LEFT",
  "RIGHT",
  "XBOX",
];

const axesLabels = ["LX", "LY", "RX", "RY"];

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

const Gamepad = () => {
  const [gamepads, setGamepads] = useState([]);
  useGamepads((_gamepads) => {
    setGamepads(Object.values(_gamepads));
  });
  const SENSITIVITY = 0.2;

  const gamepadIndx = 2;

  //x button

  if (gamepads.length > 0) {
    //left analog stick
    if (
      gamepads[0].axes[0] > SENSITIVITY || //left right
      gamepads[0].axes[1] > SENSITIVITY || //up down
      gamepads[0].axes[0] < SENSITIVITY * -1 || //left right
      gamepads[0].axes[1] < SENSITIVITY * -1 //up down
    ) {
      console.log(gamepads[0].axes);
    }

    //right analog stick
    if (
      gamepads[0].axes[2] > SENSITIVITY || //left right
      gamepads[0].axes[3] > SENSITIVITY || //up down
      gamepads[0].axes[2] < SENSITIVITY * -1 || //left right
      gamepads[0].axes[3] < SENSITIVITY * -1 //up down
    ) {
      console.log(gamepads[0].axes);
    }

    //right shoulder bottom (r2)
    if (gamepads[0].buttons[7].pressed === true)
      console.log(gamepads[0].buttons[7]);

    //left shoulder bottom (l2)
    if (gamepads[0].buttons[6].pressed === true)
      console.log(gamepads[0].buttons[6]);
      
  }

  if (gamepads.length > 0) {
    const test = gamepads[0].buttons[4].pressed;
  }
  if (gamepads.length === 0)
    return (
      <Fragment>
        <Grid
          item
          xs={6}
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
            <Tooltip title="Get Help">
              <IconButton edge="end">
                <InfoIcon fontSize="small" tooltip="Get help"></InfoIcon>
              </IconButton>
            </Tooltip>
          </Item>
        </Grid>
      </Fragment>
    );
  return (
    <Fragment>
      {
        <Grid item xs={6} lg={6} justifyContent="center" alignContent="center">
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
    </Fragment>
  );
};

export default Gamepad;
