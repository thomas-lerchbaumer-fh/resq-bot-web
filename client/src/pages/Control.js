import React, {
    useContext,
    useEffect,
    Fragment,
    useReducer,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { API_SOCKET } from '../util/devConst';
import MobileGamepad from "../components/mobileGamepad/MobileGamepad";
import MediaQuery from 'react-responsive';
import Gamepad from "../components/gamepad/Gamepad";
import Gyro from "../components/gyro/Gyro";
import { ToggleSlider } from "react-toggle-slider";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Control = () => {
    const [active, setActive] = useState(false);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    return (
        <div>
            <MediaQuery maxWidth={1000}>
                <Fragment>
                    <Container maxWidth="md">
                        <Paper elevation={1} sx={{ minWidth: "50%", minHeight: "10%", padding: "5px", margin: "20px" }}>
                            <p>Mobile Control</p>
                        </Paper>
                    </Container>
                    <MobileGamepad></MobileGamepad>
                </Fragment>
            </MediaQuery>
            <MediaQuery minWidth={1224}>
                <Fragment>
                    <Container maxWidth="lg">
                        <Paper elevation={1} sx={{ minWidth: "100%", minHeight: "10%", padding: "5px", margin: "20px" }}>
                            <Grid
                             direction="row"
                             alignItems="center"
                             justifyContent="center"
                             container
                             spacing={1}>
                                <Grid item xs="auto">
                                <p>Toggle Between Controller and mobileGamepad</p>
                                </Grid>
                                <Grid item xs="auto">
                                <ToggleSlider onToggle={state => setActive(state)} />
                                </Grid>
                            </Grid>
                        </Paper>

                    
                    {active ?
                        <div>
                            {/*<Container maxWidth="md">
                                <Paper elevation={1} sx={{ minWidth: "50%", minHeight: "10%", padding: "5px", margin: "20px" }}>
                                    <p>Mobile Control</p>
                                </Paper>
                    </Container>*/}
                            <MobileGamepad></MobileGamepad>
                        </div>
                        :
                        <div>
                            <Box sx={{ flexGrow: 1, mt: 5 }}>
                                <Grid container spacing={2}>
                                    <Gamepad></Gamepad>
                                </Grid>
                            </Box>
                            <Gyro></Gyro>

                        </div>

                    }
                    </Container>
                </Fragment>
            </MediaQuery>
        </div>
    );
};

export default Control;