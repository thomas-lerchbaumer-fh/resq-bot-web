//import logo from './logo.svg';
import './App.css';
import MediaQuery from 'react-responsive'
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import VideoFeed from "./VideoFeed.tsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function getGyro(){
  
  fetch("http://pi4.posch.ltd:3001/api")
  .then(res => res.json())
  .then(
    (result) => {
        console.log(result);
        document.getElementById("gyro").innerHTML = result["message"]; 
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {

    }
  )
/*
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://pi4.posch.ltd:3001/api")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          document.getElementById("gyro").value = result; 
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {

        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    );
  }*/
}




function App() {
  const sendLeftMotorControl = (event, newValue) => {
    //console.log(newValue);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newValue })
  };
  fetch('http://pi4.posch.ltd:3001/leftMotorControl', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  };
  return (

    <div className="App">
      <header className="App-header">
        <Box sx={{ flexGrow: 1 }}>
        <Grid id="grid" container spacing={2}>
          <Grid item xs={10.5}>
            <Item id="gyro">Gyroskop X:  Y:   Z:</Item>
          </Grid>
        </Grid>
          <Grid id="grid" container spacing={2}>
            <Grid item xs={2}>
              <Item>
                Räder:
                <Stack sx={{ height: 335 }} 
                spacing={1} 
                divider={<Divider orientation="vertical" flexItem />}
                alignItems="center"
                justifyContent="center"
                direction="row">
                <Slider
                    sx={{
                      '& input[type="range"]': {
                        WebkitAppearance: 'slider-vertical',
                      },
                    }}
                    marks
                    step={10}
                    orientation="vertical"
                    defaultValue={30}
                    aria-label="Temperature"
                    valueLabelDisplay="auto"
                    onChange={sendLeftMotorControl}
                  // onKeyDown={preventHorizontalKeyboardNavigation}
                  />
                  <Slider
                    sx={{
                      '& input[type="range"]': {
                        WebkitAppearance: 'slider-vertical',
                      },
                    }}
                    marks
                    step={10}
                    orientation="vertical"
                    defaultValue={30}
                    aria-label="Temperature"
                    valueLabelDisplay="auto"
                  // onKeyDown={preventHorizontalKeyboardNavigation}
                  />
                </Stack>
              </Item>
            </Grid >
            <Grid item xs={8.5}>
              <Item><VideoFeed src="http://10.0.0.91:8083/stream/pattern/channel/0/hls/live/index.m3u8" /></Item>
            </Grid>
            <Grid item xs={10.5}>
              <Item><Button variant="contained" onClick={getGyro}>Hello World</Button></Item>
            </Grid>
          </Grid>
        </Box>

      </header>
    </div>
  );
}


export default App;
