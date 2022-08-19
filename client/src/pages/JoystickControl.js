import React, {
    useContext,
    useEffect,
    Fragment,
    useReducer,
    useState,
  } from "react";
  import { Container } from "@mui/material";
  import Gamepad from "../components/gamepad/Gamepad";
  import { styled } from "@mui/material/styles";
  import Box from "@mui/material/Box";
  import Paper from "@mui/material/Paper";
  import Grid from "@mui/material/Grid";
  import Gyro from "../components/gyro/Gyro";
  import Gyro3d from "../components/gyro3d/Gyro3d";
  import RobotInfo from "../components/robotInfos/RobotInfo";
  
  
  const JoystickControl = () => {
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    }));
  
    return (
      <Fragment>
        <Container maxWidth="lg">
          <Box sx={{ flexGrow: 1, mt: 5 }}>
            <Grid container  spacing={2}>
              <Gamepad></Gamepad>
            </Grid>
          </Box>
          <Gyro></Gyro>
        </Container>
      </Fragment>
    );
  };
  
  export default JoystickControl;
  