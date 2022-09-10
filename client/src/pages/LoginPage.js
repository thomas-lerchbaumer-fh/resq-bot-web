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



  async function loginUser(credentials) {
    return fetch("http://"+ API_SOCKET + ":3002/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())


}

  const LoginPage = () => {

   
    {/*const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };*/}
    const [username, setUserName] = useState(String);
    const [password, setPassword] = useState(String);
    const [errormessage, setError] = useState(String);
    let statusmessage = React.useState("");
    statusmessage[0] = "test";
    const navigate = useNavigate();

    const loginForm = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        
        if (token.token === "yes") {
            sessionStorage.setItem('token', JSON.stringify("yes"));
            navigate('/');
            window.location.reload(false)

        } else if (token.token === "wrong") {
            setError("wrong pw");
        } else {
            setError("no valid user");

        } 
    }
  
    return (
      <Fragment>
        <Container maxWidth="md">
        
        <Paper elevation={1} sx={{ minWidth: "50%", minHeight: "50%", padding:"10px", margin:"50px" }}>
        <form onSubmit={loginForm}>
        <Box justifyContent="center" alignItems="center">
            <TextField id="standard-basic" label="Username" variant="standard" onChange={e => setUserName(e.target.value)}/>
            </Box>
            <Box   justifyContent="center" alignItems="center" padding="10px">
            <TextField id="standard-basic" label="Password" variant="standard" onChange={e => setPassword(e.target.value)}/>
            </Box>
            <Box   justifyContent="center" alignItems="center">
            <Button type="submit" variant="outlined" >Login</Button>
            </Box>
            </form>
            <p>{errormessage}</p>
            </Paper>
            
        
        </Container>
      </Fragment>
    );
  };
  
  export default LoginPage;