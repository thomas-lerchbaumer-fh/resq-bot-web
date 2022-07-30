import React, { Fragment, useEffect, useContext, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import Grid from "@mui/material/Grid";
import Thermometer from "react-thermometer-component";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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

const styles = {
  dial: {
    display: "inline-block",
    width: `300px`,
    height: `auto`,
    color: "#000",
    border: "0.5px solid #fff",
    padding: "2px",
  },
  title: {
    fontSize: "1em",
    color: "#000",
    marginTop: "15px",
  },
};
const Temperature = (props) => {
  const { temperature } = props;

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
          <Thermometer
            theme="light"
            value={temperature}
            max="50"
            steps="3"
            size="normal"
            height="200"
          />

          <Typography>Temperature in °C</Typography>
        </Item>
      </Grid>
    </>
  );
};

export default Temperature;
