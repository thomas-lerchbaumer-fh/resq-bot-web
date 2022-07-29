//import logo from './logo.svg';
import * as React from "react";
import "./App.css";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


//import mui components here
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import Container from "@mui/material/Container";

//import components here
import Gamepad from "./components/gamepad/Gamepad";
import Gyro from "./components/gyro/Gyro";
import TopMenu from "./components/layouts/TopMenu/TopMenu";

//import pages here
import Home from "./pages/Home";
import HowTo from "./pages/HowTo"


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
        <BrowserRouter>
        <TopMenu></TopMenu>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/how-to" element={<HowTo />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
