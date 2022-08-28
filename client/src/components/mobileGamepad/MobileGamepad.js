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
  import Button from "@mui/material/Button";

  const sendControls = (data) => {

    const req = {
      data
        
    }
    fetch('http://10.0.0.94:3001/receiveControlInput', {  // Enter your IP address here
    method: 'POST', 
    mode: 'cors', 
    headers: new Headers({'content-type': 'application/json',
    'Accept':'application/json'}),
    body: JSON.stringify(req) // body data type must match "Content-Type" header
  })
  
  
  }
  
  function handleMove(button,data) {
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
      <Fragment>
       <Container maxWidth="lg">
           <Grid 
            direction="row"
            alignItems="stretch"
            justifyContent="center"
            container spacing={3}>
            <Grid item xs="auto">
            <Joystick size={100} sticky={false} baseColor="white" stickColor="grey" move={sendControls} stop={sendControls}></Joystick>
            </Grid>
            <Grid item xs="auto">
              <Button variant="contained" style={{ fontSize: '40px'}}>&#10005;</Button>
            </Grid>
            <Grid item xs="auto">
            <Button variant="contained" style={{ fontSize: '40px'}}>&#8408;</Button>
            </Grid>
            <Grid item xs="auto">
            <Button variant="contained" style={{ fontSize: '40px'}}>&#9633;</Button>
            </Grid>          
            <Grid item xs="auto">
            <Joystick size={100} sticky={false} baseColor="white" stickColor="grey" move={sendControls} stop={sendControls}></Joystick>
            </Grid>
          </Grid> 
        </Container>
      </Fragment>
        );
  };
  
  export default MobileGamepad;
  