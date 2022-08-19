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
  import { Joystick } from 'react-joystick-component';

  
  function handleMove() {

  }

  function handleStop() {

  }

  const MobileGamepad = () => {
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    }));
  
    return (
        <Joystick size={100} sticky={false} baseColor="white" stickColor="grey" move={handleMove} stop={handleStop}></Joystick>
    );
  };
  
  export default MobileGamepad;
  