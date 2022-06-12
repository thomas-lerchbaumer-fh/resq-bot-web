import logo from './logo.svg';
import './App.css';
import { Slider } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          
        <Slider defaultValue={30} step={10} marks min={10} max={110} disabled />

      </header>
    </div>
  );
}



export default App;
