import React, { Fragment, useEffect, useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Thermometer from "react-thermometer-component";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BatteryGauge from 'react-battery-gauge'


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
  flexDirection: "column",
  color: theme.palette.text.secondary,
}));

const Battery = (props) => {
  const { batteryLevel } = props;

  const customBat = {
    batteryBody:{
        strokeColor:"#333333"
    },
    batteryCap:{
        strokeColor:"#333333"
    }
  }

  return (
    <>
      <Grid
        item
        xs={6}
        md={6}
        lg={2}
        sx={{ height: "100%" }}
        justifyContent="center"
        alignContent="center"
        style={{
          justifyContent: "center",
        }}
      >
        <Item>
        <BatteryGauge value={batteryLevel}  orientation={"vertical"} size={200}  customization={customBat} />
          <Typography>Battery Level</Typography>
        </Item>
      </Grid>
    </>
  );
};

export default Battery;
