import React, { Fragment, useEffect, useContext, useState } from "react";
import { Container, Box, Paper } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ConnectController from "../components/layouts/steppers/ConnectController";
import { Center } from "@react-three/drei";

const HowTo = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1, mt: 5, minWidth: "100%" }}>
          <Paper elevation={3} sx={{ minWidth: "100%" }}>
            <Accordion
              sx={{ width: "100%" }}
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                  How to connect your controller
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ConnectController></ConnectController>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ width: "100%" }}
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                 How to do stuff
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ConnectController></ConnectController>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Box>
      </Container>
    </Fragment>
  );
};

export default HowTo;
