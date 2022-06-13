//import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import VideoFeed from "./VideoFeed.tsx";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {
  return (

    <div className="App">
      <header className="App-header">
        <Box sx={{ flexGrow: 1 }}>
        <Grid id="grid" container spacing={2}>
          <Grid item xs={10.5}>
            <Item>Gyroskop X:  Y:   Z:</Item>
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
              <Item><Button variant="contained">Hello World</Button></Item>
            </Grid>
          </Grid>
        </Box>
        
        

      </header>
    </div>
  );
}


export default App;
