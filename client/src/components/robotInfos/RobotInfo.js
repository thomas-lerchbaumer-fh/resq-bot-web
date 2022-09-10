import React, { Fragment, useEffect, useContext, useState } from "react";
import RobotContext from "../../context/robotStatus/robotContext";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Speed from "./sensors/Speed";
import Temperature from "./sensors/Temperature";
import io from "socket.io-client";
import Grow from "@mui/material/Grow";
import Battery from "./sensors/Battery";
import { API_SOCKET } from '../../util/devConst';

const ENDPOINT = "https://" + API_SOCKET + ":3002";
const socket = io.connect(ENDPOINT);

const RobotInfo = () => {
  const robotContext = useContext(RobotContext);

  const {
    getConnectionStatus,
    getBatteryLevel,
    getTemp,
    getSpeed,
    connection,
    batteryLevel,
    temperature,
    speed,
    loading,
    setSpeed,
    setTemp,
    setBattery,
  } = robotContext;

  useEffect(() => {
    getConnectionStatus();

    socket.on("sensorData", (data) => {
      setSpeed(data.speed);
      setBattery(data.battery);
      setTemp(data.tmp);
    });
    /* const interval = setInterval(() => {
          getBatteryLevel();
          getTemp();
          getSpeed();
        }, 1000);
    
        return () => clearInterval(interval);*/
  }, []);

  return (
    <>
      {connection === true ? (
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Grow
            in={connection}
            style={{ transformOrigin: "0 0 0" }}
            {...(connection ? { timeout: 1000 } : {})}
          >
            <Grid container spacing={2}>
              <Speed speed={speed}></Speed>
              <Temperature temperature={temperature}></Temperature>
              <Battery batteryLevel={batteryLevel }></Battery>
            </Grid>
          </Grow>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default RobotInfo;
