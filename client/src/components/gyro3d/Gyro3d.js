import React, { Fragment, useEffect, useContext, useState,useRef } from "react";
import io from "socket.io-client";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'
import Robot from "./models/Robot";




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

const Gyro3d = () => {


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
            <Robot></Robot>
        </Item>
      </Grid>
    </Fragment>
  );
};

export default Gyro3d;
