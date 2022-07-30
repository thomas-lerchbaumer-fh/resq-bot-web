import React, { Fragment, useEffect, useContext, useState } from "react";
import RobotContext from "../../context/robotStatus/robotContext";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Paper } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AdbIcon from "@mui/icons-material/Adb";
import Battery0BarIcon from "@mui/icons-material/Battery0Bar";
import Battery80Icon from "@mui/icons-material/Battery80";
import Battery20Icon from "@mui/icons-material/Battery20";
import Battery60Icon from "@mui/icons-material/Battery60";
import Battery30Icon from "@mui/icons-material/Battery30";
import Battery90Icon from "@mui/icons-material/Battery90";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SpeedIcon from "@mui/icons-material/Speed";

const RobotInfoPopover = () => {
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
  } = robotContext;

  useEffect(() => {
    /*getConnectionStatus();
    if (connection) {
      const interval = setInterval(() => {
        getBatteryLevel();
        getTemp();
        getSpeed();
      }, 5000);
      return () => clearInterval(interval);
    }*/
  }, []);

  let batIcon = <Battery0BarIcon />;
  if (batteryLevel <= 100 && batteryLevel >= 90) batIcon = <Battery90Icon />;
  else if (batteryLevel > 80 && batteryLevel < 90) batIcon = <Battery80Icon />;
  else if (batteryLevel < 80 && batteryLevel > 50) batIcon = <Battery60Icon />;
  else if (batteryLevel <= 50 && batteryLevel > 20) batIcon = <Battery30Icon />;
  else if (batteryLevel <= 20 && batteryLevel > 1) batIcon = <Battery20Icon />;
  else if (batteryLevel === 0) batIcon = <Battery0BarIcon />;

  return (
    <>
      <Paper sx={{ width: 250 }}>
        <List>
          {connection === true ? (
            <ListItem>
              <ListItemAvatar>
                <AdbIcon />
              </ListItemAvatar>
              <ListItemText
                primary="Robot"
                secondaryTypographyProps={{ sx: { color: "green" } }}
                secondary="connected"
              />
            </ListItem>
          ) : (
            <ListItem>
              <ListItemAvatar>
                <AdbIcon color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary="Robot"
                secondaryTypographyProps={{ sx: { color: "red" } }}
                secondary="disconnected"
              />
            </ListItem>
          )}

          {connection === true ? (
            <ListItem>
              <ListItemAvatar>{batIcon}</ListItemAvatar>
              <ListItemText
                primary={batteryLevel + "%"}
                secondaryTypographyProps={{ sx: { color: "green" } }}
                secondary="Battery"
              />
            </ListItem>
          ) : (
            <ListItem>
              <ListItemAvatar>
                <Battery0BarIcon color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary="-"
                secondaryTypographyProps={{ sx: { color: "red" } }}
                secondary="disconnected"
              />
            </ListItem>
          )}

          {connection === true ? (
            <ListItem>
              <ListItemAvatar>
                <ThermostatIcon></ThermostatIcon>
              </ListItemAvatar>
              <ListItemText
                primary={temperature + "°"}
                secondaryTypographyProps={{ sx: { color: "green" } }}
                secondary="Temperature"
              />
            </ListItem>
          ) : (
            <ListItem>
              <ListItemAvatar>
                <Battery0BarIcon color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary="-"
                secondaryTypographyProps={{ sx: { color: "red" } }}
                secondary="disconnected"
              />
            </ListItem>
          )}

          {connection === true ? (
            <ListItem>
              <ListItemAvatar>
                <SpeedIcon></SpeedIcon>
              </ListItemAvatar>
              <ListItemText
                primary={speed + "km/h"}
                secondaryTypographyProps={{ sx: { color: "green" } }}
                secondary="Speed"
              />
            </ListItem>
          ) : (
            <ListItem>
              <ListItemAvatar>
                <Battery0BarIcon color="primary" />
              </ListItemAvatar>
              <ListItemText
                primary="-"
                secondaryTypographyProps={{ sx: { color: "red" } }}
                secondary="disconnected"
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </>
  );
};

export default RobotInfoPopover;
