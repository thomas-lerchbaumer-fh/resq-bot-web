import React, { Fragment, useEffect, useContext, useState } from "react";
import robotContext from "../../../context/robotStatus/robotContext";
import ReactSpeedometer from "react-d3-speedometer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
  flexDirection:"column",
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
  },
};

const Speed = (props) => {
    const {speed} = props


  return (
    <>
      <Grid
        item
        xs={6}
        md={6}
        lg={4}
        sx={{ height: "100%" }}
        justifyContent="center"
        alignContent="center"
        flexDirection="row"
        style={{
          justifyContent: "center",
          flexDirection : "column"
        }}
      >
        <Item>
          <div style={styles.dial}>
            <ReactSpeedometer
              maxValue={10}
              minValue={0}
              height={190}
              width={290}
              value={speed}
              needleTransition="easeQuadIn"
              needleTransitionDuration={500}
              needleColor="red"
              startColor="orange"
              segments={20}
              endColor="red"
            />     
          </div>
          <Typography>Speed in km/h</Typography>
        </Item>
      </Grid>
    </>
  );
};

export default Speed;
