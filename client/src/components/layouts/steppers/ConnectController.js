import React, { Fragment, useEffect, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
import ConnectedImg from "../../../assets/tutorial/controller_connected.png";
import { useGamepads } from "react-gamepads";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Zoom from 'react-medium-image-zoom'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const steps = [
  {
    label: "Install Ds4",
    description: `Make sure you've got <a href="https://ds4-windows.com/" target="_blank"> DS4</a> installed. If thats not the case some controller might cause problems when it comes to their mapping. For the best experience we reccomend you to install <a href="https://ds4-windows.com/" target="_blank"> DS4</a>. 
      To download DS4 follow this <a href="https://ds4-windows.com/" target="_blank">link</a><br>
      Once you installed DS4 launch the programm`,
  },
  {
    label: "Connect your Controller via USB or Bluetooth",
    description: `<h3>Bluetooth PS4 controller:</h3>
      If you want to connect your PS4 controller via Bluetooth you first need to reset the Controller Settings. Therefore hold the Playstatio-Button and the Share-Button until a yellow light starts to flash. <br>
      Now open the bluetooth settings on your windows machine. The controller should show up under devices named something like "Wireless Controller". <br>
      <h3>USB PS4 controller</h3>
      Just connect the controller via USB kabel to your windows machine and vice versa. 
      `,
  },
  {
    label: "Check for DS4 for controller connection",
    description: `If you open DS4 now you should see something similar like in the image below: <br>  `,
  },
  {
    label: "Check if controller is connected to the webpage",
    description: `To Check if your controller is connected to the webpage simply press any button on your controller. You should see an message saying "Controller is connected now".`,
  },
];

const ConnectController = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const [gamepads, setGamepads] = useState([]);
  const [connected, setConnected] = useState(false);
  useGamepads((_gamepads) => {
    setGamepads(Object.values(_gamepads));
  });

  window.addEventListener("gamepadconnected", function (e) {
    console.log("exe");
    setConnected(true);
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setConnected(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "80%" }}>
      <Stepper activeStep={activeStep} orientation="vertical" width={"100%"}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 3 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography sx={{ textAlign: "left", mb: "1" }}>
                {" "}
                {parse(step.description)}
              </Typography>
              {index === steps.length - 2 ? <img width="100%" src={ConnectedImg}></img> : ""}

              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
      <Snackbar
        open={connected}
        autoHideDuration={4000}
        onClose={handleClose}
        severity="success"
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Controller is connected now
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ConnectController;
