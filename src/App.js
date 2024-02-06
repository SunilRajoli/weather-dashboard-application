import React, { useState } from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import ToggleUnitButton from './components/ToggleUnitButton';

function App() {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('Celsius');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleUnitToggle = () => {
    setUnit(unit === 'Celsius' ? 'Fahrenheit' : 'Celsius');
  };

  return (
    <div className='container'>
      <div className="App">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleCityChange}
        />
        <ToggleUnitButton unit={unit} onToggle={handleUnitToggle} />
        {city && <CurrentWeather city={city} unit={unit} />}
        {city && <Forecast city={city} unit={unit} />}
      </div>
    </div>
  );
}

export default App;
