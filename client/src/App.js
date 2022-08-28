//import logo from './logo.svg';
import * as React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


//import mui components here
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';

//import components here
import Gamepad from "./components/gamepad/Gamepad";
import Gyro from "./components/gyro/Gyro";
import TopMenu from "./components/layouts/TopMenu/TopMenu";


//import pages here
import Home from "./pages/Home";
import HowTo from "./pages/HowTo";
import LoginPage from "./pages/LoginPage";
import MobileControl from "./pages/MobileControl";
import JoystickControl from "./pages/JoystickControl";
import Control from "./pages/Control";

//import sate below
import RobotState from "./context/robotStatus/RobotState";


const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#181818",
    },
    secondary: {
      main: "#e00302",
    },
    background: {
      default: "#252525",
    },
  },
});



function App() {



  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <RobotState>
        <BrowserRouter>
        <TopMenu></TopMenu>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/how-to" element={<HowTo />}></Route>
            <Route path="/loginpage" element={<LoginPage />}></Route>
            <Route path="/mobilecontrol" element={<MobileControl />}></Route>
            <Route path="/joystickcontrol" element={<JoystickControl />}></Route>
            <Route path="/control" element={<Control />}></Route>
          </Routes>
        </BrowserRouter>
        </RobotState>
      
      </ThemeProvider>
    </div>
  );
}

export default App;
