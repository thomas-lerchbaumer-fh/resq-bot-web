import React, { Fragment, useEffect, useContext, useState } from "react";
import RobotContext from "../../context/robotStatus/robotContext";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Speed from "./sensors/Speed";
import Temperature from "./sensors/Temperature";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3002";
const socket = io.connect(ENDPOINT);


const RobotInfo = () =>{
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
      setBattery
    } = robotContext;

    
   
    useEffect(() => {
      getConnectionStatus();

      socket.on("sensorData", (data) => {
        setSpeed(data.speed)
        setBattery(data.battery)
        setTemp(data.tmp)
      });
       /* const interval = setInterval(() => {
          getBatteryLevel();
          getTemp();
          getSpeed();
        }, 1000);
    
        return () => clearInterval(interval);*/
     
    }, [socket]);

    return(
        <>
         <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Grid container  spacing={2}>
            <Speed speed={speed}></Speed>
            <Temperature temperature={temperature}></Temperature>
          </Grid>
        </Box>
        </>
    )
}

export default RobotInfo