import React, { useContext, useEffect, Fragment, useReducer, useState } from 'react'
import {Container} from "@mui/material";
import Gamepad from "../components/gamepad/Gamepad";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const Home = () =>{

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return(
        <Fragment>
            <Container maxWidth={"xl"}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item>
                            <Gamepad></Gamepad>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <Gamepad></Gamepad>
                        </Item>
                    </Grid>
                </Grid>


            </Container>
        </Fragment>

    )


}


export default Home