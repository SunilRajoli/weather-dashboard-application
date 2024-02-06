import axios from 'axios';

function fetchData(city) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
}
