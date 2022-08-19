import React, {
    useContext,
    useEffect,
    Fragment,
    useReducer,
    useState,
  } from "react";
  import {useNavigate} from "react-router-dom";
  import { Container } from "@mui/material";
  import { styled } from "@mui/material/styles";
  import Box from "@mui/material/Box";
  import Button from "@mui/material/Button";
  import TextField from "@mui/material/TextField";
  import Paper from "@mui/material/Paper";
  import Grid from "@mui/material/Grid";
  import { API_SOCKET } from '../util/devConst';
  import MobileGamepad from "../components/mobileGamepad/MobileGamepad";

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



  const MobileControl = () => {

  
    return (
      <Fragment>
         <Container maxWidth="md">
        <Paper elevation={1} sx={{ minWidth: "50%", minHeight: "10%", padding:"5px", margin:"20px" }}>
        <p>Mobile Control</p>
        </Paper>
        </Container>
        <MobileGamepad></MobileGamepad>
      </Fragment>
    );
  };
  
  export default MobileControl;