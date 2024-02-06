import React from 'react';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiWindy } from 'weather-icons-react';

function WeatherIcon({ icon }) {
    let weatherIcon;

    // Map the provided icon code to corresponding Weather Icons React component
    switch (icon) {
        // Clear sky day or night
        case '01d':
        case '01n':
            weatherIcon = <WiDaySunny size={48} color='black' />;
            break;
        // Few clouds, scattered clouds, or broken clouds
        case '02d':
        case '02n':
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            weatherIcon = <WiCloud size={48} color='black' />;
            break;
        // Rain
        case '09d':
        case '09n':
        case '10d':
        case '10n':
            weatherIcon = <WiRain size={48} color='black' />;
            break;
        // Snow
        case '13d':
        case '13n':
            weatherIcon = <WiSnow size={48} color='black' />;
            break;
        // Mist, fog, or haze
        case '50d':
        case '50n':
            weatherIcon = <WiWindy size={48} color='black' />;
            break;
        // Default to clear sky icon if the provided icon code doesn't match any known cases
        default:
            weatherIcon = <WiDaySunny size={48} color='black' />;
    }

    return (
        <div className="weather-icon">
            {weatherIcon}
        </div>
    );
}

export default WeatherIcon;
