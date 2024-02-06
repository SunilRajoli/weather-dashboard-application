import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherIcon from './WeatherIcon';
import '../CSS/CurrentWeather.css';

function CurrentWeather({ city, unit }) {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit === 'Celsius' ? 'metric' : 'imperial'}&appid=b75833ce3191b6d2d8557e0f75eb658f`
                );
                setWeather(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching current weather:', error);
                setError('City not found. Please enter a valid city name.');
            }
        };

        fetchWeather();
    }, [city, unit]);

    const convertTemperature = (temp) => {
        if (unit === 'Celsius') {
            return temp;
        } else {
            return (temp * 9 / 5) + 32;
        }
    };

    if (error) {
        return <div className="current-weather-error">Error: {error}</div>;
    }

    if (!weather) {
        return <div className="current-weather-loading">Loading...</div>;
    }

    return (
        <div className="current-weather-container">
            <h2>Current Weather</h2>
            <p className="temperature">Temperature: {convertTemperature(weather.main.temp)}&deg;{unit === 'Celsius' ? 'C' : 'F'}</p>
            <p>Min Temperature: {convertTemperature(weather.main.temp_min)}&deg;{unit === 'Celsius' ? 'C' : 'F'}</p>
            <p>Max Temperature: {convertTemperature(weather.main.temp_max)}&deg;{unit === 'Celsius' ? 'C' : 'F'}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>Weather: {weather.weather[0].description}</p>
            <WeatherIcon icon={weather.weather[0].icon} />
        </div>
    );
}

export default CurrentWeather;
