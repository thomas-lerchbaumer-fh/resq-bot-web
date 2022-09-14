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
import RaspiPins from "../../../assets/tutorial/raspi_pins.jpg";
import { useGamepads } from "react-gamepads";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Zoom from 'react-medium-image-zoom'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const steps = [
    {
        label: "Move The Robot",
        description: `To Move the Robot use: <br>
                      L2 to activate the left sprockets to move forward and R2 to activate the right ones. <br>
                      Use square to move the left sprockets backwards and triangle to move the right ones. 
        `,
    },
    {
        label: "Move the Camera",
        description: `The Camera can be moved by using the left joystick
        `,
    },
    {
        label: "Configure your own functionalities",
        description: `We have left the right joystick as well as the circle and X Button without any functionality. <br>
                      you can use them adaptive to whatever functionality you want to add.
      `,
    }
];

const UseController = () => {
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
                    You can play arround with the project now
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UseController;
