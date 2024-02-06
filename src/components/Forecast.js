import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherIcon from './WeatherIcon';
import '../CSS/Forecast.css'; // Corrected import path for CSS file

function Forecast({ city, unit }) {
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit === 'Celsius' ? 'metric' : 'imperial'}&appid=b75833ce3191b6d2d8557e0f75eb658f`
                );
                const fiveDayForecast = getFiveDayForecast(response.data.list);
                setForecast(fiveDayForecast);
                setError(null); // Reset error state on successful fetch
            } catch (error) {
                console.error('Error fetching forecast:', error);
                setError('Error fetching forecast data. Please try again.'); // Improved error message
            }
        };

        fetchForecast();
    }, [city, unit]);

    const getFiveDayForecast = (forecastData) => {
        const fiveDayForecast = [];
        let currentDate = null;
        let tempSum = 0;
        let tempCount = 0;

        forecastData.forEach((item) => {
            const date = item.dt_txt.split(' ')[0];
            const temp = item.main.temp;

            if (date !== currentDate) {
                if (currentDate) {
                    const avgTemp = tempSum / tempCount;
                    fiveDayForecast.push({
                        date: currentDate,
                        avgTemp: avgTemp,
                        weather: item.weather[0].description,
                        icon: item.weather[0].icon
                    });
                }
                currentDate = date;
                tempSum = 0;
                tempCount = 0;
            }

            tempSum += temp;
            tempCount++;
        });

        if (currentDate) {
            const avgTemp = tempSum / tempCount;
            fiveDayForecast.push({
                date: currentDate,
                avgTemp: avgTemp,
                weather: forecastData[forecastData.length - 1].weather[0].description,
                icon: forecastData[forecastData.length - 1].weather[0].icon
            });
        }

        return fiveDayForecast.slice(0, 5); // Take only the next 5 days
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (forecast.length === 0) {
        return <div>Loading...</div>;
    }

    const celsiusToFahrenheit = (celsius) => {
        return (celsius * 9 / 5) + 32;
    };

    const fahrenheitToCelsius = (fahrenheit) => {
        return (fahrenheit - 32) * 5 / 9;
    };

    const displayTemperature = (temp) => {
        return unit === 'Celsius' ? temp : celsiusToFahrenheit(temp);
    };

    return (
        <div>
            <h2>5-Day Forecast</h2>
            <div className="forecast-container">
                {forecast.map((item, index) => (
                    <div key={index} className="forecast-item">
                        <h3>{item.date}</h3>
                        <p>Average Temperature: {displayTemperature(item.avgTemp).toFixed(2)}°{unit === 'Celsius' ? 'C' : 'F'}</p>
                        <p>Weather: {item.weather}</p>
                        <WeatherIcon icon={item.icon} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;
