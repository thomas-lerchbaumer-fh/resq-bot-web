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
  height: 100,
  textAlign: "center",
  justifyItems: "center",
  alignItems: "center",
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

  if (gamepads.length > 0) {
    const test = gamepads[0].buttons[4].pressed;
    console.log(gamepads[0].axes[0]);
  }

  if (gamepads.length === 0)
    return (
      <Fragment>
        <Grid
          item
          xs={6}
          lg={6}
          sx={{ height: 300 }}
          justifyContent="center"
          alignContent="center"
          direction="column"
          style={{
            justifyContent: "center",
          }}
        >
          <Item>
            <Typography variant="h6">
              Currently no controller is connected{" "}
            </Typography>
            <Tooltip title="Get Help">
              <IconButton edge="end">
                <InfoIcon fontSize="small" tooltip="Get help"></InfoIcon>
              </IconButton>
            </Tooltip>
          </Item>
        </Grid>
        {/* <Grid item xs={5} lg={6}>
                <Item><Typography variant="h6">Currently you are not connected to the robot</Typography></Item>
                </Grid> */}
      </Fragment>
    );
  return (
    <Fragment>
      <Grid
        item
        xs={6}
        lg={6}
        sx={{ height: 300 }}
        justifyContent="center"
        alignContent="center"
      >
        <Item>
          <div className="gamepad">
            {gamepads.length &&
              gamepads.map((pad) => {
                return (
                  <div>
                    <div>ID: {pad.id}</div>
                    {pad.buttons.map((button, index) => {
                      return (
                        <div>
                          <div>
                            <span>
                              #{index + 1} {button.value}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {pad.axes.map((axe, index) => {
                      return (
                        <div>
                          #{index + 1}: {axe}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </Item>
      </Grid>
    </Fragment>
  );
};

export default Gamepad;
